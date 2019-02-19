import _ from 'lodash';
import { PAYMENT_TYPE } from 'src/store/LoanStore.js';

export function getLoanData(principal, interest, period, fixPeriod, variableInterest, repayment = {}) {
    let totalInterest = 0;
    let fixPeriodInterest = 0;
    let monthlyRate = calculateMonthlyRate(principal, interest, period);

    const monthlyData = _
        .range(period)
        .map(index => {
            if (index === fixPeriod) {
                interest = variableInterest;
                monthlyRate = calculateMonthlyRate(principal, interest, period - index);
            }

            if (repayment.paymentType === PAYMENT_TYPE.ONE_TIME &&
                index + 1 === repayment.month
            ) {
                principal -= repayment.amount;
                monthlyRate = calculateMonthlyRate(principal, interest, period - index - 1);
            }

            if (repayment.paymentType === PAYMENT_TYPE.MONTHLY &&
                index > repayment.startMonth &&
                index < repayment.startMonth + repayment.lengthMonths
            ) {
                principal -= repayment.amount;
                monthlyRate = calculateMonthlyRate(principal, interest, period - index - 1);
            }

            if (repayment.paymentType === PAYMENT_TYPE.YEARLY &&
                index % 12 === 0 &&
                index / 12 > repayment.startYear &&
                index / 12 < repayment.startYear + repayment.lengthYears
            ) {
                debugger;
                principal -= repayment.amount;
                monthlyRate = calculateMonthlyRate(principal, interest, period - index - 1);
            }

            const currentMonthInterest = interest / 12 * principal;
            const currentMonthPrincipal = monthlyRate - currentMonthInterest;

            principal -= currentMonthPrincipal;

            if (index < fixPeriod) {
                fixPeriodInterest += currentMonthInterest;
            }

            totalInterest += currentMonthInterest;

            return {
                index: `Month ${index + 1}`,
                repayment: currentMonthInterest + currentMonthPrincipal,
                interest: currentMonthInterest,
                principal: currentMonthPrincipal,
                newBalance: principal,
            };
        });

    return {
        monthlyData,
        totalInterest,
        fixPeriodInterest,
    };
}

export function getYearlyData(monthlyData) {
    return _.reduce(monthlyData, (yearlyData, month, index) => {
        const yearIndex = Math.floor(index / 12);

        if (yearlyData[yearIndex] === undefined) {
            yearlyData[yearIndex] = {
                ...month,
                index: `Year ${yearIndex + 1}`,
            };
        } else {
            yearlyData[yearIndex].repayment += month.repayment;
            yearlyData[yearIndex].interest += month.interest;
            yearlyData[yearIndex].principal += month.principal;
            yearlyData[yearIndex].newBalance = month.newBalance;
        }

        return yearlyData;
    }, []);
}

export function calculateMonthlyRate(principal, interest, period) {
    interest = interest / 12; // / 360 * 365.25;

    return principal * interest * (
        Math.pow(1 + interest, period)) / (Math.pow(1 + interest, period) - 1
    );
}
