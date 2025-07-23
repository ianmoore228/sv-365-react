import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isRegisterModalOpen: false,
  isStartClicked: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.isRegisterModalOpen = false;
      state.isStartClicked = false;
    },
    openRegisterModal: (state) => {
      state.isRegisterModalOpen = true;
    },
    closeRegisterModal: (state) => {
      state.isRegisterModalOpen = false;
      state.isStartClicked = false;
    },
    clickStart: (state) => {
      state.isStartClicked = true;
    },
  },
});

export const {
  openModal,
  closeModal,
  openRegisterModal,
  closeRegisterModal,
  clickStart,
} = modalSlice.actions;

export default modalSlice.reducer;
