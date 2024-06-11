import { ReactElement } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import {
    default as JoyInput,
    InputProps as JoyInputProps,
} from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

import { getSelectableId } from '@/utils/string';

import { BaseInputProps } from './types';
import { FormLabel } from './label';

type InputProps = {
    defaultValue?: JoyInputProps['defaultValue'];
    disabled?: JoyInputProps['disabled'];
    onChange?: JoyInputProps['onChange'];
    size?: JoyInputProps['size'];
} & BaseInputProps;

/**
 * Simple input component
 */
export const Input = ({
    error,
    helperText,
    id,
    label,
    size,
    tooltip,
    ...props
}: InputProps): ReactElement<InputProps> => {
    const formId = id || getSelectableId(label);

    return (
        <FormControl id={formId} error={error}>
            {label && (
                <FormLabel tooltip={tooltip}>
                    <Typography level={size === 'lg' ? 'body-lg' : undefined}>
                        {label}
                    </Typography>
                </FormLabel>
            )}
            <JoyInput variant="soft" {...props} size={size} />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
