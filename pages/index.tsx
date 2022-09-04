import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";

const Home: NextPage = () => {
  return (
    <>
    <Navbar />
      <div className="main">
        <Sidebar />
        <div className="container">
          <div className="cards">
            <div className="card">
              <img src="./icons/home.png" alt="" className="icon" />
              <p className="title">Work</p>
            </div>
            <div className="card">
              <img src="./icons/home.png" alt="" className="icon" />
              <p className="title">Transaction</p>
            </div>
            <div className="card">
              <img src="./icons/home.png" alt="" className="icon" />
              <p className="title">Abour</p>
            </div>
            <div className="card">
              <img src="./icons/home.png" alt="" className="icon" />
              <p className="title">Users</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
