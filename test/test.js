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

"use strict";

QUnit.module("Raw iterations");
QUnit.test("SlowQuery[Symbol.iterator]: Elements are returned in the expected order", (assert) => {
      var items = [1, 2, 3, 4];
      var result = SlowQuery.from(items);

      var index = 0;
      for (var item of result) {
            assert.equal(item, items[index++]);
      }
});


QUnit.module("Conversions");
QUnit.test("SlowQuery.toArray: Elements are returned in the expected order", (assert) => {
      var items = [1, 2, 3, 4];
      var result = SlowQuery.from(items).toArray();

      for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            assert.equal(result[itemIndex], items[itemIndex], "Results are in the expected order");
      }
});
QUnit.test("SlowQuery.toSet: Returned elements are unique and the expected ones", (assert) => {
      var items = [1, 2, 2, 4];
      var result = SlowQuery.from(items).toSet();

      var expected = [1, 2, 4];

      for (var item of result) {
            assert.ok(expected.indexOf(item) > -1, "Expected item found");
      }
});


QUnit.module("Mappers");
QUnit.test("SlowQuery.map: can map an iterable into other objects", (assert) => {
      assert.expect(5);

      var items = [1, 2, 3, 4];
      var result = SlowQuery.from(items).map(item => {
            return { number: item }
      }).toArray();

      assert.equal(result.length, 4, "Got expected number of items");

      for (var itemIndex = 0; itemIndex < result.length; itemIndex++) {
            assert.equal(result[itemIndex].number, items[itemIndex]);
      }
});


QUnit.module("Searchability");
QUnit.test("SlowQuery.where: Can search all occurences of some given condition", (assert) => {
      var items = [1, 2, 3, 4];
      var result = SlowQuery.from(items).where(item => item < 4).toArray();

      assert.equal(result.length, 3, "Got expected number of items");
});
QUnit.test("SlowQuery.where: Condition not met returns no results", (assert) => {
      var query = SlowQuery.from([1, 2, 3, 4]);
      var result = query.where(item => item == 5).toArray();

      assert.equal(result.length, 0, "Got zero items");
});
QUnit.test("SlowQuery.first: Get first in the sequence", (assert) => {
      var query = SlowQuery.from([1, 2, 3, 4]);
      var result = query.first();

      assert.equal(result, 1);
})

QUnit.start();
