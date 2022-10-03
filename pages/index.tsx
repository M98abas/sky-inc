import type { NextPage } from "next";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import useTitleStore from "../state";

const Home: NextPage = () => {
  // const [data, setData]: any = useState();
  // setData(() =>useTitleStore("ar"))
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="container">
        <div className="cards">
          <div className="card">
            <p className="percentage">0%</p>
            <p className="title">Items</p>
          </div>
          <div className="card">
            <p className="percentage">0%</p>

            <p className="title">Users</p>
          </div>
          <div className="card">
            <p className="percentage">0%</p>

            <p className="title">Admin</p>
          </div>
          <div className="card">
            <p className="percentage">0%</p>

            <p className="title">Number of usage</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
