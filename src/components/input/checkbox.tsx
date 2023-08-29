import { ReactElement } from 'react';
import {
    default as JoyCheckbox,
    CheckboxProps as JoyCheckboxProps,
} from '@mui/joy/Checkbox';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Typography from '@mui/joy/Typography';

import { getSelectableId } from '@/utils/string';

type CheckboxProps = {
    defualtChecked?: JoyCheckboxProps['defaultChecked'];
    disabled?: JoyCheckboxProps['disabled'];
    checked?: JoyCheckboxProps['checked'];
    error?: boolean;
    id?: JoyCheckboxProps['id'];
    label?: string;
    onChange?: JoyCheckboxProps['onChange'];
    size?: JoyCheckboxProps['size'];
};

/**
 * Checkbox component
 */
export const Checkbox = ({
    error,
    id,
    label,
    ...props
}: CheckboxProps): ReactElement<CheckboxProps> => {
    const formId = id || getSelectableId(label);

    return (
        <FormControl id={formId} error={error}>
            {label && (
                <FormLabel>
                    <Typography>{label}</Typography>
                </FormLabel>
            )}
            <JoyCheckbox size="md" variant="outlined" {...props} />
        </FormControl>
    );
};
