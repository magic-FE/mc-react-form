import React, { Component, PropTypes } from 'react';

class XInput extends Component {

  static uiName = 'XInput';

  static propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    defaultValue: PropTypes.string,
    // 下面是私有属性, 被form-item 校验时使用的
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

  render() {
    const { defaultValue } = this.props;
    return (
      <div className="input__container">
        <input type="text" defaultValue={defaultValue} onBlur={this.blurHandle} onChange={this.changeHandle} />
      </div>
    );
  }
}

export default XInput;
