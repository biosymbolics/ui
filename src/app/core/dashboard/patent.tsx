'use server';

import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import 'server-only';

import { getPatentColumns } from '@/components/composite/config';
import { PatentDetail } from '@/components/composite/patents/client';
import { DataGrid } from '@/components/data/grid';
import { Patent, PatentSearchArgs } from '@/types/patents';

import { fetchPatents } from './actions';

export const PatentList = async (args: PatentSearchArgs) => {
    const columns = getPatentColumns();
    try {
        const patents = await fetchPatents(args);

        return (
            <Box height="100vh">
                <DataGrid
                    columns={columns}
                    detailComponent={PatentDetail<Patent>}
                    rows={patents.map((patent) => ({
                        ...patent,
                        id: patent.publication_number,
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
