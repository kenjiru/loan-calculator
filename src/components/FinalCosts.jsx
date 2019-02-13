import React from 'react';
import { inject, observer } from 'mobx-react';
import { formatAmount } from 'src/util/amountUtil.js';
import { Container } from 'reactstrap';

export const FinalCosts = ({ loanStore }) => (
    <Container fluid>
        <h4>Amount to finance</h4>
        <div>Nominal amount: {formatAmount(loanStore.nominalAmount)}</div>
        <div>Available amount: {formatAmount(loanStore.availableAmount)}</div>

        <h4>Loan final cost</h4>
        <div>Total interest: {formatAmount(loanStore.totalInterest)}</div>
        <div>Fixed period interest: {formatAmount(loanStore.fixPeriodInterest)}</div>
        <div>Total loan cost: {formatAmount(loanStore.totalLoanCost)}</div>
    </Container>
);

export const LoanCostsContainer = inject('loanStore')(observer(FinalCosts));
