import React, { Component, PropTypes } from 'react';

class XInput extends Component {
  static uiName = 'XInput';
  static propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onEnter: PropTypes.func,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.oneOf(['text', 'number', 'email', 'password']),
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
    $$sendValueToParent: PropTypes.func,
    $$validHandle: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { $$sendValueToParent, defaultValue } = props;
    if ($$sendValueToParent && !!defaultValue) {
      $$sendValueToParent(defaultValue);
    }
  }

  getLegalProps = () => {
    const unKnowProps = ['$$sendValueToParent', '$$validHandle', 'onEnter'];
    const legalProps = Object.assign({}, this.props);
    unKnowProps.forEach(prop => delete legalProps[prop]);
    return legalProps;
  };

  changeHandle = (event) => {
    const { onChange, $$sendValueToParent, $$validHandle } = this.props;
    const valueFromEvent = event.target.value;
    if ($$sendValueToParent) $$sendValueToParent(valueFromEvent);
    if ($$validHandle) $$validHandle('change');
    if (onChange) onChange(valueFromEvent, event);
  };

  blurHandle = (event) => {
    const { onBlur, $$validHandle } = this.props;
    const valueFromEvent = event.target.value;
    if ($$validHandle) $$validHandle('blur');
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
      </div>
    );
  }
}

export default XInput;
