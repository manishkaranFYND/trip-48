/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface InterestSelectorProps{
    interests:string[];
    setInterest:(value:string[])=>void
}

const ALL_INTERESTS = [
  "nature",
  "hiking",
  "cafes",
  "adventure",
  "museum",
  "reading",
  "cinema",
  "fitness",
  "yoga",
  "travel",
  "art",
];


const  InterestSelector:React.FC<InterestSelectorProps>=({interests,setInterest})=> {
//   const [selected, setSelected] = useState<string[]>(interest);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleInterest = (selectedInterest: string) => {
    if (interests.includes(selectedInterest)) {
    setInterest(interests.filter((i) => i !== selectedInterest));
  } else {
    setInterest([...interests, selectedInterest]);
  }
  };

  const removeInterest = (selectedInterest: string) => {
    setInterest(interests.filter((i)=>i!=selectedInterest))
  };

  console.log("interestssss",interests)

  return (
    <div className="px-4 max-w-xl mx-auto bg-white border rounded-xl shadow-md">
      {/* Selected badges */}
      <div className="flex flex-wrap gap-2 mt-2">
        {interests.length!==0 && interests.map((interest) => (
          <Badge
            key={interest}
            variant="outline"
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 border-gray-300"
          >
            {interest}
            <button
              type="button"
              onClick={() => removeInterest(interest)}
              className="ml-1"
            >
              <X className="h-3 w-3 cursor-pointer" />
            </button>
          </Badge>
        ))}
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 text-gray-700"
      >
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
        {isOpen ? "Hide interests" : "Choose interests"}
      </Button>

      {/* Scrollable Checkbox list */}
      {isOpen && (
        <ScrollArea className="h-64 pr-2 border-t pt-4">
          <div className="space-y-3">
            {ALL_INTERESTS.map((interest) => (
              <label
                key={interest}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <Checkbox
                  id={`checkbox-${interest}`}
                  checked={interests.includes(interest)}
                  onCheckedChange={() => toggleInterest(interest)}
                />
                {interest}
              </label>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

export default InterestSelector;