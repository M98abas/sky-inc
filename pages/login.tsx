import { Button, Form, Input, message } from "antd";
import Image from "next/image";
import { ApiLogin } from "../api";
import Cookies from "js-cookie"
import { useRouter } from "next/router";

const login = () => {

  const Router = useRouter();
  const onFinish = (data: any) => {
    ApiLogin(data,(data:any,error:any)=>{
      if (error) return message.error("Invalid credential");
      Cookies.set("token",data.token);
    Router.push("/")
    })
  };
  const onFinishFailed = () => {
    console.log("onFinishFailed");
  };
  return (
    <div className="container login-container">
      <div className="strip">
        <div className="icon">
          <Image src="/login/user_icon.png" width="60" height="60" alt="User" />
        </div>
        <h1>Hello there</h1>
      </div>
      <Form
        className="right-side"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 25 }}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
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
            Login
          </Button>{" "}
          <Button
            loading={false}
            disabled={false}
            size="middle"
            className="submit-btn"
            type="primary"
            onClick={()=> Router.push('/sign-up')}
          >
            Sign Up{" "}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default login;
