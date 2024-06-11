import Box from '@mui/joy/Box';
import JoyFormLabel, {
    FormLabelProps as JoyFormLabelProps,
} from '@mui/joy/FormLabel';
import Tooltip from '@mui/joy/Tooltip';

type FormLabelProps = {
    children: React.ReactNode;
    tooltip?: string | JSX.Element;
} & JoyFormLabelProps;

/**
 * Simple form label with optional tooltip
 */
export const FormLabel = ({ children, tooltip, ...props }: FormLabelProps) => {
    const formLabel = <JoyFormLabel {...props}>{children}</JoyFormLabel>;

    if (tooltip) {
        return (
            <Tooltip
                title={<Box maxWidth={300}>{tooltip}</Box>}
                variant="outlined"
            >
                {formLabel}
            </Tooltip>
        );
    }
    return formLabel;
};
