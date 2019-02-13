import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { LoadInputDataContainer } from 'src/components/LoanInputData.jsx';
import { LoanCostsContainer } from 'src/components/FinalCosts.jsx';
import { LoanFeesContainer } from 'src/components/Fees.jsx';
import { TaxesContainer } from 'src/components/Taxes.jsx';

export const LoanDetails = () => (
    <Container fluid>
        <Row className="mb-4">
            <Col xl="4" lg="6">
                <LoadInputDataContainer />
            </Col>
            <Col xl="4" lg="6">
                <TaxesContainer />
            </Col>
            <Col xl="4" lg="6">
                <LoanFeesContainer />
            </Col>
            <Col xl="4" lg="6">
                <LoanCostsContainer />
            </Col>
        </Row>
    </Container>
);