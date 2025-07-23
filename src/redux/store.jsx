import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import deleteModalReducer from './deleteModalSlice';
import tariffReducer from './tariffSlice';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    tariffs: tariffReducer,
    deleteModal: deleteModalReducer
  },
});

export default store;