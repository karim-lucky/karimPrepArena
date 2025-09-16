import * as React from "react"
import { cn } from "@/app/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
     <input
  type={type}
  className={cn(
    "block w-full max-w-full h-10 rounded-md border px-3 py-2 text-sm md:text-base " +
      "bg-gray-50 text-gray-900 border-gray-300 placeholder:text-gray-400 " +
      "dark:bg-stone-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder:text-gray-500 " +
      "ring-offset-gray-100 dark:ring-offset-gray-900 " +
      "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground " +
      "focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 " +
      "disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
    className
  )}
  ref={ref}
  {...props}
/>

    )
  }
)
Input.displayName = "Input"

export { Input }
