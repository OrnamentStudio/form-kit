# React Form Kit

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

## Example Usage

```jsx
import Form from 'ornament-form-kit/lib/form';
import Text from 'ornament-form-kit/lib/text';
import Select from 'ornament-form-kit/lib/select';


const App = () => (
  <Form
    defaultModel={personModel}
    validation={personValidation}
    onValidSubmit={handleValidSubmit}
  >
    <Text field="name" />
    <Select field="gender" options={genderOptions} />
  </Form>
);
```

## Components

### Form

```js
import Form from 'ornament-form-kit/lib/form';
```

- Main component. It stores model and updates it.
- Every control should be placed inside it.
- If form is locked then all children controls are locked.

Properties:
* **locked**: boolean; Locks form submit and model update
* **defaultModel**: object;
* **validation**: object; Validation rules, each key matches model field
  * **field key**: object; Rules description
    * **required**: bool;
    * **message**: string; Error message
    * **validate**: array; Array of functions that validate field. Each function takes 2 arguments - value, model
  * Example
   ```
    const validation = {
      name: {
        validate: [(value) => value.length > 5],
        message: 'wrong name format',
      },

      gender: {
        required: true,
        message: 'gender is required',
      },
    };
   ```
* **children**: function, node; If function is passsed then it takes form api as an argument. More about form api in ["form connect" section](#form-connect-hoc)
* **onSubmit**: function; Native form submit event. Takes native event as argument
* **onValidSubmit**: function; Called when validation was passed. Takes model as argument
* **onInvalidSubmit**: function;  Called when validation wasn't passed

### Text
```js
import Text from 'ornament-form-kit/lib/text';
```

Properties:
* **field**: string; Model field name
* **type**: string; Input "type" attribute

### Textarea
```js
import Textarea from 'ornament-form-kit/lib/textarea';
```

Properties:
* **field**: string; Model field name

### Select
```js
import Select from 'ornament-form-kit/lib/select';
```

Properties:
* **field**: string; Model field name
* **options**: array; Array of option objects. Each has value and content properties
  * **value**: any;
   * **content**: any;

### Checkbox
```js
import Checkbox from 'ornament-form-kit/lib/checkbox';
```

Properties:
* **field**: string; Model field name

### RadioGroup
```js
import RadioGroup from 'ornament-form-kit/lib/radio_group';
```

Properties:
* **field**: string; Model field name
* **options**: array; Array of option objects. Each has value and content properties
  * **value**: any;
   * **content**: any;
* **itemClassName**: string; Each `<input type="radio">` is wrapped in span. You can pass css class name for it
* **contentClassName**: string; Each radio content is wrapped in span. You can pass css class name for it

### Submit
```js
import Submit from 'ornament-form-kit/lib/submit';
```

Disabled if parent form is locked

## Form connect HOC
```js
import connect from 'ornament-form-kit/lib/form_connect';
```

It is possible to write own controls and components. By wrapping component by `form_connect` form api is passed as extra prop.

### Example
```jsx
import connect from 'ornament-form-kit/lib/form_connect';


const MyComponent = connect(({ form }) => {
  // ... do smth with form api
});
```

### Form api
* **locked**: bool; Is form locked or not
* **model**: object; Form model
* **errors**: object; Errors object. Each key corresponds to model field and contains error messages that was passed to validation
* **updateField**: function; Takes 2 params - field name and new value



## License

MIT © Abylay Keldibek
