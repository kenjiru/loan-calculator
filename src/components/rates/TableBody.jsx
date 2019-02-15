import _ from 'lodash';
import React from 'react';
import { TableRow } from 'src/components/rates/TableRow.jsx';
import { inject, observer } from 'mobx-react';

function renderMonthlyData(monthlyData) {
    return _.map(
        monthlyData,
        (row, index) => (
            <TableRow
                key={index}
                {...row}
            />
        ));
}

export const TableBody = ({ loanStore }) => (
    <tbody className="table-hover">
        {renderMonthlyData(loanStore.monthlyData)}
    </tbody>
);

export const TableBodyContainer = inject('loanStore')(observer(TableBody));