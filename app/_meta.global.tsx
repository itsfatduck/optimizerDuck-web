import { MetaRecord } from "nextra";

const DOCS_ITEMS: MetaRecord = {
    index: '',
    navigation: '',
    tips: '',
}


export default {
    index: {
        type: 'page',
        theme: {
            layout: 'full',
            toc: false,
            timestamp: false,
        }
    },
    docs: {
        type: 'page',
        title: 'Documentation',
        items: DOCS_ITEMS
    },
    contact: {
        type: 'page',
        theme: {
            layout: 'full',
            toc: false,
            timestamp: false,
        }
    },
}