import {setLeftDays} from '../src/client/js/app';

// This is for making alert function works
window.alert = jest.fn();

test("check if the letters less than two", () => {

  window.alert.mockClear();

  expect(setLeftDays(0)).toBe('today');

  expect(setLeftDays(1)).toBe('tommorow');

  expect(setLeftDays(2)).toBe('2 days away');

});
  