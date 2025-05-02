// src/app/components/ui/badge.tsx

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/app/lib/utils" // Make sure your cn() function is correctly defined

// Define badge variants
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border border-input text-foreground",
        success: "border border-green-200 bg-green-100 text-green-800",
        warning: "border border-amber-200 bg-amber-100 text-amber-800",
        danger: "border border-red-200 bg-red-100 text-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Props for the badge component
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

// Badge component
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
