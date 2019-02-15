import { observable } from 'mobx';
import store from 'store';
import { getLoanData } from 'src/util/loanUtil.js';

const LOCAL_STORAGE_KEY = 'loan-calculator';

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
    mortgageRegistrationReferencePercentage: 100,

    monthlyFee: 0,
    contractFee: 0,
    contractFeePercentage: 1,
    evaluationFee: 0,
    evaluationFeePercentage: 0.1,
    otherBankFees: 0,

    notaryFee: 0,
    estateAgentFee: 0,

    minimumAmount: 0,
    financedAmount: 0,
    availableAmount: 0,
    monthlyData: [],
    totalInterest: 0,
    fixPeriodInterest: 0,
    totalLoanCost: 0,
});

const MORTGAGE_REGISTRATION_PERCENTAGE = 0.012;

export function updateLoanDetails() {
    const purchasePrice = parseFloat(loanStore.purchasePrice);
    const ownCapital = parseFloat(loanStore.ownCapital);

    loanStore.propertyTransferTax = purchasePrice * 0.035;
    loanStore.ownershipRegistrationTax = purchasePrice * 0.011;

    loanStore.minimumAmount = purchasePrice - ownCapital +
        loanStore.propertyTransferTax +
        loanStore.ownershipRegistrationTax +
        parseFloat(loanStore.notaryFee) +
        parseFloat(loanStore.estateAgentFee);

    loanStore.mortgageRegistrationTax = loanStore.financedAmount *
        MORTGAGE_REGISTRATION_PERCENTAGE * loanStore.mortgageRegistrationReferencePercentage / 100;
    loanStore.contractFee = loanStore.financedAmount * loanStore.contractFeePercentage / 100;
    loanStore.evaluationFee = loanStore.financedAmount * loanStore.evaluationFeePercentage / 100;

    loanStore.availableAmount = loanStore.financedAmount -
        loanStore.mortgageRegistrationTax -
        loanStore.contractFee -
        loanStore.evaluationFee -
        loanStore.otherBankFees;

    const result = getLoanData(
        parseFloat(loanStore.financedAmount),
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
        parseFloat(loanStore.mortgageRegistrationTax);

    persistToLocalStore()
}

function persistToLocalStore() {
    store.set(LOCAL_STORAGE_KEY, loanStore);
}

export function restoreFromLocalStore() {
    const persistedStore = store.get(LOCAL_STORAGE_KEY);

    Object.keys(persistedStore).forEach(key => {
        loanStore[key] = persistedStore[key];
    });
}