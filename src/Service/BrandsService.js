import axios from "axios";
import { config, BrandsRoute } from "../config/config";

export const GetAllBrands = async () => {
  const URL = `${config.BASE_URL}${BrandsRoute.GetAllBrands}`;
  try {
    return axios({
      method: "GET",
      url: URL,
    });
  } catch (error) {
    console.error(error);
  }
};
