const {
  validateId,
} = require('./validation');

describe('Common Id Validation', () => {
  test('valid value passes validation', () => {
    const errors = validateId(25);
    expect(errors.length).toEqual(0);
  });

  test('errors out on NaN value', () => {
    const errors = validateId('a');
    expect(errors.length).toEqual(1);
  });

  test('errors out on float value', () => {
    const errors = validateId('1.1');
    expect(errors.length).toEqual(1);
  });

  test('errors out on less than 1 value', () => {
    const errors = validateId('0');
    expect(errors.length).toEqual(1);
  });
});
