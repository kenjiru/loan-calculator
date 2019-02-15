import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { PropertyDataContainer } from 'src/components/property/PropertyData.jsx';
import { LoanSummaryContainer } from 'src/components/loan/LoanSummary.jsx';
import { LoanFeesContainer } from 'src/components/loan/LoanFees.jsx';
import { PropertyTaxesContainer } from 'src/components/property/PropertyTaxes.jsx';
import { LoanDataContainer } from 'src/components/loan/LoanData.jsx';

export const TopPart = () => (
    <Container fluid>
        <Row className="mb-4">
            <Col md="6">
                <PropertyDataContainer />
            </Col>
            <Col md="6">
                <PropertyTaxesContainer />
            </Col>
        </Row>

        <Row className="mb-4">
            <Col md="6">
                <LoanDataContainer />
            </Col>
            <Col md="6">
                <LoanFeesContainer />
            </Col>
            <Col md="6">
                <LoanSummaryContainer />
            </Col>
        </Row>
    </Container>
);