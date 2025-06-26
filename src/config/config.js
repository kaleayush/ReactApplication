import { ChangePassword } from "../Service/AuthService";

const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECTID),
  appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTIONID),
  appwriteDataBaseID: String(import.meta.env.VITE_APPWRITE_DATABASEID),
  appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKETID),
  microsoftClientID: String(import.meta.env.VITE_MICROSOFTCLIENT_ID),
  microsoftAuthority: String(import.meta.env.VITE_MICROSOFTAUTHORITY),
  BASE_URL: String(import.meta.env.VITE_WEB_API_BASE_URL),
};
const authRoute = {
  Login: "/auth/login",
  ChangePassword: "/auth/change_password",
};
const dashboardRoute = {
  Dashboard: "/dashboard",
};
const productsRoute = {
  GetAllProduct: "/product/getall",
  GetById: "/product/getbyid",
  AddOrUpdate: "/product/addorupdate",
  Delete: "/product/delete",
};
const suppliersRoute = {
  GetAllSupplier: "/suppliers/getall",
  GetById: "/suppliers/getbyid",
  AddOrUpdate: "/suppliers/addorupdate",
  Delete: "/suppliers/delete",
};
const BrandsRoute = {
  GetAllBrands: "/brands/getall",
};
export {
  config,
  authRoute,
  dashboardRoute,
  productsRoute,
  suppliersRoute,
  BrandsRoute,
};
