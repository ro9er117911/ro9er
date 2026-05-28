import { ArrowRight, Clock, X } from "lucide-react";
import { navLinks } from "../data";

type MobileMenuProps = {
  open: boolean;
  time: string;
  onClose: () => void;
};

export function MobileMenu({ open, time, onClose }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        type="button"
        aria-label="Close mobile menu"
        onClick={onClose}
      />
      <div
        className={`absolute inset-x-3 bottom-3 rounded-[8px] border border-white/10 bg-[#10130f] p-5 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "translate-y-0" : "translate-y-[120%]"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[13px] text-[#b9b0a3]">
            <Clock size={14} />
            {time} in Taipei
          </span>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white"
            type="button"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <nav className="grid gap-4" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="text-[28px] font-medium leading-[32px] text-[#f7f2e8]"
              href={link.href}
              onClick={onClose}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className="mt-9 flex min-h-[48px] items-center justify-between rounded-full bg-[#F26522] py-2 pl-5 pr-2 text-[13px] font-medium text-white"
          href="#contact"
          onClick={onClose}
        >
          Contact
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#F26522]">
            <ArrowRight size={15} />
          </span>
        </a>
      </div>
    </div>
  );
}
