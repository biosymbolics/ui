import { PatentSearchArgs } from '@/types/patents';

/**
 * Get the query string for the patent search
 */
export const getQueryArgs = ({
    minPatentYears,
    relevanceThreshold,
    terms,
}: PatentSearchArgs): string =>
    `terms=${terms.join(
        ','
    )}&minPatentYears=${minPatentYears}&relevanceThreshold=${relevanceThreshold}`;
