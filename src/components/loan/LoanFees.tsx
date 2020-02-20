import React, { ChangeEvent, Component } from 'react';
import {
    Col,
    Container,
    Label,
    Row,
} from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { updateLoanDetails } from 'src/store/LoanStore';
import { roundAmount } from 'src/util/amountUtil';
import { InputWithIcon } from 'src/components/input-with-icon/InputWithIcon';

interface Props {
    loanStore?: any;
}

class LoanFees extends Component<Props> {
    render() {
        const { loanStore } = this.props;

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h4 className="mb-2">Loan Fees</h4>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>Monthly fees</h5>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Account costs</Label>
                    </Col>
                    <Col md="4">
                        <InputWithIcon
                            icon="euro-sign"
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
                    <Col md="4">
                        <Label>Contract Fee <br/>(% of amount financed)</Label>
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="percent"
                            value={loanStore.contractFeePercentage}
                            onChange={this.handleContractFeePercentageChange}
                        />
                    </Col>

                    <Col md={{size: 4, offset: 1}}>
                        <InputWithIcon
                            disabled
                            icon="euro-sign"
                            value={loanStore.contractFee}
                            onChange={this.handleContractFeeChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Property evaluation fee <br/>(% of amount financed)</Label>
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="percent"
                            value={loanStore.evaluationFeePercentage}
                            onChange={this.handleEvaluationFeePercentageChange}
                        />
                    </Col>

                    <Col md={{size: 4, offset: 1}}>
                        <InputWithIcon
                            disabled
                            icon="euro-sign"
                            value={roundAmount(loanStore.evaluationFee)}
                            onChange={this.handleEvaluationFeeChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Mortgage registration tax <br/>(1.2% of amount financed)</Label>
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="percent"
                            value={loanStore.mortgageRegistrationReferencePercentage}
                            onChange={this.handleMortgageRegistrationReferencePercentageChange}
                        />
                    </Col>

                    <Col md={{size: 4, offset: 1}}>
                        <InputWithIcon
                            disabled
                            icon="euro-sign"
                            value={loanStore.mortgageRegistrationTax}
                            onChange={this.handleMortgageRegistrationTaxChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Other bank fees</Label>
                    </Col>
                    <Col md="4">
                        <InputWithIcon
                            icon="euro-sign"
                            value={loanStore.otherBankFees}
                            onChange={this.handleOtherBankFeesChange}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }

    handleMonthlyFeeChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.monthlyFee = ev.target.value;

        updateLoanDetails();
    };

    handleContractFeeChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.contractFee = ev.target.value;

        updateLoanDetails();
    };

    handleContractFeePercentageChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.contractFeePercentage = ev.target.value;

        updateLoanDetails();
    };

    handleEvaluationFeeChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.evaluationFee = ev.target.value;

        updateLoanDetails();
    };

    handleEvaluationFeePercentageChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.evaluationFeePercentage = ev.target.value;

        updateLoanDetails();
    };

    handleMortgageRegistrationReferencePercentageChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.mortgageRegistrationReferencePercentage = ev.target.value;

        updateLoanDetails();
    };

    handleMortgageRegistrationTaxChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.mortgageRegistrationTax = ev.target.value;

        updateLoanDetails();
    };

    handleOtherBankFeesChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.otherBankFees = ev.target.value;

        updateLoanDetails();
    };
}

export const LoanFeesContainer = inject('loanStore')(observer(LoanFees));
