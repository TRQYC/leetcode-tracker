
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

const SyncPracticePage = () => {
    console.log("render component")
    const auth = useContext(AuthContext)
    //fix 如何解决第一次渲染这个组件时没登录的问题？刷新用户页面会报错这个
    const [user, setUser] = useState(null)
    const [form] = Form.useForm()
    const {error, sendRequest, clearError } = useHttpClient();
    const authHeaders = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
    }
    if (error) {
        console.log("find error", error)
        message.error(error)
        clearError()
    }
    useEffect(() => {
        sendRequest('/api/users/', 'GET', undefined, { Authorization: "Bearer " + auth.token }).then(
            data => setUser(data))
    }, [auth]);
    user && user.syncConfig && form.setFieldsValue({
        site: user.syncConfig.site,
        leetSession: user.syncConfig.leetSession
    })
    const handleSync = (values) => {
        console.log("handle sync")
        sendRequest('/api/practice/sync', 'POST', JSON.stringify({
            config: values
        }), authHeaders).then(response => {
            console.log("hanlde response", response)
            if (response.code == 1) {
                console.log("code is 1")
                message.error("leetcode session or site not found")
            }else {
                message.info("sync success")
            }
        }).catch((err) => {console.log(err)})
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
                    onFinish={handleSync}
                >
                    <Form.Item
                        label="leetcode site"
                        name="site"
                    >
                        <Select options={siteOptions} />
                    </Form.Item>
                    <Form.Item
                        label="leetcode session"
                        name="leetSession"
                        tooltip="refer to tutorial  to find your session value"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sync Leetcode Practices
                        </Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        )
    }


    export default SyncPracticePage