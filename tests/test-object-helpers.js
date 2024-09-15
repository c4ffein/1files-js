import assert from 'assert';
import { oE, oFE, oK, oV, iA, iO, O, A } from '../object-helpers/object-helpers.js'


const compareJSON = (x, y) => JSON.stringify(x) === JSON.stringify(y);


const baseObject = {1: 2, 3: 4, '5': 'a', 'x': 'y'};
const baseEntries = [[1, 2], [3, 4], ['5', 'a'], ['x', 'y']];
const baseArray = [1, 2, 3];


assert(compareJSON(oE(baseObject), Object.entries(baseObject)));
assert(compareJSON(oFE(baseEntries), Object.fromEntries(baseEntries)));
assert(compareJSON(oK(baseObject), Object.keys(baseObject)));
assert(compareJSON(oV(baseObject), Object.values(baseObject)));

assert(iA(baseObject) === false);
assert(iA(baseArray) === true);
assert(iO(baseObject) === true);
assert(iO(baseArray) === true);
assert(iO(null) === false);

assert(compareJSON(O.e(baseObject), Object.entries(baseObject)));
assert(compareJSON(O.fE(baseEntries), Object.fromEntries(baseEntries)));
assert(compareJSON(O.k(baseObject), Object.keys(baseObject)));
assert(compareJSON(O.v(baseObject), Object.values(baseObject)));

assert(A.i(baseObject) === false);
assert(A.i(baseArray) === true);
assert(O.i(baseObject) === true);
assert(O.i(baseArray) === true);
assert(O.i(null) === false);
