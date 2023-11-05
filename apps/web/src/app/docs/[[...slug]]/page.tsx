import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";

import { Mdx } from "./_components/mdx-components";
import { DocsPageHeader } from "./_components/page-header";

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const doc = allDocs.find((doc) => doc._raw.flattenedPath === params.slug);
  if (!doc) {
    return {};
  }
  return { title: doc.title };
};

async function getDocFromParams(params: { slug: string[] }) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    null;
  }

  return doc;
}

export default async function DocsPage({ params }: { params: { slug: string[] } }) {
  const doc = await getDocFromParams(params);
  if (!doc) {
    return notFound();
  }

  return (
    <div className="min-w-0 mx-auto w-full px-1 sm:px-2">
      <DocsPageHeader heading={doc.title} text={doc.description} />
      <Mdx code={doc.body.code} />
    </div>
  );
}
