import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { formatAmount } from 'src/util/amountUtil.js';
import {
    Col,
    Container,
    Label,
    Row,
} from 'reactstrap';

export class LoanSummary extends Component {
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
                    <Col md="4">
                        <Label>Total interest:</Label>
                    </Col>
                    <Col md="4">
                        {formatAmount(loanStore.totalInterest)}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <Label>Fixed period interest</Label>
                    </Col>
                    <Col md="4">
                        {formatAmount(loanStore.fixPeriodInterest)}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <Label>
                            Total loan cost
                        </Label>
                    </Col>
                    <Col md="4">
                        {formatAmount(loanStore.totalLoanCost)}
                    </Col>
                </Row>
            </Container>
        );
    };
}

export const LoanSummaryContainer = inject('loanStore')(observer(LoanSummary));
