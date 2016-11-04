import React from 'react';
import Form from '../components/form';
import Input from '../components/input';

class App extends React.Component {
  onSubmit = (value, event) => {
    console.log(value);
    console.log(event);
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Input type="url" required placeholder="请输入地址" />
        <Input type="email" required placeholder="请输入邮箱" />
        <button>提交</button>
      </Form>
    );
  }
}
export default App;
