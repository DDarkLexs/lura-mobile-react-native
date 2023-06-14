import moment from 'moment';
import 'moment/locale/pt-br';

// Obtendo a data atual
const dataAtual = moment();

// Formatando a data no formato desejado
export const dataFormatada = dataAtual.format('LL');

export const formatarData = data => {
  // Verifica se a data fornecida é válida
  if (!moment(data, 'DD/MM/YYYY').isValid()) {
    return 'Data inválida';
  }

  // Formata a data no formato desejado
  const dataFormatada = moment(data, 'DD/MM/YYYY').format('LL');

  return dataFormatada;
};
