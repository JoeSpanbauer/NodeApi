const {
  schema,
  validatePost,
  validatePut,
} = require('./validation');

describe('Member Post Validation', () => {
  let validRequest;

  beforeEach(() => {
    validRequest = {
      username: 'JohnDoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'jd@jd.com',
      phoneNumber: '1112224444',
    };
  });

  test('valid request has no errors', () => {
    const errors = validatePost(validRequest);
    expect(errors.length).toEqual(0);
  });

  test('valid empty request throws an error for each required field', () => {
    const emptyPostRequest = {};
    const errors = validatePost(emptyPostRequest);
    expect(errors.length).toEqual(schema.required.length);
  });

  test('errors out when username is too short', () => {
    const shortUsernameRequest = {
      ...validRequest,
      username: 'ab',
    };
    const errors = validatePost(shortUsernameRequest);
    expect(errors.length).toEqual(1);
  });

  test('errors out when firstName is too short', () => {
    const shortFirstNameRequest = {
      ...validRequest,
      firstName: 'a',
    };
    const errors = validatePost(shortFirstNameRequest);
    expect(errors.length).toEqual(1);
  });

  test('errors out when lastName is too short', () => {
    const shortLastNameRequest = {
      ...validRequest,
      lastName: 'b',
    };
    const errors = validatePost(shortLastNameRequest);
    expect(errors.length).toEqual(1);
  });

  test('errors out when email format is wrong', () => {
    const badEmailFormatRequest = {
      ...validRequest,
      email: 'wrong',
    };
    const errors = validatePost(badEmailFormatRequest);
    expect(errors.length).toEqual(1);
  });

  test('errors out when phoneNumber is too long', () => {
    const longPhoneNumberRequest = {
      ...validRequest,
      phoneNumber: '12345678910111213141516',
    };
    const errors = validatePost(longPhoneNumberRequest);
    expect(errors.length).toEqual(1);
  });
});

describe('Member Put Validation', () => {
  test('valid request has no errors', () => {
    const validRequest = {
      id: 1,
      username: 'JohnDoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'jd@jd.com',
      phoneNumber: '1112224444',
    };
    const errors = validatePut(validRequest);
    expect(errors.length).toEqual(0);
  });
});
