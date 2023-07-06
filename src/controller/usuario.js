import {knex} from '../utils/database';

export const loginUserAuto = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = (await knex('usuario').select('*'))[0];

      if (!query) throw 'O nome ou a palavra-passe está incorreto';

      resolve(query);
    } catch (error) {
      reject(error);
    }
  });
};
export const loginUser = credencial => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = (
        await knex('usuario')
          .select('*')
          .where('nome', '=', credencial.nome)
          .andWhere('senha', '=', credencial.password)
      )[0];

      if (!query) throw 'O nome ou a palavra-passe está incorreto';

      resolve(query);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUsuario = (id_usuario) => {
  return new Promise(async (resolve, reject) => {
    try {

      const user = (
        await knex('usuario')
          .select("*")
          .where('id_usuario', id_usuario))[0];
          resolve(user)
    } catch (error) {
      reject(error)
    }
  });
};

export const updateUsuario = (user, id_usuario) => {
  return new Promise(async (resolve, reject) => {
    try {

      (
        await knex('usuario')
        .where('id_usuario',id_usuario)
        .update(user));

          resolve("Sucesso")
    } catch (error) {
      reject(error)
    }
  });
};
