import moment from 'moment';
import {knex} from '../utils/database';
import {getAllartigoByValidade} from '../controller/artigo';
import {DataExpirou, formatarDataMid} from '../utils/formata-data';

export const getResults = id_usuario => {
  return new Promise(async (resolve, reject) => {
    try {
      /* const response = (await knex('produto')
        .select(knex.raw(`
        COUNT(produto.id_produto) AS artigoTotal
        `))
        .innerJoin("notaDeProduto",
        'notaDeProduto.id_produto',
         'produto.id_produto') 
         .innerJoin("qualidade",
         'qualidade.id_produto',
         'produto.id_produto') 
         .where('notaDeProduto.id_usuario', id_usuario)
         .groupBy('notaDeProduto.id_usuario'))[0];
         
         */

      const artigoTotal = (
        await knex('produto')
          .select()
          .innerJoin(
            'notaDeProduto',
            'notaDeProduto.id_produto',
            'produto.id_produto',
          )
          .where('notaDeProduto.id_usuario', id_usuario)
      ).length;
      const validadesTotal = (await getAllartigoByValidade(id_usuario)).length;
      const totalExpirado = (await getAllartigoByValidade(id_usuario))
        .map(item => {
          Object.assign(item, {expirado: DataExpirou(item.expira)});
          return DataExpirou(item.expira);
        })
        .filter(item => item === true).length;
      const totalValido = (await getAllartigoByValidade(id_usuario))
        .map(item => {
          Object.assign(item, {expirado: DataExpirou(item.expira)});
          return DataExpirou(item.expira);
        })
        .filter(item => item === false).length;

      // console.log(artigoTotal, validadesTotal, totalExpirado, totalValido);

      resolve({artigoTotal, validadesTotal, totalExpirado, totalValido});
    } catch (error) {
      reject(error);
    }
  });
};
