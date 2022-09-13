import { Button, Form, Input, message } from "antd";
import Image from "next/image";
import { ApiSignUp } from "../APIs/apiSignIn";
import { useRouter } from "next/router";

const login = () => {
  const Router = useRouter();
  const onFinish = (data: any) => {
    ApiSignUp(data, (data: any, error: any) => {
      if (error) {
        console.log(error);
        return message.error("Invalid credential");
      }
      message.success("Welcome In MY role !!!");
      Router.push("/login");
    });
  };
  const onFinishFailed = () => {
    console.log("onFinishFailed");
  };
  return (
    <div className="container login-container">
      <Form
        className="right-side"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 25 }}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="User Name"
          name="name"
          rules={[{ required: true, message: "example@something.com" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "example@something.com" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="btn-container">
          <Button
            loading={false}
            disabled={false}
            size="middle"
            className="submit-btn"
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>{" "}
          <Button
            loading={false}
            disabled={false}
            size="middle"
            className="submit-btn"
            type="primary"
            onClick={() => Router.push("/login")}
          >
           login{" "}
          </Button>
        </Form.Item>
      </Form>
      <div className="strip">
        <div className="icon">
          <Image src="/login/user_icon.png" width="60" height="60" alt="User" />
        </div>
        <h1>Hello there</h1>
      </div>
    </div>
  );
};

export default login;
