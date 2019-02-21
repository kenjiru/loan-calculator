import React from 'react';

export const TableRow = ({className, onClick, index, repayment, interest, principal, newBalance}) => (
    <tr className={className} onClick={onClick}>
        <td className="row-index">{index}</td>
        <td>{repayment}</td>
        <td>{interest}</td>
        <td>{principal}</td>
        <td>{newBalance}</td>
    </tr>
);
