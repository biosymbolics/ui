'use client';

import { SetStateAction, useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/joy/Grid';

import { Autocomplete, Button, Select, Slider } from '@/components/input';
import { Section } from '@/components/layout/section';
import { useNavigation } from '@/hooks/navigation';
import { PatentSearchArgs } from '@/types';
import { Option } from '@/types/select';
import { getQueryArgs } from '@/utils/patents';

import { FetchAutocompletions } from './types';

/**
 * Search bar for assets
 */
export const SearchBar = ({
    endYear = 2024,
    exemplarPatents,
    fetchAutocompletions,
    queryType,
    startYear = 2014,
    terms,
}: {
    fetchAutocompletions: FetchAutocompletions;
} & PatentSearchArgs): JSX.Element => {
    const { navigate } = useNavigation();
    const pathname = usePathname();
    const [newTerms, setTerms] = useState<string[] | null>(terms);
    const [newExemplarPatents, setExemplarPatents] = useState<string[] | null>(
        exemplarPatents || null
    );
    const [newQueryType, setQueryType] = useState<string | null>(
        queryType || null
    );
    const [newYearRange, setYearRange] = useState<[number, number]>([
        startYear,
        endYear,
    ]);

    return (
        <>
            <Autocomplete<Option, true, false>
                isMultiple
                defaultValue={(terms || []).map((term) => ({
                    id: term,
                    label: term,
                }))}
                isOptionEqualToValue={(option: Option, value: Option) =>
                    option.id === value.id
                }
                label="Select Terms"
                onChange={(e, values) => {
                    setTerms(values.map((v) => v.id));
                }}
                optionFetcher={fetchAutocompletions}
                optionLabelField="label"
                size="xlg"
                tooltip="Compounds, diseases, MoAs, pharmaceutical companies, etc."
                variant="soft"
            />
            <Section variant="l1">
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6}>
                        <Slider<[number, number]>
                            defaultValue={newYearRange}
                            label="Year Range"
                            onChange={(value) => setYearRange(value)}
                            min={2000}
                            minDistance={2}
                            max={2025}
                            size="lg"
                            valueLabelDisplay="on"
                        />
                    </Grid>

                    <Grid xs={12} sm={2}>
                        <Select
                            defaultValue={queryType}
                            label="Search Type"
                            onChange={(
                                e: unknown,
                                value: SetStateAction<string | null>
                            ) => {
                                setQueryType(value);
                            }}
                            options={['AND', 'OR']}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 1 }}>
                    <Grid xs={12} sm={6}>
                        <Autocomplete<Option, true, false>
                            isMultiple
                            defaultValue={(exemplarPatents || []).map(
                                (patent) => ({
                                    id: patent,
                                    label: patent,
                                })
                            )}
                            isOptionEqualToValue={(
                                option: Option,
                                value: Option
                            ) => option.id === value.id}
                            label="Exemplar Patents"
                            onChange={(e, values) => {
                                setExemplarPatents(values.map((v) => v.id));
                            }}
                            optionFetcher={(str: string) =>
                                fetchAutocompletions(str, 'id')
                            }
                            size="md"
                            tooltip="Patents that exemplify what you are looking for, against which we'll perform cosine similarity comparisons against the embedded representations of the patents in our database."
                            variant="soft"
                        />
                    </Grid>
                </Grid>
            </Section>
            <Section variant="l2">
                <Button
                    onClick={() => {
                        if (!newTerms) {
                            console.warn("No terms selected, can't search");
                            return;
                        }
                        const queryArgs = getQueryArgs({
                            endYear: newYearRange?.[1],
                            queryType: newQueryType,
                            exemplarPatents: newExemplarPatents,
                            startYear: newYearRange?.[0],
                            terms: newTerms,
                        });
                        navigate(`${pathname}?${queryArgs}`);
                    }}
                    size="lg"
                    sx={{ ml: 'auto' }}
                >
                    Search
                </Button>
            </Section>
        </>
    );
};
