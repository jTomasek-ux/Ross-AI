import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 rounded-lg border border-ross-lightgrey dark:border-white/10 bg-ross-offwhite dark:bg-white/5 px-4 py-3 text-sm text-ross-black dark:text-ross-offwhite">
      {children}
    </div>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Callout: Note,
    ...components,
  };
}

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
