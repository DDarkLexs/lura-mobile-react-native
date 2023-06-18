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

export const formatarDataLongo = data => {
  // Verifica se a data fornecida é válida
  if (!moment(data, 'DD/MM/YYYY').isValid()) {
    return 'Data inválida';
  }

  // Formata a data no formato desejado
  const dataFormatada = moment(data, 'DD/MM/YYYY').format('LL');

  return dataFormatada;
};
export const formatarDataSimples = data => {
  // Verifica se a data fornecida é válida
  if (!moment(data, 'DD/MM/YYYY').isValid()) {
    return 'Data inválida';
  }

  // Formata a data no formato desejado
  const dataFormatada = moment(data, 'DD/MM/YYYY').format('L');

  return dataFormatada;
};

export const contando = data => {
  // Verifica se a data fornecida é válida
  if (!moment(data, 'DD/MM/YYYY').isValid()) {
    return 'Data inválida';
  }

  // Formata a data no formato desejado
  const dataFormatada = moment(data, 'DD/MM/YYYY')
  .fromNow();

  return dataFormatada;
};

export const DataExpirou = expirationDate => {
  const currentDate = moment(); // Data atual
  const expiration = moment(expirationDate, 'DD-MM-YYYY');

  if (expiration.isBefore(currentDate)) {
    return expiration.isBefore(currentDate);
  } else {
    return expiration.isBefore(currentDate);
  }
};
