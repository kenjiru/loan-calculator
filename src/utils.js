import _ from 'lodash';
import numeral from 'numeral';

export function getLoanData(principal, interest, period) {
    let totalInterest = 0;
    let fixPeriodInterest = 0;
    let monthlyRate = calculateMonthlyRate(principal, interest, period);

    const monthlyData = _
        .range(period)
        .map(index => {
            if (index === 12 * 15 + 1) {
                interest = 0.01;
                monthlyRate = calculateMonthlyRate(principal, interest, period - index);
            }

            /*      if (index === 12 * 15 + 2) {
                  principal -= 150000;
                  monthlyRate = calculateMonthlyRate(principal, interest, period - index - 1);
                     }
                  */

            /*       if (index / 12 > 0 && index / 12 <= 15 && index % 12 === 0 ) {
                  principal -= 10000;
                  monthlyRate = calculateMonthlyRate(principal, interest, period - index - 1);
                     }
                   */
            const currentMonthInterest = interest / 12 * principal;
            const currentMonthPrincipal = monthlyRate - currentMonthInterest;

            principal -= currentMonthPrincipal;

            if (index < 15 * 12) {
                fixPeriodInterest += currentMonthInterest;
            }

            totalInterest += currentMonthInterest;

            return {
                index: index + 1,
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

export function formatNumber(value) {
    return numeral(value).format('0,0.00');
}

export function calculateMonthlyRate(principal, interest, period) {
    interest = interest / 12; // / 360 * 365.25;

    return principal * interest * (
        Math.pow(1 + interest, period)) / (Math.pow(1 + interest, period) - 1
    );
}
