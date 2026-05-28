import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gameButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-display font-semibold tracking-wide uppercase select-none overflow-hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        gold:
          "text-primary-foreground border border-[hsl(46_70%_55%/0.6)] shadow-[0_0_0_1px_hsl(46_65%_52%/0.25),0_8px_24px_-8px_hsl(46_65%_52%/0.55)] hover:shadow-[0_0_0_1px_hsl(46_70%_55%/0.45),0_14px_36px_-10px_hsl(46_70%_55%/0.8)]",
        ember:
          "text-secondary-foreground border border-[hsl(15_76%_55%/0.55)] shadow-[0_0_0_1px_hsl(15_76%_51%/0.25),0_8px_24px_-8px_hsl(15_76%_51%/0.55)] hover:shadow-[0_0_0_1px_hsl(15_76%_55%/0.45),0_14px_36px_-10px_hsl(15_76%_55%/0.8)]",
        ghost:
          "text-foreground border border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/40",
        outline:
          "text-primary border border-primary/50 bg-transparent hover:bg-primary/10 hover:shadow-[0_0_24px_-6px_hsl(46_70%_55%/0.55)]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

type GameButtonOwnProps = VariantProps<typeof gameButtonVariants> & {
  asChild?: boolean;
  glow?: boolean;
};

export interface GameButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref">,
    GameButtonOwnProps {}

const variantBg: Record<NonNullable<GameButtonOwnProps["variant"]>, string> = {
  gold: "linear-gradient(135deg, hsl(46 80% 60%), hsl(46 65% 45%))",
  ember: "linear-gradient(135deg, hsl(15 80% 56%), hsl(28 78% 50%))",
  ghost: "transparent",
  outline: "transparent",
};

export const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant = "gold", size, asChild, glow = true, style, children, ...props }, ref) => {
    const Comp: any = asChild ? Slot : motion.button;
    return (
      <Comp
        ref={ref}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className={cn(gameButtonVariants({ variant, size }), "group", className)}
        style={{ background: variantBg[variant ?? "gold"], ...style }}
        {...props}
      >
        {/* sheen sweep */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        {/* outer glow */}
        {glow && (variant === "gold" || variant === "ember") && (
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow:
                variant === "gold"
                  ? "0 0 28px hsl(46 75% 58% / 0.55), 0 0 8px hsl(46 80% 65% / 0.4)"
                  : "0 0 28px hsl(15 78% 55% / 0.55), 0 0 8px hsl(18 80% 60% / 0.4)",
            }}
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </Comp>
    );
  },
);
GameButton.displayName = "GameButton";

export { gameButtonVariants };