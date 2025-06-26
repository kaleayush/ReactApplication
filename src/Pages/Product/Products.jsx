import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "../../Components";
import image from "../../Images/download.png";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Common/Loader";
import {
  GetAllProductHandler,
  DeleteProductHandler,
} from "../../store/slices/productSlice";

function Products() {
  const { productsdata, totalRows, isDelete } = useSelector(
    (state) => state?.product
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [sortDireaction, setSortDireaction] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [searchColumn, setSearchColumn] = useState("productname");
  const [sortDireactionIcon, setSortDireactionIcon] = useState(true);

  const handleDelete = async (productNo) => {
    if (window.confirm(`Do you want to delete this product ${productNo}`)) {
      dispatch(DeleteProductHandler({ productNo: productNo }));
      console.log("Product deleted");
    } else {
      console.log("Product not deleted");
    }
  };
  const functionCall = async (
    page,
    size = perPage,
    sortDir,
    sortCol,
    key = null,
    value = null
  ) => {
    setLoading(true);
    await dispatch(
      GetAllProductHandler({ page, size, sortDir, sortCol, key, value })
    ).then((res) => {});
    setLoading(false);
  };
  const handleEdit = (ProductNo) => {
    console.log(ProductNo, "hendleEdit method");
    navigate(`/Products/edit-product/${ProductNo}`);
  };
  /// Redirecting user to Add new Product after add button is clicked
  const handleAdd = () => {
    navigate(`/Products/Add-Product/${0}`);
  };
  /// creating column for table
  const columns = [
    {
      name: "ProductName",
      selector: (row) => row.productName,
      sortable: true,
      width: "150px",
      sortField: "productname",
      id: 1,
    },
    {
      name: "SellingPrice",
      selector: (row) => row.salesprice,
      sortable: true,
      width: "100px",
      sortField: "salesprice",
      id: 2,
    },
    {
      name: "PurchasePrice",
      selector: (row) => row.purchasePrice,
    },
    {
      name: "BrandDescription",
      selector: (row) => row.brandDescription,
    },
    {
      name: "BrandCode",
      selector: (row) => row.brandCode,
    },
    {
      name: "Supplier",
      selector: (row) => row.supplierName,
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.imageUrl ? row.imageUrl : image}
          alt="not found"
          className="rounded-lg w-16 h-12"
        />
      ),
    },
    {
      name: "Action",
      width: "150px",
      cell: (row) => (
        <div className="flex">
          <button
            onClick={() => handleEdit(row.productNo)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.productNo)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Delete
          </button>
        </div>
      ),
      id: 8,
      ignoreRowClick: true,
      allowOverflow: true,
      // // button: true,
      width: "200px",
    },
  ];
  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };
  const handleSort = (selector, direction) => {
    if (selector.name === undefined) {
    } else {
      if (direction == "asc") {
        setSortDireactionIcon(true);
      } else {
        setSortDireactionIcon(false);
      }
      setSortColumn(selector.sortField);
      setSortDireaction(direction);
    }
  };
  const handleSearch = () => {
    functionCall(
      currentPage,
      perPage,
      sortDireaction,
      sortColumn,
      searchColumn,
      searchText
    );
  };
  useEffect(() => {
    functionCall(currentPage, perPage, sortDireaction, sortColumn);
  }, [currentPage, perPage, sortColumn, sortDireaction, isDelete]);
  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {error ? (
            <div>{`Error ${error}`}</div>
          ) : (
            <Container>
              <div className="relative">
                <div className="flex items-center justify-between py-2 px-4 bg-gray-200 dark:bg-gray-800 top-2">
                  <h2 className="text-xl font-medium text-gray-800 dark:text-white ">
                    Products
                  </h2>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20 h-10"
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                </div>
                <div className="border  border-grey-300  border-solid border-5 mt-4">
                  <DataTable
                    columns={columns}
                    data={productsdata}
                    selectableRows
                    highlightOnHover
                    fixedHeader
                    fixedHeaderScrollHeight="330px"
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    paginationPerPage={perPage}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerRowsChange}
                    // paginationServerOptions={{
                    //   persistSelectedOnSort: true, // Example option
                    //   persistSelectedOnPageChange: true, // Example option
                    // }}

                    persistTableHead={true}
                    defaultSortAsc={sortDireactionIcon}
                    sortServer={true}
                    onSort={handleSort}
                    defaultSortFieldId
                    // selectableRows
                    subHeader
                    subHeaderAlign="right"
                    subHeaderWrap
                    subHeaderComponent={
                      <>
                        <select
                          style={{
                            width: "120px",
                            padding: "5px",
                            border: "1px solid grey",
                            margin: "3px",
                          }}
                          onChange={(e) => setSearchColumn(e.target.value)}
                        >
                          <option value={"productname"}>Filters</option>
                          {columns?.map((value, index) => {
                            return (
                              <>
                                {value && value?.sortField && (
                                  <option
                                    value={value.sortField}
                                    key={value.id}
                                  >
                                    {value.name}
                                  </option>
                                )}
                              </>
                            );
                          })}
                        </select>
                        <input
                          type="text"
                          placeholder="search"
                          style={{
                            width: "120px",
                            padding: "5px",
                            border: "1px solid grey",
                            margin: "3px",
                          }}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button onClick={handleSearch} className="onhover:red">
                          search{" "}
                        </Button>
                      </>
                    }
                    customStyles={{
                      headCells: {
                        style: {
                          backgroundColor: "lightgray",
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "8xl",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </Container>
          )}
        </div>
      )}
    </>
  );
}

export default Products;
