import React, { Component } from 'react';
import {
    Col,
    Container,
    Input,
    Label,
    Row,
} from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { updateTotalLoanCost } from 'src/store/LoanStore.js';

class LoanFees extends Component {
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

                <Row>
                    <Col>
                        <h5>Taxes, financed by the loan</h5>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col sm="3">
                        <Label>Land registry fee</Label>
                    </Col>

                    <Col sm="3">
                        <Input
                            placeholder="Land registry fee"
                            value={loanStore.landRegistryFee}
                            onChange={this.handleLandRegistryFeeChange}
                        />
                    </Col>
                </Row>

            </Container>
        );
    }

    handleMonthlyFeeChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.monthlyFee = ev.target.value;

        updateTotalLoanCost();
    };

    handleContractFeeChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.contractFee = ev.target.value;

        updateTotalLoanCost();
    };

    handleEvaluationFeeChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.evaluationFee = ev.target.value;

        updateTotalLoanCost();
    };

    handleLandRegistryFeeChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.landRegistryFee = ev.target.value;

        updateTotalLoanCost();
    };
};

export const LoanFeesContainer = inject('loanStore')(observer(LoanFees));
