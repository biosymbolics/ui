'use client';

import React from 'react';
import useSWR from 'swr';
import FormHelperText from '@mui/joy/FormHelperText';
import JoyAutocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import Typography, { TypographyProps } from '@mui/joy/Typography';
import isEmpty from 'lodash/fp/isEmpty';

import { FormLabel } from '@/components/input/label';
import { getSelectableId } from '@/utils/string';

import { AutocompleteProps, BaseOption, JoyAutocompleteProps } from './types';
import {
    useDebounce,
    getRenderOption,
    getFilter,
    getOptionForInputValue,
} from './utils';

export interface FilterOptionsState<T> {
    inputValue: string;
    getOptionLabel: (option: T) => string;
}

const getLabelSize = (
    size: AutocompleteProps<BaseOption, false, false>['size']
): TypographyProps['level'] => {
    if (size === 'xlg') {
        return 'h2';
    }
    if (size === 'lg') {
        return 'title-lg';
    }
    return undefined;
};

/**
 * Autocomplete component
 * (wrapper around JoyAutocomplete)
 */
export const Autocomplete = <
    T extends BaseOption,
    Multiple extends boolean | undefined,
    Creatable extends boolean | undefined,
>({
    error,
    id,
    isCreatable = false,
    isMultiple,
    options: _options,
    optionFetcher = () => Promise.resolve([]),
    optionIdField,
    optionLabelField,
    helperText,
    label,
    size,
    tooltip,
    ...props
}: AutocompleteProps<T, Multiple, Creatable>): JSX.Element => {
    const [_input, setInput] = React.useState('');
    const input = useDebounce(_input, 300);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data, error: fetchError, isLoading } = useSWR(input, optionFetcher);

    const options = (!isEmpty(_options) ? _options : data) || [];
    const formId = id || getSelectableId(label);

    const isCreatableProps =
        isCreatable && optionIdField && optionLabelField
            ? {
                  clearOnBlur: true,
                  // freeSolo: true,
                  renderOption: getRenderOption<T>(optionLabelField),
                  selectOnFocus: true,
                  filterOptions: (
                      newOptions: T[],
                      params: FilterOptionsState<T>
                  ): T[] => {
                      const filtered = getFilter<T>()(newOptions, params);

                      const { inputValue } = params;
                      // Suggest the creation of a new value
                      const isExisting = !!getOptionForInputValue(
                          inputValue,
                          newOptions,
                          optionIdField
                      );
                      if (inputValue !== '' && !isExisting) {
                          return [
                              ...filtered,
                              {
                                  [optionIdField]: inputValue,
                                  [optionLabelField]: `Add "${inputValue}"`,
                              } as T,
                          ];
                      }

                      return filtered;
                  },
              }
            : {};

    return (
        <FormControl id={formId} error={error}>
            {label && (
                <FormLabel tooltip={tooltip}>
                    <Typography
                        gutterBottom={size === 'xlg'}
                        level={getLabelSize(size)}
                    >
                        {label}
                    </Typography>
                </FormLabel>
            )}
            <JoyAutocomplete
                variant="outlined"
                {...(props as Omit<
                    JoyAutocompleteProps<T, Multiple>,
                    'options'
                >)}
                {...isCreatableProps}
                error={!!fetchError}
                loading={isLoading}
                multiple={isMultiple}
                onInputChange={(_, newInputValue) => {
                    setInput(newInputValue.trim());
                }}
                options={options}
                renderOption={getRenderOption(optionLabelField)}
                size={size === 'xlg' ? 'lg' : size}
                sx={{ mb: size === 'xlg' ? 2 : 0 }}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
