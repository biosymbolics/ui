import { Suspense, cache } from 'react'

export const Dashboard = (): JSX.Element => <div />

export const getDescription = cache(async (terms: string[]) => {
    const res = await fetch(`https://api.example.com/artist/${terms}`)
    return res.json()
})

export const fetchPatents = cache(async (terms: string[]) => {
    const res = await fetch(`https://.../patents?terms=${terms.join(',')}`)
    return res.json()
})

async function Patents({ terms }: { terms: string[] }) {
    // Wait for the playlists
    const patents = await fetchPatents(terms)

    return (
        <ul>
            {patents.map((patent: { id: string; name: string }) => (
                <li key={patent.id}>{patent.name}</li>
            ))}
        </ul>
    )
}

export default async function Page({
    params: { terms },
}: {
    params: { terms: string[] }
}) {
    const description = await getDescription(terms)

    return (
        <>
            <h1>Terms: {terms.join(', ')}</h1>
            <p>{description}</p>
            <Suspense fallback={<div>Loading...</div>}>
                <Patents terms={terms} />
            </Suspense>
        </>
    )
}
