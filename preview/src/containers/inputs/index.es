import React, { createRef } from 'react';
import Text from '../../../../lib/text';


const textRef = createRef();
const setValue = () => textRef.current.setValue('New Value');

const Inputs = () => (
  <article>
    <h1>Inputs</h1>
    <Text defaultValue="Text Value" ref={textRef} />
    <button onClick={setValue}>Set value via ref</button>
  </article>
);

export default Inputs;
