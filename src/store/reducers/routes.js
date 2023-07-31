import {createSlice} from '@reduxjs/toolkit';

const artigoSlice = createSlice({
  name: 'routes',
  initialState: {
    page:"addArtigoPage",
    authPage:0
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setAuthPage: (state, action) => {
      state.authPage = action.payload;
    },
  },
});

export const { actions } = artigoSlice;
export default artigoSlice.reducer;
