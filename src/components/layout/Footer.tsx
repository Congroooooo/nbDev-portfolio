"use client";

import { contact, site } from "@/content";
import { ArrowLink } from "@/components/ui";
import { useLenis } from "./SmoothScroll";
import { LiveClock } from "./LiveClock";

const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/hackathons", label: "Hackathons" },
  { href: "/about", label: "About" },
];

export function Footer() {
  const lenis = useLenis();

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] opacity-25"
        style={{ background: "radial-gradient(60% 80% at 50% 110%, var(--accent), transparent 70%)" }}
      />
      <div className="wrap relative pt-[var(--sec)] pb-8">
        <p className="t-label font-mono text-accent">{contact.label}</p>
        <h2 className="t-d1 mt-6 max-w-[14ch]">{contact.headline}</h2>
        <a
          href={`mailto:${contact.email}`}
          className="mt-12 block whitespace-nowrap font-normal leading-none tracking-[-0.04em] transition-colors duration-300 hover:text-accent md:mt-16"
          style={{ fontSize: "min(calc((100vw - 2 * var(--pad)) / 10.8), 150px)" }}
        >
          {contact.email}
        </a>

        <div className="mt-20 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
          <div>
            <p className="t-label font-mono text-mute">Explore</p>
            <ul className="mt-4 flex flex-col gap-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <ArrowLink href={n.href} arrow="→">
                    {n.label}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-label font-mono text-mute">Connect</p>
            <ul className="mt-4 flex flex-col gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <ArrowLink href={s.href} external>
                    {s.label}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-label font-mono text-mute">Contact</p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-accent">
                  {contact.email}
                </a>
              </li>
              <li className="text-mute">Mauban, Quezon · GMT+8</li>
              <li>
                <ArrowLink href={site.cv} download>
                  Download CV
                </ArrowLink>
              </li>
              <li>
                <LiveClock className="font-mono text-[14px] text-mute" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 text-[14px] text-mute md:flex-row md:items-center md:justify-between">
          <p>{site.footerLine}</p>
          <button
            type="button"
            className="self-start text-bone hover:text-accent md:self-auto"
            onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
