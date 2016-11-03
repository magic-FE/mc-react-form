import React from 'react';
import Form, { FormItem } from '../components/form';
import Input from '../components/input';

class App extends React.Component {
  render() {
    const rules = {
      name: [
        { required: true, message: '请输入姓名', trigger: 'change' }
      ]
    }
    const rulesForItem = [
      { required: true, message: '请输入姓名', trigger: 'change' }
    ];
    return (
      <Form rules={rules}> 
	      <FormItem rules={rulesForItem} name="name">
	        <Input />
	      </FormItem>
      	<button>提交</button>
      </Form>
    );
  }
}
export default App;
