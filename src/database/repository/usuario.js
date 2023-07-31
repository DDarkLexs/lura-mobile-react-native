import {LuraDB} from '../index';
import moment from 'moment';
export class UserRepository extends LuraDB {
    constructor() {
        super();
    }
    async getUserByIdUsuario(id_usuario) {
        return new Promise(async (resolve, reject) => {
            try {
               
                const query = await this.knex('usuario')
                    .select()
                    .where('id_usuario', id_usuario)
                    .first();
             
                resolve(query);
            } catch (error) {
                reject(error);
            }
        });
    }
    authUser(telefone, senha) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.knex('usuario')
                    .select()
                    .where({
                        telefone,
                        senha,
                    })
                    .first();
                if (!response) throw 'A conta ou a senha está incorreto!';
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateUser( user, id_usuario ) {
        return new Promise(async (resolve, reject) => {
          try {
            
            // console.log(user)
            // (await knex('usuario')
            //   .update(user)
            //   .where('id_usuario', id_usuario));
      
                resolve("Sucesso")
          } catch (error) {
            console.log(error)
            reject(error)
          }
        });
    }

    async insertNewUser(account) {
        return new Promise(async (resolve, reject) => {
            try {

                const response = (await this.knex('usuario').insert({
                    ...account,
                }));

                const user = (await this.getUserByIdUsuario(response[0]))
                
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }
}
