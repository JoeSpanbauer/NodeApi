const { stat, writeFile } = require('fs');

const content = `DB_HOST=localhost
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_TEST_TABLE_NAME=test
DB_MEMBER_TABLE_NAME=member`;

const file = '.env';

stat(file, (error, stats) => {
  if (!stats) {
    writeFile(file, content, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log('.env file generated.');
    });
  }
});
