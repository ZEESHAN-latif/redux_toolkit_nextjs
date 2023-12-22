import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the type for the state
type CrudState = {
  data: any[];
  status: boolean;
  error: string | null;
};

const initialState: CrudState = {
  data: [],
  status: false,
  error: null,
};

// Define the API endpoint URLs
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

// Create an async thunk for fetching data
export const fetchData = createAsyncThunk("crud/fetchData", async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

// Create an async thunk for adding data
export const addData = createAsyncThunk("crud/addData", async (newItem: any) => {
  const response = await axios.post(apiUrl, newItem);
  return response.data;
});

// Create an async thunk for updating data
export const updateData = createAsyncThunk("crud/updateData", async ({ index, newItem }: { index: any, newItem: any }, thunkAPI) => {
  const response = await axios.put(`${apiUrl}/${index}`, newItem);
  return response.data;
});

// Create an async thunk for removing data
export const removeData = createAsyncThunk("crud/removeData", async (index: number) => {
  await axios.delete(`${apiUrl}/${index}`);
  return index;
});

// Create the slice
export const crud = createSlice({
  name: "crud",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = false;
        state.data = action.payload;
      })
      .addCase(addData.pending, (state) => {
        state.status = true;
      })
      .addCase(addData.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = false;
        state.data.unshift({...action.payload, id:Math.floor(Math.random() * 1000)});
      })
      .addCase(addData.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || null;
      })
      .addCase(updateData.fulfilled, (state, action: PayloadAction<any>) => {
        const updatedItem = action.payload;
        const findObj = state.data.findIndex((item) => item?.id === updatedItem?.id)
        state.data[findObj] = updatedItem
      })
      .addCase(removeData.fulfilled, (state, action: PayloadAction<number>) => {
        const filterItem = state.data?.filter((z) => z?.id != action.payload)
        state.data = filterItem
      });
  },
});

// Export the actions and reducer
export default crud.reducer;