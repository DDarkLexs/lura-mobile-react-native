import {createSlice} from '@reduxjs/toolkit';

const validadeSlice = createSlice({
  name: 'validade',
  initialState: {

    items: [],
    artigosValidade: [],
    id_artigo: null,
    loading:false,
    validadeDialog:false,
    artigo:{}
    },
  reducers: {
    setArtigo: (state, action) => {
      Object
      .assign(state.artigo,
         action.payload);
    },
    setOneArtigoValidades: (state, action) => {
      state.items = action.payload;
    },
    setValidadeDialog: (state, action) => {
      state.validadeDialog = action.payload;
    },
    setIdArtigo: (state, action) => {
      state.id_artigo = action.payload;
    },
    setArtigosValidade: (state, action) => {
      state.artigosValidade = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

  },
});

export const { actions } = validadeSlice;
export default validadeSlice.reducer;
