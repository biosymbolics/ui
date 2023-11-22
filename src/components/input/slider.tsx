import { ReactElement } from 'react';
import FormHelperText from '@mui/joy/FormHelperText';
import FormControl from '@mui/joy/FormControl';
import {
    default as JoySlider,
    SliderProps as JoySliderProps,
} from '@mui/joy/Slider';
import Typography from '@mui/joy/Typography';

import { FormLabel } from '@/components/input/label';
import { getSelectableId } from '@/utils/string';

import { BaseInputProps } from './types';

type SliderProps = {
    defaultValue?: JoySliderProps['defaultValue'];
    disabled?: JoySliderProps['disabled'];
    onChange?: JoySliderProps['onChange'];
    orientation?: JoySliderProps['orientation'];
    marks?: JoySliderProps['marks'];
    min?: JoySliderProps['min'];
    max?: JoySliderProps['max'];
    size?: JoySliderProps['size'];
    step?: JoySliderProps['step'];
    valueLabelDisplay?: JoySliderProps['valueLabelDisplay'];
} & BaseInputProps;

/**
 * Slider component
 */
export const Slider = ({
    error,
    helperText,
    id,
    label,
    size = 'sm',
    tooltip,
    ...props
}: SliderProps): ReactElement<SliderProps> => {
    const formId = id || getSelectableId(label);
    return (
        <FormControl id={formId} error={error}>
            {label && (
                <FormLabel title={tooltip}>
                    <Typography>{label}</Typography>
                </FormLabel>
            )}
            <JoySlider
                marks
                valueLabelDisplay="auto"
                variant="soft"
                {...props}
                size={size}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
