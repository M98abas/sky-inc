import { Button, Form, Image, Input, message, Modal, Spin, Table } from "antd";
import Cookies from "js-cookie";
import moment from "moment";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/sidebar";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GiReturnArrow } from "react-icons/gi";
import { URL } from "../../APIs/usersApi";
import Dragger from "antd/lib/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { getCategory } from "../../APIs/apiCategory";

const category: NextPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [image, setImage]: any = useState();
  const [loading, setLoading]: any = useState(false);
  const [data, setData]: any = useState([]);
  const router = useRouter();
  const getData = () => {
    getCategory((data: any, error: any) => {
      if (error) return message.error(error);
      setData(data.data);
    });
  };
  useEffect(() => {
    getData();
  }, [router]);
  console.log(data);

  const handelClickDelete = async (row: any) => {
    const token: any = await Cookies.get("token");
    console.log(row);

    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/category/delete/${row.id}`, requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
        console.log(result);

        message.success("The Item Delete was successfully");
        router.reload();
      })
      .catch((error: any) => message.error(error));
  };

  /**
   *
   * @param row
   */
  const handelClickActive = async (row: any) => {
    const token: any = await Cookies.get("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", token);
    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/category/activate/${row.id}`, requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
        message.success("The Item Delete was successfully");
        router.reload();
      })
      .catch((error: any) => message.error(error));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (data: any) => <Link href={`/admin/${data}`}>{data}</Link>,
    },
    {
      title: "Image",
      dataIndex: "imgUrl",
      render: (data: any) => (
        <Image className="img-shower" width={40} src={data} alt="Img" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (data: any) => <p>{data}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (data: any) => <p>{data}</p>,
    },
    {
      title: "",
      dataIndex: "createdAt",
      render: (data: any, row: any) => (
        <div className="btn-container">
          {row.active ? (
            <>
              <Button
                onClick={() => handelClickDelete(row)}
                type="primary"
                className="btn-action"
                danger
              >
                <AiFillDelete /> Delete
              </Button>
              {/* 
              <Button
                onClick={() => router.push(`/${row.id}`)}
                type="primary"
                className="btn-action"
              >
                <AiFillEdit /> Edit
              </Button> */}
            </>
          ) : (
            <>
              <Button
                className="btn-action"
                onClick={() => handelClickActive(row)}
                type="ghost"
              >
                <GiReturnArrow /> active
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  const onFinish = (values: any) => {
    setLoading(true);
    var formdata = new FormData();
    formdata.append("image", image, image.name);
    console.log(values);

    var requestOptions: any = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(
      `https://api.imgbb.com/1/upload?key=4ac981d247fede20868df9636b25e325`,
      requestOptions
    )
      .then((response) => response.json())
      .then(async (result) => {
        const imgUrl = result.data.url;
        const token: any = await Cookies.get("token");
        var myHeaders: any = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          ...values,
          imgUrl,
        });
        var requestOptions: any = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${URL}/category`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            message.success("category Is created successfully");
            setLoading(false);
            getData();
            handleCancel();
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  };

  /**
   *
   * @param errorInfo
   */
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const handleImageUpload = ({ fileList }: any) => {
    if (fileList[0]) {
      setImage(fileList[0].originFileObj);
    }
  };
  return (
    <>
      {data || loading ? (
        <>
          <Navbar />
          <Sidebar />
          <div className="container">
            <Modal
              title="add Category"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Dragger onChange={handleImageUpload}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </Dragger>

              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <p>Category Name</p>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input Category name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <p>Description</p>
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input description",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={false}
                    disabled={false}
                    type="primary"
                    htmlType="submit"
                  >
                    Add Cateogry
                  </Button>
                </Form.Item>
              </Form>
            </Modal>

            <div className="table-content">
              <div className="header">
                <h1>All Category</h1>
                <Button
                  onClick={showModal}
                  className="add-new-btn"
                  type="primary"
                >
                  Add New
                </Button>
              </div>
              <div className="table-container">
                <Table
                  scroll={{ x: "700px" }}
                  pagination={false}
                  size="small"
                  rowKey={(record: any) => record.id}
                  className="ta`ble"
                  columns={columns}
                  dataSource={data}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="spin-container">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

export default category;
