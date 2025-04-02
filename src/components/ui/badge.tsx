import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "bg-primary text-primary-foreground w-fit px-2 py-1 text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
