import {  LuraDB } from '../index'
import moment from 'moment'
export class userRepository extends LuraDB {
    constructor(){
        super()
    }
    async getUserId(){
        return new Promise(async (resolve,reject) => {
            try {
                
                const query = await this.knex('usuario')
                .select()
                .first()
                console.log(query)
                resolve(query)
            } catch (error) {
                reject(error)    
            }
        })
    }
    async InsertNewUser(nome, senha, telefone){
        return new Promise(async (resolve, reject) => {

            const response = await this.knex('usuario').insert({
                nome: nome || 'admin',
                senha: senha || 'admin',
                telefone: telefone || null,
                datacad:moment().format(),
            });
            resolve(response)
        })
    }
}