import { Suspense, lazy, useEffect, useState } from "react";
import { Activity, Clock, Menu } from "lucide-react";
import { milestones, navLinks, thesisHook } from "./data";
import { HeroShader } from "./components/HeroShader";
import { MilestoneSection } from "./components/MilestoneSection";
import { MobileMenu } from "./components/MobileMenu";
import { ProofCards } from "./components/ProofCards";
import { TextRollButton } from "./components/TextRollButton";

const ResponsibilityChainWave = lazy(() =>
  import("./components/ResponsibilityChainWave").then((module) => ({ default: module.ResponsibilityChainWave }))
);

function useTaipeiTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Taipei",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        }).format(new Date())
      );
    };
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      }, 80);
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
}

function Navbar({ time, onMenu }: { time: string; onMenu: () => void }) {
  return (
    <header className="relative z-20 mx-auto w-full max-w-[1440px] p-2 sm:p-3" aria-label="Primary navigation">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#10130f]/88 p-[5px] shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <a className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F26522] text-[10px] font-bold leading-[11px] text-white sm:h-10 sm:w-10" href="#top" aria-label="Roger Lo home">
            RL
          </a>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Desktop navigation">
            {navLinks.map((link) => (
              <a key={link.href} className="text-[14px] text-[#f7f2e8] transition-colors duration-300 hover:text-[#78f2a6]" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <p className="hidden text-[13px] text-[#b9b0a3] lg:block">Research systems / 2026</p>
          <p className="flex items-center gap-2 text-[13px] text-[#b9b0a3]">
            <Clock size={14} />
            {time} in Taipei
          </p>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F26522] text-white md:hidden" type="button" aria-label="Open menu" onClick={onMenu}>
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const time = useTaipeiTime();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-[#070807]" id="top" aria-labelledby="hero-title">
      <HeroShader />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_18%_78%,rgba(120,242,166,0.12),transparent_28%),linear-gradient(90deg,rgba(7,8,7,0.95)_0%,rgba(7,8,7,0.76)_48%,rgba(7,8,7,0.52)_100%)]" aria-hidden="true" />
      <Navbar time={time} onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} time={time} onClose={() => setMenuOpen(false)} />

      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="flex-1" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.38fr)] lg:items-end">
          <div>
            <p className="mb-5 text-[13px] leading-[14px] text-[#78f2a6] sm:mb-8">Roger Lo / Responsibility-chain systems</p>
            <h1
              id="hero-title"
              className="max-w-[1060px] text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] text-[#f7f2e8] sm:text-[clamp(2.5rem,5vw,4.2rem)]"
            >
              Current opportunities, grounded by visible systems.
            </h1>
            <p className="mt-6 max-w-[760px] text-[15px] font-medium leading-[1.65] text-[#d8d1c4] sm:text-[17px]">
              NJIT in July, Tokyo disaster-prevention fieldwork in September, and a thesis question about how
              organizations frame messy, high-stakes information.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5">
              <TextRollButton href="#work" variant="orange">
                View proof
              </TextRollButton>
              <a
                className="inline-flex w-fit items-center gap-3 rounded-[4px] border border-white/10 bg-[#11140f] px-4 py-3 text-[13px] font-medium leading-[14px] text-[#f7f2e8] shadow-[0_12px_34px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-[#78f2a6]/40 hover:bg-[#151a14]"
                href="#graph"
              >
                <Activity className="h-5 w-5 text-[#78f2a6] sm:h-6 sm:w-6" aria-hidden="true" />
                Responsibility Chain
                <span className="rounded bg-[#78f2a6] px-2 py-0.5 text-[10px] leading-[11px] text-[#070807]">Live</span>
              </a>
            </div>
          </div>

          <div className="grid gap-3">
            {milestones.map((item) => (
              <a
                key={item.number}
                className="group rounded-[8px] border border-white/10 bg-[#10130f]/82 p-4 shadow-[0_18px_42px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#78f2a6]/35 hover:bg-[#151a14]"
                href={item.number === "03" ? "#graph" : "#work"}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#F26522]">{item.number}</span>
                  <span className="text-[12px] font-medium text-[#b9b0a3]">{item.date}</span>
                </div>
                <h2 className="text-[18px] font-medium leading-[1.14] text-[#f7f2e8]">{item.title}</h2>
                <p className="mt-2 text-[13px] font-medium leading-[1.5] text-[#b9b0a3]">{item.copy}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CvSection() {
  const groups = [
    {
      title: "Experience",
      items: [
        ["2025-2026", "MIT City Science Lab, AI group, research intern"],
        ["2025-Present", "Sinopac Bank, Financial Technology Department, intern"],
        ["2024-2025", "AIFlight Technology, co-founder"],
        ["2023", "Taiwan Mobile, customer service technology intern"]
      ]
    },
    {
      title: "Education",
      items: [
        ["2025-Present", "NTUT, FinTech and Information Security, M.S."],
        ["2024", "Amsterdam University of Applied Sciences, exchange student"],
        ["2020-2024", "NTUT, Information and Finance Management, B.S."]
      ]
    },
    {
      title: "Awards / Startup / Patent",
      items: [
        ["2024", "AI FinTech Innovation Competition, 1st place"],
        ["2024", "E.SUN Bank Campus Business Competition, finalist award"],
        ["2024-2025", "U-start Innovation Entrepreneurship Grant, phase 1"],
        ["Patent", "Speech recognition method for fraud detection"]
      ]
    }
  ];

  return (
    <section className="border-t border-white/10 bg-[#070807] py-16 sm:py-20 lg:py-28" id="cv" aria-labelledby="cv-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F26522] text-[11px] font-semibold leading-[12px] text-white sm:h-7 sm:w-7">
            4
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium leading-[13px] text-[#f7f2e8] sm:px-4 sm:py-1.5">
            Resume
          </span>
        </div>
        <h2 id="cv-title" className="mb-10 text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] text-[#f7f2e8]">
          Career system
        </h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {groups.map((group) => (
            <article key={group.title} className="rounded-[8px] border border-white/10 bg-[#10130f] p-5 sm:p-6">
              <h3 className="text-[22px] font-medium leading-[1.12] text-[#f7f2e8]">{group.title}</h3>
              <ol className="mt-6 grid gap-4">
                {group.items.map(([time, text]) => (
                  <li key={`${time}-${text}`} className="border-t border-white/10 pt-4">
                    <time className="text-[12px] font-semibold text-[#F26522]">{time}</time>
                    <p className="mt-1 text-[14px] font-medium leading-[1.5] text-[#b9b0a3]">{text}</p>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="border-t border-white/10 bg-[#0d0f0c] py-16 text-white sm:py-20 lg:py-28" id="contact" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <p className="mb-5 text-[13px] leading-[14px] text-[#F26522]">Contact</p>
        <h2 id="contact-title" className="max-w-[920px] text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08]">
          Bring me the messy system.
        </h2>
        <p className="mt-6 max-w-[680px] text-[16px] font-medium leading-[1.65] text-gray-300">
          I am useful when the work has real stakes, unclear responsibility, messy information, and a need for visible progress.
        </p>
        <p className="mt-5 max-w-[760px] text-[14px] leading-[1.7] text-gray-400">{thesisHook}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a className="rounded-full bg-white px-5 py-3 text-[13px] font-medium text-gray-900" href="https://github.com/ro9er117911">
            GitHub
          </a>
          <a className="rounded-full border border-white/20 px-5 py-3 text-[13px] font-medium text-white" href="https://www.linkedin.com/in/chun-lo-35027624b/">
            LinkedIn
          </a>
          <a className="rounded-full border border-white/20 px-5 py-3 text-[13px] font-medium text-white" href="https://medium.com/@rogerlo117911">
            Medium
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useHashScroll();

  return (
    <main>
      <Hero />
      <MilestoneSection />
      <ProofCards />
      <Suspense
        fallback={
          <section className="bg-[#070807] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28" id="graph">
            <div className="mx-auto max-w-[1440px] rounded-[8px] border border-white/10 bg-[#10130f] p-6 text-[14px] font-medium text-[#b9b0a3]">
              Loading responsibility chain wave...
            </div>
          </section>
        }
      >
        <ResponsibilityChainWave />
      </Suspense>
      <CvSection />
      <ContactSection />
    </main>
  );
}
