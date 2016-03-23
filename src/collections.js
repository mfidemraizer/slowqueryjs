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

export class QueryQueue {
      constructor() {
            Object.defineProperty(this, "__store__" , {
                value: [],
                enumerable: false,
                writable: false,
                configurable: false
            });
      }

      get[Symbol.iterator]() {
            return this.items[Symbol.iterator]();
      }

      get items() {
            return this.__store__;
      }

      get count() {
            return this.items.length;
      }

      enqueue(iterable, info) {
            var iterator = AutoResetableIterator.create(iterable);
            iterator.info = info;

            this.__store__.push(iterator);
      }

      toArray() {
            return this.items;
      }
}
