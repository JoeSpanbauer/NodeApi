const routes = require('./routes');

describe('routes', () => {
  const path = '/competition';
  const getRouteName = (router) => router.stack[0].route.stack[0].name;

  test('maps get function correctly', () => {
    const router = routes({
      controller: {
        get: () => {},
      },
      path,
    });
    expect(getRouteName(router)).toEqual('get');
  });

  test('maps getById function correctly', () => {
    const router = routes({
      controller: {
        getById: () => {},
      },
      path,
    });
    expect(getRouteName(router)).toEqual('getById');
  });

  test('maps post function correctly', () => {
    const router = routes({
      controller: {
        post: () => {},
      },
      path,
    });
    expect(getRouteName(router)).toEqual('post');
  });

  test('maps put function correctly', () => {
    const router = routes({
      controller: {
        put: () => {},
      },
      path,
    });
    expect(getRouteName(router)).toEqual('put');
  });

  test('maps deleteById function correctly', () => {
    const router = routes({
      controller: {
        deleteById: () => {},
      },
      path,
    });
    expect(getRouteName(router)).toEqual('deleteById');
  });
});
