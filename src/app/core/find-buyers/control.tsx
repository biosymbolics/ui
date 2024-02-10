'use client';

import { ReactNode, useState } from 'react';

import { Section } from '@/components/layout/section';
import { Button, Checkbox, TextArea } from '@/components/input';
import { FindBuyersParams } from '@/types';
import { useNavigation } from '@/hooks/navigation';

export const FindBuyersControl = ({
    description: initialDescription = '',
    children,
    useGptExpansion: initialUseGptExpansion = true,
}: FindBuyersParams & { children: ReactNode }) => {
    const { setParams } = useNavigation();
    const [description, setDescription] = useState<string>(initialDescription);
    const [useGptExpansion, setUseGptExpansion] = useState<boolean>(
        initialUseGptExpansion
    );

    return (
        <>
            <Section variant="separated">
                <Section variant="l2">
                    <TextArea
                        placeholder="Describe the invention"
                        aria-label="Message"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        minRows={4}
                        maxRows={20}
                    />
                </Section>
                <Section variant="l2">
                    <Checkbox
                        checked={useGptExpansion}
                        onChange={(e) => setUseGptExpansion(e.target.checked)}
                        label="Expand with GPT?"
                        tooltip="Use GPT to expand to generate a description from a small snippet of text. Mostly for testing. This will result in a 10-30 more seconds of waiting."
                    />
                </Section>
                <Section variant="l2">
                    <Button
                        color="primary"
                        onClick={() => {
                            setParams({
                                description,
                                useGptExpansion,
                            });
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
