import type { ContentBlock } from "@/data/projects";
import styles from "./InterviewInsights.module.css";

export default function InterviewInsights({ block }: { block: Extract<ContentBlock, { type: "interview-insights" }> }) {
  return (
    <section className={styles.container} aria-label="CEO interview insights">
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
                    {index === 0 ? <><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M12 8v5M5 17v-4h14v4" /><rect x="2" y="17" width="6" height="5" rx="1" /><rect x="16" y="17" width="6" height="5" rx="1" /></>
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
