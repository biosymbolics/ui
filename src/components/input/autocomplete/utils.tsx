import { ReactElement, useEffect, useState } from 'react'
import { createFilterOptions } from '@mui/joy/Autocomplete'
import AutocompleteOption, {
    AutocompleteOptionProps,
} from '@mui/joy/AutocompleteOption'
import { ListItemDecorator } from '@mui/joy'
import Add from '@mui/icons-material/Add'

import { BaseOption } from './types'

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
        const isAdd = (option[optionLabelField] as string).startsWith('Add "')
        return (
            <AutocompleteOption {...props} component={props.component || 'div'}>
                {isAdd && (
                    <ListItemDecorator>
                        <Add />
                    </ListItemDecorator>
                )}
                {option[optionLabelField]}
            </AutocompleteOption>
        )
    }

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
): T => options.find((option) => option[optionIdField] === inputValue) as T

/**
 * Method to return a filter method
 * @returns filter method
 */
export const getFilter = <T extends BaseOption>() => createFilterOptions<T>()

/**
 * Debounce state value
 * @param value
 * @param delay
 * @returns
 */
export const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timeout)
        }
    }, [value, delay])

    return debouncedValue
}
