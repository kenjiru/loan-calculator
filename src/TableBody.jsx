import _ from 'lodash';
import React from 'react';
import { TableRow } from 'src/TableRow.jsx';

export const TableBody = ({ data }) => _.map(
    data,
    (row, index) => (
        <TableRow
            key={index}
            {...row}
        />
    ),
);