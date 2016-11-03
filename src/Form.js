import React from 'react';
import Form, { FormItem } from '../components/form';
import Input from '../components/input';

class App extends React.Component {
  onEnterHandle = (value, event) => {
    // console.log(event);
  };
  render() {
    const rules = {
      name: [
        { required: true, message: '请输入姓名' }
      ],
      email: [
        { required: true, message: '邮箱不能为空' },
        { type: 'email', message: '邮箱格式不正确' }
      ]
    };
    return (
      <Form rules={rules}>
        <FormItem name="name">
          <Input
            placeholder="请输入姓名"
            onEnter={this.onEnterHandle}
          />
        </FormItem>
        <FormItem name="email">
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <button>提交</button>
      </Form>
    );
  }
}
export default App;
