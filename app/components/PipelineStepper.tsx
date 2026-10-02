"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { PipelineStep } from "@/data/projects";
import styles from "./PipelineStepper.module.css";

export default function PipelineStepper({ steps, isDark }: { steps: PipelineStep[]; isDark: boolean }) {
  const [active, setActive] = useState(0);
  const [restart, setRestart] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  useEffect(() => {
    if (steps.length < 2) return;
    const timer = setTimeout(() => setActive((current) => (current + 1) % steps.length), 6000);
    return () => clearTimeout(timer);
  }, [active, restart, steps.length]);

  function select(index: number) {
    setActive(index);
    setRestart((value) => value + 1);
  }

  if (!steps.length) return null;

  return (
    <section className={styles.container} data-theme={isDark ? "dark" : "light"} aria-label="Delivery routing pipeline">
      <div className={styles.header}>
        <span>HOW IT WORKS <span className={styles.counter}>{active + 1} / {steps.length}</span></span>
      </div>
      <div className={styles.tabs} role="tablist" aria-label="Pipeline steps">
        {steps.map((step, index) => (
          <button
            key={step.num} type="button" role="tab"
            ref={(element) => { buttons.current[index] = element; }}
            id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`}
            aria-selected={active === index} tabIndex={active === index ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % steps.length;
              else if (event.key === "ArrowLeft") next = (index - 1 + steps.length) % steps.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = steps.length - 1;
              else return;
              event.preventDefault();
              select(next);
              buttons.current[next]?.focus();
            }}
          ><span className={styles.number}>{step.num}</span><span>{step.title}</span></button>
        ))}
      </div>
      <div className={styles.panels}>
        {steps.map((step, index) => (
          <div key={step.num} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} aria-hidden={active !== index} tabIndex={active === index ? 0 : -1} className={styles.panel} data-active={active === index}>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            {step.tech && <p className={styles.tech}>{step.tech}</p>}
            {step.subSteps && <div className={styles.subSteps}>{step.subSteps.map((sub) => (
              <div key={sub.tag}><span className={styles.tech}>{sub.tag}</span><h4>{sub.name}</h4><p>{sub.detail}</p></div>
            ))}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
