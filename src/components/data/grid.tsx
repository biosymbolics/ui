import Grid from '@mui/joy/Grid'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import {
    DataGridPro as MuiDataGrid,
    DataGridProProps as MuiDataGridProps,
    DataGridProProps,
} from '@mui/x-data-grid-pro'

import React from 'react'

type DataGridProps = {
    columns: MuiDataGridProps['columns']
    isLoading?: MuiDataGridProps['loading']
    rows: MuiDataGridProps['rows']
}

const DetailPanelContent = ({ row: rowProp }: { row: Record<string, any> }) => (
    <Stack
        sx={{ py: 2, height: '100%', boxSizing: 'border-box' }}
        direction="column"
    >
        <Sheet>
            <Typography>{`Order #${rowProp.id}`}</Typography>
            <Grid container>
                <Grid>
                    <Typography>Stuff</Typography>
                </Grid>
            </Grid>
        </Sheet>
    </Stack>
)

export const DataGrid = ({ isLoading, ...props }: DataGridProps) => {
    const getDetailPanelContent = React.useCallback<
        NonNullable<DataGridProProps['getDetailPanelContent']>
    >(({ row }) => <DetailPanelContent row={row} />, [])
    const getDetailPanelHeight = React.useCallback(() => 400, [])

    return (
        <MuiDataGrid
            checkboxSelection
            disableRowSelectionOnClick
            {...props}
            getDetailPanelHeight={getDetailPanelHeight}
            getDetailPanelContent={getDetailPanelContent}
            loading={isLoading}
        />
    )
}
