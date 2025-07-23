import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tariffs: [],
  loading: false,
  error: null,
  clickedTariff: null,
};

const tariffSlice = createSlice({
    name: "tariffs",
    initialState,
    reducers: {
    setTariffs: (state, action) => {
    state.tariffs = action.payload;
    },
    setLoading: (state, action) => {
    state.loading = action.payload;
    },
    setError: (state, action) => {
     state.error = action.payload;
    },
    setClickedTariff: (state, action) => {
     state.clickedTariff = action.payload;
    },
}
});

export const { setTariffs, setLoading, setError, setClickedTariff } = tariffSlice.actions; 
export default tariffSlice.reducer;