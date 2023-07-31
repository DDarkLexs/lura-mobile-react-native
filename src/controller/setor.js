import { SetorRepository } from '../database/repository/setor';
import {LocalAccount} from './storage';
import {
    insertUser,
    loginInUser,
    getUser,
    updateAuthorization,
} from '../api/usuario';
import axiosIns from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const localStore = new LocalAccount();

export class SetorController extends SetorRepository {
    constructor() {
        super();
    }
    insertSetor(nome) {
        return new Promise(async (resolve, reject) => {
            try {

            const { id_usuario } = (await localStore.getAccount())
            
            const response =  await this.insertOne(id_usuario , nome)
            resolve(response)
            
            } catch (error) {
            
                reject(error);
            
            }
        });
    }

    getallSetorByIdUsuario() {
        return new Promise(async (resolve, reject) => {
            try {

            const { id_usuario } = (await localStore.getAccount())
            
            const response =  await this.getAll( id_usuario )
            resolve(response)
            
            } catch (error) {
            
                reject(error);
            
            }
        });
    }
    getFisrtSector(){
        return new Promise(async (resolve, reject) => {
            try {

            const response = (await this.getallSetorByIdUsuario())[0]
            if(!response){
                throw 'crie um setor para regsitrar artigo'
            }
            resolve(response)
            
            } catch (error) {
            
                reject(error);
            
            }
        });

    }


}


