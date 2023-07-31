import {createSlice} from '@reduxjs/toolkit';
import { LocalAccount } from '../../controller/storage'
const localStorage = new LocalAccount()
const userSlice = createSlice({
  name: 'usuario',
  initialState: {
    account:null,
    editDialog:false,
  },
  reducers: {
    setEditDialog: (state, action) => {
      
      state.editDialog =  action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
