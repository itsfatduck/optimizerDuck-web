// @ts-nocheck
import { default as __fd_glob_32 } from "../content/docs/faq/troubleshooting/meta.json?collection=meta"
import { default as __fd_glob_31 } from "../content/docs/features/meta.json?collection=meta"
import { default as __fd_glob_30 } from "../content/docs/guides/meta.json?collection=meta"
import { default as __fd_glob_29 } from "../content/docs/faq/meta.json?collection=meta"
import { default as __fd_glob_28 } from "../content/docs/contribute/meta.json?collection=meta"
import { default as __fd_glob_27 } from "../content/docs/meta.json?collection=meta"
import * as __fd_glob_26 from "../content/docs/faq/troubleshooting/smartscreen.md?collection=docs"
import * as __fd_glob_25 from "../content/docs/faq/troubleshooting/slow-performance.md?collection=docs"
import * as __fd_glob_24 from "../content/docs/faq/troubleshooting/revert-changes.md?collection=docs"
import * as __fd_glob_23 from "../content/docs/faq/troubleshooting/download.md?collection=docs"
import * as __fd_glob_22 from "../content/docs/faq/troubleshooting/app-wont-open.md?collection=docs"
import * as __fd_glob_21 from "../content/docs/faq/troubleshooting/antivirus.md?collection=docs"
import * as __fd_glob_20 from "../content/docs/guides/uninstall.md?collection=docs"
import * as __fd_glob_19 from "../content/docs/guides/how-it-works.md?collection=docs"
import * as __fd_glob_18 from "../content/docs/guides/getting-started.md?collection=docs"
import * as __fd_glob_17 from "../content/docs/guides/best-practices.md?collection=docs"
import * as __fd_glob_16 from "../content/docs/features/startup-manager.md?collection=docs"
import * as __fd_glob_15 from "../content/docs/features/scheduled-tasks.md?collection=docs"
import * as __fd_glob_14 from "../content/docs/features/optimize.md?collection=docs"
import * as __fd_glob_13 from "../content/docs/features/disk-cleanup.md?collection=docs"
import * as __fd_glob_12 from "../content/docs/features/customize.md?collection=docs"
import * as __fd_glob_11 from "../content/docs/features/bloatware.md?collection=docs"
import * as __fd_glob_10 from "../content/docs/faq/troubleshooting.md?collection=docs"
import * as __fd_glob_9 from "../content/docs/faq/optimizing.md?collection=docs"
import * as __fd_glob_8 from "../content/docs/faq/general.md?collection=docs"
import * as __fd_glob_7 from "../content/docs/faq/compatibility.md?collection=docs"
import * as __fd_glob_6 from "../content/docs/contribute/website-development.md?collection=docs"
import * as __fd_glob_5 from "../content/docs/contribute/support-me.md?collection=docs"
import * as __fd_glob_4 from "../content/docs/contribute/overview.md?collection=docs"
import * as __fd_glob_3 from "../content/docs/contribute/contributors.md?collection=docs"
import * as __fd_glob_2 from "../content/docs/download.md?collection=docs"
import * as __fd_glob_1 from "../content/docs/community.md?collection=docs"
import * as __fd_glob_0 from "../content/docs/changelog.md?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "content/docs", {"changelog.md": __fd_glob_0, "community.md": __fd_glob_1, "download.md": __fd_glob_2, "contribute/contributors.md": __fd_glob_3, "contribute/overview.md": __fd_glob_4, "contribute/support-me.md": __fd_glob_5, "contribute/website-development.md": __fd_glob_6, "faq/compatibility.md": __fd_glob_7, "faq/general.md": __fd_glob_8, "faq/optimizing.md": __fd_glob_9, "faq/troubleshooting.md": __fd_glob_10, "features/bloatware.md": __fd_glob_11, "features/customize.md": __fd_glob_12, "features/disk-cleanup.md": __fd_glob_13, "features/optimize.md": __fd_glob_14, "features/scheduled-tasks.md": __fd_glob_15, "features/startup-manager.md": __fd_glob_16, "guides/best-practices.md": __fd_glob_17, "guides/getting-started.md": __fd_glob_18, "guides/how-it-works.md": __fd_glob_19, "guides/uninstall.md": __fd_glob_20, "faq/troubleshooting/antivirus.md": __fd_glob_21, "faq/troubleshooting/app-wont-open.md": __fd_glob_22, "faq/troubleshooting/download.md": __fd_glob_23, "faq/troubleshooting/revert-changes.md": __fd_glob_24, "faq/troubleshooting/slow-performance.md": __fd_glob_25, "faq/troubleshooting/smartscreen.md": __fd_glob_26, });

export const meta = await create.meta("meta", "content/docs", {"meta.json": __fd_glob_27, "contribute/meta.json": __fd_glob_28, "faq/meta.json": __fd_glob_29, "guides/meta.json": __fd_glob_30, "features/meta.json": __fd_glob_31, "faq/troubleshooting/meta.json": __fd_glob_32, });