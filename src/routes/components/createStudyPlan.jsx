import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, message } from 'antd';
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../shared/context/auth-context';
import useHttpClient from '../../shared/hooks/http-hook';
const { Option } = Select;
const CreateStudyPlan = () => {
  const [open, setOpen] = useState(false);
  const auth = useContext(AuthContext);
  const [form] = Form.useForm();
  const {error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + auth.token,
  };
  if (error) {
    console.log("error is ", error)
    message.error(error);
    clearError();
  }
  const showDrawer = () => {
    setOpen(true);
  };

  const handleSubmitStudyPlan = (values) => {
    sendRequest('/api/studyplan', "POST", JSON.stringify(values), authHeaders).then((response) => {message.info("create success"); navigate(`/studyplan/${response.id}`)}).catch(err => console.log(err))
  }
  
  const onClose = () => {
   setOpen(false)
  };
 
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New Study Plan
      </Button>
      <Drawer
        title="Create a new study plan"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => {form.submit()}} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} hideRequiredMark onFinish={handleSubmitStudyPlan} initialValues={
         { visibility: "public"} 
        }>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="visibility"
                label="Visibility"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the visibility',
                  },
                ]}
              >
                <Select placeholder="Please choose the visibility">
                 <Option value="public">Public</Option>
                  <Option value="private">Private</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
              >
                <Input.TextArea rows={2} placeholder="please enter description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>

          </Row>
          <Form.List name="patterns">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key = {key} gutter={16}>
                    <Col span={6}>
                    <Form.Item
                      {...restField}
                      label="Pattern Name"
                      name={[name, "name"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing pattern name"
                        }
                      ]}
                    >
                      <Input placeholder="Trees" />
                    </Form.Item>
                    </Col>
                    <Col span={16}>
                    <Form.Item
                      {...restField}
                      label="QuestionID List"
                      name={[name, "questionIds"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing QuestionIds"
                        }
                      ]}
                    >
                      <Input placeholder="1,2,3,4" />
                    </Form.Item>
                    </Col>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                    </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add a pattern
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Drawer>
    </>
  );
};
export default CreateStudyPlan;
