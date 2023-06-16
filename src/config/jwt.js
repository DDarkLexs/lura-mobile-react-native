import moment from 'moment';
import { knex } from '../utils/database'
const secretKey = 'your-secret-key';

export const generateAccessToken = (user) => {
  return new Promise(async (resolve,reject) => {
    try {
      const response  = await knex('auth').insert({   
        query:JSON.stringify(user),
        secretKey:secretKey,
        hash:secretKey,
        expireIn:moment().second("1600s")
       }) 
    } catch (error) {
      reject(error)
    }

  })
  // console.log(user)
}

export const verifyToken = () => {
  return new Promise(async (resolve, reject) => {
    await knex('auth')
    .select("*")
  });
};
