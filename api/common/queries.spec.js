require('dotenv').config();
const {
  get,
  getById,
  insert,
  replace,
  deleteById,
} = require('./queries')(process.env.DB_TEST_TABLE_NAME);

// Integration Tests
describe('Test queries', () => {
  const initialTest = {
    varchar: 'Title',
    text: 'This is a good description',
    date: '2020-10-01',
  };

  const updatedTest = {
    varchar: 'Title',
    text: 'This is a new description',
    date: '2020-10-01',
  };

  let testId;

  test('get and post', async () => {
    if (process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASSWORD) {
      const beforePostResults = (await get()).length;
      testId = await insert(initialTest);
      const afterPostResults = (await get()).length;
      updatedTest.id = testId;
      expect(testId).toBeGreaterThan(0);
      expect(beforePostResults + 1).toEqual(afterPostResults);
    }
  });

  test('put', async () => {
    if (process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASSWORD) {
      const replaceId = await replace(updatedTest);
      expect(testId).toEqual(replaceId);
    }
  });

  test('getById', async () => {
    if (process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASSWORD) {
      const [result] = await getById(testId);
      expect(updatedTest.id).toEqual(result.id);
      expect(updatedTest.text).toEqual(result.text);
    }
  });

  test('deleteById', async () => {
    if (process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASSWORD) {
      const deletedId = await deleteById(testId);
      expect(testId).toEqual(deletedId);
    }
  });
});
