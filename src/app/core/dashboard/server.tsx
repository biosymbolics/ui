'use server';

import 'server-only';

import Box from '@mui/joy/Box';
import isEmpty from 'lodash/fp/isEmpty';

import { SearchCriteriaError, SearchError } from '@/components/composite';
import { EntityGrid } from '@/components/composite/entities';
import { PatentsDetail } from '@/components/composite/patents';
import { TrialsDetail } from '@/components/composite/trials';
import { EntitySearchArgs, PatentSearchArgs, TrialSearchArgs } from '@/types';

import { fetchEntities, fetchPatents, fetchTrials } from '../actions';

export const EntityList = async (args: EntitySearchArgs) => {
    try {
        const entities = await fetchEntities(args);

        const hasChildren = !isEmpty(
            entities.filter((e) => e.children.length > 0)
        );

        return (
            <Box height="100vh">
                <EntityGrid
                    category={args.entityCategory}
                    entities={entities}
                    hasChildren={hasChildren}
                    view={args.view}
                />
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
