"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content";
import { PillButton } from "@/components/ui";
import { useLenis } from "./SmoothScroll";
import { MenuOverlay } from "./MenuOverlay";

const links = [
  { href: "/work", label: "Work" },
  { href: "/hackathons", label: "Hackathons" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  const toContact = (e: React.MouseEvent) => {
    const el = document.getElementById("contact");
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: "smooth" });
  };

  // The overlay is md:hidden; if the viewport widens past md while it is open, close it so the
  // scroll lock and focus trap don't outlive the (now invisible) dialog.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    menuBtn.current?.focus();
  }, []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 text-bone mix-blend-difference">
        <nav
          aria-label="Primary"
          className="wrap pointer-events-auto flex h-[var(--nav-h)] items-center justify-between"
        >
          <Link href="/" className="font-mono text-[17px] tracking-tight" aria-label={`${site.name} home`}>
            {site.brand}
          </Link>
          <ul className="hidden items-center gap-10 text-[15px] md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="relative py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[var(--e-out)] hover:after:scale-x-100">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden md:block" onClick={toContact}>
            <PillButton href="#contact" tone="outline">
              Get in touch
            </PillButton>
          </div>
          <button
            ref={menuBtn}
            type="button"
            className="h-11 rounded-full border border-current px-5 text-[15px] md:hidden"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </nav>
      </header>
      <MenuOverlay open={open} onClose={close} />
    </>
  );
}
