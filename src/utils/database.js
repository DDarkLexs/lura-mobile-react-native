import {knex as con, RNSqliteDialect} from 'knex-react-native-sqlite';

export const knex = con({
  client: RNSqliteDialect,
  connection: {
    name: 'luraDB.db',
    location: 'Library',
  },
});

const createTables = async () => {
  // Create the `produto` table
  try {
    var tableExists = await knex.schema.hasTable('produto');
    if (!tableExists) {
      await knex.schema.createTable('produto', function (table) {
        table.increments('id_produto').primary();
        table.string('nome').notNullable();
        table.real('preco', 11, 2).notNullable();
        table.text('descricao');
        table.datetime('datacad').notNullable();
        table.text('categoria').notNullable();
      });
    }
    // Create the `qualidade` table
    var tableExists = await knex.schema.hasTable('qualidade');
    if (!tableExists) {
      await knex.schema.createTable('qualidade', function (table) {
        table.increments('id_qualidade').primary();
        table.datetime('inicio');
        table.datetime('expira');
        table.datetime('datacad').notNullable();
        table.integer('id_produto').notNullable();
        table.foreign('id_produto').references('id_produto').inTable('produto');
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteArtigo = id_produto => {
  return new Promise(async (resolve, reject) => {
    try {

      const response = await await knex('produto')
      .where('id_produto', id_produto)
      .del();
      resolve(response);
    } catch (error) {
      reject(error);
      console.error(error);
    }
  });
};

export const insertArtigo = propiedade => {
  return new Promise(async (resolve, reject) => {
    try {
      propiedade.datacad = new Date().toString();
      const response = await knex('produto').insert(propiedade);
      resolve(response);
    } catch (error) {
      reject(error);
      console.error(error);
    }
  });
};

export const getArtigos = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const pessoas = await knex.select().from('produto');
      resolve(pessoas);
    } catch (error) {
      console.error('Error retrieving data:', error);
      reject(error);
    } finally {
      // console.log('done.');
    }
  });
};

createTables();

console.log('ok')
