import { ReactElement } from 'react';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import {
    default as JoySlider,
    SliderProps as JoySliderProps,
} from '@mui/joy/Slider';
import Typography from '@mui/joy/Typography';

import { getSelectableId } from '@/utils/string';

type SliderProps = {
    defaultValue?: JoySliderProps['defaultValue'];
    disabled?: JoySliderProps['disabled'];
    error?: boolean;
    id?: JoySliderProps['id'];
    label?: string;
    onChange?: JoySliderProps['onChange'];
    orientation?: JoySliderProps['orientation'];
    marks?: JoySliderProps['marks'];
    min?: JoySliderProps['min'];
    max?: JoySliderProps['max'];
    size?: JoySliderProps['size'];
    step?: JoySliderProps['step'];
    valueLabelDisplay?: JoySliderProps['valueLabelDisplay'];
};

/**
 * Slider component
 */
export const Slider = ({
    error,
    id,
    label,
    size = 'sm',
    ...props
}: SliderProps): ReactElement<SliderProps> => {
    const formId = id || getSelectableId(label);
    return (
        <FormControl id={formId} error={error}>
            {label && (
                <FormLabel>
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
        </FormControl>
    );
};
