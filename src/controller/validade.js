import moment from 'moment';
import { ValidadeRepository } from '../database/repository/validade';


export class ValidadeController extends ValidadeRepository {
  constructor(){
    super()
  }
  insertValidade( validade ){
    return new Promise(async (resolve, reject) => {
      try {
  
        validade.datacad = moment().format();
        const id_validade = await this.insertOne(validade)
  
        resolve(id_validade);
  
      } catch (error) {
          
        reject(error);
      }
    });
  };
  
  getValidadebyIdArtigo(id_artigo) {
  return new Promise(async (resolve, reject) => {
    try {
   
      const response = (await this.getAll(id_artigo))

      resolve(response)
    } catch (error) {
      reject(error);
    }
  });
  };
  
  deleteValidadeById ( id_validade ) {
    return new Promise(async (resolve, reject) => {
      try {

        const response = await this.deleteOne(id_validade)

      resolve(response);
  
      } catch (error) {
        reject(error);
      }
    });
  };
  getAllArValByIdSeccao  (id_seccao) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = this.getAllByOneSetor(id_seccao)
      resolve(response)
    } catch (error) {
      reject(error);
    }
  });
};



  
}



