import _ from 'lodash';
import { observable, toJS } from 'mobx';
import store from 'store';
import { getLoanData, getYearlyData } from 'src/util/loanUtil.js';

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
    yearlyData: [],
    totalInterest: 0,
    fixPeriodInterest: 0,
    totalLoanCost: 0,

    oneTimePayment: {
        month: null,
        amount: null,

        monthlyData: [],
        yearlyData: [],
        totalInterest: 0,
        fixPeriodInterest: 0,
        totalLoanCost: 0,
    },
    monthlyPayment: {
        startMonth: null,
        lengthMonths: null,
        amount: null,

        monthlyData: [],
        yearlyData: [],
        totalInterest: 0,
        fixPeriodInterest: 0,
        totalLoanCost: 0,
    },
    yearlyPayment: {
        startYear: null,
        lengthYears: null,
        amount: null,

        monthlyData: [],
        yearlyData: [],
        totalInterest: 0,
        fixPeriodInterest: 0,
        totalLoanCost: 0,
    },
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

    calculateNormalPaymentResult();
    calculateOneTimePaymentResult();
    calculateMonthlyPaymentResult();
    calculateYearlyPaymentResult();
    persistToLocalStore();
}

function calculateNormalPaymentResult() {
    const result = getLoanData(
        parseFloat(loanStore.financedAmount),
        parseFloat(loanStore.interest) / 100,
        parseInt(loanStore.duration) * 12,
        parseInt(loanStore.fixDuration) * 12,
        parseFloat(loanStore.variableInterest) / 100,
    );

    loanStore.monthlyData = result.monthlyData;
    loanStore.yearlyData = getYearlyData(loanStore.monthlyData);
    loanStore.totalInterest = result.totalInterest;
    loanStore.fixPeriodInterest = result.fixPeriodInterest;
}

export const PAYMENT_TYPE = {
    ONE_TIME: 'ONE_TIME',
    MONTHLY: 'MONTHLY',
    YEARLY: 'YEARLY',
};

function calculateOneTimePaymentResult() {
    if (_.isEmpty(loanStore.oneTimePayment.month) || _.isEmpty(loanStore.oneTimePayment.amount)) {
        return;
    }

    const result = getLoanData(
        parseFloat(loanStore.financedAmount),
        parseFloat(loanStore.interest) / 100,
        parseInt(loanStore.duration) * 12,
        parseInt(loanStore.fixDuration) * 12,
        parseFloat(loanStore.variableInterest) / 100,
        {
            paymentType: PAYMENT_TYPE.ONE_TIME,
            month: parseInt(loanStore.oneTimePayment.month),
            amount: parseFloat(loanStore.oneTimePayment.amount),
        },
    );

    loanStore.oneTimePayment.monthlyData = result.monthlyData;
    loanStore.oneTimePayment.yearlyData = getYearlyData(loanStore.monthlyData);
    loanStore.oneTimePayment.totalInterest = result.totalInterest;
    loanStore.oneTimePayment.fixPeriodInterest = result.fixPeriodInterest;
    loanStore.oneTimePayment.totalLoanCost = result.totalInterest +
        parseFloat(loanStore.monthlyFee) * parseInt(loanStore.duration) * 12 +
        parseFloat(loanStore.contractFee) +
        parseFloat(loanStore.evaluationFee) +
        parseFloat(loanStore.mortgageRegistrationTax);
}

function calculateMonthlyPaymentResult() {
    if (_.isEmpty(loanStore.monthlyPayment.startMonth) ||
        _.isEmpty(loanStore.monthlyPayment.lengthMonths) ||
        _.isEmpty(loanStore.monthlyPayment.amount)
    ) {
        return;
    }

    const result = getLoanData(
        parseFloat(loanStore.financedAmount),
        parseFloat(loanStore.interest) / 100,
        parseInt(loanStore.duration) * 12,
        parseInt(loanStore.fixDuration) * 12,
        parseFloat(loanStore.variableInterest) / 100,
        {
            paymentType: PAYMENT_TYPE.MONTHLY,
            startMonth: parseInt(loanStore.monthlyPayment.startMonth),
            lengthMonths: parseInt(loanStore.monthlyPayment.lengthMonths),
            amount: parseFloat(loanStore.monthlyPayment.amount),
        },
    );

    loanStore.monthlyPayment.monthlyData = result.monthlyData;
    loanStore.monthlyPayment.yearlyData = getYearlyData(loanStore.monthlyData);
    loanStore.monthlyPayment.totalInterest = result.totalInterest;
    loanStore.monthlyPayment.fixPeriodInterest = result.fixPeriodInterest;
    loanStore.monthlyPayment.totalLoanCost = result.totalInterest +
        parseFloat(loanStore.monthlyFee) * parseInt(loanStore.duration) * 12 +
        parseFloat(loanStore.contractFee) +
        parseFloat(loanStore.evaluationFee) +
        parseFloat(loanStore.mortgageRegistrationTax);

    console.log(toJS(loanStore.monthlyPayment));
}


function calculateYearlyPaymentResult() {
    debugger;
    if (_.isEmpty(loanStore.yearlyPayment.startYear) ||
        _.isEmpty(loanStore.yearlyPayment.lengthYears) ||
        _.isEmpty(loanStore.yearlyPayment.amount)
    ) {
        return;
    }

    const result = getLoanData(
        parseFloat(loanStore.financedAmount),
        parseFloat(loanStore.interest) / 100,
        parseInt(loanStore.duration) * 12,
        parseInt(loanStore.fixDuration) * 12,
        parseFloat(loanStore.variableInterest) / 100,
        {
            paymentType: PAYMENT_TYPE.YEARLY,
            startYear: parseInt(loanStore.yearlyPayment.startYear),
            lengthYears: parseInt(loanStore.yearlyPayment.lengthYears),
            amount: parseFloat(loanStore.yearlyPayment.amount),
        },
    );

    loanStore.yearlyPayment.monthlyData = result.monthlyData;
    loanStore.yearlyPayment.yearlyData = getYearlyData(loanStore.monthlyData);
    loanStore.yearlyPayment.totalInterest = result.totalInterest;
    loanStore.yearlyPayment.fixPeriodInterest = result.fixPeriodInterest;
    loanStore.yearlyPayment.totalLoanCost = result.totalInterest +
        parseFloat(loanStore.monthlyFee) * parseInt(loanStore.duration) * 12 +
        parseFloat(loanStore.contractFee) +
        parseFloat(loanStore.evaluationFee) +
        parseFloat(loanStore.mortgageRegistrationTax);

    console.log(toJS(loanStore.yearlyPayment));
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