import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  modalIsShow: boolean;
}

const initialState: ModalState = {
  modalIsShow: false,
};

export const ModalSlice = createSlice({
  name: "modal",

  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalIsShow = !state.modalIsShow;
    },
  },
});

export const { toggleModal } = ModalSlice.actions;

export default ModalSlice.reducer;
