import { type Doc as DocType } from "contentlayer/generated";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const computedFields = {
  slug: {
    type: "string",
    resolve: (doc: DocType) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc: DocType) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
} as const;
export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: "**/*.{mdx,md}",
  fields: {
    global_id: {
      type: "string",
      required: true,
      description: "Unique id across all content, even after it moves or changes",
    },
    title: {
      type: "string",
      required: true,
      description: "The title of the page for this Doc",
    },
    nav_title: {
      type: "string",
      required: false,
      description: "The title of the page for this Doc in the navigation",
    },
    sidebar_label: {
      type: "string",
      required: false,
      description: "The label shown in the sidebar for this Doc",
    },
    description: {
      type: "string",
      required: false,
      description: "The description of the page for this Doc",
    },
    collapsible: {
      type: "boolean",
      required: false,
      description: "Whether the Doc page should be collapsible",
    },
    collapsed: {
      type: "boolean",
      required: false,
      description: "Whether the Doc page should be collapsed by default",
    },
    excerpt: {
      type: "string",
      required: true,
      description: "The excerpt of the Doc page",
    },

    tags: {
      type: "list",
      of: {
        type: "string",
      },
      required: false,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
