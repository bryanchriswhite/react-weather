import {currentHour} from "./weather";

const testData = require('../public/sample.json');
// console.log(testData);

test('currentHour', () => {
    const actual = currentHour(testData);
    const expected = testData.list[1]
    expect(actual).toBe(expected);
});