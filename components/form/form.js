import React, { Component, PropTypes } from 'react';

class EleReactForm extends Component {
  static displayName = 'EleReactForm';
  static propTypes = {
    children: PropTypes.node,
    rules: PropTypes.object, 
    onSubmit: PropTypes.func
  };

  getRules = name => this.props.rules[name];

  fields = [];

  addFields = (field) => {
    this.fields.push(field);
  };

  validHandle = (cb) => {
    let valid = true;
    const $this = this;
    const fieldsLength = $this.fields;
    $this.fields.forEach((field, index) => {
      field.validHandle((errors) => {
        if (errors && errors) valid = false;
        if (index === fieldsLength - 1) {
          cb(valid)
        }
      })
    })
  };

  submitHandle = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    this.validHandle((valid) => {
      onSubmit(valid, event)
    })
  };

  renderChildren = () => {
    const { children } = this.props;
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return React.cloneElement(child);
      }
      if (child.type.displayName === 'EleReactFormItem') {
        return React.cloneElement(child, {
          $$joinForm: this.addFields,
          $$getFormRules: this.getRules
        });
      }
      return React.cloneElement(child);
    });
  };

  render() {
    const children = this.renderChildren();
    return (
      <form noValidate onSubmit={this.submitHandle}>
        {children}
      </form>
    );
  }
}

export default EleReactForm;
