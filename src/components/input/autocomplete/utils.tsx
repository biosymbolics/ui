import { ReactElement, useEffect, useRef, useState } from 'react';
import { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption, {
    AutocompleteOptionProps,
} from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Add from '@mui/icons-material/Add';
import isString from 'lodash/fp/isString';

import { isKeyOfObject } from '@/types/helpers';

import { BaseOption } from './types';

const getLabel = <T extends BaseOption>(
    option: T,
    optionLabelField: keyof T | undefined
): string => {
    if (isString(option)) {
        return option;
    }
    if (!optionLabelField) {
        if (isKeyOfObject(option, 'label')) {
            return option.label as string;
        }
        throw new Error('Option must be a string or have an optionLabelField');
    }
    return option[optionLabelField] as string;
};

/**
 * Get render option
 * @param optionLabelField
 * @returns renderOption method
 */
export const getRenderOption =
    <T extends BaseOption>(optionLabelField: keyof T | undefined) =>
    (
        props: AutocompleteOptionProps,
        option: T
    ): ReactElement<AutocompleteOptionProps> => {
        const { component } = props;
        const label = getLabel(option, optionLabelField);
        const isAdd = label.startsWith('Add "');
        return (
            <AutocompleteOption
                {...props}
                key={`autocomplete-add-${label}`}
                component={component || 'div'}
            >
                {isAdd && (
                    <ListItemDecorator>
                        <Add />
                    </ListItemDecorator>
                )}
                {label}
            </AutocompleteOption>
        );
    };

/**
 * Get option for input value
 *
 * @param inputValue
 * @param options
 * @param optionIdField
 * @returns option
 */
export const getOptionForInputValue = <T, K extends keyof T>(
    inputValue: string,
    options: T[],
    optionIdField: K
): T => options.find((option) => option[optionIdField] === inputValue) as T;

/**
 * Get id for an option
 *
 * - string if option is a string
 * - option[optionIdField] if option is a record
 *
 * @param option
 * @param optionIdField
 * @returns string id for option
 */
export const getOptionId = <T extends BaseOption>(
    option: T,
    optionIdField: string | undefined = undefined
) => {
    if (optionIdField && !isString(option)) {
        return option[optionIdField] as string;
    }
    if (isString(option)) {
        return option;
    }
    throw new Error('Option must be a string or have an optionIdField');
};

/**
 * Method to return a filter method
 * @returns filter method
 */
export const getFilter = <T extends BaseOption>() => createFilterOptions<T>();

/**
 * Debounce value - waits until user stops typing (not ideal, but ok for now)
 * @param value
 * @param delay
 * @returns
 */
export const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value, delay]);

    return debouncedValue;
};
