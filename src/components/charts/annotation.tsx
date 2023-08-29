import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import theme from '@/theme';

import { AnnotationSpec } from './types';

const defaultColor = theme.colorSchemes.light.palette.primary[400];
const defaultColorDark = theme.colorSchemes.light.palette.primary[700];

/**
 * Create annotations based on annotation specs
 * @param annotations
 * @param setAnnotation
 * @returns annotations as apexchart expects
 */
export const getAnnotations = (
    annotations: AnnotationSpec[],
    setAnnotation: (label: string | null) => void
) =>
    annotations
        .filter((a) => !a.type || a.type === 'xaxis')
        .map(({ color, label, x }) => ({
            x: new Date(x).getTime(),
            borderColor: color || defaultColor,
            strokeDashArray: 5,
            marker: {
                size: 12,
                fillColor: 'white',
                strokeColor: color || defaultColor,
            },
            label: {
                style: {
                    fontSize: '12px',
                    color: 'white',
                    background: defaultColorDark,
                },
                offsetX: 0,
                offsetY: -5,
                text: x,
                mouseEnter: () => setAnnotation(`${x}: ${label}`),
                mouseLeave: () => setAnnotation(null),
            },
        }));

/**
 * Detail to show annotation info on hover
 */
export const AnnotationDetail = ({
    annotation,
}: {
    annotation: string | null;
}) => (
    <Sheet
        color={annotation ? 'primary' : undefined}
        sx={{ minHeight: 100, p: 3 }}
        variant={annotation ? 'outlined' : undefined}
    >
        {annotation && <Typography level="body-md">{annotation}</Typography>}
    </Sheet>
);
