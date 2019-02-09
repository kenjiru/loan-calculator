import React, { Component } from 'react';
import {
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Label, Row,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { inject, observer } from 'mobx-react';
import { updateLoanDetails } from 'src/store/LoanStore.js';

class LoanInputData extends Component {
    render() {
        const { loanStore } = this.props;

        return (
            <Container fluid>
                <Row className="mb-2">
                    <Col>
                        <h4 className="mb-2">Loan input data</h4>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col sm="3">
                        <Label>Amount</Label>
                    </Col>
                    <Col sm="9">
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
                                placeholder="Loan amount"
                                value={loanStore.amount}
                                onChange={this.handleAmountChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col sm="3">
                        <Label>Total duration</Label>
                    </Col>
                    <Col sm="3">
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
                                placeholder="Duration in years"
                                value={loanStore.duration}
                                onChange={this.handleDurationChange}
                            />
                        </InputGroup>
                    </Col>

                    <Col sm="3">
                        <Label>Fixed duration</Label>
                    </Col>
                    <Col sm="3">
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
                                placeholder="Fix duration"
                                value={loanStore.fixDuration}
                                onChange={this.handleFixDurationChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col sm="3">
                        <Label>Fixed interest rate</Label>
                    </Col>

                    <Col sm="3">
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
                                value={loanStore.interest}
                                onChange={this.handleInterestChange}
                            />
                        </InputGroup>
                    </Col>

                    <Col sm="3">
                        <Label>Variable interest rate</Label>
                    </Col>

                    <Col sm="3">
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
                                placeholder="variableInterest"
                                value={loanStore.variableInterest}
                                onChange={this.handleVariableInterestChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        );
    }

    handleAmountChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.amount = ev.target.value;

        updateLoanDetails();
    };

    handleInterestChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.interest = ev.target.value;

        updateLoanDetails();
    };

    handleVariableInterestChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.variableInterest = ev.target.value;

        updateLoanDetails();
    };

    handleDurationChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.duration = ev.target.value;

        updateLoanDetails();
    };

    handleFixDurationChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.fixDuration = ev.target.value;

        updateLoanDetails();
    };
};

export const LoadInputDataContainer = inject('loanStore')(observer(LoanInputData));
