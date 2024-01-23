'use server';

import 'server-only';

import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';

import { AssetGrid } from '@/components/composite/assets';
import { AssetSearchArgs } from '@/types/assets';

import { fetchAssets } from '../actions';

export const AssetList = async (args: AssetSearchArgs) => {
    try {
        const assets = await fetchAssets(args);
        return (
            <Box height="100vh">
                <AssetGrid assets={assets} />
            </Box>
        );
    } catch (e) {
        return (
            <Alert
                startDecorator={<WarningIcon />}
                variant="soft"
                color="warning"
            >
                <Typography level="h4">Failed to fetch patents</Typography>
                <Typography>
                    {e instanceof Error ? e.message : JSON.stringify(e)}
                </Typography>
            </Alert>
        );
    }
};
