import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    profile: null,
  },
  reducers: {},
});

export default clientSlice.reducer;