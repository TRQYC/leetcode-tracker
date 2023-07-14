/* eslint-disable react/prop-types */
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Spin, message } from 'antd';
import React, { useContext } from 'react';
import AuthContext from '../../shared/context/auth-context';
import useHttpClient from '../../shared/hooks/http-hook';
const { Option } = Select;
const CreateStudyPlan = ({ open, setOpen, plan }) => {
  const auth = useContext(AuthContext);
  const [form] = Form.useForm();
  //每次进来都需要更新表单值
  //todo 有个BUG，点击更新后会表单会展示旧的plan
  let initialPlan = plan || { visibility: "public" }
  form.setFieldsValue(initialPlan)
  const { error, sendRequest, clearError, isLoading } = useHttpClient();
  //const navigate = useNavigate();
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + auth.token,
  };

  if (error) {
    console.log("error is ", error)
    message.error(error);
    clearError();
  }
  const handleSubmitStudyPlan = (values) => {
    const createMode = plan && plan.id
    if (createMode) {
      values.id = plan.id
    }

    const patternsCopy = values.patterns.map(pattern => { return { ...pattern, questionIds: pattern.questionIds.split(',') } })
    console.log("submit", patternsCopy)
    sendRequest('/api/studyplan', "POST", JSON.stringify({ ...values, patterns: patternsCopy }), authHeaders).then(() => { message.info("save success"); setOpen(false); window.location.reload(); }).catch(err => console.log(err))
  }

  console.log("render create plan  ", initialPlan)
  return (
    <>
      <Drawer
        title="study plan"
        width={720}
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Spin spinning={isLoading}>
              <Button onClick={() => { form.submit() }} type="primary">
                {plan ? "Save" : "Create"}
              </Button>
            </Spin>
          </Space>
        }
      >
        <Form layout="vertical" form={form} hideRequiredMark onFinish={handleSubmitStudyPlan}>
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
                  <Row key={key} gutter={16}>
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
