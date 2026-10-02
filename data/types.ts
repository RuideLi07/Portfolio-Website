export type PracticeImpactPair = {
  practice: string;
  impact: string;
};

export type TableRow = {
  category: {
    name: string;
    icon?: string;
    iconLight?: string;
  };
  items: PracticeImpactPair[];
  agencies?: string[];
};

export type PipelineStep = {
  num: string;
  title: string;
  desc: string;
  tech?: string;
  subSteps?: Array<{
    tag: string;
    name: string;
    detail: string;
  }>;
};

export type ContentBlock =
  | { type: "delivery-comparison"; images: Array<{ src: string; alt: string; caption: string }> }
  | { type: "interview-insights"; src: string; alt: string; caption: string; insights: string[] }
  | { type: "video-text"; src: string; text: string; loopDelayMs?: number }
  | { type: "competitor-table"; headers: string[]; rows: [string, string, string, string][]; logos: Record<string, string> }
  | { type: "image-feature-pair"; title: string; text: string; images: Array<{ src: string; alt: string; caption: string }> }
  | { type: "annotated-limitations" }
  | { type: "heading"; content: string; sidebarTitle?: string }
  | { type: "vendor-chart"; description?: string }
  | ({ type: "image-feature"; title?: string; text: string; highlightTitle?: boolean; showPrototypeButton?: boolean } & (
      | { src: string; alt: string; caption?: string; images?: never }
      | { images: Array<{ src: string; alt: string; caption?: string }>; src?: never; alt?: never; caption?: never }
    ))
  | { type: "text"; content: string; orderedItems?: string[]; isBold?: boolean; size?: "sm" | "base" | "lg" | "xl" }
  | { type: "image"; src: string; srcLight?: string; alt?: string; caption?: string; showCaptionInline?: boolean; transparent?: boolean; width?: number; }
  | { type: "image-row"; showCaptionInline?: boolean; images: Array<{src: string; srcLight?: string; alt?: string; caption?: string; transparent?: boolean; width?: number;}>; }
  | {
      type: "image-grid-featured";
      gridImages: Array<{ src: string; srcLight?: string; alt?: string }>;
      featuredImage: { src: string; srcLight?: string; alt?: string };
      caption?: string;
    }
  | { type: "table"; headers: string[]; rows: TableRow[] | string[][]; emphasizeLastRow?: boolean; autoCycleMs?: number }
  | { type: "pipeline-steps"; steps: PipelineStep[] }
  | {
      type: "video";
      src: string;
      caption?: string;
      autoplay?: boolean; // default: false (click-to-play). true = autoplay + muted (required by browsers)
      loop?: boolean; // default: false. true = video repeats after ending, independent of autoplay
      loopDelayMs?: number; // pause on the final frame before repeating when loop is true
      controls?: boolean; // default: true (shows play/pause/scrub bar). false = hide all native controls
    }
  | {
      type: "video-feature";
      title: string;
      text?: string;
      video?: string;
      demos?: Array<{ src: string; label: string; text?: string }>;
      poster?: string;
      reverse?: boolean; // default: video on the left, text on the right. true = swap (text left, video right)
    }
  | { type: "figma"; url: string; title?: string; height?: number; }
  | { type: "divider" };

export interface Project {
  id: string;
  title: string;
  type: "design" | "research";
  description: string;
  timeframe?: string;
  tags?: string[];
  blocks: ContentBlock[];
  sectionTitles?: string[]; // one title per segment, in order, split by "divider" blocks
  thumbnail?: string; // cover image for the project gallery grid. Falls back to the first "image" or "image-row" block if omitted
  thumbnailLight?: string; // optional light-mode variant of thumbnail
}
