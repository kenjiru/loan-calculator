import React from 'react';
import { inject, observer } from 'mobx-react';
import { formatAmount } from 'src/util/amountUtil.js';
import { Container } from 'reactstrap';

export const LoanCosts = ({ loanStore }) => (
    <Container fluid>
        <h4>Loan final cost</h4>
        <div>Total interest: {formatAmount(loanStore.totalInterest)}</div>
        <div>Fixed period interest: {formatAmount(loanStore.fixPeriodInterest)}</div>
        <div>Total loan cost: {formatAmount(loanStore.totalLoanCost)}</div>
    </Container>
);

export const LoanCostsContainer = inject('loanStore')(observer(LoanCosts));
