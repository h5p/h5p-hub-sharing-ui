import {validateAge} from "../src/utils/validators";

test('age is optional', () => {
  expect(validateAge('')).toBeTruthy();
  expect(validateAge(' ')).toBeTruthy();
})

test('valid discrete range', () => {
  expect(validateAge('12-15')).toBeTruthy();
});

test('valid end range', () => {
  expect(validateAge('-15')).toBeTruthy();
});

test('valid start range', () => {
  expect(validateAge('15-')).toBeTruthy();
});

test('valid integer', () => {
  expect(validateAge('17')).toBeTruthy();
});

test('end value is not larger than start value', () => {
  expect(validateAge('12-11')).toBeFalsy();
  expect(validateAge('11-11')).toBeFalsy();
});

test('invalid floats', () => {
  expect(validateAge('13.37')).toBeFalsy();
  expect(validateAge('15.55-')).toBeFalsy();
  expect(validateAge('-15.55')).toBeFalsy();
  expect(validateAge('12.3-34.5')).toBeFalsy();
});

test('alphanumeric', () => {
  expect(validateAge('asd-asd')).toBeFalsy();
  expect(validateAge('14asdf')).toBeFalsy();
  expect(validateAge('asdf14')).toBeFalsy();
  expect(validateAge('asdf14-asdf')).toBeFalsy();
  expect(validateAge('-asdf')).toBeFalsy();
  expect(validateAge('asdf-')).toBeFalsy();
});

test('additional ranges', () => {
  expect(validateAge('12-13-15')).toBeFalsy();
});

test('large numbers', () => {
  expect(validateAge('151-')).toBeFalsy();
});

