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

export type TextareaProps = {
    defaultValue?: JoyTextareaProps['defaultValue'];
    disabled?: JoyTextareaProps['disabled'];
    endDecorator?: ReactElement;
    error?: boolean;
    helperText?: string;
    id?: JoyTextareaProps['id'];
    label?: string;
    maxRows?: JoyTextareaProps['maxRows'];
    minRows?: JoyTextareaProps['minRows'];
    onChange?: JoyTextareaProps['onChange'];
    placeholder?: JoyTextareaProps['placeholder'];
    size?: JoyTextareaProps['size'];
    tooltip?: string;
    variant?: JoyTextareaProps['variant'];
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
            <JoyTextarea
                variant="soft"
                {...props}
                size={size}
                sx={{
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    '& textarea:first-of-type': {
                        minHeight: 72,
                    },
                }}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
