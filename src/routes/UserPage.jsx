
import { Button, Form, Input, Select, message } from "antd";
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../shared/context/auth-context';
import useHttpClient from '../shared/hooks/http-hook';
const siteOptions = [
    {
      value: "us",
      label: "us",
    },
    {
      value: "cn",
      label: "cn",
    },
];
  

const User = () => {
    const auth = useContext(AuthContext)
    //fix 如何解决第一次渲染这个组件时没登录的问题？刷新用户页面会报错这个
    console.log("render user, auth is", auth)
    const [user, setUser] = useState(null)
    const [form] = Form.useForm()
    const {error, sendRequest, clearError } = useHttpClient();
    const authHeaders  = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    useEffect(() => {
        sendRequest('/api/users/', 'GET', undefined, {Authorization: "Bearer " + auth.token}).then(
            data => setUser(data))}, [auth]);
    if (error) {
        message.error(error)
        clearError()
    }
    user && form.setFieldsValue(user) 
    const onFinish = (values) => {
        console.log(values)
        sendRequest('/api/users/'+auth.userId, 'PATCH', JSON.stringify(values), authHeaders).then(
            data => {setUser(data); message.info("update profile success")});
    }
 
     //保存用户默认打开的站点
    return (
        <React.Fragment>
        <Form 
          form={form}
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
        >
          <Form.Item
            label="email"
            name="email"
            tooltip={ {title:"if you want to edit email, please contact admins"}}
            rules={[
              {
                required: true,
                message: "Please input email",
              },
            ]}
          >
            <Input  disabled />
          </Form.Item>
          <Form.Item
            label="userId"
            name="userId"
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            label="leetcode site"
            name="site"
          >
            <Select options={siteOptions}/>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            
          </Form.Item>
        </Form>
      </React.Fragment>
    )
}
export default User; 