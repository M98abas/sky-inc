import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      {/* <div className="main"> */}
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
        {/* </div> */}
      </div>
    </>
  );
};

export default Home;
