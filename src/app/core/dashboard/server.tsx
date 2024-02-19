'use server';

import 'server-only';

import Box from '@mui/joy/Box';
import isEmpty from 'lodash/fp/isEmpty';

import { SearchCriteriaError, SearchError } from '@/components/composite';
import { AssetGrid } from '@/components/composite/assets';
import { PatentsDetail } from '@/components/composite/patents';
import { TrialsDetail } from '@/components/composite/trials';
import { AssetSearchArgs, PatentSearchArgs, TrialSearchArgs } from '@/types';

import { fetchAssets, fetchPatents, fetchTrials } from '../actions';

export const AssetList = async (args: AssetSearchArgs) => {
    try {
        const assets = await fetchAssets(args);
        return (
            <Box height="100vh">
                <AssetGrid assets={assets} />
            </Box>
        );
    } catch (e) {
        return <SearchError error={e} />;
    }
};

export const PatentList = async (args: PatentSearchArgs) => {
    const { description, terms } = args;
    if (isEmpty(terms) && isEmpty(description)) {
        return <SearchCriteriaError />;
    }

    try {
        const patents = await fetchPatents(args);
        return <PatentsDetail patents={patents} />;
    } catch (e) {
        return <SearchError error={e} />;
    }
};

export const TrialList = async (args: TrialSearchArgs) => {
    const { description, terms } = args;
    if (isEmpty(terms) && isEmpty(description)) {
        return <SearchCriteriaError />;
    }

    try {
        const trials = await fetchTrials(args);
        return <TrialsDetail trials={trials} />;
    } catch (e) {
        return <SearchError error={e} />;
    }
};
