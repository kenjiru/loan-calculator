import { observable } from 'mobx';
import { getLoanData } from 'src/util/loanUtil.js';

export const loanStore = observable({
    purchasePrice: 0,
    ownCapital: 0,

    interest: 0,
    duration: 0,
    fixDuration: 0,
    variableInterest: 0,

    propertyTransferTax: 0,
    ownershipRegistrationTax: 0,
    mortgageRegistrationTax: 0,
    mortgageRegistrationPercentage: 100,

    monthlyFee: 0,
    contractFee: 0,
    contractFeePercentage: 1,
    evaluationFee: 0,
    evaluationFeePercentage: 0.1,

    notaryFee: 0,
    estateAgentFee: 0,

    nominalAmount: 0,
    availableAmount: 0,
    monthlyData: [],
    totalInterest: 0,
    fixPeriodInterest: 0,
    totalLoanCost: 0,
});

export function updateLoanDetails() {
    const purchasePrice = parseFloat(loanStore.purchasePrice);
    const ownCapital = parseFloat(loanStore.ownCapital);

    loanStore.propertyTransferTax = purchasePrice * 0.035;
    loanStore.ownershipRegistrationTax = purchasePrice * 0.011;
    loanStore.mortgageRegistrationTax = (purchasePrice - ownCapital) * 1.1045 *
        parseFloat(loanStore.mortgageRegistrationPercentage) / 100 *
        0.012;

    loanStore.contractFee = (purchasePrice - ownCapital) * 1.1045 * loanStore.contractFeePercentage / 100;
    loanStore.evaluationFee = (purchasePrice - ownCapital) * 1.1045 * loanStore.evaluationFeePercentage / 100;

    loanStore.availableAmount = purchasePrice - ownCapital +
        loanStore.propertyTransferTax +
        loanStore.ownershipRegistrationTax +
        parseFloat(loanStore.notaryFee);

    loanStore.nominalAmount = loanStore.availableAmount +
        loanStore.mortgageRegistrationTax +
        loanStore.contractFee +
        loanStore.evaluationFee;

    const result = getLoanData(
        parseFloat(loanStore.nominalAmount),
        parseFloat(loanStore.interest) / 100,
        parseInt(loanStore.duration) * 12,
        parseInt(loanStore.fixDuration) * 12,
        parseFloat(loanStore.variableInterest) / 100,
    );

    loanStore.monthlyData = result.monthlyData;
    loanStore.totalInterest = result.totalInterest;
    loanStore.fixPeriodInterest = result.fixPeriodInterest;

    loanStore.totalLoanCost = loanStore.totalInterest +
        parseFloat(loanStore.monthlyFee) * parseInt(loanStore.duration) * 12 +
        parseFloat(loanStore.contractFee) +
        parseFloat(loanStore.evaluationFee) +
        loanStore.mortgageRegistrationTax;
}
