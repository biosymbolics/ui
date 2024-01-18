'use server';

import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import 'server-only';

import { getAssetColumns, AssetDetail } from '@/components/composite/assets';
import { DataGrid } from '@/components/data/grid';
import { Asset, AssetSearchArgs } from '@/types/assets';

import { fetchAssets } from '../actions';

export const AssetList = async (args: AssetSearchArgs) => {
    const columns = getAssetColumns(false);
    try {
        const assets = await fetchAssets(args);
        return (
            <Box height="100vh">
                <DataGrid
                    // checkboxSelection
                    disableRowSelectionOnClick
                    columns={columns}
                    detailComponent={AssetDetail<Asset>}
                    detailHeight="auto"
                    rows={assets}
                    variant="maximal"
                />
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
