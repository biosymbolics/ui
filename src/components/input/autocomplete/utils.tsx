import { ReactElement, useEffect, useRef, useState } from 'react';
import { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption, {
    AutocompleteOptionProps,
} from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Add from '@mui/icons-material/Add';
import isString from 'lodash/fp/isString';

import { BaseOption } from './types';

/**
 * Get render option
 * @param optionLabelField
 * @returns renderOption method
 */
export const getRenderOption =
    <T extends BaseOption>(optionLabelField: keyof T) =>
    (
        props: AutocompleteOptionProps,
        option: T
    ): ReactElement<AutocompleteOptionProps> => {
        const { component } = props;
        const { [optionLabelField]: label } = option;
        const isAdd = (label as string).startsWith('Add "');
        return (
            <AutocompleteOption
                {...props}
                key="autocomplete-add"
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
