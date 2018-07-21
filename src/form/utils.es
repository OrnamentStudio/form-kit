export const isFilled = (value) => {
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

export const getValue = (form, field, defaultValue = '') => {
  const hasValue = Object.prototype.hasOwnProperty.call(form.model, field);
  return hasValue ? form.model[field] : defaultValue;
};

export const getErrors = (model, validation) => {
  if (!validation) return {};

  const collect = (acc, key) => {
    const value = model[key];
    const { message, validate, required } = validation[key];

    const hasValue = isFilled(value);
    let hasError = false;

    if (required && !hasValue) hasError = true;

    if (!hasError && hasValue && validate) {
      const iterator = (check) => !check(value, model);
      hasError = validate.some(iterator);
    }

    return hasError ? { ...acc, [key]: message } : acc;
  };

  return Object.keys(validation).reduce(collect, {});
};

export const hasErrors = (errors) => Boolean(errors && Object.keys(errors).length);

export const invoke = (func, ...args) => { if (func) func(...args); };
