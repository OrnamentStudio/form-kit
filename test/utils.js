const { assert } = require('chai');

const {
  isFilled,
  getValue,
  getErrors,
  hasErrors,
} = require('../utils');


describe('utils', () => {
  it('isFilled', () => {
    const truely = [
      ' ',
      'asd',
      { a: 2 },
      [1],
      true,
      0,
      1,
      -1,
    ];

    const falsely = [
      '',
      null,
      undefined,
      [],
      {},
      false,
    ];

    truely.forEach(value => assert.isTrue(isFilled(value), 'filled value'));
    falsely.forEach(value => assert.isFalse(isFilled(value), 'empty value'));
  });

  it('getValue', () => {
    const form = {
      model: {
        defined: 'defined',
        definedEmpty: undefined,
        definedNull: null,
      },
    };

    assert.equal(getValue(form, 'defined'), 'defined', 'get defined value');
    assert.equal(getValue(form, 'definedEmpty'), undefined, 'get undefined value');
    assert.equal(getValue(form, 'definedNull'), undefined, 'get null value');
    assert.equal(getValue(form, 'undefined'), '', 'empty string if no field');
    assert.equal(getValue(form, 'undefined', 0), 0, 'custom default value');
  });

  describe('getErrors', () => {
    it('required', () => {
      const model = {
        filled: 'Gury',
        empty: '',
      };

      const validation = {
        filled: {
          required: true,
          message: true,
        },
        empty: {
          required: true,
          message: true,
        },
      };

      assert.deepEqual(getErrors(model, validation), {
        empty: true,
      }, 'empty required fields');
    });

    it('validate', () => {
      const model = {
        filled: 'Labulaba',
        empty: '',
      };

      const validation = {
        filled: {
          validate: [
            value => value.length > 2,
            value => value.length < 5,
          ],
          message: true,
        },
        empty: {
          validate: [value => value.length === 0],
          message: true,
        },
      };

      assert.deepEqual(getErrors(model, validation), {
        filled: true,
      }, 'apply all validations');
    });

    it('validate empty', () => {
      const model = {
        empty: null,
      };

      const validation = {
        empty: {
          validate: [value => value.length > 2],
          message: true,
        },
      };

      assert.deepEqual(getErrors(model, validation), {}, 'do not throw error if valie is empty');
    });
  });

  it('hasErrors', () => {
    assert.isFalse(hasErrors(null), 'pass null');
    assert.isFalse(hasErrors({}), 'pass empty object');
    assert.isTrue(hasErrors({ a: true }), 'errors');
  });
});
