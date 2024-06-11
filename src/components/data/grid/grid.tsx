'use client';

import React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import {
    DataGridPro as MuiDataGrid,
    DataGridProProps as MuiDataGridProps,
    DataGridProProps,
} from '@mui/x-data-grid-pro';

import { GridColDef } from './types';

type DataGridVariant = 'standard' | 'minimal' | 'maximal';
type DataGridProps<T> = {
    checkboxSelection?: MuiDataGridProps['checkboxSelection'];
    columns?: GridColDef[];
    detailComponent?: ({ row }: { row: T }) => JSX.Element;
    detailHeight?: number | 'auto';
    disableRowSelectionOnClick?: MuiDataGridProps['disableRowSelectionOnClick'];
    getRowId?: MuiDataGridProps['getRowId'];
    height?: number;
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
    <Typography level="h4" sx={{ ml: 3, my: 2 }}>
        no results
    </Typography>
);

/**
 * Get density based on variant
 *
 * @param variant
 * @returns density
 */
const getDensity = (variant: DataGridVariant): MuiDataGridProps['density'] => {
    if (variant === 'minimal') {
        return 'compact';
    }
    if (variant === 'maximal') {
        return 'comfortable';
    }
    return 'standard';
};

/**
 * Data grid with:
 * - optional detail panel
 * - flexible column specification
 */
export const DataGrid = <T extends Record<string, unknown>>({
    columns: _columns,
    detailComponent,
    detailHeight = 'auto',
    height,
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
        (_props: { row: T }) => _props && <DetailComponent row={_props.row} />,
        [DetailComponent]
    );
    const getDetailPanelHeight = React.useCallback(
        () => detailHeight,
        [detailHeight]
    );

    const columns =
        _columns ||
        Object.keys((rows?.[0] as Record<string, unknown>) || {}).map(
            (field) => ({ field, hidden: false })
        );

    const density = getDensity(variant || 'standard');

    return (
        <Box display="inline" height={height}>
            {title && (
                <Typography level={variant === 'minimal' ? 'h4' : 'h3'}>
                    {title}
                </Typography>
            )}
            <MuiDataGrid
                {...props}
                columns={columns.filter((c) => !c.hidden)}
                density={density}
                getDetailPanelHeight={getDetailPanelHeight}
                getDetailPanelContent={
                    detailComponent ? getDetailPanelContent : undefined
                }
                loading={isLoading}
                rows={rows}
                slots={{
                    noRowsOverlay: NoRows,
                }}
                sx={{ border: 0 }}
            />
        </Box>
    );
};
