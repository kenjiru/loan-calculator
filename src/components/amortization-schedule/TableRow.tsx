import React, { FC, MouseEventHandler, ReactNode } from 'react';

interface Props {
    className?: string;
    onClick?: MouseEventHandler<HTMLElement>;
    index: string; // TODO Rename this to column ID
    repayment: Array<ReactNode>;
    interest: Array<ReactNode>;
    principal: Array<ReactNode>;
    newBalance: Array<ReactNode>;
}

export const TableRow: FC<Props> = ({ className, onClick, index, repayment, interest, principal, newBalance }) => (
    <tr className={className} onClick={onClick}>
        <td className="row-index">{index}</td>
        <td>{repayment}</td>
        <td>{interest}</td>
        <td>{principal}</td>
        <td>{newBalance}</td>
    </tr>
);
