import { ReactNode } from 'react'
import Breadcrumbs from '@mui/joy/Breadcrumbs'

import { getSelectableId } from '@/utils/string'
import Link from 'next/link'

type Crumb = { label: string; url: string }

const NavBar = ({ links }: { links: Crumb[] }) => (
    <Breadcrumbs>
        {links.map(({ label, url }) => (
            <Link key={getSelectableId(label)} color="neutral" href={url}>
                {label}
            </Link>
        ))}
    </Breadcrumbs>
)
const Footer = () => <footer>footer</footer>

/**
 * Basic layout compound
 */
export const Layout = ({ children }: { children: ReactNode }) => {
    const links: Crumb[] = [{ label: 'dashboard', url: '/dashboard' }]

    return (
        <>
            <NavBar links={links} />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
