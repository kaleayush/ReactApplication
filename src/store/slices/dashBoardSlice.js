import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetDashboardDetails } from "../../Service/DashBoardService";

export const DashBoardHandler = createAsyncThunk(
  "DashBoard/GetCount",
  async () => {
    const response = await GetDashboardDetails();
    return response.data;
  }
);
const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardData: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DashBoardHandler.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboardData = action?.payload?.data;
    });
    builder.addCase(DashBoardHandler.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DashBoardHandler.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default DashboardSlice.reducer;
