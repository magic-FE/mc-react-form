import React, { Component, PropTypes } from 'react';
import AsyncValidator from 'async-validator';

class _FormItem extends Component {
  mgUiName = '_FormItem'; // eslint-disable-line

  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    rules: PropTypes.array,
    trigger: PropTypes.oneOf(['blur', 'change']),
    $$joinForm: PropTypes.func,
    $$getFormRules: PropTypes.func
  };

  static defaultProps = {
    trigger: 'blur'
  };

  constructor(props) {
    super(props);
    const { $$joinForm } = props;
    if ($$joinForm) {
      $$joinForm(this);
    }
  }
  state = {
    isValidating: false,
    error: ''
  };

  setFieldValue = (v) => {
    this.setState({ error: '' });
    this.fieldValue = v;
  };

  getRules = () => {
    const { rules, name, $$getFormRules } = this.props;
    let formRules;
    if ($$getFormRules) {
      formRules = $$getFormRules(name);
    }
    return [].concat(rules || formRules || []);
  };

  validHandle = (triggerType = 'blur', cb) => {
    if (typeof triggerType === 'function') {
      cb = triggerType;
      triggerType = 'blur';
    }
    const $this = this;

    const { trigger, name } = $this.props;
    const descriptor = {};
    const data = {};
    if (trigger !== triggerType) return;

    const rules = $this.getRules();
    if (!rules || rules.length === 0) return;

    $this.setState({ isValidating: true });

    descriptor[name] = rules;
    const validator = new AsyncValidator(descriptor);
    data[name] = $this.fieldValue;
    validator.validate(data, { firstFields: true }, (errors) => {
      $this.setState({ error: errors ? errors[0].message : '' });
      if (cb && typeof cb === 'function') cb(errors);
      $this.setState({ validating: false });
    });
  };

  renderChildren = () => {
    const { children } = this.props;
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      const formComponentNames = ['_Input'];
      if (formComponentNames.indexOf(child.type.mgUiName) !== -1) {
        return React.cloneElement(child, {
          $$sendValueToParent: this.setFieldValue,
          $$validHandle: this.validHandle
        });
      }
      return React.cloneElement(child);
    });
  };

  render() {
    const children = this.renderChildren();
    const { error } = this.state;
    return (
      <div>
        {children}
        <span style={{ color: '#c40000' }}>{error}</span>
      </div>
    );
  }
}

export default _FormItem;
