import React, { forwardRef } from 'react';
import { Consumer } from '../form_context';


export default (Component) => (
  forwardRef((props, ref) => (
    <Consumer>
      {(form) => <Component {...props} form={form} ref={ref} />}
    </Consumer>
  ))
);
