import {createSlice} from '@reduxjs/toolkit';

const artigoSlice = createSlice({
  name: 'routes',
  initialState: {
    page:"addArtigoPage",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { actions } = artigoSlice;
export default artigoSlice.reducer;
