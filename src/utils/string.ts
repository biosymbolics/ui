import isUndefined from 'lodash/fp/isUndefined';
import startCase from 'lodash/fp/startCase';

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
 * Title case a string
 * @param input
 * @returns title cased string
 */
export const title = (input: string): string => startCase(lower(input));

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

export const formatLabel = (input: string | number): string =>
    title((input as string).replace(/[-_]/g, ' '));
