import React, { Component } from 'react';
import { Alert, Col, Collapse, Container, Row } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { formatAmount } from 'src/util/amountUtil.js';
import { SECTION, toggleSection } from 'src/store/UiStore.js';
import { PropertyDataContainer } from 'src/components/property/PropertyData.jsx';
import { LoanSummaryContainer } from 'src/components/loan/LoanSummary.jsx';
import { LoanFeesContainer } from 'src/components/loan/LoanFees.jsx';
import { PropertyTaxesContainer } from 'src/components/property/PropertyTaxes.jsx';
import { LoanDataContainer } from 'src/components/loan/LoanData.jsx';
import { EarlyRepaymentContainer } from 'src/components/early-repayment/EarlyRepayment.jsx';
import './TopPart.css';

export class TopPart extends Component {
    state = {
        selectedSection: SECTION.PROPERTY,
    };

    render() {
        const selectedSection = this.props.uiStore.selectedSection;

        return (
            <Container
                className="top-part mb-4"
                fluid
            >
                <Alert
                    color="primary"
                    className="mb-0"
                    onClick={() => toggleSection(SECTION.PROPERTY)}
                >
                    <b>Property Information.</b> &nbsp;
                    {this.renderPropertyInfo()}
                </Alert>

                <Collapse isOpen={selectedSection === SECTION.PROPERTY}>
                    <Container
                        className="pt-4"
                        fluid
                    >
                        <Row className="mb-4">
                            <Col md="6">
                                <PropertyDataContainer />
                            </Col>
                            <Col md="6">
                                <PropertyTaxesContainer />
                            </Col>
                        </Row>
                    </Container>
                </Collapse>

                <Alert
                    color="success"
                    className="mb-0"
                    onClick={() => toggleSection(SECTION.LOAN_DATA)}
                >
                    <b>Loan Data.</b> &nbsp;
                    {this.renderLoanDataInfo()}
                </Alert>

                <Collapse isOpen={selectedSection === SECTION.LOAN_DATA}>
                    <Container
                        className="pt-4"
                        fluid
                    >
                        <Row className="mb-4">
                            <Col md="6">
                                <LoanDataContainer />
                            </Col>
                            <Col md="6">
                                <LoanFeesContainer />
                            </Col>
                        </Row>
                    </Container>
                </Collapse>

                <Alert
                    color="dark"
                    className="mb-0"
                    onClick={() => toggleSection(SECTION.EARLY_REPAYMENT)}
                >
                    <b>Early Repayment.</b> &nbsp;
                </Alert>

                <Collapse isOpen={selectedSection === SECTION.EARLY_REPAYMENT}>
                    <Container
                        className="pt-4"
                        fluid
                    >
                        <Row className="mb-4">
                            <Col md="6">
                                <EarlyRepaymentContainer />
                            </Col>
                        </Row>
                    </Container>
                </Collapse>

                <Alert
                    color="warning"
                    className="mb-0"
                    onClick={() => toggleSection(SECTION.LOAN_SUMMARY)}
                >
                    <b>Loan Summary.</b> &nbsp;
                    {this.renderLoanSummaryInfo()}
                </Alert>

                <Collapse isOpen={selectedSection === SECTION.LOAN_SUMMARY}>
                    <Container
                        className="pt-4"
                        fluid
                    >
                        <Row className="mb-4">
                            <Col md="6">
                                <LoanSummaryContainer />
                            </Col>
                        </Row>
                    </Container>
                </Collapse>
            </Container>
        );
    }

    renderPropertyInfo() {
        const { loanStore, uiStore } = this.props;

        if (uiStore.selectedSection === SECTION.PROPERTY) {
            return null;
        }

        const propertyTaxes = loanStore.propertyTransferTax +
            loanStore.ownershipRegistrationTax +
            parseFloat(loanStore.notaryFee) +
            parseFloat(loanStore.estateAgentFee);

        return (
            <>
                Value: <b>{formatAmount(loanStore.purchasePrice)}</b> euros.
                Taxes: <b>{formatAmount(propertyTaxes)}</b> euros.
            </>
        );
    }

    renderLoanDataInfo() {
        const { loanStore, uiStore } = this.props;

        if (uiStore.selectedSection === SECTION.LOAN_DATA) {
            return null;
        }

        const bankFees = loanStore.contractFee +
            loanStore.evaluationFee +
            loanStore.mortgageRegistrationTax +
            parseFloat(loanStore.otherBankFees);

        return (
            <>
                Financed value: <b>{formatAmount(loanStore.financedAmount)}</b> euros.
                Fees: <b>{formatAmount(bankFees)}</b> years.
                Total: <b>{loanStore.duration}</b> years.
                Fixed: <b>{loanStore.fixDuration}</b> years.
                Fixed interest <b>{loanStore.interest}</b> %.
                Variable interest <b>{loanStore.variableInterest}</b> %.
            </>
        );
    }

    renderLoanSummaryInfo() {
        const { loanStore, uiStore } = this.props;

        if (uiStore.selectedSection === SECTION.LOAN_SUMMARY) {
            return null;
        }

        return (
            <>
                Total interest: <b>{formatAmount(loanStore.totalInterest)}</b> euros.
                Total loan cost: <b>{formatAmount(loanStore.totalLoanCost)}</b> years.
            </>
        );
    }
}

export const TopPartContainer = inject('loanStore', 'uiStore')(observer(TopPart));
