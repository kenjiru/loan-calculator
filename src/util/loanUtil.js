import _ from 'lodash';

export function getLoanData(principal, interest, period, fixPeriod, variableInterest) {
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

            // if (index === 12 * 15 + 2) {
            //     principal -= 150000;
            //     monthlyRate = calculateMonthlyRate(principal, interest, period - index - 1);
            // }

            // if (index / 12 > 0 && index / 12 <= 15 && index % 12 === 0) {
            //     principal -= 10000;
            //     monthlyRate = calculateMonthlyRate(principal, interest, period - index);
            // }

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
