import * as React from "react"
import { cn } from "@/app/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "block w-full max-w-full min-h-[60px] sm:min-h-[80px] " +
            "rounded-md border px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base " +
            "bg-gray-50 text-gray-900 border-gray-300 placeholder:text-gray-400 " +
            "dark:bg-stone-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder:text-gray-500 " +
            "focus:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 " +
            "disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
