import { cache } from 'react'
import 'server-only'

import { TERM_DESCRIPTION_API_URL } from '@/constants'

const getDescription = cache(async (terms: string[]): Promise<string> => {
    if (terms.length === 0) {
        return ''
    }
    const res = await fetch(
        `${TERM_DESCRIPTION_API_URL}?terms=${terms.join(',')}`
    )
    if (!res.ok) {
        throw new Error(
            `Failed to fetch patents: ${res.status} ${res.statusText}`
        )
    }
    return res.json()
})

export const Description = async ({ terms }: { terms: string[] }) => {
    try {
        const description = await getDescription(terms)
        return <p>{description || 'nope'}</p>
    } catch (e) {
        if (e instanceof Error) {
            return <div>Failed to fetch description: {e.message}</div>
        }
        return <div>Failed to fetch description</div>
    }
}
