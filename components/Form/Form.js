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

  fields = [];

  addFields = (field) => {
    this.fields.push(field);
  };

  submitHandle = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    let isValid = true;
    const values = {};
    this.fields.forEach((field) => {
      if (!field.validate()) isValid = false;
      const { name } = field.props;
      const { value } = field.state;
      if (name) values[name] = value;
    });

    if (onSubmit) onSubmit(values, isValid, event);
  };

  renderChildren = () => {
    const { children } = this.props;
    return React.Children.map(children, (child) => {
      if (child.type.isValidatable) {
        return React.cloneElement(child, {
          $$joinForm: this.addFields
        });
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
