'use client'

import React from 'react'
import useSWR from 'swr'
import 'client-only'
import { FilterOptionsState } from '@mui/base'
import FormHelperText from '@mui/joy/FormHelperText'
import {
    default as JoyAutocomplete,
    AutocompleteProps as _JoyAutocompleteProps,
} from '@mui/joy/Autocomplete'
import FormLabel from '@mui/joy/FormLabel'
import FormControl from '@mui/joy/FormControl'
import isEmpty from 'lodash/fp/isEmpty'

import { getSelectableId } from '@/utils/string'
import { AutocompleteProps, BaseOption, JoyAutocompleteProps } from './types'
import {
    useDebounce,
    getRenderOption,
    getFilter,
    getOptionForInputValue,
} from './utils'
import Typography from '@mui/joy/Typography'

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
    isCreatable,
    isMultiple,
    options: _options,
    optionFetcher = () => Promise.resolve([]),
    optionIdField,
    optionLabelField,
    helperText,
    label,
    size,
    ...props
}: AutocompleteProps<T, Multiple, Creatable>): JSX.Element => {
    const [_input, setInput] = React.useState('')
    const input = useDebounce(_input, 300)
    const { data, error: fetchError, isLoading } = useSWR(input, optionFetcher)

    const options = (isEmpty(_options) ? _options : data) || []
    const form_id = id || getSelectableId(label)

    const isCreatableProps =
        isCreatable && optionIdField && optionLabelField
            ? {
                  clearOnBlur: true,
                  // freeSolo: true,
                  renderOption: getRenderOption<T>(optionLabelField),
                  selectOnFocus: true,
                  filterOptions: (
                      options: T[],
                      params: FilterOptionsState<T>
                  ): T[] => {
                      const filtered = getFilter<T>()(options, params)

                      const { inputValue } = params
                      // Suggest the creation of a new value
                      const isExisting = getOptionForInputValue(
                          inputValue,
                          options,
                          optionIdField
                      )
                      if (inputValue !== '' && !isExisting) {
                          return [
                              ...filtered,
                              {
                                  [optionIdField]: inputValue,
                                  [optionLabelField]: `Add "${inputValue}"`,
                              } as T,
                          ]
                      }

                      return filtered
                  },
              }
            : {}

    return (
        <FormControl id={form_id} error={error}>
            {label && (
                <FormLabel>
                    <Typography level={size === 'lg' ? 'title-lg' : undefined}>
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
                onInputChange={(event, newInputValue) => {
                    setInput(newInputValue)
                }}
                options={options}
                size={size}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}
