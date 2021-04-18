const express = require('express');

module.exports = ({
  controller,
  path,
  router = express.Router(),
}) => {
  if (controller.get) router.get(path, controller.get);
  if (controller.getById) router.get(`${path}/:id`, controller.getById);
  if (controller.post) router.post(path, controller.post);
  if (controller.put) router.put(path, controller.put);
  if (controller.deleteById) router.delete(`${path}/:id`, controller.deleteById);

  return router;
};
