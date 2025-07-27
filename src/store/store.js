import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "../features/job/jobSlice";
import toggleSlice from "../features/toggle/toggleSlice";
import filterSlice from "../features/filter/filterSlice";
import employerSlice from "../features/employer/employerSlice";
import employerFilterSlice from "../features/filter/employerFilterSlice";

export const store = configureStore({
  reducer: {
    job: jobSlice,
    toggle: toggleSlice,
    filter: filterSlice,
    employer: employerSlice,
    employerFilter: employerFilterSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
