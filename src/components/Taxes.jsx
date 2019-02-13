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

class Taxes extends Component {
    render() {
        const { loanStore } = this.props;

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h4 className="mb-2">Taxes</h4>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col sm="6">
                        <Label>Property transfer tax <br/>(3.5% of purchase price)</Label>
                    </Col>
                    <Col sm="6">
                        {formatAmount(loanStore.propertyTransferTax)}
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col sm="6">
                        <Label>Registration of ownership title <br/>(1.1% of purchase price)</Label>
                    </Col>
                    <Col sm="6">
                        {formatAmount(loanStore.ownershipRegistrationTax)}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>Notarial fees</h5>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col sm="6">
                        <Label>Notary fee</Label>
                    </Col>

                    <Col sm="4">
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
                                placeholder="Notarial fee"
                                value={loanStore.notaryFee}
                                onChange={this.handleNotaryFeeChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col sm="6">
                        <Label>Real estate agent fee</Label>
                    </Col>

                    <Col sm="4">
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
                                placeholder="Real estate agent fee"
                                value={loanStore.estateAgentFee}
                                onChange={this.handleEstateAgentFeeChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        );
    }

    handleNotaryFeeChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.notaryFee = ev.target.value;

        updateLoanDetails();
    };

    handleEstateAgentFeeChange = (ev) => {
        const { loanStore } = this.props;

        loanStore.estateAgentFee = ev.target.value;

        updateLoanDetails();
    };
}

export const TaxesContainer = inject('loanStore')(observer(Taxes));
