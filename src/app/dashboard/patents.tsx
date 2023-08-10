import { cache } from 'react'
import 'server-only'

import { PATENT_SEARCH_API_URL } from '@/constants'

// TODO: jsonschema validation
type Patent = {
    publicationNumber: string // TODO
    title: string
    abstract: string
    compounds: string[]
    diseases: string[]
    genes: string[]
    assignees: string[]
    inventors: string[]
}

const fetchPatents = cache(async (terms: string[]): Promise<Patent[]> => {
    if (terms.length === 0) {
        return []
    }
    const res = await fetch(`${PATENT_SEARCH_API_URL}?terms=${terms.join(',')}`)
    if (!res.ok) {
        throw new Error(
            `Failed to fetch patents: ${res.status} ${res.statusText}`
        )
    }
    return res.json()
})

export const Patents = async ({ terms }: { terms: string[] }) => {
    try {
        const patents = await fetchPatents(terms)
        return (
            <ul>
                {patents.map((patent) => (
                    <div>{patent.title}</div>
                ))}
            </ul>
        )
    } catch (e) {
        if (e instanceof Error) {
            return <div>Failed to fetch patents: {e.message}</div>
        }
        return <div>Failed to fetch patents</div>
    }
}
