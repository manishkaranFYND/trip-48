/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const locations = [
  { label: "Mumbai", value: "BOM" },
  { label: "Delhi", value: "DEL" },
  { label: "Bangalore", value: "BLR" },
  { label: "Hyderabad", value: "HYD" },
  { label: "Chennai", value: "MAA" },
  { label: "Kolkata", value: "CCU" },
  { label: "Pune", value: "PNQ" },
  { label: "Ahmedabad", value: "AMD" },
  { label: "Jaipur", value: "JAI" },
  { label: "Surat", value: "STV" },
  { label: "Lucknow", value: "LKO" },
  { label: "Kanpur", value: "KNU" },
  { label: "Nagpur", value: "NAG" },
  { label: "Indore", value: "IDR" },
  { label: "Bhopal", value: "BHO" },
  { label: "Visakhapatnam", value: "VTZ" },
  { label: "Vadodara", value: "BDQ" },
  { label: "Ludhiana", value: "LUH" },
] as const;

const SearchComponent = () => {
  const [city, setCity] = useState<string>("");
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-[200px] justify-between pl-11 h-12 border-0 bg-white/90 backdrop-blur-sm focus:bg-white transition-all duration-300 hover:bg-white/95 focus:ring-2 focus:ring-blue-400/50 rounded-xl",
              "text-muted-foreground"
            )}
          >
            {/* <MapPin className="absolute left-3 top-3 h-5 w-5 text-emerald-400 group-hover/input:text-emerald-300 transition-colors" /> */}

            {city
              ? locations.find((language) => language.value === city)?.label
              : "Select Location"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9 " />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {locations.map((language) => (
                  <CommandItem
                    value={language.label}
                    key={language.value}
                    onSelect={() => {
                      setCity(language.value);
                      setOpen(false);
                    }}
                  >
                    {language.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        language.value === city ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchComponent;
