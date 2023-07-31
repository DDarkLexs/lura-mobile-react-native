import {LuraDB} from '../index';
import moment from 'moment';

export class ValidadeRepository extends LuraDB {
    constructor() {
        super();
    }

    async getAll(id_artigo) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.knex('validade')
                    .select('*')
                    .where('id_artigo', id_artigo)
                    .orderBy('id_artigo');
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
    async getAllByOneUser(id_usuario) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.knex
                    .from('validade')
                    .select(['validade.*'])
                    .innerJoin(
                        'artigo',
                        'artigo.id_artigo',
                        'validade.id_artigo',
                    )
                    .innerJoin(
                        'notaDeArtigo',
                        'notaDeArtigo.id_artigo',
                        'artigo.id_artigo',
                    )
                    .innerJoin(
                        'seccao',
                        'seccao.id_seccao',
                        'notaDeArtigo.id_seccao',
                    )
                    .groupBy('id_validade')
                    .where('seccao.id_usuario', id_usuario);
                // response

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
    async getAllByOneSetor(id_seccao) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.knex
                    .from('artigo')
                    .select(['id_validade', 'nome', 'inicio', 'expira'])
                    .innerJoin(
                        'notaDeArtigo',
                        'notaDeArtigo.id_artigo',
                        'artigo.id_artigo',
                    )
                    .innerJoin(
                        'validade',
                        'validade.id_artigo',
                        'artigo.id_artigo',
                    )
                    .groupBy('id_validade')
                    .where('notaDeArtigo.id_seccao', id_seccao);
                // response

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
    async insertOne(validade) {
        return new Promise(async (resolve, reject) => {
            try {
                const id_validade = (
                    await this.knex('validade').insert(validade)
                )[0];

                resolve(id_validade);
            } catch (error) {
                reject(error);
            }
        });
    }
    deleteOne(id_validade) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await knex('validade')
                    .where('id_validade', id_validade)
                    .del();
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
}
