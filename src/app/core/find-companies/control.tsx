'use client';

import { ReactNode, useState, useTransition } from 'react';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';
import { Button, Slider, TextArea } from '@/components/input';
import { FindCompaniesArgs } from '@/types';
import { useNavigation } from '@/hooks/navigation';

/**
 * Controls for finding companies based on vector similarity to description & other serach args
 * @param param0
 * @returns
 */
export const FindCompaniesControl = ({
    description: initialDescription = '',
    children,
    k: initialK = 1000,
}: FindCompaniesArgs & { children: ReactNode }) => {
    const { setParams } = useNavigation();
    const [description, setDescription] = useState<string>(initialDescription);
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
                        <Grid xs={12} sm={3}>
                            <Slider<number>
                                defaultValue={k}
                                label="Search Breadth"
                                onChange={(newK) => setK(newK)}
                                min={100}
                                max={5000}
                                size="lg"
                                step={200}
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
