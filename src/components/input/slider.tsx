import { ReactElement, useState } from 'react';
import FormHelperText from '@mui/joy/FormHelperText';
import FormControl from '@mui/joy/FormControl';
import {
    default as JoySlider,
    SliderProps as JoySliderProps,
} from '@mui/joy/Slider';
import Typography from '@mui/joy/Typography';

import { getSelectableId } from '@/utils/string';

import { FormLabel } from './label';
import { BaseInputProps } from './types';

type Tuple = [number, number];

export type SliderProps<T extends number | Tuple> = {
    defaultValue?: T | undefined;
    disabled?: JoySliderProps['disabled'];
    onChange?: ((value: T) => void) | undefined;
    orientation?: JoySliderProps['orientation'];
    marks?: JoySliderProps['marks'];
    min?: JoySliderProps['min'];
    /**
     * Minimum distance between the two thumbs
     */
    minDistance?: number;
    max?: JoySliderProps['max'];
    size?: JoySliderProps['size'];
    step?: JoySliderProps['step'];
    sx?: JoySliderProps['sx'];
    valueLabelDisplay?: JoySliderProps['valueLabelDisplay'];
} & BaseInputProps;

/**
 * Slider component
 */
export const Slider = <T extends number | Tuple>({
    defaultValue,
    error,
    helperText,
    id,
    label,
    minDistance = 1,
    onChange = () => {},
    size = 'sm',
    tooltip,
    sx = { mr: 1 },
    ...props
}: SliderProps<T>): ReactElement<SliderProps<T>> => {
    const [value, setValue] = useState<number | Tuple | undefined>(
        defaultValue
    );
    const formId = id || getSelectableId(label);

    const handleChange = (
        e: Event,
        newValue: number | number[] | undefined,
        activeThumb: number
    ) => {
        if (!newValue) {
            return;
        }

        if (typeof newValue === 'number') {
            setValue(newValue);
        } else if (Array.isArray(value) && value.length === 2) {
            const v1 = newValue[0];
            const v2 = newValue[1];
            if (activeThumb === 0) {
                setValue([Math.min(v1, v2 - minDistance), v2]);
            } else {
                setValue([v1, Math.max(v2, v1 + minDistance)]);
            }
        }
    };
    return (
        <FormControl id={formId} error={error} sx={sx}>
            {label && (
                <FormLabel tooltip={tooltip}>
                    <Typography>{label}</Typography>
                </FormLabel>
            )}
            <JoySlider
                disableSwap
                marks
                valueLabelDisplay="auto"
                variant="soft"
                {...props}
                onChange={handleChange}
                onChangeCommitted={(_, v) => onChange(v as T)}
                size={size}
                value={value}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
