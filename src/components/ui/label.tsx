"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useFormField } from "./form"


const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-800 dark:text-zinc-50"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => {
  const {error} = useFormField()
  return (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className ,   error && "text-red-600 dark:text-red-500",)}
    {...props}
  />
  )

})
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
