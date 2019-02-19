import { observable } from 'mobx';

export const SECTION = {
    PROPERTY: '1',
    LOAN_DATA: '2',
    LOAN_SUMMARY: '3',
    EARLY_REPAYMENT: '4',
};

export const uiStore = observable({
    extendedYears: [],
    selectedSection: SECTION.PROPERTY,
});

export function toggleSection(selectedSection) {
    if (uiStore.selectedSection !== selectedSection) {
        uiStore.selectedSection = selectedSection;
    } else {
        uiStore.selectedSection = null;
    }
}

export function toggleYear(index) {
    if (isYearSelected(index) === false) {
        uiStore.extendedYears.push(index);
    } else {
        uiStore.extendedYears.remove(index);
    }
}

export function isYearSelected(index) {
    return uiStore.extendedYears.indexOf(index) !== -1;
}
