import { IObservableArray, observable } from 'mobx';

export enum SECTION {
    PROPERTY = '1',
    LOAN_DATA = '2',
    LOAN_SUMMARY = '3',
    EARLY_REPAYMENT = '4',
}

export interface UiStore {
    extendedYears: IObservableArray<number>;
    selectedSection?: SECTION;
}

export const uiStore = observable<UiStore>({
    extendedYears: observable<number>([]),
    selectedSection: SECTION.PROPERTY,
});

export function toggleSection(selectedSection: SECTION) {
    if (uiStore.selectedSection !== selectedSection) {
        uiStore.selectedSection = selectedSection;
    } else {
        uiStore.selectedSection = undefined;
    }
}

export function toggleYear(index: number) {
    if (isYearSelected(index) === false) {
        uiStore.extendedYears.push(index);
    } else {
        uiStore.extendedYears.remove(index);
    }
}

export function isYearSelected(index: number): boolean {
    return uiStore.extendedYears.indexOf(index) !== -1;
}
