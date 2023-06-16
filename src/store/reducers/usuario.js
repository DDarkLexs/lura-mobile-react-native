import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'usuario',
  initialState: {
    account:null,
  },
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
