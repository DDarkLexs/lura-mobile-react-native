import moment from 'moment';
import {knex, getArtigos, deleteArtigo} from '../utils/database';

export const insertQualidade = (qualidade, id_produto) => {
  return new Promise(async (resolve, reject) => {
    try {

        qualidade.datacad = moment().format();

      const id_qualidade = (await knex('qualidade').insert(qualidade))[0];

      resolve(id_qualidade);

    } catch (error) {
        
      reject(error);
    }
  });
};

export const getQualidadebyIdProduto  = (id_produto) => {
  return new Promise(async (resolve, reject) => {
    try {
   
    const response = await knex('qualidade')
      .select('*')
      .where('id_produto', id_produto)
      .orderBy('id_produto')

      resolve(response)

      /* 
      
      */


    } catch (error) {
      reject(error);
    }
  });
} 


export const deleteQualidadeById = id_qualidade => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await await knex('qualidade')
      .where('id_qualidade', id_qualidade)
      .del();
    resolve(response);

    } catch (error) {
      reject(error);
    }
  });
};
