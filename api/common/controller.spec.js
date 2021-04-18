const { request, create } = require('./controller');

describe('Common Controller Request', () => {
  const data = {};
  const querySuccess = async () => (true);
  const validateValid = () => ({ length: 0 });

  let responseCode;
  const res = {
    status: (code) => {
      responseCode = code;
      return {
        json: () => { },
        send: () => { },
      };
    },
  };

  beforeEach(() => {
    responseCode = undefined;
  });

  test('returns 200 status when successful', async () => {
    await request(res, querySuccess, data, validateValid);
    expect(responseCode).toEqual(200);
  });

  test('returns 400 status when request is invalid', async () => {
    const validateInvalid = () => ({ length: 1 });
    await request(res, querySuccess, data, validateInvalid);
    expect(responseCode).toEqual(400);
  });

  test('returns 500 status when there is an exception thrown', async () => {
    const queryException = async () => (false);
    await request(res, queryException, data, validateValid);
    expect(responseCode).toEqual(500);
  });
});

describe('Common Controller Create', () => {
  const validation = {
    validateId: () => ({ length: 0 }),
    validatePost: () => ({ length: 0 }),
    validatePut: () => ({ length: 0 }),
  };

  // Unit Tests
  test('creates a get request correctly', () => {
    const controller = create(() => {}, { get: () => {} }, validation);
    expect(controller.get).not.toBe(undefined);
  });

  test('creates a getById request correctly', () => {
    const controller = create(() => {}, { getById: () => {} }, validation);
    expect(controller.getById).not.toBe(undefined);
  });

  test('creates a post request correctly', () => {
    const controller = create(() => {}, { insert: () => {} }, validation);
    expect(controller.post).not.toBe(undefined);
  });

  test('creates a put request correctly', () => {
    const controller = create(() => {}, { replace: () => {} }, validation);
    expect(controller.put).not.toBe(undefined);
  });

  test('creates a deleteById request correctly', () => {
    const controller = create(() => {}, { deleteById: () => {} }, validation);
    expect(controller.deleteById).not.toBe(undefined);
  });

  // Integration Tests
  const getResultObj = (setResult) => {
    const res = {
      status: () => ({
        json: setResult,
        send: setResult,
      }),
    };

    return res;
  };

  const expected = 'This is expected';

  test('executes a get request correctly', async () => {
    let result;
    const res = getResultObj((returnedResult) => { result = returnedResult; });
    const get = async () => expected;

    const controller = create(() => {}, { get }, validation);

    await controller.get(undefined, res);
    expect(result).toEqual(expected);
  });

  test('executes a getById request correctly', async () => {
    let result;
    const res = getResultObj((returnedResult) => { result = returnedResult; });
    const getById = async () => expected;

    const controller = create(() => {}, { getById }, validation);

    await controller.getById({ params: { id: undefined } }, res);
    expect(result).toEqual(expected);
  });

  test('executes a post request correctly', async () => {
    let result;
    const res = getResultObj((returnedResult) => { result = returnedResult; });
    const insert = async () => expected;

    const controller = create(() => {}, { insert }, validation);

    await controller.post({ body: undefined }, res);
    expect(result).toEqual(expected);
  });

  test('executes a put request correctly', async () => {
    let result;
    const res = getResultObj((returnedResult) => { result = returnedResult; });
    const replace = async () => expected;

    const controller = create(() => {}, { replace }, validation);

    await controller.put({ body: undefined }, res);
    expect(result).toEqual(expected);
  });

  test('executes a deleteById request correctly', async () => {
    let result;
    const res = getResultObj((returnedResult) => { result = returnedResult; });
    const deleteById = async () => expected;

    const controller = create(() => {}, { deleteById }, validation);

    await controller.deleteById({ params: { id: undefined } }, res);
    expect(result).toEqual(expected);
  });
});
