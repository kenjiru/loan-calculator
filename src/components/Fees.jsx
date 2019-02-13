import React, { Component } from 'react';
import {
    Col,
    Container,
    Input, InputGroup, InputGroupAddon, InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { updateLoanDetails } from 'src/store/LoanStore.js';
import { formatAmount } from 'src/util/amountUtil.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Fees extends Component {
    render() {
        const { loanStore } = this.props;

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h4 className="mb-2">Loan fees</h4>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>Monthly fees</h5>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col sm="3">
                        <Label>Account costs</Label>
                    </Col>
                    <Col sm="3">
                        <Input
                            id="monthly-fee"
                            placeholder="Monthly fee"
                            value={loanStore.monthlyFee}
                            onChange={this.handleMonthlyFeeChange}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>Bank fees, financed by the loan</h5>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col sm="3">
                        <Label>Contract Fee</Label>
                    </Col>
                    <Col sm="3">
                        <Input
                            placeholder="Contract Fee"
                            value={loanStore.contractFee}
                            onChange={this.handleContractFeeChange}
                        />

                    </Col>

                    <Col sm="3">
                        <Label>Property evaluation fee</Label>
                    </Col>

                    <Col sm="3">
                        <Input
                            placeholder="Evaluation fee"
                            value={loanStore.evaluationFee}
                            onChange={this.handleEvaluationFeeChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col sm="4">
                        <Label>Mortgage registration tax <br/>(1.2% of the loan)</Label>
                    </Col>

                    <Col sm="4">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FontAwesomeIcon
                                        icon="percent"
                                        size="sm"
                                    />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Interest rate"
                                value={loanStore.mortgageRegistrationPercentage}
                                onChange={this.handleMortgageRegistrationPercentageChange}
                            />
                        </InputGroup>
                    </Col>

                    <Col sm="4">
                        {formatAmount(loanStore.mortgageRegistrationTax)}
                    </Col>
                </Row>
            </Container>
        );
    }

    handleMonthlyFeeChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.monthlyFee = ev.target.value;

        updateLoanDetails();
    };

    handleContractFeeChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.contractFee = ev.target.value;

        updateLoanDetails();
    };

    handleEvaluationFeeChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.evaluationFee = ev.target.value;

        updateLoanDetails();
    };

    handleMortgageRegistrationPercentageChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.mortgageRegistrationPercentage = ev.target.value;

        updateLoanDetails();
    };
}

export const LoanFeesContainer = inject('loanStore')(observer(Fees));
