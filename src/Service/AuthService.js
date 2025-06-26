import Axios from "axios";
import { config, authRoute } from "../config/config";
const accessToken = JSON.parse(localStorage.getItem("token"));
console.log(accessToken);
export const AuthLogin = async (data) => {
  const API = ` ${config.BASE_URL}${authRoute.Login}`;
  const body = JSON.stringify(data);
  const result = await Axios.post(API, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return result.data;
};
export const ChangePassword = async (data) => {
  const URL = `${config.BASE_URL}${authRoute.ChangePassword}`;

  const body = JSON.stringify(data);
  try {
    return await Axios.post(URL, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e.message, "Error");
    throw e;
  }
};
export const AuthMicrosoft = async (data) => {
  const URL = `${config.BASE_URL}/Auth/AuthMicrosoft`;
  const body = JSON.stringify(data);
  try {
    return axios({
      url: URL,
      body: body,
      method: "POST",
    });
  } catch (e) {
    console.log(e.message, "Error");
  }
};
export const Signup = async (data) => {
  const URL = `${config.BASE_URL}/Auth/Signup`;
  debugger;
  console.log(data, "data");
  const formData = new FormData();
  formData.append("FirstName", data.FirstName);
  formData.append("LastName", data.LastName);
  formData.append("Email", data.Email);
  formData.append("Password", data.Password);
  if (data.File) {
    formData.append("File", data.File);
  } else {
    formData.append("File", null);
  }
  try {
    let newHeader = {
      "Content-Type": "multipart/form-data",
    };
    return await Axios({
      url: URL,
      method: "POST",
      headers: newHeader,
      data: formData,
    });
  } catch (error) {
    console.log(error);
  }
};
export const GetUserInformation = async () => {
  const URL = `${config.BASE_URL}/Auth/GetUserData`;
  console.log(accessToken, "accessToken");
  try {
    return await Axios.get(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  } catch (error) {}
};
export const ResetPassword = async (data) => {
  const body = JSON.stringify(data);
  const URL = `${config.BASE_URL}/Auth/ResetPassword`;
  try {
    return await Axios.post(URL, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e.message, "Error");
    throw e;
  }
};
