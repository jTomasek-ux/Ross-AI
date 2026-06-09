import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsGroupLabel } from "@/components/DocsGroupLabel";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="ross-docs">
      <DocsLayout
        tree={source.getPageTree()}
        sidebar={{
          components: {
            Separator: DocsGroupLabel,
          },
        }}
        {...baseOptions()}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
