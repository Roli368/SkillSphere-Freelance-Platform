import { createSlice } from "@reduxjs/toolkit";

const proposalSlice = createSlice({
  name: "proposal",

  initialState: {
    proposals: [],
    loading: false,
    error: null,
  },

  reducers: {
    proposalStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    proposalFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setProposals: (state, action) => {
      state.loading = false;
      state.proposals = action.payload;
    },
  },
});

export const {
  proposalStart,
  proposalFailure,
  setProposals,
} = proposalSlice.actions;

export default proposalSlice.reducer;