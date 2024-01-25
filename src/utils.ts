/**
 * External dependencies.
 */
import { computed, ComputedRef, Ref } from 'vue';

/**
 * Internal dependencies.
 */

// TODO: Eventually these will be passed as an argument in the config function
export const ADD_ON_ID = import.meta.env.PANEL_ADDON_IDENTIFIER;
export const BASE_URL = `/add-ons/${ADD_ON_ID}#`;

export const generateGroupName = (name: string) => ADD_ON_ID + '::' + name;

export const startTimeout = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

export const getInitials = function (value: string) {
    const names = value.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
};

export const firstLetterToUpper = (value: string) => value.slice(0, 1).toUpperCase() + value.slice(1);

export const wrapInRef = <T>(refObject: Ref<T> | undefined, defaultValue: T): ComputedRef<T> => {
    if (refObject === undefined) {
        return computed(() => defaultValue);
    }

    return computed(() => refObject.value);
}

export const daysToSeconds = (days: number) => hoursToSeconds(days * 24);

export const hoursToSeconds = (hours: number) => minutesToSeconds(hours * 60);

export const minutesToSeconds = (minutes: number) => minutes * 60;

export const hoursToMilliseconds = (hours: number) => secondsToMilliseconds(hoursToSeconds(hours));

export const minutesToMilliseconds = (minutes: number) => secondsToMilliseconds(minutesToSeconds(minutes));

export const secondsToMilliseconds = (seconds: number) => seconds * 1000;
