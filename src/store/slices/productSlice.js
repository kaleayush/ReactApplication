import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllProducts, DeleteProduct,GetProductById } from "../../Service/ProductService";

const initialState = {
  productsdata: [], 
  loading:false,
  totalRows:0,
  isDelete:false,
  ProductDetail:[]
};
export const GetAllProductHandler = createAsyncThunk(
  'product/GetAllProductHandler',
  async (data) => {
    const response = await GetAllProducts(
      data.page, data.size, data.sortDir, data.sortCol, data.key, data.value
    );
    return response.data; 
  }
);
export const DeleteProductHandler = createAsyncThunk('product/DeleteProductHandler',async (data) => {
  const response = await DeleteProduct(data.productNo)
  return response.data;
});
export const GetProductByIdHandler =createAsyncThunk('product/GetProductByIdHandler',async (data)=>{
  const response= await GetProductById(data.productNo);
  return response.data;
})
export const CreateAndUpdateProductHandler=createAsyncThunk("product/CreateAndUpdateProductHandler",async (data)=>{
})
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAllProductHandler.fulfilled, (state, action) => {
      state.productsdata = action?.payload?.data?.data;
      state.totalRows= action?.payload?.data?.totalCount   
    });
    builder.addCase(DeleteProductHandler.fulfilled, (state, action) => {
        state.isDelete=action?.payload?.data
    });
  }
});

export default productSlice.reducer;
