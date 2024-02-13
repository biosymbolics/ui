'use client';

import { ReactNode, useState, useTransition } from 'react';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';
import { Button, Checkbox, Slider, TextArea } from '@/components/input';
import { FindBuyersParams } from '@/types';
import { useNavigation } from '@/hooks/navigation';

export const FindBuyersControl = ({
    description: initialDescription = '',
    children,
    useGptExpansion: initialUseGptExpansion = true,
    k: initialK = 1000,
}: FindBuyersParams & { children: ReactNode }) => {
    const { setParams } = useNavigation();
    const [description, setDescription] = useState<string>(initialDescription);
    const [useGptExpansion, setUseGptExpansion] = useState<boolean>(
        initialUseGptExpansion
    );
    const [k, setK] = useState<number>(initialK);
    const [isPending] = useTransition();

    return (
        <>
            <Section variant="separated">
                <Section variant="l2">
                    <Typography gutterBottom level="h4">
                        Invention Description
                    </Typography>
                    <TextArea
                        aria-label="Message"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxRows={20}
                        minRows={4}
                        placeholder="Enter a 2-3 paragraph description of the invention."
                    />
                </Section>
                <Section variant="l2">
                    <Grid container justifyContent="space-between">
                        <Grid xs={12} sm={4}>
                            <Slider<number>
                                defaultValue={k}
                                label="Nearest Neighbors"
                                onChange={(newK) => setK(newK)}
                                min={50}
                                max={5000}
                                size="lg"
                                step={100}
                                sx={{ mr: 3 }}
                                tooltip="How distantly to search for related IP. Higher values will take longer to compute."
                            />
                        </Grid>
                        <Grid>
                            <Checkbox
                                checked={useGptExpansion}
                                onChange={(e) =>
                                    setUseGptExpansion(e.target.checked)
                                }
                                label="Expand with GPT?"
                                tooltip="Use GPT to expand to generate a description from a small snippet of text. Mostly for testing. This will result in a 10-30 more seconds of waiting."
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
                                    useGptExpansion,
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
