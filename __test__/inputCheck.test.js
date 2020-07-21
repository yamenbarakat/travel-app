import {checkCity} from '../src/client/js/checkInputCity.js';

test("check if the city is provided", () => {

  expect(checkCity('damascus')).toBe('damascus');

});


test("check if the letters less than two", () => {
  expect(checkCity('a')).toBeFalsy();

  expect(checkCity('')).toBeFalsy();

  expect(checkCity('1')).toBeFalsy();

  expect(checkCity('aa')).toBeTruthy();

});
  