'use server';

import { cache } from 'react';
import Box from '@mui/joy/Box';
import 'server-only';

import { PATENT_SEARCH_API_URL } from '@/constants';
import { DataGrid } from '@/components/data/grid';
import { Patent, PatentResponse, PatentSearchArgs } from '@/types/patents';
import { getFetchOptions } from '@/utils/actions';
import { getQueryArgs } from '@/utils/patents';

import { DetailContent, getPatentColumns, getStyles } from './client';

const fetchPatents = cache(
    async (args: PatentSearchArgs): Promise<Patent[]> => {
        if (args.terms.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await getFetchOptions(
            `${PATENT_SEARCH_API_URL}?${queryArgs}`,
            PatentResponse
        );
        return res;
    }
);

export const Patents = async (args: PatentSearchArgs) => {
    const columns = getPatentColumns();
    try {
        const patents = await fetchPatents(args);
        return (
            <Box sx={getStyles}>
                <DataGrid
                    columns={columns}
                    detailComponent={DetailContent<Patent>}
                    // pinned column === column title rendering issues
                    // initialState={{
                    //     pinnedColumns: { left: ['publication_number'] },
                    // }}
                    rows={patents.map((patent) => ({
                        ...patent,
                        id: patent.publication_number,
                    }))}
                />
            </Box>
        );
    } catch (e) {
        if (e instanceof Error) {
            return <div>Failed to fetch patents: {e.message}</div>;
        }
        return <div>Failed to fetch patents</div>;
    }
};
