/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// tslint:disable: newline-per-chained-call
// tslint:disable: no-backbone-get-set-outside-model
import * as assert from "assert";
import * as map from "..";

describe("Routerlicious", () => {
    describe("Map", () => {
        describe("Set", () => {
            let testMap: map.ISharedMap;
            let emptySet: map.DistributedSet<number>;
            let populatedSet: map.DistributedSet<number>;

            beforeEach(async () => {
                const factory = new map.MapFactory();
                testMap = factory.create(null, "test");
                testMap.registerValueType(new map.DistributedSetValueType());

                emptySet = testMap.
                    set(
                        "emptySet",
                        undefined,
                        map.DistributedSetValueType.Name).
                    get<map.DistributedSet<number>>("emptySet");
                populatedSet = testMap.
                set(
                    "populatedSet",
                    [1, 2, 4, 6],
                    map.DistributedSetValueType.Name).
                    get<map.DistributedSet<number>>("populatedSet");
            });

            describe(".add()", () => {
                it("Can create an empty set and populate it", () => {
                    assert.ok(emptySet);
                    assert.deepEqual(emptySet.entries(), []);
                    emptySet.add(10);
                    emptySet.add(20);
                    emptySet.add(30);
                    emptySet.delete(20);
                    assert.deepEqual(emptySet.entries(), [10, 30]);
                    assert.deepEqual(Array.from(emptySet.entries()), [10, 30]);
                });

                it("Can create a set with values and populate it", () => {
                    assert.ok(populatedSet);
                    assert.deepEqual(populatedSet.entries(), [1, 2, 4, 6]);
                    populatedSet.add(3);
                    populatedSet.add(5);
                    assert.deepEqual(populatedSet.entries(), [1, 2, 4, 6, 3, 5]);
                    populatedSet.delete(2);
                    populatedSet.delete(4);
                    assert.deepEqual(populatedSet.entries(), [1, 6, 3, 5]);
                    assert.deepEqual(Array.from(populatedSet.entries()), [1, 6, 3, 5]);
                });
            });

            describe(".onAdd", () => {
                it("Should be able to register an onAdd callback", () => {
                    const callback = (value: number) => { return; };
                    emptySet.onAdd = callback;
                    assert.equal(emptySet.onAdd, callback);
                });

                it("Should fire onAdd callback after add", () => {
                    let fired = false;

                    emptySet.onAdd = (value: number) => {
                        fired = true;
                        assert.equal(value, 5);
                    };
                    emptySet.add(5);
                    assert.ok(fired);
                });
            });

            describe(".onDelete", () => {
                it("Should be able to register an onDelete callback", () => {
                    const callback = (value: number) => { return; };
                    emptySet.onDelete = callback;
                    assert.equal(emptySet.onDelete, callback);
                });

                it("Should fire onDelete callback after delete", () => {
                    let fired = false;

                    emptySet.onDelete = (value: number) => {
                        fired = true;
                        assert.equal(value, 5);
                    };
                    emptySet.add(5);
                    emptySet.delete(5);
                    assert.ok(fired);
                });
            });
        });
    });
});
