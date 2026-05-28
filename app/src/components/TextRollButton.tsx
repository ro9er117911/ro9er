import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type TextRollButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "dark" | "orange" | "light";
  className?: string;
  onClick?: () => void;
};

const variants = {
  dark: "bg-gray-900 text-white hover:bg-gray-800",
  orange: "bg-[#F26522] text-white hover:bg-[#e05a1a]",
  light: "bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
};

const iconVariants = {
  dark: "bg-white text-gray-900",
  orange: "bg-white text-[#F26522]",
  light: "bg-gray-900 text-white"
};

export function TextRollButton({
  children,
  href,
  variant = "dark",
  className = "",
  onClick
}: TextRollButtonProps) {
  const content = (
    <>
      <span className="h-[20px] overflow-hidden">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
          <span className="h-[20px] leading-[20px]">{children}</span>
          <span className="h-[20px] leading-[20px]">{children}</span>
        </span>
      </span>
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 sm:h-8 sm:w-8 ${iconVariants[variant]}`}
      >
        <ArrowRight size={15} strokeWidth={2.2} />
      </span>
    </>
  );

  const classes = `group inline-flex min-h-[44px] items-center gap-3 rounded-full py-2 pl-5 pr-2 text-[13px] font-medium leading-[14px] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] sm:pl-6 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type="button" onClick={onClick}>
      {content}
    </button>
  );
}
