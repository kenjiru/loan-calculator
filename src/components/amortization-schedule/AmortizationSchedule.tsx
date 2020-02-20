import React from 'react';
import { TableHeader } from 'src/components/amortization-schedule/TableHeader';
import { TableBodyContainer } from 'src/components/amortization-schedule/TableBody';

export const AmortizationSchedule = () => (
    <table className="table table-hover table-striped w-100 text-center">
        <TableHeader />
        <TableBodyContainer />
    </table>
);
