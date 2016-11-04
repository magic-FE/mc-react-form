import React, { PropTypes } from 'react';
import Validatable from '../base';

class Input extends Validatable {
  static mgUiName = 'Input';

  mgUiName = 'Input';

  fieldValue = '';

  static propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onEnter: PropTypes.func,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    /**
     * [addonNodeBefore description]
     * @type {[node]}
     * 前置元素,在input之外
     */
    addonNodeBefore: PropTypes.node,
    addonNodeAfter: PropTypes.node,
    /**
     * [addonTextBefore description]
     * @type {[string]}
     * 在input之内
     *
     */
    addonTextBefore: PropTypes.string,
    addonTextAfter: PropTypes.string,

    $$joinForm: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { $$joinForm, defaultValue } = props;
    if (defaultValue) this.fieldValue = defaultValue;
    if ($$joinForm) $$joinForm(this);
  }

  getLegalProps = () => {
    const unKnowProps = ['onEnter', 'trigger', 'messages', '$$joinForm'];
    const legalProps = Object.assign({}, this.props);
    unKnowProps.forEach(prop => delete legalProps[prop]);
    return legalProps;
  };

  changeHandle = (event) => {
    const { onChange } = this.props;
    const valueFromEvent = event.target.value;
    this.fieldValue = valueFromEvent;
    this.validate('change');
    if (onChange) onChange(valueFromEvent, event);
  };

  blurHandle = (event) => {
    const { onBlur } = this.props;
    const valueFromEvent = event.target.value;
    this.validate();
    if (onBlur) onBlur(valueFromEvent, event);
  };

  keydownHandle = (event) => {
    const { onEnter } = this.props;
    const valueFromEvent = event.target.value;
    if (onEnter && event.keyCode === 13) onEnter(valueFromEvent, event);
  };

  render() {
    const {
      defaultValue,
      placeholder,
      value,
      ...otherProps
    } = this.getLegalProps();
    const { error } = this.state;
    return (
      <div className="input__container">
        <input
          type="text"
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onBlur={this.blurHandle}
          onChange={this.changeHandle}
          onKeyDown={this.keydownHandle}
          {...otherProps}
        />
        <div style={{ color: '#c40000' }}>{error}</div>
      </div>
    );
  }
}

export default Input;
