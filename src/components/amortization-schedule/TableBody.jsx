import _ from 'lodash';
import className from 'classnames';
import React, { Component } from 'react';
import { TableRow } from 'src/components/amortization-schedule/TableRow.jsx';
import { inject, observer } from 'mobx-react';
import { isYearSelected, toggleYear } from 'src/store/UiStore.js';
import './TableBody.css';
import { formatAmount } from 'src/util/amountUtil.js';

const MONTHS_IN_YEAR = 12;

const STORE_TYPE = {
    NORMAL: 'normal',
    ONE_TIME: 'one-time',
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
};

const VALUE_CLASS_NAME = {
    [STORE_TYPE.NORMAL]: '',
    [STORE_TYPE.ONE_TIME]: 'text-primary',
    [STORE_TYPE.MONTHLY]: 'text-warning',
    [STORE_TYPE.YEARLY]: 'text-info',
};

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

        return _.range(loanStore.duration)
            .map(yearIndex => (
                <>
                    <TableRow
                        key={yearIndex}
                        className={this.getYearRowClassName(yearIndex)}
                        onClick={() => toggleYear(yearIndex)}
                        {...this.getData('yearlyData', yearIndex)}
                    />
                    {this.renderMonthlyData(yearIndex)}
                </>
            ));
    }

    renderMonthlyData(yearIndex) {
        if (isYearSelected(yearIndex) === false) {
            return null;
        }

        return _.range(MONTHS_IN_YEAR)
            .map(monthIndex => (
                <TableRow
                    key={`details-${yearIndex * MONTHS_IN_YEAR + monthIndex}`}
                    {...this.getData('monthlyData', yearIndex * MONTHS_IN_YEAR + monthIndex)}
                />
            ));
    }

    getData(storeName, rowIndex) {
        const indexPrefix = storeName === 'yearlyData' ? 'Year' : 'Month';

        return {
            index: `${indexPrefix} ${rowIndex + 1}`,
            repayment: this.getStoreValues(storeName, rowIndex, 'repayment'),
            interest: this.getStoreValues(storeName, rowIndex, 'interest'),
            principal: this.getStoreValues(storeName, rowIndex, 'principal'),
            newBalance: this.getStoreValues(storeName, rowIndex, 'newBalance'),
        };
    }

    getStoreValues(storeName, index, storeKey) {
        const { loanStore } = this.props;
        const yearlyData = loanStore[storeName];
        const oneTimeData = loanStore.oneTimePayment[storeName];
        const monthlyPaymentData = loanStore.monthlyPayment[storeName];
        const yearlyPaymentData = loanStore.yearlyPayment[storeName];

        const value = yearlyData[index][storeKey];

        return [
            this.renderValue(value, STORE_TYPE.NORMAL),
            this.renderStoreValue(value, oneTimeData, index, storeKey, STORE_TYPE.ONE_TIME),
            this.renderStoreValue(value, monthlyPaymentData, index, storeKey, STORE_TYPE.MONTHLY),
            this.renderStoreValue(value, yearlyPaymentData, index, storeKey, STORE_TYPE.YEARLY),
        ];
    }

    renderStoreValue(initialValue, store, index, storeKey, storeType) {
        if (_.isEmpty(store)) {
            return null;
        }

        const value = store[index][storeKey];

        if (value === initialValue) {
            return null;
        }

        return (
            <span> \ {this.renderValue(value, storeType)}</span>
        );
    }

    renderValue(value, storeType) {
        const className = VALUE_CLASS_NAME[storeType];

        return (
            <span className={className}>{formatAmount(value)}</span>
        );
    }

    getMonthDataForYear(monthlyData, yearIndex) {
        return _.filter(monthlyData,
            (month, index) => Math.floor(index / MONTHS_IN_YEAR) === yearIndex,
        );
    }

    getYearRowClassName(yearIndex) {
        return className('year-row', {
            'table-primary': isYearSelected(yearIndex),
        });
    }
}

export const TableBodyContainer = inject('loanStore', 'uiStore')(observer(TableBody));