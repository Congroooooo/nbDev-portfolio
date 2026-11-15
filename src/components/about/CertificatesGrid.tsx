"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import type { Certificate } from "@/content/types";
import { Lightbox } from "./Lightbox";

export function CertificatesGrid({ items }: { items: Certificate[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const opener = useRef(0);

  const open = (i: number) => {
    opener.current = i;
    setIndex(i);
  };
  const onClose = useCallback(() => {
    setIndex(null);
    const el = btns.current[opener.current];
    requestAnimationFrame(() => el?.focus());
  }, []);

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((c, i) => (
          <li key={c.title}>
            <button
              type="button"
              ref={(el) => {
                btns.current[i] = el;
              }}
              onClick={() => open(i)}
              aria-label={`View certificate: ${c.title}`}
              className="group block w-full text-left"
            >
              <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-m)] bg-ink-2">
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
                  className="object-cover transition-transform duration-700 ease-[var(--e-out)] group-hover:scale-105"
                />
              </span>
              <span className="t-label mt-3 block text-mute">{c.date}</span>
              <span className="t-body mt-1 block">{c.title}</span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        images={items.map((c) => c.image)}
        titles={items.map((c) => c.title)}
        index={index}
        onClose={onClose}
        onIndex={setIndex}
      />
    </>
  );
}
