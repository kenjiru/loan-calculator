import React from 'react';
import { formatAmount } from 'src/util/amountUtil.js';

export const TableRow = ({className, onClick, index, repayment, interest, principal, newBalance}) => (
    <tr className={className} onClick={onClick}>
        <td className="row-index">{index}</td>
        <td>{formatAmount(repayment)}</td>
        <td>{formatAmount(interest)}</td>
        <td>{formatAmount(principal)}</td>
        <td>{formatAmount(newBalance)}</td>
    </tr>
);
