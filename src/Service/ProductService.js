import axios from "axios";
import { config, productsRoute } from "../config/config";
const accessToken = JSON.parse(localStorage.getItem("token"));
export const GetAllProducts = async (
  Page_Start,
  Page_Size,
  sortDir,
  sortCol,
  key,
  value
) => {
  try {
    if (Page_Start > 0 && Page_Size > 0) {
      let url = "?Page_Start=" + Page_Start + "&Page_Size=" + Page_Size;
      if (sortDir !== null && sortCol !== null && sortCol != "") {
        url += "&Sort_Order=" + sortDir + "&Sort_Column=" + sortCol;
      } else if (key !== null && value !== null) {
        url += `&Filters=[{"key":"${key}","value":"${value}"}]`;
      }
      const response = await axios.get(
        `${config.BASE_URL}${productsRoute.GetAllProduct}` + url
      );
      return response;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const DeleteProduct = async (productNo) => {
  const data = [
    {
      productNo: productNo,
    },
  ];
  try {
    return await axios({
      method: "DELETE",
      url: `${config.BASE_URL}${productsRoute.Delete}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const AddAndUpdateProduct = async (values) => {
  debugger;
  const formData = new FormData();
  if (Number(values.ProductNo) > 0) {
    formData.append("ProductNo", parseInt(values.ProductNo));
  } else {
    formData.append("ProductNo", 0);
  }
  if (values.imageUrl !== "") {
    formData.append("ImageUrl", values.imageUrl);
  }
  formData.append("ProductName", values.ProductName);
  formData.append("BarCode", values.BarCode);
  formData.append("PurchasePrice", parseFloat(values.PurchasePrice));
  formData.append("SalesPrice", parseFloat(values.SalesPrice));
  formData.append("BrandId", parseInt(values.BrandId));
  formData.append("SupplierId", parseInt(values.SupplierId));
  if (values.File) {
    formData.append("File", values.File);
  } else {
    formData.append("File", null);
  }
  try {
    let newHeader = {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    };
    return axios({
      url: `${config.BASE_URL}${productsRoute.AddOrUpdate}`,
      method: "post",
      headers: newHeader,
      data: formData,
    });
  } catch (error) {
    console.log(error);
  }
};
export const GetProductById = async (productNo) => {
  try {
    let Header = {
      "Content-Type": "application/json",
      accept: "*/*",
    };
    return await axios({
      url: `${config.BASE_URL}${productsRoute.GetById}/${productNo}`,
      method: "GET",
      headers: Header,
    });
  } catch (error) {
    console.error(error);
  }
};
