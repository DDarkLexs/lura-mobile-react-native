import {LuraDB} from '../index';
import moment from 'moment';

export class SetorRepository extends LuraDB {
    constructor() {
        super();
    }

    async getAll( id_usuario ) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.knex('seccao')
                .select().where('id_usuario', id_usuario);

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
    async insertOne(id_usuario, nome) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.knex('seccao')
                .insert({nome,id_usuario});

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
    async getFirst(id_usuario) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.knex('seccao')
                .select()
                .where('id_usuario', id_usuario)
                .first();

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
}
