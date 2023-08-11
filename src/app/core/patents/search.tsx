'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/joy/Box';

import { Button } from '@/components/input/button';
import { Autocomplete } from '@/components/input';
import { useNavigation } from '@/hooks/navigation';
import { Option } from '@/types/select';

export const SearchBar = ({
    fetchOptions,
    terms,
}: {
    fetchOptions: (term: string) => Promise<Option[]>;
    terms: string[];
}): JSX.Element => {
    const { navigate } = useNavigation();
    const pathname = usePathname();
    const [newTerms, setTerms] = useState<string[] | null>(terms);

    return (
        <>
            <Autocomplete<Option, true, false>
                isMultiple
                isOptionEqualToValue={(option: Option, value: Option) =>
                    option.id === value.id
                }
                label="Select terms"
                onChange={(e, values) => {
                    setTerms(values.map((v) => v.id));
                }}
                optionFetcher={fetchOptions}
                size="lg"
                variant="soft"
            />
            <Box display="flex" marginTop={3}>
                <Button
                    onClick={() => {
                        if (!newTerms) {
                            console.debug("No terms selected, can't search");
                            return;
                        }
                        navigate(`${pathname}?terms=${newTerms.join(',')}`);
                    }}
                    sx={{ marginLeft: 'auto' }}
                >
                    Search
                </Button>
            </Box>
        </>
    );
};
