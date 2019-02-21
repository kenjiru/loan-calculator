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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class EarlyRepayment extends Component {
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
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FontAwesomeIcon
                                        icon="clock"
                                        size="sm"
                                    />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                value={loanStore.oneTimePayment.month}
                                placeholder="Month"
                                onChange={this.handleOneTimePaymentMonthChange}
                            />
                        </InputGroup>
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
                                value={loanStore.oneTimePayment.amount}
                                placeholder="Amount"
                                onChange={this.handleOneTimePaymentAmountChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-2 text-warning">
                    <Col md="3">
                        <Label>Monthly payments</Label>
                    </Col>

                    <Col md="3">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FontAwesomeIcon
                                        icon="clock"
                                        size="sm"
                                    />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                value={loanStore.monthlyPayment.startMonth}
                                placeholder="Start month"
                                onChange={this.handleMonthlyPaymentStartMonthChange}
                            />
                        </InputGroup>
                    </Col>

                    <Col md="3">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FontAwesomeIcon
                                        icon="clock"
                                        size="sm"
                                    />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                value={loanStore.monthlyPayment.lengthMonths}
                                placeholder="Length month"
                                onChange={this.handleMonthlyPaymentLengthMonthsChange}
                            />
                        </InputGroup>
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
                                value={loanStore.monthlyPayment.amount}
                                placeholder="Amount"
                                onChange={this.handleMonthlyPaymentAmountChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-2 text-info">
                    <Col md="3">
                        <Label>Yearly payments</Label>
                    </Col>

                    <Col md="3">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FontAwesomeIcon
                                        icon="clock"
                                        size="sm"
                                    />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                value={loanStore.yearlyPayment.startYear}
                                placeholder="Start year"
                                onChange={this.handleYearlyPaymentStartYearChange}
                            />
                        </InputGroup>
                    </Col>

                    <Col md="3">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FontAwesomeIcon
                                        icon="clock"
                                        size="sm"
                                    />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                value={loanStore.yearlyPayment.lengthYears}
                                placeholder="Length years"
                                onChange={this.handleYearlyPaymentLengthYearsChange}
                            />
                        </InputGroup>
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
                                value={loanStore.yearlyPayment.amount}
                                placeholder="Amount"
                                onChange={this.handleYearlyPaymentAmountChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        );
    }

    handleOneTimePaymentMonthChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.oneTimePayment.month = ev.target.value;

        updateLoanDetails();
    };

    handleOneTimePaymentAmountChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.oneTimePayment.amount = ev.target.value;

        updateLoanDetails();
    };

    handleMonthlyPaymentStartMonthChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.monthlyPayment.startMonth = ev.target.value;

        updateLoanDetails();
    };

    handleMonthlyPaymentLengthMonthsChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.monthlyPayment.lengthMonths = ev.target.value;

        updateLoanDetails();
    };

    handleMonthlyPaymentAmountChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.monthlyPayment.amount = ev.target.value;

        updateLoanDetails();
    };

    handleYearlyPaymentStartYearChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.yearlyPayment.startYear = ev.target.value;

        updateLoanDetails();
    };

    handleYearlyPaymentLengthYearsChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.yearlyPayment.lengthYears = ev.target.value;

        updateLoanDetails();
    };

    handleYearlyPaymentAmountChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.yearlyPayment.amount = ev.target.value;

        updateLoanDetails();
    };
}

export const EarlyRepaymentContainer = inject('loanStore', 'uiStore')(observer(EarlyRepayment));
