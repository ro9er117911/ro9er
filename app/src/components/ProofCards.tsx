import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { proofCards, type ProofCard } from "../data";

function cardLabel(card: ProofCard) {
  return `${card.number} / ${card.title}`;
}

function WavePreview({ large = false }: { large?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#050706]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_24%,rgba(120,242,166,0.18),transparent_24%),linear-gradient(145deg,rgba(17,29,21,0.95),rgba(4,5,4,0.98)_56%,rgba(7,10,8,1))]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 900 640"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Responsibility chain wave preview"
      >
        <defs>
          <linearGradient id={large ? "waveSurfaceLarge" : "waveSurface"} x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1d3425" stopOpacity="0.86" />
            <stop offset="58%" stopColor="#18291f" stopOpacity="0.64" />
            <stop offset="100%" stopColor="#2e2d18" stopOpacity="0.44" />
          </linearGradient>
          <filter id={large ? "waveGlowLarge" : "waveGlow"} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M88 436 C210 334 330 348 432 294 C557 228 704 248 830 168 L840 476 C610 548 372 536 90 496 Z"
          fill={`url(#${large ? "waveSurfaceLarge" : "waveSurface"})`}
          stroke="#8fa08f"
          strokeOpacity="0.34"
        />
        {Array.from({ length: 9 }).map((_, index) => {
          const y = 455 - index * 34;
          return (
            <path
              key={`ribbon-${index}`}
              d={`M105 ${y} C230 ${y - 50 + index * 5} 338 ${y + 20} 460 ${y - 30} C604 ${y - 86} 690 ${y - 28} 820 ${y - 78}`}
              fill="none"
              stroke={index % 2 === 0 ? "#8fa08f" : "#4f6856"}
              strokeOpacity={index % 2 === 0 ? 0.28 : 0.2}
              strokeWidth="1.4"
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, index) => {
          const x = 126 + index * 92;
          return (
            <path key={`grid-x-${index}`} d={`M${x} 485 L${x + 88} 176`} fill="none" stroke="#d9ded4" strokeOpacity="0.14" />
          );
        })}
        {Array.from({ length: 6 }).map((_, index) => {
          const y = 480 - index * 52;
          return <path key={`grid-y-${index}`} d={`M112 ${y} L820 ${y - 92}`} fill="none" stroke="#d9ded4" strokeOpacity="0.13" />;
        })}
        <path
          d="M220 282 L322 258 L444 205 L566 177 L672 124"
          fill="none"
          stroke="#f2eee6"
          strokeLinecap="round"
          strokeWidth="5"
          strokeOpacity="0.88"
          filter={`url(#${large ? "waveGlowLarge" : "waveGlow"})`}
        />
        {[
          ["#57b879", 220, 282, 13],
          ["#b27a31", 322, 258, 15],
          ["#d7a243", 444, 205, 18],
          ["#e36e5e", 566, 177, 16],
          ["#ff745d", 672, 124, 18]
        ].map(([color, cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx as number} cy={cy as number} r={r as number} fill={color as string} filter={`url(#${large ? "waveGlowLarge" : "waveGlow"})`} />
        ))}
        <text x="530" y="92" fill="#f6f3ea" fontSize={large ? "36" : "26"} fontWeight="700" filter={`url(#${large ? "waveGlowLarge" : "waveGlow"})`}>
          文件／責任缺口
        </text>
        <text x="102" y="520" fill="#f6f3ea" fontSize={large ? "24" : "20"} fontWeight="700" opacity="0.76">
          流程進度
        </text>
        <text x="700" y="300" fill="#f6f3ea" fontSize={large ? "22" : "18"} fontWeight="700" opacity="0.66">
          證據成熟度
        </text>
      </svg>
      <div
        className={`absolute left-5 rounded-[8px] border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md ${
          large ? "top-5 max-w-[50%]" : "top-12 max-w-[55%]"
        }`}
      >
        <p className="text-[11px] font-semibold leading-[12px] text-[#78f2a6]">Responsibility-chain wave</p>
        <p className="mt-2 text-[13px] font-medium leading-[1.45] text-[#f7f2e8] sm:text-[14px]">
          波面只是展示背景，正式判定仍回到文件、責任缺口與組織框定。
        </p>
      </div>
    </div>
  );
}

function CardMedia({ card, large = false }: { card: ProofCard; large?: boolean }) {
  if ("preview" in card && card.preview === "wave") {
    return <WavePreview large={large} />;
  }

  const className = "h-full w-full object-cover";
  if ("videoSrc" in card && card.videoSrc) {
    return (
      <video
        className={className}
        src={card.videoSrc}
        poster={card.media}
        autoPlay
        muted
        loop
        playsInline
        controls={large}
      />
    );
  }

  return <img className={className} src={card.media} alt="" loading={large ? "eager" : "lazy"} />;
}

export function ProofCards() {
  const [activeCard, setActiveCard] = useState<ProofCard | null>(null);
  const activeIndex = useMemo(
    () => (activeCard ? proofCards.findIndex((card) => card.number === activeCard.number) : -1),
    [activeCard]
  );

  useEffect(() => {
    if (!activeCard) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveCard(null);
      if (event.key === "ArrowRight") {
        setActiveCard(proofCards[(activeIndex + 1) % proofCards.length]);
      }
      if (event.key === "ArrowLeft") {
        setActiveCard(proofCards[(activeIndex - 1 + proofCards.length) % proofCards.length]);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeCard, activeIndex]);

  const goToCard = (offset: number) => {
    if (activeIndex < 0) return;
    setActiveCard(proofCards[(activeIndex + offset + proofCards.length) % proofCards.length]);
  };

  return (
    <section className="border-t border-white/10 bg-[#0b0d0b] py-16 sm:py-20 lg:py-28" aria-labelledby="proof-title" id="work">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-6 flex items-center gap-3 sm:mb-8">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F26522] text-[11px] font-semibold leading-[12px] text-white sm:h-7 sm:w-7">
            2
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium leading-[13px] text-[#f7f2e8] sm:px-4 sm:py-1.5">
            Proof already built
          </span>
        </div>
        <h2
          id="proof-title"
          className="mb-10 text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] text-[#f7f2e8] sm:mb-14 sm:text-[clamp(2.5rem,5vw,4.2rem)] lg:mb-16"
        >
          Media proof systems
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">
          {proofCards.map((card) => (
            <article key={card.number} className="group">
              <button
                className="block w-full rounded-[8px] border border-white/10 bg-[#0f130f] p-2 text-left shadow-[0_18px_42px_rgba(0,0,0,0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-[#78f2a6]/30 focus:outline-none focus:ring-2 focus:ring-[#F26522]"
                type="button"
                aria-label={`Open proof for ${card.title}`}
                onClick={() => setActiveCard(card)}
              >
                <div className="relative aspect-[329/246] overflow-hidden rounded-[8px] bg-gray-950">
                  <CardMedia card={card} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-10 min-w-[154px] items-center justify-between gap-4 rounded-full bg-white py-1 pl-5 pr-1 text-gray-900 transition-transform duration-300 group-hover:translate-x-1">
                    <span className="text-[13px] font-semibold">Open proof</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#10130f] text-white">
                      <ArrowRight size={15} />
                    </span>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold leading-[12px] text-gray-900">
                    {card.number}
                  </span>
                  {"videoSrc" in card && card.videoSrc ? (
                    <span className="absolute left-4 top-4 rounded-full bg-[#78f2a6] px-3 py-1 text-[11px] font-semibold leading-[12px] text-[#070807]">
                      Autoplay video
                    </span>
                  ) : (
                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold leading-[12px] text-white">
                      Preview
                    </span>
                  )}
                </div>
                <p className="mt-4 px-1 text-[13px] leading-relaxed text-[#81796d]">{card.role}</p>
                <h3 className="mt-1 px-1 text-[20px] font-semibold leading-[1.12] text-[#f7f2e8]">{card.title}</h3>
                <p className="mt-3 max-w-[620px] px-1 text-[14px] font-medium leading-[1.6] text-[#d8d1c4]">{card.copy}</p>
                <p className="mt-2 max-w-[620px] px-1 pb-2 text-[13px] leading-[1.6] text-[#b9b0a3]">{card.detail}</p>
              </button>
            </article>
          ))}
        </div>
      </div>

      {activeCard ? (
        <div className="fixed inset-0 z-[80] bg-black/82 p-3 backdrop-blur-md sm:p-6" role="dialog" aria-modal="true" aria-label={cardLabel(activeCard)}>
          <button className="absolute inset-0 cursor-default" type="button" aria-label="Close proof viewer" onClick={() => setActiveCard(null)} />
          <div className="relative mx-auto flex h-full max-w-[1180px] flex-col justify-center gap-4">
            <div className="flex items-center justify-between rounded-[8px] border border-white/10 bg-[#10130f]/92 p-3 text-[#f7f2e8] shadow-2xl">
              <div>
                <p className="text-[11px] font-semibold leading-[12px] text-[#F26522]">{cardLabel(activeCard)}</p>
                <h3 className="mt-1 text-[18px] font-medium leading-[1.15] sm:text-[22px]">{activeCard.title}</h3>
              </div>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900"
                type="button"
                aria-label="Close viewer"
                onClick={() => setActiveCard(null)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative overflow-hidden rounded-[8px] border border-white/10 bg-black shadow-2xl">
              <div className="aspect-video max-h-[68vh]">
                <CardMedia card={activeCard} large />
              </div>
              <button
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900"
                type="button"
                aria-label="Previous proof"
                onClick={() => goToCard(-1)}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900"
                type="button"
                aria-label="Next proof"
                onClick={() => goToCard(1)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="rounded-[8px] border border-white/10 bg-[#10130f]/92 p-4 text-[#d8d1c4] shadow-2xl">
              <p className="text-[13px] font-medium leading-[1.6] text-[#81796d]">{activeCard.role}</p>
              <p className="mt-2 text-[16px] font-semibold leading-[1.5] text-[#f7f2e8]">{activeCard.copy}</p>
              <p className="mt-2 text-[13px] leading-[1.65]">{activeCard.detail}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
