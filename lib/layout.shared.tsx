import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { APP_URL } from "@/lib/site";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="font-serif font-light tracking-widest uppercase">
          Ross <span className="font-medium">AI</span>
          <span className="text-fd-muted-foreground font-sans text-xs tracking-[0.2em] ml-2">
            Docs
          </span>
        </span>
      ),
      url: "/docs",
    },
    links: [
      {
        text: "Open app",
        url: APP_URL,
        external: true,
      },
      {
        text: "GitHub",
        url: "https://github.com/jTomasek-ux/Ross-AI",
        external: true,
      },
    ],
  };
}
