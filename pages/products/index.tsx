import { Button, message, Table } from "antd";
import Cookies from "js-cookie";
import moment from "moment";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/sidebar";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GiReturnArrow } from "react-icons/gi";
import { getProduct } from "../../APIs/productsApi";
import { URL } from "../../APIs/usersApi";

const products: NextPage = () => {
  const [data, setData]: any = useState([]);
  const router = useRouter();
  useEffect(() => {
    getProduct((data: any, error: any) => {
      if (error) return message.error(error);
      setData(data.data);
    });
  }, [router]);
  console.log(data);

  const handelClickDelete = async (row: any) => {
    const token: any = await Cookies.get("token");
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/super/delete/${row.id}`, requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
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

    fetch(`${URL}/super/active/${row.id}`, requestOptions)
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
      title: "Name",
      dataIndex: "name",
      render: (data: any) => <p>{data}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (data: any) => <p>{data}</p>,
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: (data: any) => moment(data).format("DD/MM/yyyy, hh:mm A"),
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

              <Button
                onClick={() => router.push(`/${row.id}`)}
                type="primary"
                className="btn-action"
              >
                <AiFillEdit /> Edit
              </Button>
            </>
          ) : (
            <Button
              className="btn-action"
              onClick={() => handelClickActive(row)}
              type="ghost"
            >
              <GiReturnArrow /> active
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="container">
        <div className="table-content">
          <div className="header">
            <h1>All produect</h1>
          </div>
          <div className="table-container">
            <Table
              scroll={{ x: "700px" }}
              pagination={false}
              size="small"
              rowKey={(record: any) => record.id}
              className="table"
              columns={columns}
              dataSource={data}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default products;
