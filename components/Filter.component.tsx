"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const questionTypes = [
  {
    value: "hot questions",
    label: "Hot questions",
  },
  {
    value: "top questions",
    label: "Top questions",
  },
  {
    value: "recent questions",
    label: "Recent questions",
  },
];

type SortingType = "hot questions" | "top questions" | "recent questions";

interface FilterProps {
  value: string;
  onChange: (value: SortingType) => void;
}

export default function Filter({ value, onChange }: FilterProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {questionTypes.find((type) => type.value === value)?.label || "Select type"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search sorting type..." />
          <CommandList>
            <CommandEmpty>No question type found.</CommandEmpty>
            <CommandGroup>
              {questionTypes.map((type) => (
                <CommandItem key={type.value} onSelect={() => { onChange(type.value as SortingType); setOpen(false) }}>
                  <Check className={cn("mr-2 h-4 w-4", value === type.value ? "opacity-100" : "opacity-0")} />
                  {type.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}