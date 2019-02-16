import _ from 'lodash';
import className from 'classnames';
import React, { Component } from 'react';
import { TableRow } from 'src/components/amortization-schedule/TableRow.jsx';
import { inject, observer } from 'mobx-react';
import { isYearSelected, toggleYear } from 'src/store/UiStore.js';
import './TableBody.css';

export class TableBody extends Component {
    render() {
        return (
            <tbody>
            {this.renderYearlyData()}
            </tbody>
        );
    }

    renderYearlyData() {
        const { loanStore } = this.props;

        return _.map(loanStore.yearlyData, (row, yearIndex) => (
            <>
                <TableRow
                    key={yearIndex}
                    className={this.getYearRowClassName(yearIndex)}
                    {...row}
                    onClick={() => toggleYear(yearIndex)}
                />
                {this.renderMonthlyData(yearIndex)}
            </>
        ));
    }

    renderMonthlyData(yearIndex) {
        const { loanStore } = this.props;

        if (isYearSelected(yearIndex) === false) {
            return null;
        }

        const months = this.getMonthDataForYear(loanStore.monthlyData, yearIndex);

        return _.map(months, (row, monthIndex) => (
            <TableRow
                key={`details-${monthIndex}`}
                className=""
                {...row}
            />
        ));
    }

    getMonthDataForYear(monthlyData, yearIndex) {
        return _.filter(monthlyData, (month, index) => Math.floor(index / 12) === yearIndex);
    }

    getYearRowClassName(yearIndex) {
        return className('year-row', {
            'table-primary': isYearSelected(yearIndex),
        });
    }
}

export const TableBodyContainer = inject('loanStore', 'uiStore')(observer(TableBody));