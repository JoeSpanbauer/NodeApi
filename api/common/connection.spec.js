const createClass = require('./connection');

describe('connection', () => {
  let createConnectionCalled = false;
  let queryCalled = false;
  const fakeMysql = {
    createConnection: () => {
      createConnectionCalled = true;

      return {
        connect: () => {},
        query: (a, b, callback) => {
          queryCalled = true;
          callback();
        },
        end: () => {},
      };
    },
  };

  const connectionClass = createClass(fakeMysql);

  beforeEach(() => {
    createConnectionCalled = false;
    queryCalled = false;
  });

  test('getConnection creates connection', () => {
    connectionClass.getConnection();
    expect(createConnectionCalled).toEqual(true);
  });

  test('query calls query successfully', async () => {
    const connection = connectionClass.getConnection();
    await connectionClass.query(connection);
    expect(queryCalled).toEqual(true);
  });

  test('call calls getConnectin and query', async () => {
    await connectionClass.call();
    expect(createConnectionCalled).toEqual(true);
    expect(queryCalled).toEqual(true);
  });
});
