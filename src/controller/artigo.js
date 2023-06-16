import {knex, getArtigos, deleteArtigo} from '../utils/database';

export const insertNew = artigo => {
  return new Promise(async (resolve, reject) => {
    try {
      artigo.datacad = new Date().toString();
      const response = await knex('produto').insert(artigo);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteArigoById = id_produto => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await deleteArtigo(id_produto);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
