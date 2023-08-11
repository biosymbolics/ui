import { ReactElement } from 'react';
import {
    default as JoySlider,
    SliderProps as JoySliderProps,
} from '@mui/joy/Slider';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import { getSelectableId } from '@/utils/string';

type SliderProps = {
    defaultValue?: JoySliderProps['defaultValue'];
    disabled?: JoySliderProps['disabled'];
    error?: boolean;
    id?: JoySliderProps['id'];
    label?: string;
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
    ...props
}: SliderProps): ReactElement<SliderProps> => {
    const formId = id || getSelectableId(label);
    return (
        <FormControl id={formId} error={error}>
            {label && <FormLabel>{label}</FormLabel>}
            <JoySlider {...props} />
        </FormControl>
    );
};
