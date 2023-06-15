
import { useContext, useState } from 'react';
import AuthContext from '../shared/context/auth-context';
import { Button, Tooltip, Form, Input, Select } from "antd";
import React from 'react';
import { useEffect } from 'react';
import {message} from 'antd'
import useHttpClient from '../shared/hooks/http-hook';
import { useForm } from 'antd/es/form/Form';
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
  

const User = props => {
    const auth = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const [form] = Form.useForm()
    const {isLoading, error, sendRequest, clearError } = useHttpClient();
    const authHeaders  = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    useEffect(() => {
        sendRequest('/api/users/'+auth.userId, 'GET', undefined, {Authorization: "Bearer " + auth.token}).then(
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
            label="site"
            name="site"
            tooltip={ {title:"select leetcode site"}}
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