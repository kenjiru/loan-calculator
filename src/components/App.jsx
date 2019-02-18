import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Container } from 'reactstrap';
import { TopPartContainer } from 'src/components/TopPart.jsx';
import { AmortizationSchedule } from 'src/components/amortization-schedule/AmortizationSchedule.jsx';
import { loanStore, restoreFromLocalStore, updateLoanDetails } from 'src/store/LoanStore.js';
import { uiStore } from 'src/store/UiStore.js';

export class App extends Component {
    componentDidMount() {
        restoreFromLocalStore();
        updateLoanDetails();
    }

    render() {
        return (
            <Provider loanStore={loanStore} uiStore={uiStore}>
                <div className="mt-4">
                    <TopPartContainer />

                    <Container fluid>
                        <AmortizationSchedule />
                    </Container>
                </div>
            </Provider>
        );
    }
};
