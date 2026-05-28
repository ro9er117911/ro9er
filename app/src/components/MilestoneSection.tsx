import { ArrowRight } from "lucide-react";
import { milestones, thesisHook } from "../data";
import { TextRollButton } from "./TextRollButton";

export function MilestoneSection() {
  return (
    <section className="overflow-hidden border-t border-white/10 bg-[#080908] py-16 sm:py-20 lg:py-28" id="opportunities" aria-labelledby="work-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-6 flex items-center gap-3 sm:mb-8">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F26522] text-[11px] font-semibold leading-[12px] text-white sm:h-7 sm:w-7">
            1
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium leading-[13px] text-[#f7f2e8] sm:px-4 sm:py-1.5">
            Current opportunities
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(340px,0.38fr)] lg:items-end lg:gap-12">
          <div>
            <h2
              id="work-title"
              className="mb-8 max-w-[980px] text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] text-[#f7f2e8]"
            >
              Public-funded momentum, wrapped around evidence already built.
            </h2>
            <p className="max-w-[760px] text-[15px] font-medium leading-[1.65] text-[#d8d1c4] sm:text-[16px]">
              The page now leads with what is happening next: NJIT in July, Tokyo disaster-prevention fieldwork in
              September, and a thesis question about how organizations define high-stakes problems when information is
              messy.
            </p>
          </div>
          <div className="grid gap-5">
            <p className="text-[14px] font-medium leading-[1.7] text-[#b9b0a3]">{thesisHook}</p>
            <TextRollButton href="#graph" variant="orange" className="w-fit">
              Explore the wave
            </TextRollButton>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-16">
          {milestones.map((item) => (
            <article
              key={item.number}
              className="group min-h-[230px] rounded-[8px] border border-white/10 bg-[#10130f] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#78f2a6]/35 hover:bg-[#151a14] hover:shadow-[0_18px_44px_rgba(0,0,0,0.32)] sm:p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[12px] font-semibold leading-[13px] text-[#F26522]">{item.number}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium leading-[12px] text-[#b9b0a3]">
                  {item.tag}
                </span>
              </div>
              <p className="mb-3 text-[13px] font-medium leading-[14px] text-[#81796d]">{item.date}</p>
              <h3 className="max-w-[360px] text-[22px] font-medium leading-[1.12] text-[#f7f2e8]">{item.title}</h3>
              <p className="mt-4 text-[14px] font-medium leading-[1.55] text-[#b9b0a3]">{item.copy}</p>
              <ArrowRight className="mt-7 text-[#78f2a6] transition-transform duration-500 group-hover:-rotate-45" size={18} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
