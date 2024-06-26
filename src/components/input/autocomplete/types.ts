import { AutocompleteProps as _JoyAutocompleteProps } from '@mui/joy/Autocomplete';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseOption = string | Record<string, any>;

export type JoyAutocompleteProps<
    T extends BaseOption,
    Multiple extends boolean | undefined,
> = _JoyAutocompleteProps<T, Multiple, false, false>;

export type CreatableProps<T> = {
    isCreatable: true;
    optionIdField: keyof T;
    optionLabelField: keyof T;
};

type NotCreatableProps = {
    isCreatable?: false;
    optionIdField?: never;
};

export type AutocompleteBaseProps<
    T extends BaseOption,
    Multiple extends boolean | undefined,
    Creatable extends boolean | undefined,
> = {
    color?: JoyAutocompleteProps<T, Multiple>['color'];
    defaultValue?: JoyAutocompleteProps<T, Multiple>['defaultValue'];
    error?: JoyAutocompleteProps<T, Multiple>['error'];
    id?: string;
    /**
     * if true, the user can create new options
     * (corresponds to the `freeSolo` prop of `Autocomplete`)
     */
    isCreatable?: Creatable;
    isOptionEqualToValue?: JoyAutocompleteProps<
        T,
        Multiple
    >['isOptionEqualToValue'];
    isMultiple?: Multiple;
    /**
     * label/title for the autocomplete box
     */
    label?: string;
    optionLabelField?: keyof T;
    onChange?: JoyAutocompleteProps<T, Multiple>['onChange'];
    placeholder?: JoyAutocompleteProps<T, Multiple>['placeholder'];
    size?: JoyAutocompleteProps<T, Multiple>['size'];
    variant?: JoyAutocompleteProps<T, Multiple>['variant'];
} & {
    helperText?: string;
} & (Creatable extends true ? CreatableProps<T> : NotCreatableProps);

export type AutocompletePropsWithOptions<
    T extends BaseOption,
    Multiple extends boolean | undefined,
    Creatable extends boolean | undefined,
> = AutocompleteBaseProps<T, Multiple, Creatable> & {
    optionFetcher: (search: string) => Promise<T[]>;
    options?: never;
};

export type AutocompletePropsWithStaticOptions<
    T extends BaseOption,
    Multiple extends boolean | undefined,
    Creatable extends boolean | undefined,
> = AutocompleteBaseProps<T, Multiple, Creatable> & {
    optionFetcher?: never;
    options: JoyAutocompleteProps<T, Multiple>['options'];
};

export type AutocompleteProps<
    T extends BaseOption,
    Multiple extends boolean | undefined,
    Creatable extends boolean | undefined,
> = Omit<
    | AutocompletePropsWithOptions<T, Multiple, Creatable>
    | AutocompletePropsWithStaticOptions<T, Multiple, Creatable>,
    'size'
> & {
    size?: AutocompleteBaseProps<T, Multiple, Creatable>['size'] | 'xlg';
    sx?: JoyAutocompleteProps<T, Multiple>['sx'];
    tooltip?: string;
};
