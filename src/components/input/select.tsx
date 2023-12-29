import { ReactElement } from 'react';
import FormHelperText from '@mui/joy/FormHelperText';
import FormControl from '@mui/joy/FormControl';
import JoySelectOption from '@mui/joy/Option';
import {
    default as JoySelect,
    SelectProps as JoySelectProps,
} from '@mui/joy/Select';

import { FormLabel } from '@/components/input/label';
import { getSelectableId } from '@/utils/string';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseOption = string | Record<string, any>;

type SelectProps<T extends BaseOption> = {
    defaultValue?: JoySelectProps<T, false>['defaultValue'];
    disabled?: JoySelectProps<T, false>['disabled'];
    error?: boolean;
    helperText?: string;
    id?: JoySelectProps<T, false>['id'];
    idField?: keyof T; // TODO: only if T is Record<string, any>
    label?: string;
    options: T[];
    onChange?: JoySelectProps<T, false>['onChange'];
    size?: JoySelectProps<T, false>['size'];
    sx?: JoySelectProps<T, false>['sx'];
    tooltip?: string;
};

/**
 * Slider component
 */
export const Select = <T extends BaseOption>({
    error,
    helperText,
    id,
    idField,
    label,
    options,
    sx,
    tooltip,
    ...props
}: SelectProps<T>): ReactElement<SelectProps<T>> => {
    const formId = id || getSelectableId(label);

    const getValue = (option: T): string => {
        if (typeof option === 'string') {
            return option;
        }
        if (idField) {
            return option[idField] as string;
        }
        throw new Error('idField required for record options');
    };

    return (
        <FormControl id={formId} error={error} sx={sx}>
            {label && <FormLabel tooltip={tooltip}>{label}</FormLabel>}
            <JoySelect
                placeholder="Choose one…"
                size="sm"
                variant="soft"
                {...props}
            >
                {options.map((o) => (
                    <JoySelectOption
                        key={getSelectableId(getValue(o))}
                        value={getValue(o)}
                    >
                        {getValue(o)}
                    </JoySelectOption>
                ))}
            </JoySelect>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
