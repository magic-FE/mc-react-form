import React from 'react';
import Form from './components/Form';
import Input from './components/Input';

class App extends React.Component {

  onSubmit = (values, isValid, event) => {
    console.log(event);
    document.querySelector('#showBox').innerHTML = `获取的表单的值：${JSON.stringify(values)},<br /> 表单验证：${isValid ? '通过' : '未通过'}`;
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Input maxLength={10} name="a" onChange={this.onChange} minLength={5} trigger="change" placeholder="maxLength=10,minLength=5校验" />
        <Input defaultValue="11required失去焦点校验" name="b" required placeholder="required失去焦点校验" />
        <Input type="email" name="c" required placeholder="email校验" trigger="change" />
        <Input type="number" name="d" required max={15} min={9} step={3} placeholder="number,min=15,max=9,step=3校验" trigger="change" />
        <Input pattern={/^\d$/} name="e" required trigger="change" placeholder="pattern'/^\d$/'校验" />
        <button>提交</button>
        <div id="showBox" />
      </Form>
    );
  }

}
export default App;
