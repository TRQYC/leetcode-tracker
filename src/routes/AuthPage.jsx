import { Button, Form, Input, message } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../shared/context/auth-context";
import useHttpClient from "../shared/hooks/http-hook";
const Auth = () => {


  const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };
  const navigate = useNavigate();
  auth.token && navigate("/dashboard");

  console.log("render Auth", auth)
  //isLoading && message.info("loading")
  if (error) {
    console.log("error is not empty", error)
    message.error(error)
    clearError()
  }

  const authSubmitHandler = async (values) => {
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "/api/users/login",
          "POST",
          JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        //todo
        auth.login(responseData.userId, responseData.token);
        console.log("response Data", responseData);
      } catch (err) {
        window.alert(error);
        console.log("err", err);
      }
    } else {
      try {
        const responseData = await sendRequest(
          "/api/users/signup",
          "POST",
          JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
        console.log("response Data", responseData);
      } catch (err) {
        window.alert(error);
        console.log("err", err);
      }
    }
  };
  return (
    <React.Fragment>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={authSubmitHandler}
      >
        {!isLoginMode && <Form.Item
          label="name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input nickname",
            },
          ]}
        >
          <Input placeholder="email" />
        </Form.Item>
        }
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input email",
            },
            // {
            //   type: "email",
            //   message: "The input is not valid E-mail!",
            // },
          ]}
        >
          <Input placeholder="email" />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          type="password"
          placeholder="Password"
          rules={[
            {
              required: true,
              message: "Please input password",
            },
          ]}
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
            {isLoginMode ? "Login" : "Signup"}
          </Button>
          Or{" "}
          <a onClick={switchModeHandler}>
            {isLoginMode ? "Signup" : "Login"} now!
          </a>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default Auth;
