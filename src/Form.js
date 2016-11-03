import React from 'react';
import Form, { FormItem } from '../components/form';
import Input from '../components/input';

class App extends React.Component {
  render() {
    const rules = {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
        ]
      }
      // const rulesForItem = [
      //   { required: true, message: '请输入姓名', trigger: 'change' }
      // ];
    return (
      <Form rules={rules}>
        <FormItem  name="name">
          <Input />
        </FormItem>
        <FormItem  name="email">
          <Input />
        </FormItem>
        <button>提交</button>
      </Form>
    );
  }
}
export default App;
