import React, { ChangeEvent, Component } from 'react';
import {
    Col,
    Container,
    Input, InputGroup, InputGroupAddon, InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { updateLoanDetails } from 'src/store/LoanStore';
import { formatAmount } from 'src/util/amountUtil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    loanStore?: any;
}

class PropertyTaxes extends Component<Props> {
    render() {
        const { loanStore } = this.props;

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h4 className="mb-2">Property Taxes</h4>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Property transfer tax <br/>(3.5% of purchase price)</Label>
                    </Col>
                    <Col md="4">
                        {formatAmount(loanStore.propertyTransferTax)}
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Registration of ownership title <br/>(1.1% of purchase price)</Label>
                    </Col>
                    <Col md="4">
                        {formatAmount(loanStore.ownershipRegistrationTax)}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>Notarial fees</h5>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Notary fee</Label>
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
                                value={loanStore.notaryFee}
                                onChange={this.handleNotaryFeeChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Real estate agent fee</Label>
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
                                value={loanStore.estateAgentFee}
                                onChange={this.handleEstateAgentFeeChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Minimum available amount needed</Label>
                    </Col>

                    <Col md="4">
                        <b>{formatAmount(loanStore.minimumAmount)}</b>
                    </Col>
                </Row>
            </Container>
        );
    }

    handleNotaryFeeChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.notaryFee = ev.target.value;

        updateLoanDetails();
    };

    handleEstateAgentFeeChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.estateAgentFee = ev.target.value;

        updateLoanDetails();
    };
}

export const PropertyTaxesContainer = inject('loanStore')(observer(PropertyTaxes));
