import React from 'react';
import Form from '../components/form';
import Input from '../components/input';

class App extends React.Component {
  onSubmit = (value, event) => {};
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Input required placeholder="required失去焦点校验" />
        <Input maxLength={10} minLength={5}  trigger="change"  placeholder="maxLength,minLength校验" />
        <Input type="email"  placeholder="email校验" trigger="change" />
        <Input type="number" max={15} min={9} step={3}  placeholder="number,min,max,step=3校验" trigger="change" />
        <Input pattern={/^\d$/} trigger="change" placeholder="pattern校验" />
        <button>提交</button>
      </Form>
    );
  }
}
export default App;
