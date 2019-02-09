import React from 'react';
import { formatNumber } from 'src/utils.js';

export const TableRow = ({index, repayment, interest, principal, newBalance}) => (
    <tr className={getClassName(index)}>
        <th scope="row">{index}</th>
        <td>{formatNumber(repayment)}</td>
        <td>{formatNumber(interest)}</td>
        <td>{formatNumber(principal)}</td>
        <td>{formatNumber(newBalance)}</td>
    </tr>
);

function getClassName(index) {
    return index % 12 === 0 ? "bg-secondary" : "";
}
