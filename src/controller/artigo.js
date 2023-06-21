import moment from 'moment';
import {knex, getArtigos, deleteArtigo} from '../utils/database';

export const getAllartigoByUserId = id_usuario => {
  return new Promise(async (resolve, reject) => {
    try {
      const artigos = await knex
        .from('produto')
        .select('*')
        .from('produto')
        .innerJoin(
          'notaDeProduto',
          'notaDeProduto.id_produto',
          'produto.id_produto',
        )
        .where('notaDeProduto.id_usuario', id_usuario);
      // .innerJoin('notaDeProduto')
      // .where('id_usuario', '=', id_usuario);
      // console.log(artigos);
      /* 
          select * from produto p
          inner join notaDeProduto np on np.id_produto = p.id_produto
          where id_usuario = 1
        */

      // console.log(artigos);

      resolve(artigos);
    } catch (error) {
      reject(error);
    }
  });
};

export const insertNew = (artigo, id_usuario) => {
  return new Promise(async (resolve, reject) => {
    try {
      artigo.datacad = new Date().toString();

      const id_produto = (await knex('produto').insert(artigo))[0];

      const id_notaDeProduto = await knex('notaDeProduto').insert({
        nota: 'nenhuma',
        vencimento: moment().format(),
        id_produto: id_produto,
        id_usuario: id_usuario,
      });

      console.log(id_produto, id_notaDeProduto);
      resolve(true);
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

export const getAllartigoByValidade = id_usuario => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await knex
        .from('produto')
        .select(
          knex.raw(`
        id_qualidade,
        produto.nome as nome,
        inicio,  
        expira
        `),
        )
        .from('produto')
        .innerJoin(
          'notaDeProduto',
          'notaDeProduto.id_produto',
          'produto.id_produto',
        )
        .innerJoin('qualidade', 'qualidade.id_produto', 'produto.id_produto')
        .groupBy('id_qualidade')
        .where('notaDeProduto.id_usuario', id_usuario);
      // response

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
