import React, { ChangeEvent, Component } from 'react';
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
import { updateLoanDetails } from 'src/store/LoanStore';

interface Props {
    loanStore?: any;
}

class PropertyData extends Component<Props> {
    render() {
        const { loanStore } = this.props;

        return (
            <Container fluid>
                <Row className="mb-2">
                    <Col>
                        <h4 className="mb-2">Property Info</h4>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Amount</Label>
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
                                placeholder="Loan amount"
                                value={loanStore.purchasePrice}
                                onChange={this.handlePurchasePriceChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Own capital</Label>
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
                                placeholder="Own capital"
                                value={loanStore.ownCapital}
                                onChange={this.handleOwnCapitalChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        );
    }

    handlePurchasePriceChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.purchasePrice = ev.target.value;

        updateLoanDetails();
    };

    handleOwnCapitalChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.ownCapital = ev.target.value;

        updateLoanDetails();
    };
}

export const PropertyDataContainer = inject('loanStore')(observer(PropertyData));
