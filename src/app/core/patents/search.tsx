'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

import { Button } from '@/components/input/button';
import { Autocomplete } from '@/components/input';
import { Slider } from '@/components/input/slider';
import { Section } from '@/components/layout/section';
import { useNavigation } from '@/hooks/navigation';
import { PATENT_DOMAINS, PatentSearchArgs } from '@/types/patents';
import { Option } from '@/types/select';
import { getQueryArgs } from '@/utils/patents';

export const SearchBar = ({
    domains = [],
    fetchOptions,
    minPatentYears,
    terms,
}: {
    fetchOptions: (term: string) => Promise<Option[]>;
} & PatentSearchArgs): JSX.Element => {
    const { navigate } = useNavigation();
    const pathname = usePathname();
    const [newTerms, setTerms] = useState<string[] | null>(terms);
    const [newDomains, setDomains] = useState<string[] | null>(domains);
    const [newMinPatentYears, setMinPatentYears] =
        useState<number>(minPatentYears);

    const handlePatentLifeChange = (value: number) => {
        if (typeof value !== 'number') {
            console.warn(`Invalid value: ${JSON.stringify(value)}`);
            return;
        }
        setMinPatentYears(value);
    };

    return (
        <>
            <Typography gutterBottom level="h2">
                Select Terms
            </Typography>
            <Autocomplete<Option, true, false>
                isMultiple
                defaultValue={terms.map((term) => ({ id: term, label: term }))}
                isOptionEqualToValue={(option: Option, value: Option) =>
                    option.id === value.id
                }
                onChange={(e, values) => {
                    setTerms(values.map((v) => v.id));
                }}
                optionFetcher={fetchOptions}
                size="lg"
                variant="soft"
            />
            <Section variant="l1">
                <Grid container spacing={4}>
                    <Grid xs={12} sm={4}>
                        <Slider
                            defaultValue={newMinPatentYears}
                            label="Minimum Patent Years Left"
                            min={0}
                            max={20}
                            onChange={(e, v) =>
                                handlePatentLifeChange(v as number)
                            }
                            size="lg"
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Autocomplete<string, true, false>
                            isMultiple
                            defaultValue={newDomains || []}
                            label="Search domains"
                            onChange={(e, values) => {
                                setDomains(values);
                            }}
                            options={PATENT_DOMAINS}
                        />
                    </Grid>
                </Grid>
            </Section>
            <Section variant="l2">
                <Button
                    onClick={() => {
                        if (!newTerms) {
                            console.debug("No terms selected, can't search");
                            return;
                        }
                        const queryArgs = getQueryArgs({
                            domains: newDomains,
                            minPatentYears: newMinPatentYears,
                            terms: newTerms,
                        });
                        navigate(`${pathname}?${queryArgs}`);
                    }}
                    sx={{ ml: 'auto' }}
                >
                    Search
                </Button>
            </Section>
        </>
    );
};
