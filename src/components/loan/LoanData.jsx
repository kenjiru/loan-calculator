import React, { Component } from 'react';
import {
    Col,
    Container, Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateLoanDetails } from 'src/store/LoanStore.js';
import { formatAmount } from 'src/util/amountUtil.js';

export class LoanData extends Component {
    render() {
        const { loanStore } = this.props;

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h4 className="mb-2">Loan Data</h4>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Actual amount financed</Label>
                    </Col>

                    <Col md="4">
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
                    <Col md="4">
                        <Label>Actual available amount</Label>
                    </Col>

                    <Col md="4">
                        {formatAmount(loanStore.availableAmount)}
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Total duration <br />(years)</Label>
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
                                value={loanStore.duration}
                                onChange={this.handleDurationChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Fixed duration <br />(years)</Label>
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
                                value={loanStore.fixDuration}
                                onChange={this.handleFixDurationChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Fixed interest rate</Label>
                    </Col>

                    <Col md="3">
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
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Variable interest rate</Label>
                    </Col>

                    <Col md="3">
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
                                value={loanStore.variableInterest}
                                onChange={this.handleVariableInterestChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        );
    }

    handleFinancedAmountChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.financedAmount = ev.target.value;

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
}

export const LoanDataContainer = inject('loanStore')(observer(LoanData));
