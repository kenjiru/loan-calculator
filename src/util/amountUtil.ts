import numeral from 'numeral';

export function formatAmount(value: number|string) {
    return numeral(value).format('0,0.00');
}

export function roundAmount(value: number) {
    return Math.round(value * 100) / 100;
}