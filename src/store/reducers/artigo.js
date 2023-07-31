import {createSlice} from '@reduxjs/toolkit';

const artigoSlice = createSlice({
  name: 'artigo',
  initialState: {
    items: [],
    qualidades: [],
    artigosValidade: [],
    loading: false,
    id_produto: null,
    artigoAddDialog: false,
    qualidadeDialog: false,
    infoArtigoValidade: {},
  },
  reducers: {
    setInfoArtigoValidade: (state, action) => {
      Object.assign(state.infoArtigoValidade, action.payload);
    },
    setArtigosValidade: (state, action) => {
      state.artigosValidade = action.payload;
    },
    setArtigoAddDialog: (state, action) => {
      state.artigoAddDialog = action.payload;
    },
    setIdArtigo: (state, action) => {
      state.id_produto = action.payload;
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
