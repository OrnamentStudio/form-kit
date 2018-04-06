export const isEmpty = (value) => (
  typeof value === 'string' ? !value : value == null
);

export const getErrors = (model, validation) => {
  if (!validation) return {};

  const collect = (acc, key) => {
    const value = model[key];
    const { message, validate, required } = validation[key];

    let hasError = false;
    if (required && isEmpty(value)) hasError = true;
    if (!hasError) hasError = validate.some((check) => !check(value));

    return hasError ? { ...acc, [key]: message } : acc;
  };

  return Object.keys(validation).reduce(collect, {});
};

export const hasErrors = (errors) => Boolean(errors && Object.keys(errors).length);

export const invoke = (func, ...args) => { if (func) func(...args); };
