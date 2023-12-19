'use server';

import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import 'server-only';

import { getTrialColumns } from '@/components/composite/config';
import { TrialDetail } from '@/components/composite/trials/client';
import { DataGrid } from '@/components/data/grid';
import { Trial, TrialSearchArgs } from '@/types/trials';

import { fetchTrials } from '../actions';

export const TrialList = async (args: TrialSearchArgs) => {
    const columns = getTrialColumns();
    try {
        const trials = await fetchTrials(args);

        return (
            <Box height="100vh">
                {/* <Timeline
                    height={400}
                    pathname=""
                    series={[
                        {
                            data: trials
                                .filter(
                                    (t) =>
                                        t.start_date &&
                                        t.end_date &&
                                        new Date(t.end_date).getTime() >
                                            new Date().getTime()
                                )
                                .map((t) => ({
                                    x: t.mesh_conditions[0],
                                    y: [
                                        new Date(t.start_date || '').getTime(),
                                        new Date(t.end_date || '').getTime(),
                                    ],
                                }))
                                .slice(0, 200),
                        },
                    ]}
                /> */}
                <DataGrid
                    columns={columns}
                    detailComponent={TrialDetail<Trial>}
                    rows={trials.map((trial) => ({
                        ...trial,
                        id: trial.nct_id,
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
