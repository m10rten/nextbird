export type NavLinks = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
};
export type Item = {
  title: string;
};
export type SidebarItem = Item &
  (
    | {
        href?: string;
        links: NavLinks[];
      }
    | {
        href: string;
        links: never;
      }
  );

export type SidebarConfig = {
  items: SidebarItem[];
};

export type DocsConfig = {
  sidebar: SidebarConfig;
};

export const docsConfig: DocsConfig = {
  sidebar:
    // we have: getting started, guides, api reference, faq, and contributing
    // getting started: overview, installation, and usage
    // guides: overview, and writing content
    // api reference: overview, and per type.
    // faq: overview
    // contributing: overview
    {
      items: [
        {
          title: "Getting Started",
          links: [
            {
              title: "Overview",
              href: "/docs/getting-started/",
            },
            {
              title: "Installation",
              href: "/docs/getting-started/installation",
              disabled: true,
            },
            {
              title: "Usage",
              href: "/docs/getting-started/usage",
              disabled: true,
            },
          ],
        },
        {
          title: "Guides",
          links: [
            {
              title: "Overview",
              href: "/docs/guides/",
              disabled: true,
            },
            {
              title: "Writing Content",
              disabled: true,
              href: "/docs/guides/writing-content",
            },
          ],
        },
        {
          title: "API Reference",
          links: [
            {
              title: "Overview",
              disabled: true,
              href: "/docs/api/",
            },
            {
              disabled: true,
              title: "Server",
              href: "/docs/api/server",
            },
          ],
        },
      ],
    },
};
