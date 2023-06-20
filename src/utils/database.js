import {knex as con, RNSqliteDialect} from 'knex-react-native-sqlite';
import moment from 'moment';

export const knex = con({
  client: RNSqliteDialect,
  connection: {
    name: 'luraDB.db',
    location: 'Library',
  },
});

// Check if a table exists
async function tableExists(tableName) {
  const result = await knex.schema.hasTable(tableName);
  return result;
}

// Create the tables if they don't exist
const createTables = async () => {
  try {
    const produtoExists = await tableExists('produto');
    if (!produtoExists) {
      await knex.schema.createTable('produto', function (table) {
        table.increments('id_produto').primary();
        table.text('nome').notNullable();
        table.decimal('preco', 11, 2).notNullable();
        table.text('descricao');
        table.datetime('datacad').notNullable();
        table.text('categoria').notNullable();
      });
      console.log('Table "produto" created successfully.');
    } else {
      // console.log('Table "produto" already exists.');
    }

    const qualidadeExists = await tableExists('qualidade');
    if (!qualidadeExists) {
      await knex.schema.createTable('qualidade', function (table) {
        table.increments('id_qualidade').primary();
        table.datetime('inicio');
        table.datetime('expira');
        table.datetime('datacad').notNullable();
        table
          .integer('id_produto')
          .notNullable()
          .references('id_produto')
          .inTable('produto')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
      });
      console.log('Table "qualidade" created successfully.');
    } else {
      // console.log('Table "qualidade" already exists.');
    }

    const usuarioExists = await tableExists('usuario');
    if (!usuarioExists) {
      await knex.schema.createTable('usuario', function (table) {
        table.increments('id_usuario').primary();
        table.text('imagem');
        table.text('nome').notNullable();
        table.text('senha').notNullable();
        table.text('telefone');
        table.datetime('nascimento');
        table.datetime('datacad').notNullable();
      });

      const response = await knex('usuario').insert({
        nome: 'admin',
        senha: 'admin',
        telefone: null,
        nascimento:moment().format(),
        datacad:moment().format(),
      });
      console.log('Table "usuario" created successfully.');
    } else {
      // console.log('Table "usuario" already exists.');
    }

    const notaDeProdutoExists = await tableExists('notaDeProduto');
    if (!notaDeProdutoExists) {
      await knex.schema.createTable('notaDeProduto', function (table) {
        table.increments('id_notaDeProduto').primary();
        table.text('nota').notNullable();
        table.datetime('vencimento').notNullable();
        table
          .integer('id_produto')
          .notNullable()
          .references('id_produto')
          .inTable('produto')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
        table
          .integer('id_usuario')
          .notNullable()
          .references('id_usuario')
          .inTable('usuario')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
      });
      console.log('Table "notaDeProduto" created successfully.');
    } else {
      // console.log('Table "notaDeProduto" already exists.');
    }

    const authExists = await tableExists('auth');
    if (!authExists) {
      await knex.schema.createTable('auth', function (table) {
        table.increments('id_auth').primary();
        table.text('query').notNullable().unique();
        table.text('secretKey').notNullable();
        table.text('hash').notNullable().unique();
        table.datetime('expireIn').notNullable();
      });
      console.log('Table "auth" created successfully.');
    } else {
      // console.log('Table "auth" already exists.');
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    // Close the SQLite database connection
    // console.log('terminado');
    // knex.destroy();
  }
};

const dropAllTable =  () => {
  return new Promise(async (resolve,reject) => {

    try {
 
      
      await knex.raw(`DROP TABLE IF EXISTS produto;`);
      await knex.raw(`DROP TABLE IF EXISTS qualidade;`);
     await knex.raw(`DROP TABLE IF EXISTS usuario;`);
     await knex.raw(`DROP TABLE IF EXISTS notaDeProduto;`);
     await knex.raw(`DROP TABLE IF EXISTS auth;`);

     
  } catch (error) {
    resolve(error)
    console.error(error);
  } finally {
    resolve(true)
    console.log('resolvido');
  }
})
};

// const createTables = async () => {
  //   // Create the `produto` table
//   try {
//     var tableExists = await knex.schema.hasTable('produto');
//     if (!tableExists) {
//       await knex.schema.createTable('produto', function (table) {
//         table.increments('id_produto').primary();
//         table.string('nome').notNullable();
//         table.real('preco', 11, 2).notNullable();
//         table.text('descricao');
//         table.datetime('datacad').notNullable();
//         table.text('categoria').notNullable();
//       });
//     }
//     // Create the `qualidade` table
//     var tableExists = await knex.schema.hasTable('qualidade');
//     if (!tableExists) {
//       await knex.schema.createTable('qualidade', function (table) {
//         table.increments('id_qualidade').primary();
//         table.datetime('inicio');
//         table.datetime('expira');
//         table.datetime('datacad').notNullable();
//         table.integer('id_produto').notNullable();
//         table.foreign('id_produto').references('id_produto').inTable('produto');
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

export const deleteArtigo = id_produto => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await knex('produto')
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

export default { createTables, dropAllTable };
// dropAllTable()
/* 
// Check if a table exists
async function tableExists(tableName) {
  const result = await knex.schema.hasTable(tableName);
  return result;
}

// Create the tables if they don't exist
async function createTables() {
  try {
    const produtoExists = await tableExists('produto');
    if (!produtoExists) {
      await knex.schema.createTable('produto', function (table) {
        table.increments('id_produto').primary();
        table.text('nome').notNullable();
        table.decimal('preco', 11, 2).notNullable();
        table.text('descricao');
        table.datetime('datacad').notNullable();
        table.text('categoria').notNullable();
      });
      console.log('Table "produto" created successfully.');
    } else {
      console.log('Table "produto" already exists.');
    }

    const qualidadeExists = await tableExists('qualidade');
    if (!qualidadeExists) {
      await knex.schema.createTable('qualidade', function (table) {
        table.increments('id_qualidade').primary();
        table.datetime('inicio');
        table.datetime('expira');
        table.datetime('datacad').notNullable();
        table.integer('id_produto').notNullable().references('id_produto').inTable('produto').onDelete('CASCADE').onUpdate('CASCADE');
      });
      console.log('Table "qualidade" created successfully.');
    } else {
      console.log('Table "qualidade" already exists.');
    }

    const usuarioExists = await tableExists('usuario');
    if (!usuarioExists) {
      await knex.schema.createTable('usuario', function (table) {
        table.increments('id_usuario').primary();
        table.text('imagem');
        table.text('nome').notNullable();
        table.text('senha').notNullable();
        table.text('telefone').notNullable();
        table.datetime('nascimento').notNullable();
        table.datetime('datacad').notNullable();
      });
      console.log('Table "usuario" created successfully.');
    } else {
      console.log('Table "usuario" already exists.');
    }

    const notaDeProdutoExists = await tableExists('notaDeProduto');
    if (!notaDeProdutoExists) {
      await knex.schema.createTable('notaDeProduto', function (table) {
        table.increments('id_notaDeProduto').primary();
        table.text('nota').notNullable();
        table.datetime('vencimento').notNullable();
        table.integer('id_produto').notNullable().references('id_produto').inTable('produto').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('id_usuario').notNullable().references('id_usuario').inTable('usuario').onDelete('CASCADE').onUpdate('CASCADE');
      });
      console.log('Table "notaDeProduto" created successfully.');
    } else {
      console.log('Table "notaDeProduto" already exists.');
    }

    const authExists = await tableExists('auth');
    if (!authExists) {
      await knex.schema.createTable('auth', function (table) {
        table.increments('id_auth').primary();
        table.text('query').notNullable().unique();
        table.text('secretKey').notNullable();
        table.text('hash').notNullable().unique();
        table.datetime('expireIn').notNullable();
      });
      console.log('Table "auth" created successfully.');
    } else {
      console.log('Table "auth" already exists.');
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    // Close the SQLite database connection
    db.close();
  }
}
*/
