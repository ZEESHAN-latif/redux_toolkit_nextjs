import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the type for the state
type CrudState = {
  data: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: CrudState = {
  data: [],
  status: "idle",
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
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addData.fulfilled, (state, action: PayloadAction<any>) => {
        state.data.push(action.payload);
      })
      .addCase(updateData.fulfilled, (state, action: PayloadAction<any>) => {
        // Assuming the API returns the updated item
        const updatedItem = action.payload;
        // state.data[updatedItem?.index] = updatedItem.newItem;
      })
      .addCase(removeData.fulfilled, (state, action: PayloadAction<number>) => {
        state.data.splice(action.payload, 1);
      });
  },
});

// Export the actions and reducer
export default crud.reducer;