"use client"
import { Button } from "@/components/ui/button";
import generateQuest from "@/lib/utils";
import React from "react";
import { UserPreferences } from "./questModal";

const QuestSearchButton:React.FC<UserPreferences> = (data) => {
  return (
    <Button
      onClick={()=>generateQuest(data)}
      className="h-12 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-400 hover:via-blue-400 hover:to-purple-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
    >
      Find Quests
    </Button>
  );
};

export default QuestSearchButton;
