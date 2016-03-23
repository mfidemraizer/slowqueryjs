/*  Copyright 2016 Matías Fidemraizer (matiasfidemraizer.com)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { AutoResetableIterator } from "iterators.js";
import { QueryQueue } from "collections.js";
import { SlowQuerySymbols } from "symbols.js";

class SlowQuery {
      constructor(iterable) {
            var queryQueue = new QueryQueue();
            queryQueue.enqueue(iterable, { description: "initialIterable" });

            Object.defineProperties(this, {
                  ___queryQueue___: {
                        value: queryQueue,
                        configurable: false,
                        enumerable: false,
                        writable: false
                  }
            });
      }

      get[Symbol.toStringTag]() {
            var output = { queries: [] };

            for (var query of this.___queryQueue___.items) {
                  output.queries.push(query.info.description);
            }

            output.queryCount = this.___queryQueue___.count;

            return `FluentQuery ${JSON.stringify(output, null, 3)}`;
      }

      get[Symbol.iterator]() {
            return AutoResetableIterator.create(this.toArray());
      }

      * ___iterate___(previousIterator, predicate, iterationToken) {
            if (typeof iterationToken == "undefined") {
                  iterationToken = { break: false };
            }

            var currentItem = undefined;
            previousIterator = previousIterator();
            var skippedAllIterations = true;
            var noResult = false;

            do {
                  currentItem = previousIterator.next();

                  if (!currentItem.done) {
                        var predicateResult = predicate(currentItem.value);
                        var skip = typeof predicateResult == "undefined";

                        if (!skip) {
                              skippedAllIterations = false;

                              if (typeof predicateResult == "object" && predicateResult.hasOwnProperty(SlowQuerySymbols.modified)) {
                                    yield predicateResult[SlowQuerySymbols.modified];
                              } else {
                                    yield currentItem.value;
                              }
                        } else {
                              noResult = true;
                        }
                  }
            }
            while (!iterationToken.break && !currentItem.done);

            if (skippedAllIterations && noResult) {
                  yield SlowQuerySymbols.noResult;
            }

            if (iterationToken.break) {
                  previousIterator.reset();
            }
      }

      * ___toMergedGenerator___() {
            var queryQueue = this.___queryQueue___.items;

            if (queryQueue.length > 0) {
                  for (let iteratorIndex = 0; iteratorIndex < queryQueue.length; iteratorIndex++) {
                        yield * queryQueue[iteratorIndex]();
                        if (iteratorIndex + 1 < queryQueue.length) {
                              yield SlowQuerySymbols.resultSeparator;
                        }
                  }
            }
      }

      map(selector) {
            var queryQueue = this.___queryQueue___;
            var previousIterator = queryQueue.items[queryQueue.count - 1];

            queryQueue.enqueue(() => this.___iterate___(
                  previousIterator,
                  item => {
                        return {
                              [SlowQuerySymbols.modified]: selector(item)
                        };
                  }
            ), { description: `map(${selector.toString()})` });

            return this;
      }

      where(condition, iterationToken) {
            var queryQueue = this.___queryQueue___;
            var previousIterator = queryQueue.items[queryQueue.count - 1];

            queryQueue.enqueue(() => this.___iterate___(
                  previousIterator,
                  item => {
                        if (condition(item) === true) {
                              return true;
                        }
                  },
                  iterationToken
            ), { description: `where(${condition.toString()})` });

            return this;
      }

      first(condition) {
            var iterationToken = { break: false };

            if (typeof condition != "function") {
                  condition = true;
            }

            var searchResult = this.where(
                  item => {
                        var result = condition || condition(item);

                        if (result === true) {
                              iterationToken.break = true;
                        }

                        return result;
                  },
                  iterationToken
            );

            return searchResult.toArray()[0];
      }

      toArray() {
            var result = [...this.___toMergedGenerator___()];

            while (result[result.length - 1] == SlowQuerySymbols.resultSeparator) {
                  result.pop();
            }
            var firstItemInResultIndex = result.lastIndexOf(SlowQuerySymbols.resultSeparator) + 1;

            if (result[firstItemInResultIndex] != SlowQuerySymbols.noResult) {
                  result = result.slice(firstItemInResultIndex);
            } else {
                  result = [];
            }

            return result;
      }

      toSet() {
            return new Set(this.toArray());
      }
};

export var from = (...args) => Object.freeze(new SlowQuery(args[0]));
