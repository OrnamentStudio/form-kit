import React from 'react';
import Form from '../../../../lib/form';
import Text from '../../../../lib/text';


const FormContainer = () => (
  <article>
    <h1>Form</h1>
    <Form>
      <Text name="text" />
      <button type="submit">Submit</button>
    </Form>
  </article>
);

export default FormContainer;
