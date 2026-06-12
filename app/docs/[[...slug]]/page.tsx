import { source } from '@/lib/source';
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';

// Import our custom components
import { Card, Cards } from 'fumadocs-ui/components/card';
import { ImagePreview } from '@/src/components/docs/ImagePreview';
import { DiscordWidget } from '@/src/components/docs/DiscordWidget';
import { ContributorList } from '@/src/components/docs/ContributorList';
import { SupportCard } from '@/src/components/docs/SupportCard';
import { GitHubRelease } from '@/src/components/docs/GitHubRelease';
import { GitHubChangelogLink } from '@/src/components/docs/GitHubChangelogLink';
import { GitHubChangelog } from '@/src/components/docs/GitHubChangelog';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

const components = {
  ...defaultMdxComponents,
  Card,
  Cards,
  ImagePreview,
  DiscordWidget,
  ContributorList,
  SupportCard,
  GitHubRelease,
  GitHubChangelogLink,
  GitHubChangelog,
  Tabs,
  Tab,
};

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={components} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
