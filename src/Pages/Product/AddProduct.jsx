import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  AddAndUpdateProduct,
  GetProductById,
} from "../../Service/ProductService";
import { GetAllBrands } from "../../Service/BrandsService";
import { GetAllSuppliers } from "../../Service/SupplierService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Container } from "../../Components";
function AddProduct() {
  const { productsdata, totalRows } = useSelector((state) => state?.product);
  const productNo = useParams();
  const navigate = useNavigate();
  const [ProductNo, setProductNo] = useState(Number(productNo.productNo));
  const [Brands, setBrands] = useState([]);
  const [error, setError] = useState([]);
  const [Suppliers, setSuppliers] = useState([]);
  const [BarCode, setBarCode] = useState("");
  const [BrandId, setBrandId] = useState("");
  const [SupplierId, setSupplierId] = useState("");
  const [PurchasePrice, setPurchasePrice] = useState("");
  const [ProductName, setProductName] = useState("");
  const [SalesPrice, setSalesPrice] = useState("");
  const [File, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preViewImage, setPreViewImage] = useState("");

  const initialValues = {
    BarCode: BarCode,
    ProductName: ProductName,
    PurchasePrice: PurchasePrice,
    SalesPrice: SalesPrice,
    BrandId: BrandId,
    SupplierId: SupplierId,
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
  };
  const handleSubmit = async (value) => {
    console.log(value, "Submit");
    const values = {
      ProductNo: ProductNo,
      BarCode: value.BarCode,
      BrandId: value.BrandId,
      SupplierId: value.SupplierId,
      PurchasePrice: value.PurchasePrice,
      ProductName: value.ProductName,
      SalesPrice: value.SalesPrice,
      File: value.File,
      imageUrl,
    };
    console.log(values, "add Prdoucts detail");
    await AddAndUpdateProduct(values).then((res) => {
      if (res.status === 200) console.log(res.data);
      navigate("/products");
    });
  };
  useEffect(() => {
    if (Number(productNo.productNo) > 0) {
      setLoading(true);
      GetProductById(Number(productNo.productNo))
        .then((response) => {
          console.log(response.data[0].supplierId,"supplierid");
          setProductName(response.data[0].productName);
          setBarCode(response.data[0].barCode);
          setBrandId(response.data[0].brandId);
          setImageUrl(response.data[0].imageUrl);
          setPurchasePrice(response.data[0].purchasePrice);
          setSalesPrice(response.data[0].salesPrice);
          setSupplierId(response.data[0].supplierId);
          setSuppliers(response.data[0].supplier);
          setLoading(false);
        })
        .catch((error) => setError(error));
    }
    GetAllBrands()
      .then((res) => {
        if (res) {
          setBrands(res.data);
        }
      })
      .catch((err) => {
        setError(err);
      });
    GetAllSuppliers()
      .then((res) => {
        if (res) {
          setSuppliers(res.data);
        }
      })
      .catch((error) => setError(error));
  }, []);
  const validationSchema = Yup.object().shape({
    ProductName: Yup.string()
      .required(`ProductName is Required`)
      .strict(true)
      .min(2, "Too Short!")
      .max(20, "Too Long!"),

    BarCode: Yup.string().required("BarCode is Required"),
    SalesPrice: Yup.string().required("SalesPrice is Required"),
    PurchasePrice: Yup.string().required("PurchasePrice is Required"),
  });

  return (
    <Container>
     <div className="border border-gray-200">
      <div className="h-16 bg-gray-100 items-center shadow-sm">
        <h1 className="ml-6 pt-5 text-xl font-medium">
          {productNo.productNo > 0 ? "Edit Product" : "Add Product"}
        </h1>
      </div>
      <div className="h-full pt-3 border-gray-300 border-solid">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="max-w-full mx-5 my-5 ">
            {/* First row */}
            <div className="flex flex-wrap -mx-2.5 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  ProductName
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="ProductName"
                  onChange={(e) => setProductName(e.target.value)}
                  value={ProductName}
                  placeholder="Enter Product Name"
                />
                <ErrorMessage
                  name="ProductName"
                  component="div"
                  className="text-red-700"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  BarCode
                </label>
                <Field
                  value={BarCode}
                  type="text"
                  name="BarCode"
                  onChange={(e) => setBarCode(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter BarCode"
                />
                <ErrorMessage
                  name="BarCode"
                  component="div"
                  className="text-red-700"
                />
              </div>
            </div>
            {/* second row */}
            <div className="flex flex-wrap -mx-2.5 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  SalesPrice
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  name="SalesPrice"
                  onChange={(e) => setSalesPrice(e.target.value)}
                  value={SalesPrice}
                  placeholder="Enter Sales Price"
                />
                <ErrorMessage
                  name="SalesPrice"
                  className="text-red-700"
                  component="div"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  PurchasePrice
                </label>
                <Field
                  value={PurchasePrice}
                  type="number"
                  name="PurchasePrice"
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Purchase Price"
                />
                <ErrorMessage
                  name="PurchasePrice"
                  component="div"
                  className="text-red-700"
                />
              </div>
            </div>
            {/* third row
            <div className="flex flex-wrap -mx-2.5 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  CreatedBy
                </label>
                <Field
                  type="text"
                  name="CreateBy"
                  value={CreateBy}
                  placeholder="Enter Created-By"
                  onChange={(e) => setCreateBy(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage
                  name="CreateBy"
                  component="div"
                  className="text-red-700"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  CreatedOn
                </label>
                <Field
                  type="date"
                  name="CreatedOn"
                  value={formatDate(CreatedOn)}
                  // value={moment(CreatedOn).format("dd/MM/yyyy")}
                  onChange={(e) => setCreatedOn(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage
                  name="CreatedOn"
                  component="div"
                  className="text-red-700"
                />
              </div>
            </div> */}

            {/* fourth row
            <div className="flex flex-wrap -mx-2.5 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  UpdateBy
                </label>
                <Field
                  type="text"
                  name="UpdateBy"
                  value={UpdateBy}
                  placeholder="Enter Updated-By"
                  onChange={(e) => setUpdateBy(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage
                  name="UpdateBy"
                  component="div"
                  className="text-red-700"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  UpdatedOn
                </label>
                <Field
                  type="date"
                  name="UpdatedOn"
                  value={formatDate(UpdatedOn)}
                  onChange={(e) => setUpdatedOn(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage name="UpdatedOn" component="div" />
              </div>
            </div> */}

            {/* fifth row */}
            <div className="flex flex-wrap -mx-2.5 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="  text-sm font-medium text-gray-900 dark:text-white">
                  Supplier
                </label>
                <Field
                  as="select"
                  name="SupplierCode"
                  value={SupplierId}
                  onChange={(event) => setSupplierId(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Supplier Code</option>
                  {Suppliers &&
                    Suppliers?.map((supplier, index) => {
                      console.log(supplier)
                      return (
                        <option value={supplier.supplierId} key={index}>
                          {supplier.supplierName}
                        </option>
                      );
                    })}
                </Field>
                <ErrorMessage name="SupplierCoded" component="div" />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  BrandCode
                </label>
                <Field
                  as="select"
                  name="BrandCode"
                  value={BrandId}
                  onChange={(event) => setBrandId(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Brand Code</option>
                  {Brands &&
                    Brands?.map((brand, index) => {
                      return (
                        <option value={brand.brandId} key={index}>
                          {brand.brandCode}
                        </option>
                      );
                    })}
                </Field>
                <ErrorMessage name="BrandCode" component="div" />
              </div>
            </div>

            {/* sixth row */}
            <div className="flex flex-wrap -mx-2.5 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htm="user_avatar"
                >
                  Product Image
                </label>
                <Field
                  type="file"
                  name="File"
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    setFile(file);
                    console.log(file, "file===>");
                    if (!file) {
                      setPreViewImage(imageUrl);
                    } else {
                      const url = window.URL.createObjectURL(file);
                      setPreViewImage(url);
                    }
                  }}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="user_avatar_help"
                />
                {(preViewImage || imageUrl) && (
                  <img
                    src={preViewImage ? preViewImage : imageUrl}
                    width="200px"
                    height="200px"
                    margin="10px"
                  />
                )}
                <ErrorMessage name="File" component="div" />
              </div>
              {/* <div className="w-full md:w-1/2 px-3 flex flex-wrap -mx-2.5">
                <div className="w-full md:w-1/2 px-3 py-7  mb-6 md:mb-0">
                  <Field
                    type="checkbox"
                    name="IsActive"
                    id="IsActive"
                    checked={IsActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="IsActive"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    IsActive
                  </label>
                  <ErrorMessage name="IsActive" component="div" />
                </div>
                <div className="w-full md:w-1/2 px-3  py-7">
                  <Field
                    type="checkbox"
                    name="IsCounted"
                    id="IsCounted"
                    checked={IsCounted}
                    onChange={(e) => setIsCounted(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="IsCounted"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    IsCounted
                  </label>
                  <ErrorMessage name="IsCounted" component="div" />
                </div>
              </div> */}
            </div>

            <button
              type="submit"
              // style={{ background:"blue"}}
              //disabled={isSubmitting}
              className="text-white bg-blue-700 hover:bg-blue-900  font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {ProductNo > 0 ? "Update" : "Submit"}
            </button>
          </Form>
        </Formik>
      </div>
      </div>
    
    </Container>
  );
}

export default AddProduct;
