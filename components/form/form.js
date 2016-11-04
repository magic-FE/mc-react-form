import React, { Component, PropTypes } from 'react';

class _Form extends Component {
  mgUiName = '_Form'; // eslint-disable-line

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
  submitHandle = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    let isValid = true;
    this.fields.forEach((field) => {
      if (!field.validate()) isValid = false;
    });
    if (onSubmit) onSubmit(isValid, event);
  };

  renderChildren = () => {
    const { children } = this.props;
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      if (child.type.parentName === 'Validatable') {
        return React.cloneElement(child, {
          $$joinForm: this.addFields
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

export default _Form;
