import React from 'react';
import PropTypes from 'prop-types';
import connect from '../form_connect';


const Submit = (props) => {
  const { form, ...cleanProps } = props;
  const { locked } = form;

  return <button {...cleanProps} disabled={locked} type="submit" />;
};

Submit.propTypes = {
  form: PropTypes.object.isRequired,
};

export default connect(Submit);
