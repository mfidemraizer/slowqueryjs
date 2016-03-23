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

export class ResetableIterator {
      constructor(iterable) {
            if (typeof iterable == "function") {
                  iterable = iterable();
            }

            Object.defineProperty(this, "___iterable___", {
                value: iterable,
                configurable: false,
                writable: false,
                enumerable: false
            });

            Object.defineProperty(this, "___iterator___", {
                value: undefined,
                configurable: false,
                writable: true,
                enumerable: false
            });

            this.reset();
      }

      reset() {
            this.___iterator___ = this.___iterable___[Symbol.iterator]();
      }

      next() {
            return this.___iterator___.next();
      }
}

export class AutoResetableIterator extends ResetableIterator {
      constructor(iterable) {
            super(iterable);
      }

      static create(iterable) {
            return function autoResetableIteratorFactory() {
                  return new AutoResetableIterator(iterable);
            }
      }

      next() {
            var nextItem = super.next();

            if (nextItem.done) {
                  this.reset();
            }

            return nextItem;
      }
}
