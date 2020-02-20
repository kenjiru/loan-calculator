import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Container } from 'reactstrap';
import { TopPartContainer } from 'src/components/TopPart';
import { AmortizationSchedule } from 'src/components/amortization-schedule/AmortizationSchedule';
import { loanStore, restoreFromLocalStore, updateLoanDetails } from 'src/store/LoanStore';
import { uiStore } from 'src/store/UiStore';

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
}
