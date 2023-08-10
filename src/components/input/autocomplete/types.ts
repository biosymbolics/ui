import { AutocompleteProps as _JoyAutocompleteProps } from '@mui/joy/Autocomplete'

import { AllOrNothing } from '@/types/helpers'

export type BaseOption = string | Record<string, any>

type JoyAutocompleteProps<
    T extends BaseOption,
    Multiple extends boolean | undefined,
> = _JoyAutocompleteProps<T, Multiple, false, false>

type IsCreatableProps<T> = AllOrNothing<{
    isCreatable: true
    optionIdField: keyof T
    optionLabelField: keyof T
}>

export type AutocompleteProps<
    T extends BaseOption,
    Multiple extends boolean | undefined,
> = {
    defaultValue?: JoyAutocompleteProps<T, Multiple>['defaultValue']
    error?: JoyAutocompleteProps<T, Multiple>['error']
    id?: string
    /**
     * if true, the user can create new options
     * (corresponds to the `freeSolo` prop of `Autocomplete`)
     */
    isCreatable?: boolean
    isLoading?: JoyAutocompleteProps<T, Multiple>['loading']
    options: JoyAutocompleteProps<T, Multiple>['options']
    /**
     * label/title for the autocomplete box
     */
    label?: string
    placeholder?: JoyAutocompleteProps<T, Multiple>['placeholder']
    variant?: JoyAutocompleteProps<T, Multiple>['variant']
} & {
    helperText?: string
} & IsCreatableProps<T>
