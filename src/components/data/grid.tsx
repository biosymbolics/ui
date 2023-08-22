'use client';

import React from 'react';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import {
    DataGridPro as MuiDataGrid,
    DataGridProProps as MuiDataGridProps,
    DataGridProProps,
} from '@mui/x-data-grid-pro';
import { GridColDef, GridToolbar } from '@mui/x-data-grid';

type DataGridProps<T> = {
    columns?: GridColDef[];
    detailComponent?: ({ row }: { row: T }) => JSX.Element;
    initialState?: MuiDataGridProps['initialState'];
    isLoading?: MuiDataGridProps['loading'];
    rows: MuiDataGridProps['rows'];
};

type Row = Record<string, unknown>;

const DetailPanelContent = ({ row }: { row: Row }) => (
    <Stack
        sx={{ py: 2, height: '100%', boxSizing: 'border-box' }}
        direction="column"
    >
        <Sheet>
            <Typography level="title-lg">Row</Typography>
            <Typography level="body-md">
                <code>{JSON.stringify(row)}</code>
            </Typography>
        </Sheet>
    </Stack>
);

const NoRows = (): JSX.Element => <div>nothing here</div>;

export const DataGrid = <T extends Record<string, unknown>>({
    columns: _columns,
    detailComponent,
    isLoading,
    rows,
    ...props
}: DataGridProps<T>) => {
    const DetailComponent = detailComponent || DetailPanelContent;
    const getDetailPanelContent = React.useCallback<
        NonNullable<DataGridProProps['getDetailPanelContent']>
    >(
        ({ row }: { row: T }) => <DetailComponent row={row} />,
        [DetailComponent]
    );
    const getDetailPanelHeight = React.useCallback(() => 600, []);

    const columns =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        _columns || Object.keys(rows[0]).map((field) => ({ field }));

    return (
        <MuiDataGrid
            {...props}
            columns={columns}
            getDetailPanelHeight={getDetailPanelHeight}
            getDetailPanelContent={getDetailPanelContent}
            loading={isLoading}
            rows={rows}
            slots={{
                toolbar: GridToolbar,
                noRowsOverlay: NoRows,
            }}
        />
    );
};
