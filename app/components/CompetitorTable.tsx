"use client";

import { useId, useRef, useState } from "react";
import type { ContentBlock } from "@/data/projects";
import styles from "./CompetitorTable.module.css";

export default function CompetitorTable({ block, isDark }: {
  block: Extract<ContentBlock, { type: "competitor-table" }>;
  isDark: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const row = block.rows[selected];

  return (
    <div className={styles.container} data-theme={isDark ? "dark" : "light"}>
      <div className={styles.tabs} role="tablist" aria-label="Competitor platforms">
        {block.rows.map(([name], index) => (
          <button
            key={name}
            ref={(element) => { tabs.current[index] = element; }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={selected === index}
            aria-controls={`${id}-panel`}
            tabIndex={selected === index ? 0 : -1}
            className={styles.tab}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % block.rows.length;
              else if (event.key === "ArrowLeft") next = (index - 1 + block.rows.length) % block.rows.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = block.rows.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              tabs.current[next]?.focus();
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.logos[name]} alt="" className={styles.logo} />
            <span>{name}</span>
            <span className={styles.indicator} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${selected}`} tabIndex={0} className={styles.panel}>
        <table className={styles.table}>
          <caption className={styles.srOnly}>{row[0]} competitive analysis</caption>
          <thead><tr>{block.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
          <tbody><tr>{row.slice(1).map((value, index) => <td key={index}>{value}</td>)}</tr></tbody>
        </table>
      </div>
    </div>
  );
}
