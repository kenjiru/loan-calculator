import React from 'react';
import { TableHeader } from 'src/components/amortization-schedule/TableHeader.jsx';
import { TableBodyContainer } from 'src/components/amortization-schedule/TableBody.jsx';

export const AmortizationSchedule = () => (
    <table className="table table-hover table-striped w-100 text-center">
        <TableHeader />
        <TableBodyContainer />
    </table>
);
