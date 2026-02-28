import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import './globals.css'
import { Metadata } from "next";
import { NextraSearchDialog } from "@/components/nextra-search-dialog";
import { getPagesFromPageMap } from "@/lib/getPagesFromPageMap";
import { JetBrains_Mono, Quicksand } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin', 'vietnamese'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
})

const quicksand = Quicksand({
    subsets: ['latin', 'vietnamese'],
    variable: '--font-quicksand',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
    title: 'optimizerDuck',
    description: 'optimizerDuck - Free, open-source Windows optimization tool for performance, privacy, and simplicity.',
    icons: {
        icon: '/images/general/icon.png',
    },
    // Define your metadata here
    // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

// const banner = <Banner storageKey="some-key">This template was created with 🩸 and 💦 by <Link href="https://github.com/phucbm">PHUCBM</Link> 🐧</Banner>
// :))) ok ni'
const navbar = (
    <Navbar
        projectLink="https://github.com/itsfatduck/optimizerduck-docs"
        chatLink="https://discord.gg/tDUBDCYw9Q"
        logo={<img src="/images/general/logo.svg" alt="Logo" width={180} height={18} />}
    // ... Your additional navbar options
    />
)
const footer = <Footer>MIT {new Date().getFullYear()} © fatDuck.</Footer>

export default async function RootLayout({ children }) {
    const pageMap = await getPageMap();
    const pages = await getPagesFromPageMap({
        pageMapArray: pageMap,
        // modify page data if needed
        // filterItem: async (item) => {
        //     return {
        //         ...item,
        //     };
        // }
    });


    return (
        <html lang="en" dir="ltr" className={`scroll-smooth ${quicksand.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <Head
            // ... Your additional head options
            >
                <link rel="shortcut icon" href="/images/general/icon.png" />
                {/* Your additional tags should be passed as `children` of `<Head>` element */}
            </Head>
            <body>
                <div className="mica-ambient" />
                <div className="mica-glass" />
                <Layout
                    // banner={banner}
                    navbar={navbar}
                    pageMap={pageMap}
                    docsRepositoryBase="https://github.com/itsfatduck/optimizerduck-docs/tree/main"
                    footer={footer}
                    search={<NextraSearchDialog pages={pages} />}
                // ... Your additional layout options
                >
                    {children}
                </Layout>
            </body>
        </html>
    )
}