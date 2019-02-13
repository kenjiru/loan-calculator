import numeral from 'numeral';

export function formatAmount(value) {
    return numeral(value).format('0,0.00');
}

export function roundAmount(value) {
    return Math.round(value * 100) / 100;
}