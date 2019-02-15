import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Container } from 'reactstrap';
import { TableHeader } from 'src/components/rates/TableHeader.jsx';
import { TableBodyContainer } from 'src/components/rates/TableBody.jsx';
import { TopPart } from 'src/components/TopPart.jsx';
import { loanStore, updateLoanDetails } from 'src/store/LoanStore.js';

export class App extends Component {
    componentDidMount() {
        updateLoanDetails();
    }

    render() {
        return (
            <Provider loanStore={loanStore}>
                <div className="mt-4">
                    <TopPart />

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
