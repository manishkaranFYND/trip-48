"use client"
import { Button } from "@/components/ui/button";
import generateQuest from "@/lib/utils";
import React from "react";

const QuestSearchButton = () => {
  return (
    <Button
      onClick={generateQuest}
      className="h-12 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-400 hover:via-blue-400 hover:to-purple-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
    >
      {/* <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Search className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" /> */}
      Find Quests
    </Button>
  );
};

export default QuestSearchButton;
