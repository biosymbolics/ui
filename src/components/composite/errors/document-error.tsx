import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WarningIcon from '@mui/icons-material/Warning';

export const SearchCriteriaError = () => (
    <Alert variant="soft" color="primary" startDecorator={<LightbulbIcon />}>
        <Typography level="h4">Missing criteria</Typography>
        <Typography level="body-md">
            Please enter term(s) or description
        </Typography>
    </Alert>
);

export const SearchError = ({ error }: { error: unknown }) => (
    <Alert startDecorator={<WarningIcon />} variant="soft" color="warning">
        <Typography level="h4">Failed to fetch entities</Typography>
        <Typography>
            {error instanceof Error ? error.message : JSON.stringify(error)}
        </Typography>
    </Alert>
);
