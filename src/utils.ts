/**
 * External dependencies.
 */
import { computed, Ref } from 'vue';

/**
 * Internal dependencies.
 */

export const startTimeout = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

export const getInitials = function (value: string) {
    const names = value.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
};

export const wrapInRef = <T>(refObject: Ref<T>, defaultValue: T) => {
    if (refObject === undefined) {
        return computed(() => defaultValue);
    }

    return refObject;
}

export const daysToSeconds = (days: number) => hoursToSeconds(days * 24);

export const hoursToSeconds = (hours: number) => minutesToSeconds(hours * 60);

export const minutesToSeconds = (minutes: number) => minutes * 60;

export const hoursToMilliseconds = (hours: number) => secondsToMilliseconds(hoursToSeconds(hours));

export const minutesToMilliseconds = (minutes: number) => secondsToMilliseconds(minutesToSeconds(minutes));

export const secondsToMilliseconds = (seconds: number) => seconds * 1000;
