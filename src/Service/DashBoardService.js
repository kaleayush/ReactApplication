import axios from "axios";
export const GetDashboardDetails = async () => {
  const URL = "https://localhost:44341/api/dashboard/getinfo";
  try {
    return await axios({
      method: "GET",
      url: URL,
    });
  } catch (error) {
    console.error(error);
  }
};
