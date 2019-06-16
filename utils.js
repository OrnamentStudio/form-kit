const PropTypes = require('prop-types');


exports.noop = () => {};

exports.isFilled = (value) => {
  if (typeof value === 'undefined' || value === null) return false;
  if (Array.isArray(value)) return value.length !== 0;

  switch (typeof (value)) {
    case 'string': return value.length !== 0;
    case 'object': return JSON.stringify(value) !== '{}';
    case 'boolean': return value;
    case 'number': return true;
    default: return Boolean(value);
  }
};

exports.getValue = (form, field, defaultValue = '') => {
  const hasValue = Object.prototype.hasOwnProperty.call(form.model, field);
  return hasValue ? form.model[field] : defaultValue;
};

exports.getErrors = (model, validation) => {
  if (!validation) return {};

  const collect = (acc, key) => {
    const value = model[key];
    const { message, validate, required } = validation[key];

    const hasValue = exports.isFilled(value);
    let hasError = false;

    if (required && !hasValue) hasError = true;

    if (!hasError && hasValue && validate) {
      const iterator = check => !check(value, model);
      hasError = validate.some(iterator);
    }

    return hasError ? { ...acc, [key]: message } : acc;
  };

  return Object.keys(validation).reduce(collect, {});
};

exports.hasErrors = errors => Boolean(errors && Object.keys(errors).length);

exports.getPropTypeForm = () => PropTypes.shape({
  locked: PropTypes.bool.isRequired,
  model: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  updateField: PropTypes.func.isRequired,
});
