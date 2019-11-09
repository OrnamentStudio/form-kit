# React Form Kit [![Build Status](https://travis-ci.org/OrnamentStudio/form-kit.svg?branch=master)](https://travis-ci.org/OrnamentStudio/form-kit)

## Install

```
npm install ornament-form-kit
```

You also need to install peer dependencies by yourself
```
npm install memoize-one // v4.x.x
npm install react // v16.x.x
npm install prop-types // v15.x.x
```

This module targets Node.js 8 or later and the latest version of Chrome, Firefox, and Safari. If you want support for older browsers use [Babel compiler](https://babeljs.io/).

## Usage

Include:

```js
const { Form, Text } = require('ornament-form-kit');
const Form = require('ornament-form-kit/form');
const Text = require('ornament-form-kit/text');
```

Full example:

```jsx
const {
  Form,
  Submit,

  Text,
  Textarea,
  Select,
  RadioGroup,
  Checkbox,
} = require('ornament-form-kit');


// Validation scheme
const personValidation = {
  firstname: {
    required: true,
    validate: [value => value.length > 5],
    message: 'Wrong name format',
  },

  sex: {
    required: true,
    message: 'Sex is required',
  },
};

const App = () => (
  <Form
    {/* Pre-fills form with default data */}
    defaultModel={personModel}

    {/* Validation scheme */}
    validation={personValidation}

    {/* Enable real time validation */}
    validateOnUpdate

    {/* Override real time validation rate limit, default: 200 */}
    validationRate={500}

    {/* Native event, takes event as argument */}
    onSubmit={handleSubmit}

    {/* Validation was passed, takes model as argument */}
    onValidSubmit={handleValidSubmit}

    {/* Validation wasn't passed */}
    onInvalidSubmit={handleInvalidSubmit}
  >
    {/* field is model key */}
    <Text field="firstname" />
    <Textarea field="description" />
    <Checkbox field="married" />

    {/* options: array of { value, content } objects */}
    <Select field="gender" options={options} />
    <RadioGroup field="age" options={options} />
  </Form>
);
```

## Components

### Form

```js
const Form = require('ornament-form-kit/form');
```

- Main component. It stores model and updates it.
- Every control should be placed inside it.
- If form is locked then all children controls are locked.

Properties:
* **locked**: `boolean` Locks form submit and model update
* **defaultModel**: `object` Object to pre-fill form
* **validateOnUpdate**: `bool` Enable/Disable real time validation
* **validationRate**: `number` Real time validation rate limit
* **validation**: `object` Validation scheme
* **children**: `function` `node` If function is passed then it takes form api as an argument. More about form api in ["form connect" section](#form-connect-hoc)
* **onSubmit**: `function` Native form submit event. Takes native event as argument
* **onValidSubmit**: `function` Called when validation was passed. Takes model as argument
* **onInvalidSubmit**: `function` Called when validation wasn't passed

### Text
```js
const Text = require('ornament-form-kit/text');
```

Properties:
* **field**: `string` Model field name
* **type**: `string` Input "type" attribute

### Textarea
```js
const Textarea = require('ornament-form-kit/textarea');
```

Properties:
* **field**: `string` Model field name

### Select
```js
const Select = require('ornament-form-kit/select');
```

Properties:
* **field**: `string` Model field name
* **options**: `array` Array of `{ value, content }` objects

### Checkbox
```js
const Checkbox = require('ornament-form-kit/checkbox');
```

Properties:
* **field**: `string` Model field name

### RadioGroup
```js
const RadioGroup = require('ornament-form-kit/radio_group');
```

Properties:
* **field**: `string` Model field name
* **options**: `array` Array of `{ value, content }` objects
* **itemClassName**: `string` Each `<input type="radio">` is wrapped in span. You can pass css class name for it
* **contentClassName**: `string` Each radio content is wrapped in span. You can pass css class name for it

### Submit
```js
const Submit = require('ornament-form-kit/submit');
```

Disabled if parent form is locked

## Form connect HOC
```js
const connect = require('ornament-form-kit/connect');
```

It is possible to write own controls and components. By wrapping component by `connect` form api is passed as extra prop.

### Example
```jsx
const connect = require('ornament-form-kit/connect');


const MyComponent = connect(({ form }) => {
  // ... do smth with form api
});
```

### Form api
* **locked**: `bool` Is form locked or not
* **model**: `object` Form model
* **errors**: `object` Errors object. Each key corresponds to model field and contains error messages that was passed to validation
* **updateField**: `function` Takes 2 params - field name and new value



## License

MIT © Abylay Keldibek
