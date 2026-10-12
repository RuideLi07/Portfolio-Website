import type { ContentBlock } from "@/data/projects";
import styles from "./InterviewInsights.module.css";

export default function InterviewInsights({ block }: { block: Extract<ContentBlock, { type: "interview-insights" }> }) {
  return (
    <section className={styles.container} aria-label="Interview insights">
      <div className={styles.layout}>
        <figure className={styles.portrait}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} />
          <figcaption>{block.caption}</figcaption>
        </figure>
        <div className={styles.content}>
          <div className={styles.eyebrow}>INTERVIEW INSIGHTS</div>
          <ul className={styles.insights}>
            {block.insights.map((insight, index) => (
              <li key={insight} className={styles.card}>
                <span className={styles.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {block.iconSet === "community" ? (
                      index === 0 ? <><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-3 3V11.5A8.5 8.5 0 0 1 9.5 3h3a8.5 8.5 0 0 1 8.5 8.5Z" /><path d="M6 9h10M6 13h7" /></>
                        : index === 1 ? <><path d="m11 17 2 2a1 1 0 1 0 3-3M14 14l2.5 2.5a1 1 0 1 0 3-3L15 9c-.8-.8-2-.8-2.8 0l-1 1a1 1 0 1 1-3-3l3.2-3.2a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 0 1.4.6H19M19 3l3 10h-2M2 13l3-10M2 13l7 7a1 1 0 1 0 3-3M5 4h5M8 14l4 4" /></>
                        : <><circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5 5" /></>
                    ) : index === 0 ? <><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M12 8v5M5 17v-4h14v4" /><rect x="2" y="17" width="6" height="5" rx="1" /><rect x="16" y="17" width="6" height="5" rx="1" /></>
                      : index === 1 ? <><path d="M2 5h12v12H2zM14 9h4l4 5v3h-8" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>
                      : <><path d="M20 3C10 2 3 6 4 14c1 7 10 8 14 1 2-4 2-8 2-12Z" /><path d="M3 22 15 10" /></>}
                  </svg>
                </span>
                <p>{insight}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
