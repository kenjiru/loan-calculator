import _ from 'lodash';
import { PAYMENT_TYPE } from 'src/store/LoanStore';

export interface Repayment {
    paymentType: any;
    amount: number;
    month: number;
    startMonth: number;
    lengthMonths: number;
    startYear: number;
    lengthYears: number;
}

export interface BalanceInfo {
    index: string;
    repayment: number;
    interest: number;
    principal: number;
    newBalance: number;
}

export function getLoanData(
    principal: number,
    interest: number,
    period: number,
    fixPeriod: number,
    variableInterest: number,
    repayment: Repayment = {} as Repayment,
): {
    monthlyData: BalanceInfo[];
    totalInterest: number;
    fixPeriodInterest: number;
} {
    let totalInterest = 0;
    let fixPeriodInterest = 0;
    let monthlyRate = calculateMonthlyRate(principal, interest, period);

    const monthlyData: BalanceInfo[] = _
        .range(period)
        .map((index: number): BalanceInfo => {
            if (index + 1 === fixPeriod) {
                interest = variableInterest;
                monthlyRate = calculateMonthlyRate(principal, interest, period - index);
            }

            if (repayment.paymentType === PAYMENT_TYPE.ONE_TIME &&
                index + 1 === repayment.month
            ) {
                principal -= repayment.amount;
                monthlyRate = calculateMonthlyRate(principal, interest, period - index);
            }

            if (repayment.paymentType === PAYMENT_TYPE.MONTHLY &&
                index >= repayment.startMonth &&
                index < repayment.startMonth + repayment.lengthMonths
            ) {
                principal -= repayment.amount;
                monthlyRate = calculateMonthlyRate(principal, interest, period - index);
            }

            if (repayment.paymentType === PAYMENT_TYPE.YEARLY &&
                index % 12 === 0 &&
                index / 12 >= repayment.startYear &&
                index / 12 < repayment.startYear + repayment.lengthYears
            ) {
                principal -= repayment.amount;
                monthlyRate = calculateMonthlyRate(principal, interest, period - index);
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

export function getYearlyData(monthlyData: BalanceInfo[]): BalanceInfo[] {
    return _.reduce(monthlyData, (yearlyData: BalanceInfo[], month: BalanceInfo, index: number) => {
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

export function calculateMonthlyRate(principal: number, interest: number, period: number) {
    interest = interest / 12 / 360 * 365.25;

    return principal * interest * (
        Math.pow(1 + interest, period)) / (Math.pow(1 + interest, period) - 1
    );
}
