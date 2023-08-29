import { ReactElement } from 'react';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import {
    default as JoyInput,
    InputProps as JoyInputProps,
} from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

import { getSelectableId } from '@/utils/string';

type InputProps = {
    defaultValue?: JoyInputProps['defaultValue'];
    disabled?: JoyInputProps['disabled'];
    error?: boolean;
    id?: JoyInputProps['id'];
    label?: string;
    onChange?: JoyInputProps['onChange'];
    size?: JoyInputProps['size'];
};

/**
 * Input component
 */
export const Input = ({
    error,
    id,
    label,
    size,
    ...props
}: InputProps): ReactElement<InputProps> => {
    const formId = id || getSelectableId(label);

    return (
        <FormControl id={formId} error={error}>
            {label && (
                <FormLabel>
                    <Typography level={size === 'lg' ? 'body-lg' : undefined}>
                        {label}
                    </Typography>
                </FormLabel>
            )}
            <JoyInput variant="soft" {...props} size={size} />
        </FormControl>
    );
};
