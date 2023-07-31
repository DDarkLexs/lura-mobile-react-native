import {createSlice} from '@reduxjs/toolkit';

const setorSlice = createSlice({
  name: 'setor',
  initialState: {
    setor:null,
    SelectSetorDialog: false,
    addSetorDialog: false,
    setorArray:[]
  },
  reducers: {
    setSetorArray: (state, action) => {
      state.setorArray = action.payload;
    },
    setSetor: (state, action) => {
      state.setor = action.payload;
    },
    setAddSetorDialog: (state, action) => {
      state.addSetorDialog = action.payload;
    },
    setSelectSetorDialog: (state, action) => {
      state.SelectSetorDialog = action.payload;
    },
  },
});

export const { actions } = setorSlice;
export default setorSlice.reducer;
