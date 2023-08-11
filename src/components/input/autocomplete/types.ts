import { AutocompleteProps as _JoyAutocompleteProps } from '@mui/joy/Autocomplete'

export type BaseOption = string | Record<string, any>

export type JoyAutocompleteProps<
    T extends BaseOption,
    Multiple extends boolean | undefined,
> = _JoyAutocompleteProps<T, Multiple, false, false>

export type CreatableProps<T> = {
    isCreatable: true
    optionIdField: keyof T
    optionLabelField: keyof T
}

type NotCreatableProps<T> = {
    isCreatable?: false
    optionIdField?: never
    optionLabelField?: never
}

export type AutocompleteBaseProps<
    T extends BaseOption,
    Multiple extends boolean | undefined,
    Creatable extends boolean | undefined,
> = {
    defaultValue?: JoyAutocompleteProps<T, Multiple>['defaultValue']
    error?: JoyAutocompleteProps<T, Multiple>['error']
    id?: string
    /**
     * if true, the user can create new options
     * (corresponds to the `freeSolo` prop of `Autocomplete`)
     */
    isCreatable?: Creatable
    isMultiple?: Multiple
    /**
     * label/title for the autocomplete box
     */
    label?: string
    placeholder?: JoyAutocompleteProps<T, Multiple>['placeholder']
    variant?: JoyAutocompleteProps<T, Multiple>['variant']
} & {
    helperText?: string
} & (Creatable extends true ? CreatableProps<T> : NotCreatableProps<T>)

export type AutocompletePropsWithOptions<
    T extends BaseOption,
    Multiple extends boolean | undefined,
    Creatable extends boolean | undefined,
> = AutocompleteBaseProps<T, Multiple, Creatable> & {
    optionFetcher: (search: string) => Promise<T[]>
    options?: never
}

export type AutocompletePropsWithStaticOptions<
    T extends BaseOption,
    Multiple extends boolean | undefined,
    Creatable extends boolean | undefined,
> = AutocompleteBaseProps<T, Multiple, Creatable> & {
    optionFetcher?: never
    options: JoyAutocompleteProps<T, Multiple>['options']
}

export type AutocompleteProps<
    T extends BaseOption,
    Multiple extends boolean | undefined,
    Creatable extends boolean | undefined,
> =
    | AutocompletePropsWithOptions<T, Multiple, Creatable>
    | AutocompletePropsWithStaticOptions<T, Multiple, Creatable>
