"use client";

import type { ReactNode } from "react";

type DocsGroupLabelProps = {
  item: {
    name?: ReactNode;
    icon?: ReactNode;
  };
};

export function DocsGroupLabel({ item }: DocsGroupLabelProps) {
  if (!item.name) return null;

  return (
    <p className="mb-1 mt-6 px-2 text-xs font-medium tracking-[0.2em] uppercase text-ross-midgrey first:mt-0 inline-flex items-center gap-2 [&_svg]:size-4 [&_svg]:shrink-0">
      {item.icon}
      {item.name}
    </p>
  );
}
