import {Footer, Layout, Navbar} from 'nextra-theme-docs'
import {Head} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import './globals.css'
import {Metadata} from "next";
import {NextraSearchDialog} from "@/components/nextra-search-dialog";
import {getPagesFromPageMap} from "@/lib/getPagesFromPageMap";

export const metadata: Metadata = {
    title: 'optimizerDuck',
    description: 'optimizerDuck - Free, open-source Windows optimization tool for performance, privacy, and simplicity.',
    // Define your metadata here
    // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

// const banner = <Banner storageKey="some-key">This template was created with 🩸 and 💦 by <Link href="https://github.com/phucbm">PHUCBM</Link> 🐧</Banner>
// :))) ok ni'
const navbar = (
    <Navbar
        projectLink="https://github.com/itsfatduck/optimizerduck-docs"
        logo={<img src="/images/general/logo.png" alt="Logo" width={350} height={25}/>}
        // ... Your additional navbar options
    />
)
const footer = <Footer>MIT {new Date().getFullYear()} © fatDuck.</Footer>

export default async function RootLayout({children}) {
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
        <html
            // Not required, but good for SEO
            lang="en"
            // Required to be set
            dir="ltr"
            // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
            suppressHydrationWarning
        >
        <Head
            // ... Your additional head options
        >
            <link rel="shortcut icon" href="/images/general/icon.png"/>
            {/* Your additional tags should be passed as `children` of `<Head>` element */}
        </Head>
        <body>
        <Layout
            // banner={banner}
            navbar={navbar}
            pageMap={pageMap}
            docsRepositoryBase="https://github.com/itsfatduck/optimizerduck-docs/tree/main"
            footer={footer}
            search={<NextraSearchDialog pages={pages}/>}
            // ... Your additional layout options
        >
            {children}
        </Layout>
        </body>
        </html>
    )
}