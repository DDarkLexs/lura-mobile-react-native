import {createSlice} from '@reduxjs/toolkit';

const artigoSlice = createSlice({
  name: 'artigo',
  initialState: {
    items: [],
    loading:false,
  },
  reducers: {
    setArtigos: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {

      state.loading = action.payload;

    },
  },
});

export const {actions} = artigoSlice;
export default artigoSlice.reducer;
