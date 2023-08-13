import { ReactElement } from 'react';
import {
    default as JoySelect,
    SelectProps as JoySelectProps,
} from '@mui/joy/Select';
import JoySelectOption from '@mui/joy/Option';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';

import { getSelectableId } from '@/utils/string';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseOption = string | Record<string, any>;

type SelectProps<T extends BaseOption> = {
    defaultValue?: JoySelectProps<T>['defaultValue'];
    disabled?: JoySelectProps<T>['disabled'];
    error?: boolean;
    id?: JoySelectProps<T>['id'];
    idField?: keyof T; // TODO: only if T is Record<string, any>
    label?: string;
    options: T[];
    onChange?: JoySelectProps<T>['onChange'];
    size?: JoySelectProps<T>['size'];
};

/**
 * Slider component
 */
export const Select = <T extends BaseOption>({
    error,
    id,
    idField,
    label,
    options,
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
        <FormControl id={formId} error={error}>
            {label && <FormLabel>{label}</FormLabel>}
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
        </FormControl>
    );
};
