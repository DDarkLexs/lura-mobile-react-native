import {LuraDB} from '../index';
import moment from 'moment';

export class ArtigoRepository extends LuraDB {
    constructor() {
        super();
    }
    getAllArtigoByOneSeccao(id_seccao) {
        return new Promise(async (resolve, reject) => {
            try {
                const artigos = await this.knex
                    .from('artigo')
                    .select('*')
                    .innerJoin(
                        'notaDeArtigo',
                        'notaDeArtigo.id_artigo',
                        'artigo.id_artigo',
                    )
                    .where('notaDeArtigo.id_seccao', id_seccao);
 
             
                resolve(artigos);
            } catch (error) {
                reject(error);
            }
        });
    }
    insertOneArtigo(artigo, id_seccao) {
        return new Promise(async (resolve, reject) => {
          try {
          
            artigo.datacad = moment().format();
       
            const id_artigo = (await this.knex('artigo').insert(artigo))[0];
          
            const id_notaDeArtigo = await this.knex('notaDeArtigo').insert({
                vencimento: moment().format(),
                id_artigo,
              id_seccao,
            });
      
            resolve({id_artigo,id_notaDeArtigo});
          } catch (error) {
            reject(error);
          }
        });
    }
    deleteArtigo(id_artigo) {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await this.knex('artigo')
              .where('id_artigo', id_artigo)
              .del();
            resolve(response);
          } catch (error) {
            reject(error);
            console.error(error);
          }
        });
    }

    getAllByOneUser(id_usuario){
        return new Promise(async (resolve, reject) => {
            try {
              const response = await this.knex
              .from('artigo')
              .select(['artigo.*'])
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
              .groupBy('artigo.id_artigo')
              .where('seccao.id_usuario', id_usuario);
     
          resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
    getAllByOneUserNotaDeArtigo(id_usuario){
        return new Promise(async (resolve, reject) => {
            try {
              const response = await this.knex
              .from('notaDeArtigo')
              .select(['notaDeArtigo.*'])
            .innerJoin(
                'seccao',
                'seccao.id_seccao',
                'notaDeArtigo.id_seccao',
            )
              .groupBy('notaDeArtigo.id_notaDeArtigo')
              .where('seccao.id_usuario', id_usuario);
     
          resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

}
