import moment from 'moment';
import {knex} from '../utils/database';
 
export const getResults = id_usuario => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = await (knex
        .select(knex.raw(`
        COUNT(np.id_produto) as artigo_total
        --,count(q.id_qualidade) as validades_total`))
        .from('produto as p')
        // .join('qualidade as q', 'q.id_produto', 'p.id_produto')
        .join('notaDeProduto as np', 'np.id_produto', 'p.id_produto')
        .where('np.id_usuario', id_usuario)
        .groupBy('np.id_usuario'))[0];
        


      resolve(query);
    } catch (error) {
      reject(error);
    }
  });
};
