import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import gigReducer from "./slices/gigSlice";
import proposalReducer from "./slices/proposalSlice";
import freelancerReducer from "./slices/freelancerSlice";
import clientReducer from "./slices/clientSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gig: gigReducer,
    proposal: proposalReducer,
    freelancer: freelancerReducer,
    client: clientReducer,
  },
});