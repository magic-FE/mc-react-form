import React from 'react';
import Form from '../components/form';
import Input from '../components/input';

class App extends React.Component {

  onSubmit = (values, isValid, event) => {
    document.querySelector('#showBox').innerHTML = '获取的表单的值：' + JSON.stringify(values) + ',<br /> 表单验证：' + (isValid ? '通过' : '未通过');
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Input maxLength={10} name="a" onChange={this.onChange} minLength={5} trigger="change" placeholder="maxLength,minLength校验" />
        <Input defaultValue="123123" name="b" required placeholder="required失去焦点校验" />
        <Input type="email" name="c" required placeholder="email校验" trigger="change" />
        <Input type="number" name="d" required max={15} min={9} step={3} placeholder="number,min,max,step=3校验" trigger="change" />
        <Input pattern={/^\d$/} name="e" required trigger="change" placeholder="pattern校验" />
        <button>提交</button>
        <div id="showBox" />
      </Form>
    );
  }
}
export default App;
