import axios from "axios";
import { config, suppliersRoute } from "../config/config";

export const GetAllSuppliers = async () => {
  const URL = `${config.BASE_URL}${suppliersRoute.GetAllSupplier}`;
  try {
    return axios({
      url: URL,
      method: "GET",
    });
  } catch (error) {
    console.error(error);
  }
};
