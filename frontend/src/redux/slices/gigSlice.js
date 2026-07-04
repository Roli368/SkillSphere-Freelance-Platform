import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gigs: [],
  myGigs: [],
  currentGig: null,
  loading: false,
  error: null,
};

const gigSlice = createSlice({
  name: "gig",

  initialState,

  reducers: {
    gigStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    gigFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setGigs: (state, action) => {
      state.loading = false;
      state.gigs = action.payload;
    },

    setMyGigs: (state, action) => {
      state.loading = false;
      state.myGigs = action.payload;
    },

    setCurrentGig: (state, action) => {
      state.loading = false;
      state.currentGig = action.payload;
    },
  },
});

export const {
  gigStart,
  gigFailure,
  setGigs,
  setMyGigs,
  setCurrentGig,
} = gigSlice.actions;

export default gigSlice.reducer;