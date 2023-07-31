import moment from 'moment';
import {ArtigoRepository} from '../database/repository/artigo';
import {LocalAccount} from './storage';
const account = new LocalAccount();
export class ArtigoController extends ArtigoRepository {
    constructor() {
        super();
    }

    getArtigos(id_seccao) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.getAllArtigoByOneSeccao(id_seccao);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    addNewArtigo(artigo, id_seccao) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.insertOneArtigo(artigo, id_seccao);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
    deleteArigoById(id_artigo) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.deleteArtigo(id_artigo);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    getAllartigoByIdUsuario(id_usuario) {
        return new Promise(async (resolve, reject) => {
            try {
              
              const response = await this.getAllByOneUser(id_usuario)

              resolve(response)
            } catch (error) {
                reject(error);
            }
        });
    }

    getAllNotaDeArtigoByIdUsuario(id_usuario) {
        return new Promise(async (resolve, reject) => {
            try {
              
              const response = await this.getAllByOneUserNotaDeArtigo(id_usuario)

              resolve(response)
            } catch (error) {
                reject(error);
            }
        });
    }
}
