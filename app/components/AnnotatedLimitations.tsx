import styles from "./AnnotatedLimitations.module.css";

export default function AnnotatedLimitations() {
  return (
    <section className={styles.container} aria-label="Limitations of Luma event discovery">
      <div className={styles.stage}>
        <figure className={styles.phone}>
          <div className={styles.screen}>
            {/* The overlays use percentages so they stay aligned with the screenshot. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/grasshop/Limitation2.png" alt="Luma Discover page with popular events above a Browse by Category section. Highlight 1 marks popular events; highlight 2 marks categories." />
            <div className={`${styles.highlight} ${styles.events}`} aria-hidden="true"><span>1</span></div>
            <div className={`${styles.highlight} ${styles.categories}`} aria-hidden="true"><span>2</span></div>
          </div>
          <figcaption>Luma Discover Page</figcaption>
        </figure>
        <svg className={styles.connectors} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 357 342 L 520 85 M 373 695 L 520 535" />
        </svg>
        <div className={`${styles.note} ${styles.first}`}>
          <h3><span className={styles.number}>1 · </span>Commercial Priority Bias</h3>
          <p>Big, sponsored events such as tech workshops, corporate coworking with huge marketing budgets take over the top spots, leaving local, low-budget community gatherings with far less visibility.</p>
        </div>
        <div className={`${styles.note} ${styles.second}`}>
          <h3><span className={styles.number}>2 · </span>Generic Category Walls</h3>
          <p>Broad categories force everything into big commercial boxes like Tech or Fitness. If you’re organizing a local plant swap or block party, your event gets hidden because the app doesn’t have a way to highlight small, neighborhood-level community efforts.</p>
        </div>
      </div>
    </section>
  );
}
