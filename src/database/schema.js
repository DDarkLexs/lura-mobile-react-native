import {LuraDB} from './index';

export class Schema extends LuraDB {
    constructor() {
        super();
    }

    async tableExists(tableName) {
        const result = await this.knex.schema.hasTable(tableName);
        return result;
    }

    async createArtigo() {
        return new Promise(async (resolve, reject) => {
            try {
                const tab = 'artigo';
                const schema = await this.tableExists(tab);
                if (!schema) {
                    await this.knex.schema.createTable(tab, (table) => {
                        table.increments('id_artigo').primary();
                        table.string('nome').notNullable();
                        table.float('preco', 11, 2).notNullable();
                        table.text('descricao');
                        table.dateTime('datacad').notNullable();
                        table.string('categoria').notNullable();
                    });
                    console.log(`Table "${tab}" created successfully.`);
                } else {
                    // reject()
                    // console.log(`Table "${tab}" already exists.`);
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
    async createNotaDeArtigo() {
        return new Promise(async (resolve, reject) => {
            try {
                const tab = 'notaDeArtigo';
                const schema = await this.tableExists(tab);
                if (!schema) {
                    await this.knex.schema.createTable(tab, (table) => {
                        table.increments('id_notaDeArtigo').primary();
                        table.dateTime('vencimento').notNullable();
                        table
                            .integer('id_artigo')
                            .notNullable()
                            .references('id_artigo')
                            .inTable('artigo');
                        table
                            .integer('id_seccao')
                            .notNullable()
                            .references('id_seccao')
                            .inTable('seccao');
                    });

                    console.log(`Table "${tab}" created successfully.`);
                } else {
                    // console.log(`Table "${tab}" already exists.`);
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    async createValidade() {
        return new Promise(async (resolve, reject) => {
            try {
                const tab = 'validade';
                const schema = await this.tableExists(tab);
                if (!schema) {
                    await this.knex.schema.createTable(tab, (table) => {
                        table.increments('id_validade').primary();
                        table.dateTime('inicio');
                        table.dateTime('expira');
                        table.dateTime('datacad').notNullable();
                        table
                            .integer('id_artigo')
                            .notNullable()
                            .references('id_artigo')
                            .inTable('artigo');
                    });

                    console.log(`able "${tab}" created successfully.`);
                } else {
                    // console.log(`Table "${tab}" already exists.`);
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
    async createSeccao() {
        return new Promise(async (resolve, reject) => {
            try {
                const tab = 'seccao';
                const schema = await this.tableExists(tab);
                if (!schema) {
                    await this.knex.schema.createTable(tab, (table) => {
                        table.increments('id_seccao').primary();
                        table.string('nome').notNullable();
                        table
                            .integer('id_usuario')
                            .notNullable()
                            .references('id_usuario')
                            .inTable('usuario');
                    });

                    console.log(`Table "${tab}" created successfully.`);
                } else {
                    // console.log(`Table "${tab}" already exists.`);
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
    async createUsuario() {
        return new Promise(async (resolve, reject) => {
            try {
                const tab = 'usuario';
                const schema = await this.tableExists(tab);
                if (!schema) {
                    await this.knex.schema.createTable(tab, (table) => {
                        table.increments('id_usuario').primary();
                        table.string('nome').notNullable();
                        table.string('senha').notNullable();
                        table.string('telefone').notNullable().unique();
                        table.dateTime('datacad').notNullable();
                    });

                    console.log(`Table "${tab}" created successfully.`);
                } else {
                    // console.log(`Table "${tab}" already exists.`);
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
    async dropTable() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.knex.schema
                    .dropTableIfExists('usuario')
                    .dropTableIfExists('notaDeArtigo')
                    .dropTableIfExists('validade')
                    .dropTableIfExists('artigo')
                    .dropTableIfExists('seccao');
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
    async createAll() {
        try {
            // await this.dropTable();

         

            await this.createUsuario();
            await this.createSeccao();
            await this.createNotaDeArtigo();
            await this.createArtigo();
            await this.createValidade();

          
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async clearAllTables() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.knex('notaDeArtigo').del();
                await this.knex('validade').del();
                await this.knex('artigo').del();
                await this.knex('seccao').del();
                await this.knex('usuario').del();

                resolve('All data cleared from tables.');
            } catch (err) {
                reject('Error clearing data:', err);
            } finally {
                // Close the database connection
            }
        });
    }
}

// Create the tables if they don't exist
