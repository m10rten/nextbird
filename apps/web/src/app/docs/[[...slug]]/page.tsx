import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";

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
    <article className="mx-auto max-w-xl py-8 container sm:max-w-full sm:px-2">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{doc.title}</h1>
      </div>
      <div
        className="[&>*:last-child]:mb-0 [&>*]:mb-3 markdown max-w-full overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: doc.body.html }}
      />
    </article>

    // <>
    //   <DocsPageHeader heading={doc.title} text={doc.description} />
    //   <Mdx code={doc.body.code} />
    //   <hr className="my-4 md:my-6" />
    // </>
  );
}
