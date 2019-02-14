import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { formatAmount } from 'src/util/amountUtil.js';
import {
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Label,
    Row,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateLoanDetails } from 'src/store/LoanStore.js';

export class FinalCosts extends Component {
    render() {
        const { loanStore } = this.props;

        return (
            <Container fluid>
                <h4>Amount to finance</h4>

                <Row className="mb-2">
                    <Col md="3">
                        <Label>Actual amount financed</Label>
                    </Col>

                    <Col md="3">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FontAwesomeIcon
                                        icon="euro-sign"
                                        size="sm"
                                    />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                value={loanStore.financedAmount}
                                onChange={this.handleFinancedAmountChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="3">
                        <Label>Actual available amount</Label>
                    </Col>

                    <Col md="3">
                        {formatAmount(loanStore.availableAmount)}
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="3">
                        <h4>Loan final cost</h4>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="3">
                        <Label>Total interest:</Label>
                    </Col>
                    <Col md="3">
                        {formatAmount(loanStore.totalInterest)}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="3">
                        <Label>Fixed period interest</Label>
                    </Col>
                    <Col md="3">
                        {formatAmount(loanStore.fixPeriodInterest)}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="3">
                        <Label>
                            Total loan cost
                        </Label>
                    </Col>
                    <Col md="3">
                        {formatAmount(loanStore.totalLoanCost)}
                    </Col>
                </Row>
            </Container>
        );
    };

    handleFinancedAmountChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.financedAmount = ev.target.value;

        updateLoanDetails();
    };
}

export const LoanCostsContainer = inject('loanStore')(observer(FinalCosts));
