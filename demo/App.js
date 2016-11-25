import React from 'react';
import { Form, Input } from '../components';
import Counter from '../components/Counter';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [1]
    };
  }
  onSubmit = (values, isValid, event) => {
    document.querySelector('#showBox').innerHTML = `获取的表单的值：${JSON.stringify(values)},<br /> 表单验证：${isValid ? '通过' : '未通过'}`;
  };
  addHandle = () => {
    const { keys } = this.state;
    this.setState({ keys: keys.concat(keys[keys.length - 1] + 1) });
  }
  render() {
    const { keys } = this.state;
    const formItems = keys.map(k =>
      <Input
        name={`a-${k}`}
        key={k}
        maxLength={10}
        focusReset
        minLength={5}
        trigger="change"
        placeholder="maxLength=10,minLength=5校验"
      />
    );
    return (
      <div>
        <Counter />
        <Form onSubmit={this.onSubmit}>
          <Input
            name="a"
            maxLength={10}
            focusReset
            minLength={5}
            trigger="change"
            placeholder="maxLength=10,minLength=5校验"
          />
          <Input defaultValue="required失去焦点校验" name="b" required placeholder="required失去焦点校验" />
          <Input type="email" name="c" required placeholder="email校验" trigger="change" />
          <Input type="number" name="d" required max={15} min={9} step={3} placeholder="number,min=15,max=9,step=3校验" trigger="change" />
          <Input pattern={/^\d$/} name="e" required trigger="change" placeholder="pattern'/^\d$/'校验" />
          <Input name="f" equalTo="c" placeholder="equalTo校验" />
          <button>提交1111</button>
          <div id="showBox" />
        </Form>
      </div>
    );
  }
}
export default App;
