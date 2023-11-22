import { ReactElement } from 'react';
import FormHelperText from '@mui/joy/FormHelperText';
import FormControl from '@mui/joy/FormControl';
import {
    default as JoyTextarea,
    TextareaProps as JoyTextareaProps,
} from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';

import { FormLabel } from '@/components/input/label';
import { getSelectableId } from '@/utils/string';

type TextareaProps = {
    defaultValue?: JoyTextareaProps['defaultValue'];
    disabled?: JoyTextareaProps['disabled'];
    error?: boolean;
    helperText?: string;
    id?: JoyTextareaProps['id'];
    label?: string;
    minRows?: JoyTextareaProps['minRows'];
    onChange?: JoyTextareaProps['onChange'];
    size?: JoyTextareaProps['size'];
    tooltip?: string;
};

/**
 * TextArea component
 */
export const TextArea = ({
    error,
    helperText,
    id,
    label,
    size,
    tooltip,
    ...props
}: TextareaProps): ReactElement<TextareaProps> => {
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
            <JoyTextarea variant="soft" {...props} size={size} />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
