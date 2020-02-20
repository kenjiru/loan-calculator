import React, { ChangeEvent, Component } from 'react';
import {
    Col,
    Container,
    Label,
    Row,
} from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { updateLoanDetails } from 'src/store/LoanStore';
import { formatAmount } from 'src/util/amountUtil';
import { InputWithIcon } from 'src/components/input-with-icon/InputWithIcon';

interface Props {
    loanStore?: any;
}

export class LoanData extends Component<Props> {
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
                        <InputWithIcon
                            icon="euro-sign"
                            value={loanStore.financedAmount}
                            onChange={this.handleFinancedAmountChange}
                        />
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
                        <InputWithIcon
                            icon="clock"
                            value={loanStore.duration}
                            onChange={this.handleDurationChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Fixed duration <br />(years)</Label>
                    </Col>
                    <Col md="3">
                        <InputWithIcon
                            icon="clock"
                            value={loanStore.fixDuration}
                            onChange={this.handleFixDurationChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Fixed interest rate</Label>
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="percent"
                            placeholder="Interest rate"
                            value={loanStore.interest}
                            onChange={this.handleInterestChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md="4">
                        <Label>Variable interest rate</Label>
                    </Col>

                    <Col md="3">
                        <InputWithIcon
                            icon="percent"
                            placeholder="Interest rate"
                            value={loanStore.variableInterest}
                            onChange={this.handleVariableInterestChange}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }

    handleFinancedAmountChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.financedAmount = ev.target.value;

        updateLoanDetails();
    };

    handleInterestChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.interest = ev.target.value;

        updateLoanDetails();
    };

    handleVariableInterestChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.variableInterest = ev.target.value;

        updateLoanDetails();
    };

    handleDurationChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.duration = ev.target.value;

        updateLoanDetails();
    };

    handleFixDurationChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { loanStore } = this.props;

        loanStore.fixDuration = ev.target.value;

        updateLoanDetails();
    };
}

export const LoanDataContainer = inject('loanStore')(observer(LoanData));
