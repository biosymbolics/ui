import { Suspense } from 'react'
import Typography from '@mui/joy/Typography'
import fetch from 'node-fetch'
import { z } from 'zod'

import { Section } from '@/components/layout/section'
import { Autocomplete } from '@/components/input'
import { PATENT_TERM_API_URL } from '@/constants'

import { Description } from './description'
import { Patents } from './patents'
import { getFetchOptions } from '@/utils/actions'

const AutocompleteResponse = z.object({
    terms: z.array(z.string()),
})

const fetchOptions = async (term: string): Promise<string[]> => {
    'use server'
    const res = await getFetchOptions(
        `${PATENT_TERM_API_URL}?term=${term}`,
        AutocompleteResponse
    )
    return res.terms
}

/**
 * http://localhost:3000/dashboard?terms=asthma
 */
export const Page = async ({
    searchParams,
}: {
    searchParams: Record<string, string>
}) => {
    const terms = searchParams.terms?.split(',') ?? []

    if (terms.length === 0) {
        return <div>Missing terms</div>
    }

    return (
        <>
            <Section>
                <Autocomplete
                    isMultiple
                    label="Select terms"
                    optionFetcher={fetchOptions}
                />
                <Typography gutterBottom level="h1">
                    Terms: {terms.join(', ')}
                </Typography>
                <Suspense fallback={<div>Loading...</div>}>
                    <Description terms={terms} />
                </Suspense>
            </Section>
            <Section>
                <Suspense fallback={<div>Loading...</div>}>
                    <Patents terms={terms} />
                </Suspense>
            </Section>
        </>
    )
}

export default Page
