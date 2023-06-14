import numeral from 'numeral';

export const formatCurrency = (value) => {
    return numeral(value).format('Kz0,0.00').concat(' Kz');
}