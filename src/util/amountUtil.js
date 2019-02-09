import numeral from 'numeral';

export function formatAmount(value) {
    return numeral(value).format('0,0.00');
}
