const validateId = (id) => {
  const errors = [];
  const idNumber = parseFloat(id);

  if (Number.isNaN(idNumber)) errors.push('id is not a number');
  else if (!Number.isInteger(idNumber)) errors.push('id is not an integer');
  else if (idNumber < 1) errors.push('id is less than 1');

  return errors;
};

module.exports = {
  validateId,
};
