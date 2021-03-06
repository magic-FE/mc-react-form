import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, { PropTypes, Component } from 'react';
import { types, formatMessage } from '../helpers/utils';

const propTypes = {
  /**
   * [type description]
   * @type {[type]}
   *  text, number, url, email, password => float,int
   */
  type: PropTypes.oneOf(['text', 'number', 'url', 'password', 'email']),

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
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  required: PropTypes.bool,
  trigger: PropTypes.oneOf(['blur', 'change']),
  messages: PropTypes.object,

  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onEnter: PropTypes.func,
  defaultValue: PropTypes.string,
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
/* eslint-disable no-console */
class Input extends Component {
  static mgUiName = 'Input';
  static isValidatable = true;
  static propTypes = propTypes;

  static defaultProps = {
    type: 'text',
    step: 1,
    trigger: 'blur',
    defaultValue: '',
    messages: {
      number: '请输入数字',
      required: '请输入该项',
      min: '不能小于{0}',
      max: '不能大于{0}',
      pattern: '格式不匹配',
      email: '必须为email格式',
      url: '必须为url格式',
      minLength: '至少为{0}个字符,当前输入了{1}个字符',
      step: '必须为合法数字,{0}的倍数'
    }
  };

  constructor(props) {
    super(props);
    const { $$joinForm } = props;
    this.state = {
      error: '',
      value: ''
    };
    if ($$joinForm) $$joinForm(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentWillMount() {
    const { defaultValue } = this.props;
    this.setState({ value: defaultValue });
  }
  getOtherProps = () => {
    const unKnowProps = Object.keys(propTypes);
    const legalProps = Object.assign({}, this.props);
    unKnowProps.forEach(prop => delete legalProps[prop]);
    return legalProps;
  };

  changeHandle = (event) => {
    const { onChange, maxLength, type } = this.props;
    const valueFromEvent = event.target.value;
    let valueFormat = valueFromEvent;
    if (type !== 'number') {
      valueFormat = valueFromEvent.substring(0, maxLength);
    }
    if (type === 'number' && isNaN(valueFormat)) return;
    this.setState({ value: valueFormat }, () => {
      this.validate('change');
    });
    if (onChange) onChange(valueFormat, event);
  };

  blurHandle = (event) => {
    const { onBlur } = this.props;
    const valueFromEvent = event.target.value;
    this.validate('blur');
    if (onBlur) onBlur(valueFromEvent, event);
  };

  keydownHandle = (event) => {
    const { onEnter } = this.props;
    const valueFromEvent = event.target.value;
    if (onEnter && event.keyCode === 13) onEnter(valueFromEvent, event);
  };

  validate = (trigger) => {
    if (trigger && this.props.trigger !== trigger) {
      return false;
    }
    const { value } = this.state;
    const {
      type,
      pattern,
      max,
      min,
      minLength,
      step,
      required,
      messages
    } = this.props;
    const errors = [];
    if (!!required && !value) errors.push('required');
    if (value) {
      if (!!minLength && value.length < minLength && type !== 'number') errors.push('minLength');
      switch (type) {
        case 'number':
          if (!types.number(value)) errors.push('number');
          if (!isNaN(min) && value < min) errors.push('min');
          if (!isNaN(max) && value > max) errors.push('max');
          if (!isNaN(step) && (value % step)) errors.push('step');
          break;
        case 'email':
          if (!types.email(value)) errors.push('email');
          break;
        case 'url':
          if (!types.url(value)) errors.push('url');
          break;
        default:
          if (!!pattern && !value.match(pattern)) errors.push('pattern');
      }
    }
    let message = '';
    const error = errors[0];
    if (error) {
      /* eslint-disable no-duplicate-case */
      switch (error) {
        case 'min':
        case 'max':
        case 'max':
        case 'step':
          message = formatMessage(messages[error], this.props[error]);
          break;
        case 'minLength':
          message = formatMessage(messages[error], minLength, value.length);
          break;
        default:
          message = messages[error];
      }
    }
    this.setState({ error: message });
    return !errors.length;
  };
  render() {
    console.log('render');
    const { error, value } = this.state;
    return (
      <div className="input__container">
        <input
          {...this.getOtherProps()}
          type="text"
          value={value}
          onBlur={this.blurHandle}
          onChange={this.changeHandle}
          onKeyDown={this.keydownHandle}
        />
        <div style={{ color: '#c40000' }}>{error}</div>
      </div>
    );
  }
}

export default Input;
