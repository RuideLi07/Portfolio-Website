"use client";

import { useEffect, useState } from "react";
import styles from "./VendorChart.module.css";

const vendors = [
  { name: "Dining", count: 52, color: "#E66A36" },
  { name: "Produce", count: 37, color: "#AB36DB" },
  { name: "Flowers", count: 22, color: "#3B7DDD" },
  { name: "Baked Goods", count: 14, color: "#32DA54" },
  { name: "Art", count: 11, color: "#D8D52F" },
];
const total = vendors.reduce((sum, vendor) => sum + vendor.count, 0);
const radius = 108;
const gap = 23;
const availableAngle = 360 - gap * vendors.length;

function point(angle: number) {
  const radians = (angle * Math.PI) / 180;
  return `${160 + radius * Math.cos(radians)} ${160 + radius * Math.sin(radians)}`;
}

const segments = vendors.map((vendor, index) => {
  const precedingCount = vendors.slice(0, index).reduce((sum, item) => sum + item.count, 0);
  const start = -125 + (precedingCount / total) * availableAngle + index * gap;
  const sweep = (vendor.count / total) * availableAngle;
  return {
    ...vendor,
    path: `M ${point(start)} A ${radius} ${radius} 0 ${sweep > 180 ? 1 : 0} 1 ${point(start + sweep)}`,
  };
});

export default function VendorChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : vendors[activeIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((current) => {
        if (current === null) return 0;
        return current === vendors.length - 1 ? null : current + 1;
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  function toggleSegment(index: number) {
    setActiveIndex((current) => current === index ? null : index);
  }

  return (
    <figure className={styles.figure}>
      <div
        className={styles.chart}
        data-has-active={activeIndex !== null}
        role="group"
        aria-label="Vendor composition"
        onKeyDown={(event) => {
          if (event.key === "Escape") setActiveIndex(null);
        }}
      >
        <svg viewBox="0 0 320 320" aria-label="Interactive vendor chart">
          {segments.map((vendor, index) => (
            <path
              key={vendor.name}
              className={styles.segment}
              d={vendor.path}
              fill="none"
              stroke={vendor.color}
              strokeWidth={36}
              strokeLinecap="round"
              role="button"
              tabIndex={0}
              aria-label={`${vendor.count} ${vendor.name} vendors`}
              aria-pressed={activeIndex === index}
              data-active={activeIndex === index}
              onClick={() => toggleSegment(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  if (!event.repeat) toggleSegment(index);
                }
              }}
            />
          ))}
        </svg>
        <div className={styles.center} aria-hidden="true">
          <span className={styles.count}>{active?.count ?? total}</span>
          <span className={styles.label}>{active ? `${active.name} Vendors` : "Total Vendors"}</span>
        </div>
        <span className={styles.srOnly}>
          {active ? `${active.count} ${active.name} vendors` : `${total} total vendors`}
        </span>
      </div>
    </figure>
  );
}
