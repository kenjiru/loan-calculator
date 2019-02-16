import { observable } from 'mobx';

export const uiStore = observable({
    extendedYears: [],
});

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
