import { ReactElement } from "react";
import { FilterOptionsState } from "@mui/base";
import FormHelperText from "@mui/joy/FormHelperText";
import {
  default as JoyAutocomplete,
  AutocompleteProps as _JoyAutocompleteProps,
  createFilterOptions,
} from "@mui/joy/Autocomplete";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";
import {
  default as AutocompleteOption,
  AutocompleteOptionProps,
} from "@mui/joy/AutocompleteOption";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Add from "@mui/icons-material/Add";

import { getSelectableId } from "@/utils/string";
import { AllOrNothing } from "@/types/helpers";

type BaseOption = string | Record<string, any>;

type JoyAutocompleteProps<
  T extends BaseOption,
  Multiple extends boolean | undefined,
> = _JoyAutocompleteProps<T, Multiple, false, false>;

type AutocompleteProps<
  T extends BaseOption,
  Multiple extends boolean | undefined,
> = {
  defaultValue?: JoyAutocompleteProps<T, Multiple>["defaultValue"];
  id?: string;
  /**
   * if true, the user can create new options
   * (corresponds to the `freeSolo` prop of `Autocomplete`)
   */
  isCreatable?: boolean;
  isLoading?: JoyAutocompleteProps<T, Multiple>["loading"];
  options: JoyAutocompleteProps<T, Multiple>["options"];
  /**
   * label/title for the autocomplete box
   */
  label?: string;
  placeholder?: JoyAutocompleteProps<T, Multiple>["placeholder"];
  variant?: JoyAutocompleteProps<T, Multiple>["variant"];
} & {
  helperText?: string;
} & IsCreatableProps<T>;

type IsCreatableProps<T> = AllOrNothing<{
  isCreatable: true;
  optionIdField: keyof T;
  optionLabelField: keyof T;
}>;

const getRenderOption =
  <T extends BaseOption>(optionLabelField: keyof T) =>
  (
    props: AutocompleteOptionProps,
    option: T,
  ): ReactElement<AutocompleteOptionProps> => {
    const isAdd = (option[optionLabelField] as string).startsWith('Add "');
    return (
      <AutocompleteOption {...props} component={props.component || "div"}>
        {isAdd && (
          <ListItemDecorator>
            <Add />
          </ListItemDecorator>
        )}
        {option[optionLabelField]}
      </AutocompleteOption>
    );
  };

const getOptionForInputValue = <T, K extends keyof T>(
  inputValue: string,
  options: T[],
  optionIdField: K,
): T => options.find((option) => option[optionIdField] === inputValue) as T;

const getFilter = <T extends BaseOption>() => createFilterOptions<T>();

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
