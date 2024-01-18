import { ReactElement } from 'react';
import {
    default as JoyCheckbox,
    CheckboxProps as JoyCheckboxProps,
} from '@mui/joy/Checkbox';
import FormHelperText from '@mui/joy/FormHelperText';
import FormControl from '@mui/joy/FormControl';
import Typography from '@mui/joy/Typography';

import { getSelectableId } from '@/utils/string';

import { FormLabel } from './label';
import { BaseInputProps } from './types';

export type CheckboxProps = {
    defaultChecked?: JoyCheckboxProps['defaultChecked'];
    disabled?: JoyCheckboxProps['disabled'];
    checked?: JoyCheckboxProps['checked'];
    onChange?: JoyCheckboxProps['onChange'];
} & BaseInputProps;

/**
 * Checkbox component
 */
export const Checkbox = ({
    error,
    helperText,
    id,
    label,
    tooltip,
    ...props
}: CheckboxProps): ReactElement<CheckboxProps> => {
    const formId = id || getSelectableId(label);

    return (
        <FormControl id={formId} error={error}>
            {label && (
                <FormLabel tooltip={tooltip}>
                    <Typography>{label}</Typography>
                </FormLabel>
            )}
            <JoyCheckbox size="md" variant="outlined" {...props} />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
