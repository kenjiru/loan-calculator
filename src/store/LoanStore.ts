import _ from 'lodash';
import { observable, toJS } from 'mobx';
import store from 'store';
import { getLoanData, getYearlyData } from 'src/util/loanUtil';

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
        month: undefined,
        amount: undefined,

        monthlyData: [],
        yearlyData: [],
        totalInterest: 0,
        fixPeriodInterest: 0,
        totalLoanCost: 0,
    },
    monthlyPayment: {
        startMonth: undefined,
        lengthMonths: undefined,
        amount: undefined,

        monthlyData: [],
        yearlyData: [],
        totalInterest: 0,
        fixPeriodInterest: 0,
        totalLoanCost: 0,
    },
    yearlyPayment: {
        startYear: undefined,
        lengthYears: undefined,
        amount: undefined,

        monthlyData: [],
        yearlyData: [],
        totalInterest: 0,
        fixPeriodInterest: 0,
        totalLoanCost: 0,
    },
});

const MORTGAGE_REGISTRATION_PERCENTAGE = 0.012;

export function updateLoanDetails() {
    const purchasePrice = loanStore.purchasePrice;
    const ownCapital = loanStore.ownCapital;

    loanStore.propertyTransferTax = purchasePrice * 0.035;
    loanStore.ownershipRegistrationTax = purchasePrice * 0.011;

    loanStore.minimumAmount = purchasePrice - ownCapital +
        loanStore.propertyTransferTax +
        loanStore.ownershipRegistrationTax +
        loanStore.notaryFee +
        loanStore.estateAgentFee;

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
        loanStore.financedAmount,
        loanStore.interest / 100,
        loanStore.duration * 12,
        loanStore.fixDuration * 12,
        loanStore.variableInterest / 100,
    );

    loanStore.monthlyData = result.monthlyData as any;
    loanStore.yearlyData = getYearlyData(loanStore.monthlyData) as any;
    loanStore.totalInterest = result.totalInterest;
    loanStore.fixPeriodInterest = result.fixPeriodInterest;
    loanStore.totalLoanCost = result.totalInterest +
        loanStore.monthlyFee * loanStore.duration * 12 +
        loanStore.contractFee +
        loanStore.evaluationFee +
        loanStore.mortgageRegistrationTax;
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
        loanStore.financedAmount,
        loanStore.interest / 100,
        loanStore.duration * 12,
        loanStore.fixDuration * 12,
        loanStore.variableInterest / 100,
        {
            paymentType: PAYMENT_TYPE.ONE_TIME,
            month: loanStore.oneTimePayment.month,
            amount: loanStore.oneTimePayment.amount,
        } as any,
    );

    loanStore.oneTimePayment.monthlyData = result.monthlyData as any;
    loanStore.oneTimePayment.yearlyData = getYearlyData(loanStore.oneTimePayment.monthlyData) as any;
    loanStore.oneTimePayment.totalInterest = result.totalInterest;
    loanStore.oneTimePayment.fixPeriodInterest = result.fixPeriodInterest;
    loanStore.oneTimePayment.totalLoanCost = result.totalInterest +
        loanStore.monthlyFee * loanStore.duration * 12 +
        loanStore.contractFee +
        loanStore.evaluationFee +
        loanStore.mortgageRegistrationTax;
}

function calculateMonthlyPaymentResult() {
    if (_.isEmpty(loanStore.monthlyPayment.startMonth) ||
        _.isEmpty(loanStore.monthlyPayment.lengthMonths) ||
        _.isEmpty(loanStore.monthlyPayment.amount)
    ) {
        return;
    }

    const result = getLoanData(
        loanStore.financedAmount,
        loanStore.interest / 100,
        loanStore.duration * 12,
        loanStore.fixDuration * 12,
        loanStore.variableInterest / 100,
        {
            paymentType: PAYMENT_TYPE.MONTHLY,
            startMonth: loanStore.monthlyPayment.startMonth,
            lengthMonths: loanStore.monthlyPayment.lengthMonths,
            amount: loanStore.monthlyPayment.amount,
        } as any,
    );

    loanStore.monthlyPayment.monthlyData = result.monthlyData as any;
    loanStore.monthlyPayment.yearlyData = getYearlyData(loanStore.monthlyPayment.monthlyData) as any;
    loanStore.monthlyPayment.totalInterest = result.totalInterest;
    loanStore.monthlyPayment.fixPeriodInterest = result.fixPeriodInterest;
    loanStore.monthlyPayment.totalLoanCost = result.totalInterest +
        loanStore.monthlyFee * loanStore.duration * 12 +
        loanStore.contractFee +
        loanStore.evaluationFee +
        loanStore.mortgageRegistrationTax;

    console.log(toJS(loanStore.monthlyPayment));
}


function calculateYearlyPaymentResult() {
    if (_.isEmpty(loanStore.yearlyPayment.startYear) ||
        _.isEmpty(loanStore.yearlyPayment.lengthYears) ||
        _.isEmpty(loanStore.yearlyPayment.amount)
    ) {
        return;
    }

    const result = getLoanData(
        loanStore.financedAmount,
        loanStore.interest / 100,
        loanStore.duration * 12,
        loanStore.fixDuration * 12,
        loanStore.variableInterest / 100,
        {
            paymentType: PAYMENT_TYPE.YEARLY,
            startYear: loanStore.yearlyPayment.startYear,
            lengthYears: loanStore.yearlyPayment.lengthYears,
            amount: loanStore.yearlyPayment.amount,
        } as any,
    );

    loanStore.yearlyPayment.monthlyData = result.monthlyData as any;
    loanStore.yearlyPayment.yearlyData = getYearlyData(loanStore.yearlyPayment.monthlyData) as any;
    loanStore.yearlyPayment.totalInterest = result.totalInterest;
    loanStore.yearlyPayment.fixPeriodInterest = result.fixPeriodInterest;
    loanStore.yearlyPayment.totalLoanCost = result.totalInterest +
        loanStore.monthlyFee * loanStore.duration * 12 +
        loanStore.contractFee +
        loanStore.evaluationFee +
        loanStore.mortgageRegistrationTax;

    console.log(toJS(loanStore.yearlyPayment));
}

function persistToLocalStore() {
    store.set(LOCAL_STORAGE_KEY, loanStore);
}

export function restoreFromLocalStore() {
    const persistedStore = store.get(LOCAL_STORAGE_KEY);

    if (_.isEmpty(persistedStore)) {
        return;
    }

    Object.keys(persistedStore).forEach((key: string) => {
        // @ts-ignore
        loanStore[key] = persistedStore[key];
    });
}