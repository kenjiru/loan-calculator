import { observable } from 'mobx';
import { getLoanData } from 'src/util/loanUtil.js';

export const loanStore = observable({
    amount: 0,
    interest: 0,
    duration: 0,
    fixDuration: 0,
    variableInterest: 0,

    monthlyFee: 0,
    contractFee: 0,
    evaluationFee: 0,
    landRegistryFee: 0,

    monthlyData: [],
    totalInterest: 0,
    fixPeriodInterest: 0,
    totalLoanCost: 0,
});

export function updateLoanDetails() {
    const result = getLoanData(
        parseFloat(loanStore.amount),
        parseFloat(loanStore.interest) / 100,
        parseInt(loanStore.duration) * 12,
        parseInt(loanStore.fixDuration) * 12,
        parseFloat(loanStore.variableInterest) / 100,
    );

    loanStore.monthlyData = result.monthlyData;
    loanStore.totalInterest = result.totalInterest;
    loanStore.fixPeriodInterest = result.fixPeriodInterest;
}

export function updateTotalLoanCost() {
    loanStore.totalLoanCost = loanStore.totalInterest +
        parseFloat(loanStore.monthlyFee) * parseInt(loanStore.duration) * 12 +
        parseFloat(loanStore.contractFee) +
        parseFloat(loanStore.evaluationFee) +
        parseFloat(loanStore.landRegistryFee);
}
