import { Component, PropTypes } from 'react';
import { types } from '../utils';

class Validatable extends Component {
  static parentName = 'Validatable';
  static propTypes = {
    /**
     * [type description]
     * @type {[type]}
     *  text, number, url, email, password => float,int
     */
    type: PropTypes.oneOf(['text', 'number', 'url', 'password']),

    /**
     * [pattern description]
     * @type {[type]} for text, password is effect
     */
    pattern: PropTypes.instanceOf(RegExp),

    /**
     * [min description]
     * @type {[type]} for number is effect
     */
    min: PropTypes.number,

    /**
     * [max description]
     * @type {[type]} for number is effect
     */
    max: PropTypes.number,

    /**
     * [step description]
     * @type {[type]} for number is effect
     */
    step: PropTypes.number,
    required: PropTypes.bool,
    trigger: PropTypes.oneOf(['blur', 'change']),
    messages: PropTypes.object
  };

  static defaultProps = {
    type: 'text',
    step: 1,
    trigger: 'blur',
    messages: {
      required: '请输入该项',
      min: '不能小于{0}',
      max: '不能大于{0}',
      pattern: '格式不匹配',
      email: '必须为email格式',
      url: '必须为url格式'
    }
  };
  state = {
    error: ''
  }
  validate = (trigger) => {
    if (trigger && this.props.trigger !== trigger) {
      return false;
    }
    const fieldValue = this.fieldValue;
    const {
      type,
      pattern,
      max,
      min,
      step,
      required,
      messages
    } = this.props;
    const errors = [];
    if (!!required && !fieldValue) errors.push('required');
    if (this.mgUiName === 'Input') {
      switch (type) {
        case 'number':
          if (!fieldValue) break;
          if (!types.number(fieldValue)) errors.push('number');
          if (!isNaN(min) && fieldValue < min) errors.push('min');
          if (!isNaN(max) && fieldValue > max) errors.push('max');
          if (!isNaN(step) && (fieldValue % step)) errors.push('step');
          break;
        case 'email':
          if (!!fieldValue && !types.email(fieldValue)) errors.push('email');
          break;
        case 'url':
          if (!!fieldValue && !types.url(fieldValue)) errors.push('url');
          break;
        default:
          if (!!fieldValue && !!pattern && !fieldValue.match(pattern)) errors.push('pattern');
      }
    }
    this.setState({ error: messages[errors[0]] });
    return !errors.length;
  };
}
export default Validatable;
