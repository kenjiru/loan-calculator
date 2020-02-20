import React, { ChangeEvent, Component } from 'react';
import {
    Col,
    Container,
    Label,
    Row,
} from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { updateLoanDetails } from 'src/store/LoanStore';
import { InputWithIcon } from 'src/components/input-with-icon/InputWithIcon';

interface Props {
    loanStore?: any;
}

class EarlyRepayment extends Component<Props> {
    render() {
        const { loanStore } = this.props;

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h4 className="mb-2">Early Repayment</h4>
                    </Col>
                </Row>

                <Row className="mb-2 text-primary">
                    <Col md="3">
                        <Label>One time payment</Label>
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="clock"
                            value={loanStore.oneTimePayment.month}
                            placeholder="Month"
                            onChange={this.handleOneTimePaymentMonthChange}
                        />
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="euro-sign"
                            value={loanStore.oneTimePayment.amount}
                            placeholder="Amount"
                            onChange={this.handleOneTimePaymentAmountChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-2 text-warning">
                    <Col md="3">
                        <Label>Monthly payments</Label>
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="clock"
                            value={loanStore.monthlyPayment.startMonth}
                            placeholder="Start month"
                            onChange={this.handleMonthlyPaymentStartMonthChange}
                        />
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="clock"
                            value={loanStore.monthlyPayment.lengthMonths}
                            placeholder="Length month"
                            onChange={this.handleMonthlyPaymentLengthMonthsChange}
                        />
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="euro-sign"
                            value={loanStore.monthlyPayment.amount}
                            placeholder="Amount"
                            onChange={this.handleMonthlyPaymentAmountChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-2 text-info">
                    <Col md="3">
                        <Label>Yearly payments</Label>
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="clock"
                            value={loanStore.yearlyPayment.startYear}
                            placeholder="Start year"
                            onChange={this.handleYearlyPaymentStartYearChange}
                        />
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="clock"
                            value={loanStore.yearlyPayment.lengthYears}
                            placeholder="Length years"
                            onChange={this.handleYearlyPaymentLengthYearsChange}
                        />
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="euro-sign"
                            value={loanStore.yearlyPayment.amount}
                            placeholder="Amount"
                            onChange={this.handleYearlyPaymentAmountChange}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }

    handleOneTimePaymentMonthChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.oneTimePayment.month = ev.target.value;

        updateLoanDetails();
    };

    handleOneTimePaymentAmountChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.oneTimePayment.amount = ev.target.value;

        updateLoanDetails();
    };

    handleMonthlyPaymentStartMonthChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.monthlyPayment.startMonth = ev.target.value;

        updateLoanDetails();
    };

    handleMonthlyPaymentLengthMonthsChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.monthlyPayment.lengthMonths = ev.target.value;

        updateLoanDetails();
    };

    handleMonthlyPaymentAmountChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.monthlyPayment.amount = ev.target.value;

        updateLoanDetails();
    };

    handleYearlyPaymentStartYearChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.yearlyPayment.startYear = ev.target.value;

        updateLoanDetails();
    };

    handleYearlyPaymentLengthYearsChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.yearlyPayment.lengthYears = ev.target.value;

        updateLoanDetails();
    };

    handleYearlyPaymentAmountChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.yearlyPayment.amount = ev.target.value;

        updateLoanDetails();
    };
}

export const EarlyRepaymentContainer = inject('loanStore', 'uiStore')(observer(EarlyRepayment));
