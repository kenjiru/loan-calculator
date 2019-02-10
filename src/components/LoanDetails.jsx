import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { LoadInputDataContainer } from 'src/components/LoanInputData.jsx';
import { LoanCostsContainer } from 'src/components/LoanCosts.jsx';
import { LoanFeesContainer } from 'src/components/LoanFees.jsx';

export const LoanDetails = () => (
    <Container fluid>
        <Row className="mb-4">
            <Col xl="4" lg="6">
                <LoadInputDataContainer />
            </Col>
            <Col xl="4" lg="6">
                <LoanFeesContainer />
            </Col>
            <Col xl="4">
                <LoanCostsContainer />
            </Col>
        </Row>
    </Container>
);