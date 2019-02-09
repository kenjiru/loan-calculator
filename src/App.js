import React from 'react';
import { TableHeader } from 'src/TableHeader.jsx';
import { TableBody } from 'src/TableBody.jsx';
import { getLoanData } from 'src/utils.js';
import Container from 'reactstrap/es/Container.js';

export const App = () => {
    const amount = 497000;
    let interest = 0.0175;
    const period = 30 * 12;

    const { monthlyData } = getLoanData(amount, interest, period);

    return (
        <div>
            <h2>Loan information</h2>

            <Container fluid>
                <table className="table table-striped loan-table">
                    <TableHeader />
                    <tbody className="table-hover">
                    <TableBody
                        data={monthlyData}
                    />
                    </tbody>
                </table>
            </Container>
      </div>
    );
};
