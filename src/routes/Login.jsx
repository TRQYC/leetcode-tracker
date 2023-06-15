import { Button, Checkbox, Form, Input, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useContext, useEffect, useRef, useState } from "react";
const tagOptions = [
  {
    value: "Tree",
    label: "Tree",
  },
  {
    value: "Graph",
    label: "Graph",
  },
];

const masterLeveloptions = [
  {
    value: "-2",
    label: "-2",
  },
  {
    value: "-1",
    label: "-1",
  },
  {
    value: "0",
    label: "0",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
];

function LoginPage(props) {
  const [editing, setEditing] = useState(false);
  const [form] = useForm()
  const inputRef = useRef(null);
  console.log('render loginpage')
  message.info("你好")
  useEffect(() => {
    if (editing) {
      if (inputRef.current) {
        inputRef.current.focus();
      } else {
        console.log("shit, input Ref is null");
      }
    }
  }, [editing]);

  const toggleEdit = () => {
    console.log("toggleEdit, set Field value");
    setEditing(!editing);
  };

  const onBlur = () => {
    console.log("onBlur"); 
    setEditing(!editing)
    form.setFieldsValue({
        tags:["Tree","Double"]
    })
    console.log("get fields value", form.getFieldsValue())
    save();
  };

  const save = async () => {
    //const values = await form.validateFields();
    console.log("submit form");
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFieldsChange = (a, b) => {
    console.log("fields change", a);
  };
  return (
    <Form form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onFieldsChange={onFieldsChange}
    >
      <Form.Item
        label="username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input userName",
          },
        ]}
      >
        <Input placeholder="Username" onBlur={onBlur}/>
      </Form.Item>

      <Form.Item label="masterLevel" name="masterLevel">
        <Select options={masterLeveloptions} onBlur={onBlur}/>
      </Form.Item>
      <Form.Item label="tags" name="tags">
        <Select mode="tags" options={tagOptions} {...props} onBlur={onBlur}/>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
}

export default LoginPage;
