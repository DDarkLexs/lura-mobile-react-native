import {createSlice} from '@reduxjs/toolkit';

const artigoSlice = createSlice({
  name: 'artigo',
  initialState: {
    items: [],
    qualidades: [],
    artigosValidade:[],
    loading: false,
    id_produto: null,
    artigoAddDialog:  false,
    qualidadeDialog:  false,
  },
  reducers: {
    setArtigosValidade: (state, action) => {
      state.artigosValidade = action.payload;
    },
    setArtigoAddDialog: (state, action) => {
      state.artigoAddDialog = action.payload;
    },
    setqualidadeDialog: (state, action) => {
      state.qualidadeDialog = action.payload;
    },
    setIdProduto: (state, action) => {
      state.id_produto = action.payload;
    },
    setQualidades: (state, action) => {
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
