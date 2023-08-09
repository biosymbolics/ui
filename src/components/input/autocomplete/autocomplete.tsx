import { FilterOptionsState } from "@mui/base";
import FormHelperText from "@mui/joy/FormHelperText";
import {
  default as JoyAutocomplete,
  AutocompleteProps as _JoyAutocompleteProps,
} from "@mui/joy/Autocomplete";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";

import { getSelectableId } from "@/utils/string";
import { AutocompleteProps, BaseOption } from "./types";
import { getRenderOption, getFilter, getOptionForInputValue } from "./utils";

/**
 * Autocomplete component
 * (wrapper around JoyAutocomplete)
 */
export const Autocomplete = <
  T extends BaseOption,
  Multiple extends boolean | undefined,
>({
  id,
  isCreatable,
  isLoading,
  options,
  optionIdField,
  optionLabelField,
  helperText,
  label,
  ...props
}: AutocompleteProps<T, Multiple>): JSX.Element => {
  const form_id = id || getSelectableId(label);

  const isCreatableProps = isCreatable
    ? {
        clearOnBlur: true,
        freeSolo: true,
        renderOption: getRenderOption<T>(optionLabelField),
        selectOnFocus: true,
        filterOptions: (options: T[], params: FilterOptionsState<T>): T[] => {
          const filtered = getFilter<T>()(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = getOptionForInputValue(
            inputValue,
            options,
            optionIdField,
          );
          if (inputValue !== "" && !isExisting) {
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
    <FormControl id={form_id}>
      {label && <FormLabel>{label}</FormLabel>}
      <JoyAutocomplete
        variant="outlined"
        {...props}
        {...isCreatableProps}
        loading={isLoading}
        options={options}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
