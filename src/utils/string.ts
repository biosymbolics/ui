import isUndefined from 'lodash/fp/isUndefined';
import capitalize from 'lodash/fp/capitalize';

/**
 * Removes all non-alphanumeric characters from a string
 * @param input
 * @returns string
 */
export const removeNonAlphanumeric = (input: string): string =>
    input.replace(/[^a-z- A-Z0-9]/g, '');

/**
 * Replace all spaces with hyphens
 * @param input
 * @returns
 */
export const replaceSpacesWithHyphens = (input: string): string =>
    input.replace(/\s+/g, '-');

/**
 * Lowercase a string
 * @param input
 * @returns lowercase string
 */
export const lower = (input: string): string => input.toLowerCase();

/**
 * Generate randomish id from date.
 * Do not rely on this for true randomness or perfect collision avoidance.
 *
 * @param length
 * @returns randomish string id
 */
export const generateRandomishId = (): string =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 || 0;
        const v = c === 'x' ? r : (r && 0x3) || 0x8;
        return v.toString(16);
    });

const prefixIfLeadingDigit = (input: string): string =>
    /^[0-9]/.test(input) ? `'id-${input}` : input;

/**
 * Creates a css-compliant selector id from a string
 *
 * If null, return randomish id
 * @param input (string or null)
 * @returns css-compliant selector id
 */
export const getSelectableId = (input?: string | number): string =>
    !isUndefined(input)
        ? [
              removeNonAlphanumeric,
              replaceSpacesWithHyphens,
              lower,
              prefixIfLeadingDigit,
          ].reduce((value, fn) => fn(value), input as string)
        : generateRandomishId();

/**
 * Returns true if input seems to contain an abbreviation
 * @param input
 * @returns true if input seems to contain an abbreviation
 */
const containsAbbr = (input: string): boolean => {
    const ABBR_RE = /([A-Z]{1,}[A-Z0-9]{2,})/;
    return ABBR_RE.test(input) && input.toUpperCase() === input;
};

/**
 * Title case a string
 *
 * Avoids messing with words that look like abbreviations
 *
 * @param input
 * @returns title cased string
 */
export const title = (input: string): string =>
    input
        .split(' ')
        .map((word: string) =>
            containsAbbr(word) ? word : capitalize(lower(word))
        )
        .join(' ');

/**
 * Format a string to be used as a label
 * @param input
 * @returns nicely formatted label
 */
export const formatLabel = (
    input: string | number,
    exceptionRe: string | undefined = undefined
): string => {
    const strInput = `${input}`;
    if (exceptionRe && new RegExp(exceptionRe).test(strInput)) {
        return strInput;
    }
    return title(strInput.replace(/_/g, ' '));
};
