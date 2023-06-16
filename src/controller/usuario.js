import { knex } from '../utils/database';

export const loginUserAuto = () => {
  return new Promise(async (resolve, reject) => {
    try {
        const query = (await knex("usuario")
        .select("*"))[0]

        if(!query) throw "O nome ou a palavra-passe está incorreto"

        resolve(query)
    } catch (error) {
      reject(error);
    }
  });
};
export const loginUser = credencial => {
  return new Promise(async (resolve, reject) => {
    try {
        const query = (await knex("usuario")
        .select("*")
        .where("nome","=",credencial.nome)
        .andWhere("senha","=",credencial.password))[0]

        if(!query) throw "O nome ou a palavra-passe está incorreto"

        resolve(query)
    } catch (error) {
      reject(error);
    }
  });
};

