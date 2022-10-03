import { message } from "antd";
import moment from "moment";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getOneUser } from "../../APIs/usersApi";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/sidebar";

const getUser: NextPage = () => {
  const [data, setData]: any = useState([]);
  const router = useRouter();
  const { id }: any = router.query;

  useEffect(() => {
    getOneUser(id, (data: any, error: any) => {
      if (error) return message.error(error);
      if (data.data) setData(data.data);
    });
  }, [router]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="container">
        <div className="sub-container">
          <div className="content">
            <img src="/icons/admin col.png" alt="Logo" />
            <h1>
              Name : <span className="text-content">{data.name}</span>
            </h1>
            <h1>
              Email : <span className="text-content">{data.email}</span>
            </h1>
            <h1>
              Date :{" "}
              <span className="text-content">
                {moment(data.created_at).format("DD/MM/yyyy, hh:mm A")}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
// TODO: Edit

export default getUser;
