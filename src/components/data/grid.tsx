'use client';

import React from 'react';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import {
    DataGridPro as MuiDataGrid,
    DataGridProProps as MuiDataGridProps,
    DataGridProProps,
} from '@mui/x-data-grid-pro';
import { GridColDef } from '@mui/x-data-grid';

type DataGridProps = {
    columns?: GridColDef[];
    isLoading?: MuiDataGridProps['loading'];
    rows: MuiDataGridProps['rows'];
};

type Row = Record<string, unknown>;

const DetailPanelContent = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    row,
}: {
    row: Row;
}) => (
    <Stack
        sx={{ py: 2, height: '100%', boxSizing: 'border-box' }}
        direction="column"
    >
        <Sheet>
            <Typography>hi</Typography>
            <Grid container>
                <Grid>
                    <Typography>Stuff</Typography>
                </Grid>
            </Grid>
        </Sheet>
    </Stack>
);

export const DataGrid = ({
    columns: _columns,
    isLoading,
    rows,
    ...props
}: DataGridProps) => {
    const getDetailPanelContent = React.useCallback<
        NonNullable<DataGridProProps['getDetailPanelContent']>
    >(({ row }: { row: Row }) => <DetailPanelContent row={row} />, []);
    const getDetailPanelHeight = React.useCallback(() => 400, []);

    const columns =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        _columns || Object.keys(rows[0]).map((field) => ({ field }));

    return (
        <MuiDataGrid
            checkboxSelection
            disableRowSelectionOnClick
            {...props}
            columns={columns}
            getDetailPanelHeight={getDetailPanelHeight}
            getDetailPanelContent={getDetailPanelContent}
            loading={isLoading}
            rows={rows}
        />
    );
};
