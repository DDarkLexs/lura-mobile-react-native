import {createSlice} from '@reduxjs/toolkit';

const artigoSlice = createSlice({
  name: 'artigo',
  initialState: {
    items: [],
    qualidades:[],
    loading:false,
    id_produto: null
  },
  reducers: {
    setIdProduto: (state, action) => {
      state.id_produto = action.payload;
    },
    setArtigos: (state, action) => {
      state.qualidades = action.payload;
    },
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
