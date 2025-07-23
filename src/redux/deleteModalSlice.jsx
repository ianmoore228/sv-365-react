import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeleteModalOpen: false,
  isLettersModalOpen: false,
  isDoomModalOpen: false,
};

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    openDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
    },
    openLettersModal: (state) => {
      state.isDeleteModalOpen = false;
      state.isLettersModalOpen = true;
    },
    closeLettersModal: (state) => {
      state.isLettersModalOpen = false;
    },
    openDoomModal: (state) => {
      state.isLettersModalOpen = false;
      state.isDoomModalOpen = true;
    },
    closeDoomModal: (state) => {
      state.isDoomModalOpen = false;
    },
  },
});

export const {
  openDeleteModal,
  closeDeleteModal,
  openLettersModal,
  closeLettersModal,
  openDoomModal,
  closeDoomModal,
} = deleteModalSlice.actions;

export default deleteModalSlice.reducer;