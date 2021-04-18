const { Validator } = require('jsonschema');
const { validateId } = require('../common/validation');

const validator = new Validator();

const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 128,
    },
    firstName: {
      type: 'string',
      minLength: 2,
      maxLength: 128,
    },
    lastName: {
      type: 'string',
      minLength: 2,
      maxLength: 128,
    },
    email: {
      type: 'string',
      maxLength: 256,
      format: 'email',
    },
    phoneNumber: {
      type: 'string',
      maxLength: 22,
    },
  },
  required: [
    'username',
    'firstName',
    'lastName',
  ],
};

const validatePost = (post) => {
  let { errors } = validator.validate(post, schema);

  if (errors.length > 0) {
    errors = errors.map((error) => (error.stack ? error.stack.replace('instance.', '') : error));
  }

  return errors;
};

const validatePut = (put) => {
  let errors = validateId(put.id);

  if (errors.length === 0) {
    errors = validatePost(put);
  }

  return errors;
};

module.exports = {
  schema,
  validateId,
  validatePost,
  validatePut,
};
