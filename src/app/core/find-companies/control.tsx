'use client';

import { ReactNode, useState, useTransition } from 'react';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';
import { Autocomplete, Button, Slider, TextArea } from '@/components/input';
import { Option } from '@/types/select';
import { FindCompaniesParams } from '@/types';
import { useNavigation } from '@/hooks/navigation';

import { fetchAutocompletions } from '../actions';

export const FindCompaniesControl = ({
    description: initialDescription = '',
    children,
    similarCompanies: initialCompanies = [],
    k: initialK = 1000,
}: FindCompaniesParams & { children: ReactNode }) => {
    const { setParams } = useNavigation();
    const [description, setDescription] = useState<string>(initialDescription);
    const [companies, setCompanies] = useState<string[]>(initialCompanies);
    const [k, setK] = useState<number>(initialK);
    const [isPending] = useTransition();

    return (
        <>
            <Section variant="separated">
                <Section variant="l2">
                    <Typography gutterBottom level="h4">
                        Describe technology, platform, or theme
                    </Typography>
                    <TextArea
                        aria-label="description"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxRows={20}
                        minRows={4}
                        placeholder="Enter a 2-3 paragraph description of the invention."
                    />
                </Section>
                <Section variant="l2">
                    <Grid container>
                        <Grid xs={12} sm={6}>
                            <Autocomplete<Option, true, false>
                                isMultiple
                                defaultValue={(companies || []).map(
                                    (company) => ({
                                        id: company,
                                        label: company,
                                    })
                                )}
                                isOptionEqualToValue={(
                                    option: Option,
                                    value: Option
                                ) => option.id === value.id}
                                label="Select Companies"
                                onChange={(e, values) => {
                                    setCompanies(values.map((v) => v.id));
                                }}
                                optionFetcher={(string) =>
                                    fetchAutocompletions(string, ['owner'])
                                }
                                optionLabelField="label"
                                size="md"
                                sx={{ mr: 3 }}
                                tooltip="Select compan(y|ies) for which you want to find similar entities."
                                variant="soft"
                            />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Slider<number>
                                defaultValue={k}
                                label="Search Breadth"
                                onChange={(newK) => setK(newK)}
                                min={100}
                                max={5000}
                                size="lg"
                                step={100}
                                sx={{ mr: 3 }}
                                tooltip="How distantly to search for related IP (KNN). Higher values will take longer to compute."
                            />
                        </Grid>
                    </Grid>
                </Section>
                <Section variant="l2">
                    <Button
                        color="primary"
                        isLoading={isPending}
                        onClick={() => {
                            setParams(
                                {
                                    description,
                                    k,
                                    companies: companies.join(';'),
                                },
                                true
                            );
                        }}
                        size="lg"
                        sx={{ ml: 'auto' }}
                    >
                        Submit
                    </Button>
                </Section>
            </Section>
            <Section variant="main">{children}</Section>
        </>
    );
};
