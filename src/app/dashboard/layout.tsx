import { ReactNode } from 'react'
import useSWR from 'swr'

type Fetcher = <T>(args: Record<string, any>) => T

const NavBar = ({ links }: { links: string[] }) => <nav>{links}</nav>
const Footer = () => <footer>footer</footer>

/**
 * Basic layout compound
 */
export const RootLayout = ({
    children,
    fetcher,
}: {
    children: ReactNode
    fetcher: Fetcher
}) => {
    const { data, error } = useSWR<{ links: string[] }>(
        '/api/navigation',
        fetcher
    )

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
            <NavBar links={data.links} />
            <main>{children}</main>
            <Footer />
        </>
    )
}
