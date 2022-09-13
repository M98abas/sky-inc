import "../styles/globals.scss";
import "antd/dist/antd.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const progress = new ProgressBar({
  size: 5,
  color: "#000",
  className: "progress-bar",
  delay: 1000,
});

Router.events.on("routeChangeStart",progress.start)
Router.events.on("routeChangeComplete",progress.finish)
Router.events.on("routeChangeError",progress.finish)

function MyApp({ Component, pageProps }: any) {
  useEffect(()=>{
    getAndSet()
  },[])
  const getAndSet = async()=>{
    // get token
    const token = await Cookies.get("token");
    if (!token && window.location.pathname !== "/login")
     window.location.href = "/login";
     else if (token && window.location.pathname == "/login")
     window.location.href = "/";
  };
  return <Component {...pageProps} />;
}

export default MyApp;
