export const URL = "http://localhost:4000";
import Cookies from "js-cookie";

export const getSubCategory = async (callback: any) => {
  const token = await Cookies.get("token");
  if (token) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${URL}/sub-category`, requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
        if (result) return callback(result);
        return callback(null, "No data found");
      })
      .catch((error: any) => callback(error));
  }
};
export const getOneSubCategory = async (id: any, callback: any) => {
  const token = await Cookies.get("token");
  if (token) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${URL}/sub-category/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
        if (result) return callback(result);
        return callback(null, "No data found");
      })
      .catch((error: any) => callback(error));
  }
};
