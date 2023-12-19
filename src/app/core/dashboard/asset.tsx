'use server';

import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import 'server-only';

import { DataGrid } from '@/components/data/grid';
import { getAssetColumns } from '@/components/composite/config';
import { AssetDetail } from '@/components/composite/assets/client';
import { Entity, EntitySearchArgs } from '@/types/entities';

import { fetchAssets } from '../actions';

export const AssetList = async (args: EntitySearchArgs) => {
    const columns = getAssetColumns();
    try {
        const assets = await fetchAssets(args);
        return (
            <Box height="100vh">
                <DataGrid
                    columns={columns}
                    detailComponent={AssetDetail<Entity>}
                    detailHeight={800}
                    rows={assets.map((asset) => ({
                        ...asset,
                        id: asset.name,
                    }))}
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
