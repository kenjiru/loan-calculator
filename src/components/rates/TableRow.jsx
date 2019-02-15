import React from 'react';
import { formatAmount } from 'src/util/amountUtil.js';

export const TableRow = ({index, repayment, interest, principal, newBalance}) => (
    <tr className={getClassName(index)}>
        <td>{index}</td>
        <td>{formatAmount(repayment)}</td>
        <td>{formatAmount(interest)}</td>
        <td>{formatAmount(principal)}</td>
        <td>{formatAmount(newBalance)}</td>
    </tr>
);

function getClassName(index) {
    return index % 12 === 0 ? "table-warning" : "";
}
