import { Suspense } from 'react'

import { Description } from './description'
import { Patents } from './patents'

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
            <h1>Terms: {terms.join(', ')}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <Description terms={terms} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <Patents terms={terms} />
            </Suspense>
        </>
    )
}

export default Page
