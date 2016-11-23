/**
 * Form Component
 * propTypes: children  [node]
 *            onSubmit  [func]
 */
import React, { Component, PropTypes } from 'react';

class Form extends Component {
  static mgUiName = 'Form';

  static propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    onSubmit() {}
  };

  getFieldsValue = (name) => {
    const fields = this.fields;
    for (let i = 0, len = fields.length; i < len; i += 1) {
      if (fields[i].props.name === name) {
        return fields[i].state.value;
      }
    }
    return false;
  };

  fields = [];

  addFields = (field) => {
    this.fields.push(field);
  };

  validateEqualTo = (name) => {
    let equalToVal = false;
    const validFields = this.fields.filter((field) => {
      if (field.props.name === name) equalToVal = field.state.value;
      return name === field.props.equalTo;
    });
    validFields.forEach((validField) => {
      validField.singleValidateEqualTo(equalToVal);
    });
  };

  submitHandle = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    let isValid = true;
    const values = {};
    if (this.fields.length) {
      this.fields.forEach((field) => {
        const { $dirty, $valid } = field.someProps;
        if (!$dirty) {
          if (!field.validate()) isValid = false;
        } else if (!$valid) {
          isValid = false;
        }
        const { name } = field.props;
        const { value } = field.state;
        if (name) values[name] = value;
      });
    }
    if (onSubmit) onSubmit(values, isValid, event);
  };

  renderChildren = () => {
    const { children } = this.props;
    const equalTos = [];
    children.forEach((child) => {
      if (child.props.equalTo) {
        equalTos.push(child.props.equalTo);
      }
    });
    return React.Children.map(children, (child) => {
      if (child.type.isValidatable) {
        const props = {
          $$joinForm: this.addFields
        };
        if (child.props.equalTo) props.$$getFieldsValue = this.getFieldsValue;
        if (equalTos.some(equalTo => equalTo === child.props.name)) props.$$validateEqualTo = this.validateEqualTo; // eslint-disable-line max-len
        return React.cloneElement(child, props);
      }
      return child;
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

export default Form;
