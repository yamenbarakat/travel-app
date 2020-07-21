import {checkInputCity} from '../src/client/js/checkInputCity.js';

test("check if the city is provided", () => {

  expect(checkInputCity('damascus')).toBe('damascus');

});


test("check if the letters less than two", () => {
  expect(checkInputCity('a')).toBeFalsy();

  expect(checkInputCity('')).toBeFalsy();

  expect(checkInputCity('1')).toBeFalsy();

  expect(checkInputCity('aa')).toBeTruthy();

});
  