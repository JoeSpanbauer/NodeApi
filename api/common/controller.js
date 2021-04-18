const request = async (res, query, data, validate = () => ({ length: 0 })) => {
  const errors = validate(data);

  if (errors.length === 0) {
    let result;
    try {
      result = await query(data);
    } catch (e) {
      // TODO: Logging
    }

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500).send();
    }
  } else {
    res.status(400).send();
  }
};

const create = (getDataObject, queries, validation) => {
  const {
    get: getQuery,
    getById: getByIdQuery,
    insert: insertQuery,
    replace: replaceQuery,
    deleteById: deleteByIdQuery,
  } = queries;

  const {
    validateId,
    validatePost,
    validatePut,
  } = validation;

  const get = async (req, res) => {
    await request(res, getQuery);
  };

  const getById = async ({
    params: {
      id,
    },
  }, res) => {
    await request(res, getByIdQuery, id, validateId);
  };

  const post = async ({ body }, res) => {
    await request(res, insertQuery, getDataObject(body), validatePost);
  };

  const put = async ({ body }, res) => {
    await request(res, replaceQuery, getDataObject(body), validatePut);
  };

  const deleteById = async ({
    params: {
      id,
    },
  }, res) => {
    await request(res, deleteByIdQuery, id, validateId);
  };

  const api = {};

  if (getQuery) api.get = get;
  if (getByIdQuery) api.getById = getById;
  if (insertQuery) api.post = post;
  if (replaceQuery) api.put = put;
  if (deleteByIdQuery) api.deleteById = deleteById;

  return api;
};

module.exports = {
  request,
  create,
};
