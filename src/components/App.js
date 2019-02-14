import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Container } from 'reactstrap';
import { TableHeader } from 'src/components/TableHeader.jsx';
import { TableBodyContainer } from 'src/components/TableBody.jsx';
import { LoanDetails } from 'src/components/LoanDetails.jsx';
import { loanStore, updateLoanDetails } from 'src/store/LoanStore.js';

export class App extends Component {
    componentDidMount() {
        updateLoanDetails();
    }

    render() {
        return (
            <Provider loanStore={loanStore}>
                <div className="mt-4">
                    <LoanDetails />

                    <Container fluid>
                        <table className="table table-striped loan-table">
                            <TableHeader />
                            <TableBodyContainer />
                        </table>
                    </Container>
                </div>
            </Provider>
        );
    }
};
