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

type DataGridVariant = 'standard' | 'minimal' | 'maximal';
type DataGridProps<T> = {
    columns?: GridColDef[];
    detailComponent?: ({ row }: { row: T }) => JSX.Element;
    detailHeight?: number;
    initialState?: MuiDataGridProps['initialState'];
    isLoading?: MuiDataGridProps['loading'];
    rows: MuiDataGridProps['rows'];
    title?: string;
    variant?: DataGridVariant;
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

const NoRows = (): JSX.Element => (
    <Typography level="h3">no results</Typography>
);

const getDensity = (variant: DataGridVariant): MuiDataGridProps['density'] => {
    if (variant === 'minimal') {
        return 'compact';
    }
    if (variant === 'maximal') {
        return 'comfortable';
    }
    return 'standard';
};

export const DataGrid = <T extends Record<string, unknown>>({
    columns: _columns,
    detailComponent,
    detailHeight = 600,
    isLoading,
    rows,
    variant,
    title,
    ...props
}: DataGridProps<T>) => {
    const DetailComponent = detailComponent || DetailPanelContent;
    const getDetailPanelContent = React.useCallback<
        NonNullable<DataGridProProps['getDetailPanelContent']>
    >(
        ({ row }: { row: T }) => <DetailComponent row={row} />,
        [DetailComponent]
    );
    const getDetailPanelHeight = React.useCallback(
        () => detailHeight,
        [detailHeight]
    );

    const columns =
        _columns ||
        Object.keys((rows?.[0] as Record<string, unknown>) || {}).map(
            (field) => ({ field })
        );

    const density = getDensity(variant || 'standard');

    return (
        <>
            {title && (
                <Typography level={variant === 'minimal' ? 'h4' : 'h3'}>
                    {title}
                </Typography>
            )}
            <MuiDataGrid
                {...props}
                columns={columns}
                density={density}
                getDetailPanelHeight={getDetailPanelHeight}
                getDetailPanelContent={
                    detailComponent ? getDetailPanelContent : undefined
                }
                loading={isLoading}
                rows={rows}
                slots={{
                    toolbar: variant === 'minimal' ? null : GridToolbar,
                    noRowsOverlay: NoRows,
                }}
                sx={{ border: 0 }}
            />
        </>
    );
};
