import React, { FC } from 'react';

export const TableHeader: FC = () => (
    <thead className="thead-light">
    <tr>
        <th className="w-10 text-center">#</th>
        <th className="w-15">Repayment</th>
        <th className="w-15">Interest</th>
        <th className="w-15">Principal</th>
        <th className="w-15">New Balance</th>
    </tr>
    </thead>
);
