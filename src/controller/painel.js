import moment from 'moment';
import { ArtigoController } from '../controller/artigo';
import { ValidadeController } from '../controller/validade';
import { DataExpirou } from '../utils/formata-data'
export class PainelController  {
  constructor(){
    this.artigoCtrl = new ArtigoController()
    this.valCtrl = new ValidadeController()
  }
  getDashboardData( id_seccao ) {
    return new Promise(async (resolve, reject) => {
      try {
        const artigos = await this.artigoCtrl.getAllArtigoByOneSeccao(id_seccao)
        const validades = await this.valCtrl.getAllArValByIdSeccao(id_seccao)
        const expirados = validades.filter(validade => DataExpirou(validade.expira) )
        .map((item) => item.expira )

        const validos = validades.filter(validade => !DataExpirou(validade.expira) )
        .map((item) => item.expira )

        
        resolve({artigoTotal:artigos.length,
                validadesTotal:validades.length,
                totalExpirado:expirados.length,
                totalValido:validos.length });
        // const response = (await this.knex('artigo')
        //   .select(knex.raw(`
        //   COUNT(artigo.id_artigo) AS artigoTotal
        //   `))
        //   .innerJoin("notaDeArtigo",
        //   'notaDeArtigo.id_artigo',
        //    'artigo.id_artigo') 
        //    .innerJoin("validade",
        //    'validade.id_artigo',
        //    'artigo.id_artigo') 
        //    .where('notaDeArtigo.id_artigo', id_artigo)
        //    .groupBy('notaDeArtigo.id_artigo')
        //    .first());
           
          
  
        // const artigoTotal = (
        //   await knex('produto')
        //     .select()
        //     .innerJoin(
        //       'notaDeProduto',
        //       'notaDeProduto.id_produto',
        //       'produto.id_produto',
        //     )
        //     .where('notaDeProduto.id_usuario', id_usuario)
        // ).length;
        // const validadesTotal = (await getAllartigoByValidade(id_usuario)).length;
        // const totalExpirado = (await getAllartigoByValidade(id_usuario))
        //   .map(item => {
        //     Object.assign(item, {expirado: DataExpirou(item.expira)});
        //     return DataExpirou(item.expira);
        //   })
        //   .filter(item => item === true).length;
        // const totalValido = (await getAllartigoByValidade(id_usuario))
        //   .map(item => {
        //     Object.assign(item, {expirado: DataExpirou(item.expira)});
        //     return DataExpirou(item.expira);
        //   })
        //   .filter(item => item === false).length;
  
        // console.log(artigoTotal, validadesTotal, totalExpirado, totalValido);
  
        // resolve({artigoTotal, validadesTotal, totalExpirado, totalValido});
      } catch (error) {
        reject(error);
      }
    });
  };


}
