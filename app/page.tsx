/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Sparkles, Zap, Target } from "lucide-react";
import { Clock, Search, Users } from "lucide-react";
import SearchComponent from "./components/searchComponent";
import generateQuest from "@/lib/utils"
import QuestSearchButton from "./components/questSearchButton";
import QuestModal from "./components/questModal";

export default function Home() {

  return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-purple-500/20" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping animation-delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-pulse animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-3000" />
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-green-400 rounded-full animate-ping animation-delay-4000" />
      </div>
      
      <QuestModal/>
    </div>
  );
}
