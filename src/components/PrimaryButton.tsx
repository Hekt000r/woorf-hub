import type { ReactNode, ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
  children,
  className = "",
  ...props
}: {
  children?: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`
  px-8 w-full sm:w-auto
  rounded-full
  bg-primary text-primary-foreground
  font-medium
  flex items-center justify-center
  cursor-pointer
  shadow-lg shadow-primary/30
  border-primary
  transition-all duration-200
  hover:opacity-90 hover:scale-105
  active:translate-y-0 active:scale-90
  ${className}
`}
      {...props}
    >
      {children}
    </button>
  );
}
