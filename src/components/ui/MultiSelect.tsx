"use client"

import * as React from "react"
import { ControllerRenderProps } from "react-hook-form"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 import { cn } from "@/app/lib/utils"

type Option = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  field: ControllerRenderProps<any, any>
  placeholder?: string
}

export function MultiSelect({ options, field, placeholder }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const selected = field.value || []

  const toggleValue = (val: string) => {
    if (selected.includes(val)) {
      field.onChange(selected.filter((v: string) => v !== val))
    } else {
      field.onChange([...selected, val])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "min-h-[40px] w-full justify-between flex-wrap",
            !selected.length && "text-muted-foreground"
          )}
        >
          {selected.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selected.map((val: string) => {
                const opt = options.find((o) => o.value === val)
                return (
                  <span
                    key={val}
                    className="bg-blue-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 text-sm"
                  >
                    {opt?.label}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleValue(val)
                      }}
                    />
                  </span>
                )
              })}
            </div>
          ) : (
            <span>{placeholder || "Select options"}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px]">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => toggleValue(opt.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(opt.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
