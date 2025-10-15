import * as React from "react"

import { cn } from "@/lib/utils"
import { useFormField } from "./form"



const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const {error} = useFormField();
    return (
      <input
        type={type}
        className={cn(
          "flex h-[3.0625rem] w-full rounded-[0.625rem] border border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500 bg-white dark:bg-zinc-700 p-4 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maroon-600 focus-visible:border-0 dark:focus-visible:ring-softPink-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error && "border-red-600 dark:border-red-500",
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
