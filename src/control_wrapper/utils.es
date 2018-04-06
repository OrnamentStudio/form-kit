export const DEFAULT_VALUE = '';

export const shouldStateUpdate = (nextProps, prevState) => (
  nextProps.form !== prevState.form ||
  nextProps.field !== prevState.field
);
