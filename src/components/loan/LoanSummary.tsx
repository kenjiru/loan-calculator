import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { formatAmount } from 'src/util/amountUtil';
import {
    Col,
    Container,
    Row, Table,
} from 'reactstrap';

interface Props {
    loanStore?: any;
}

export class LoanSummary extends Component<Props> {
    render() {
        const { loanStore } = this.props;

        return (
            <Container fluid>
                <Row className="mb-2">
                    <Col md="4">
                        <h4>Loan Summary</h4>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="12">
                        <Table className="w-100" borderless>
                            <thead>
                            <tr>
                                <th></th>
                                <td>Total interest</td>
                                <td>Fix period interest</td>
                                <td>Total loan costs</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th>Normal payment</th>
                                <td>{formatAmount(loanStore.totalInterest)}</td>
                                <td>{formatAmount(loanStore.fixPeriodInterest)}</td>
                                <td>{formatAmount(loanStore.totalLoanCost)}</td>
                            </tr>
                            <tr className="text-primary">
                                <th>One time repayment</th>
                                <td>{formatAmount(loanStore.oneTimePayment.totalInterest)}</td>
                                <td>{formatAmount(loanStore.oneTimePayment.fixPeriodInterest)}</td>
                                <td>{formatAmount(loanStore.oneTimePayment.totalLoanCost)}</td>

                            </tr>
                            <tr className="text-warning">
                                <th>Monthly repayment</th>
                                <td>{formatAmount(loanStore.monthlyPayment.totalInterest)}</td>
                                <td>{formatAmount(loanStore.monthlyPayment.fixPeriodInterest)}</td>
                                <td>{formatAmount(loanStore.monthlyPayment.totalLoanCost)}</td>
                            </tr>

                            <tr className="text-info">
                                <th>Yearly repayment</th>
                                <td>{formatAmount(loanStore.yearlyPayment.totalInterest)}</td>
                                <td>{formatAmount(loanStore.yearlyPayment.fixPeriodInterest)}</td>
                                <td>{formatAmount(loanStore.yearlyPayment.totalLoanCost)}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    };
}

export const LoanSummaryContainer = inject('loanStore')(observer(LoanSummary));
