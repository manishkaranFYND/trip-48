/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Sparkles, Target } from "lucide-react";
import { Clock, Users } from "lucide-react";
import generateQuest from "@/lib/utils";
import QuestSearchButton from "./questSearchButton";
import SearchComponent from "./searchComponent";
import { Slider } from "@/components/ui/slider";
import { InterestSelector } from "./interestSelector";

interface UserPreferences {
  location: {
    area: string;
    city: string;
    state: string;
    country: string;
  };
  groupType: "solo" | "couple" | "friends" | "family";
  groupSize: number;
  budget: { min: number; max: number };
  duration: string;
  interests: string[];
}

const QuestModal = () => {
  const [questPreference, setQuestPreference] = useState<UserPreferences>({
    location: {
      area: "",
      city: "",
      state: "",
      country: "",
    },
    groupType: "solo",
    groupSize: 1,
    budget: {
      min: 500,
      max: 1500,
    },
    duration: "",
    interests: [],
  });

  useEffect(() => {}, [questPreference]);

  const handleQuestPreference = () => {};

  return (
    <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
      <div className="animate-fade-in">
        <div className="flex gap-2 items-center justify-center mt-6 mb-6">
          <Sparkles className="h-12 w-12 text-yellow-400 mr-4 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            Trip
          </h1>
          <span className="block text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent leading-tight animate-pulse">
            48
          </span>
        </div>
        {/* <div className="relative">
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2 animate-bounce">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div> */}

        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          🚀 Discover epic weekend adventures tailored to your budget, group
          size, and location. Turn every weekend into an{" "}
          <span className="text-yellow-400 font-bold">
            unforgettable quest!
          </span>
        </p>
      </div>

      {/* Enhanced search card with glassmorphism */}
      <div className="animate-fade-in group">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto hover:bg-white/15 transition-all duration-500 hover:scale-105">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Area */}
            <div className="relative group/input">
              <Input
                onChange={(e) => console.log(e.target.value)}
                placeholder="Area"
                className="pl-11 h-12 w-full border-0 bg-white/90 backdrop-blur-sm focus:bg-white transition-all duration-300 hover:bg-white/95 focus:ring-2 focus:ring-emerald-400/50 rounded-xl"
              />
            </div>

            {/* City */}
            <div className="relative group/input">
              <Input
                onChange={(e) => console.log(e.target.value)}
                placeholder="City"
                className="pl-11 h-12 w-full border-0 bg-white/90 backdrop-blur-sm focus:bg-white transition-all duration-300 hover:bg-white/95 focus:ring-2 focus:ring-emerald-400/50 rounded-xl"
              />
            </div>

            {/* State */}
            <div className="relative group/input">
              <Input
                onChange={(e) => console.log(e.target.value)}
                placeholder="State"
                className="pl-11 h-12 w-full border-0 bg-white/90 backdrop-blur-sm focus:bg-white transition-all duration-300 hover:bg-white/95 focus:ring-2 focus:ring-emerald-400/50 rounded-xl"
              />
            </div>

            {/* Country */}
            <div className="relative group/input">
              <Input
                onChange={(e) => console.log(e.target.value)}
                placeholder="Country"
                className="pl-11 h-12 w-full border-0 bg-white/90 backdrop-blur-sm focus:bg-white transition-all duration-300 hover:bg-white/95 focus:ring-2 focus:ring-emerald-400/50 rounded-xl"
              />
            </div>

            {/* Group Size */}
            <div className="relative group/input sm:col-span-2">
              <Users className="absolute left-3 top-3 h-5 w-5 text-blue-400 group-hover/input:text-blue-300 transition-colors" />
              <Input
                placeholder="👥 Group size"
                className="pl-10 h-12 w-full border-0 bg-white/90 backdrop-blur-sm focus:bg-white transition-all duration-300 hover:bg-white/95 focus:ring-2 focus:ring-blue-400/50 rounded-xl"
              />
            </div>

            {/* Group Type */}
            <div className="relative group/input sm:col-span-2">
              <Users className="absolute left-3 top-3 h-5 w-5 text-blue-400 group-hover/input:text-blue-300 transition-colors" />
              <Input
                placeholder="👥 Group Type"
                className="pl-10 h-12 w-full border-0 bg-white/90 backdrop-blur-sm focus:bg-white transition-all duration-300 hover:bg-white/95 focus:ring-2 focus:ring-blue-400/50 rounded-xl"
              />
            </div>

            {/* Duration */}
            <div className="relative group/input sm:col-span-2">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-purple-400 group-hover/input:text-purple-300 transition-colors" />
              <Input
                placeholder="⏰ Duration"
                className="pl-10 h-12 w-full border-0 bg-white/90 backdrop-blur-sm focus:bg-white transition-all duration-300 hover:bg-white/95 focus:ring-2 focus:ring-purple-400/50 rounded-xl"
              />
            </div>

            {/* Slider */}
            <div className="flex items-center justify-center col-span-1 sm:col-span-2">
              <Slider
                defaultValue={[1000]}
                min={500}
                max={10000}
                step={500}
                className="w-full"
              />
            </div>
            {/* Interest Selector  */}
            <div className="relative group/input sm:col-span-2">
              <InterestSelector/>
            </div>

            {/* Button */}
            <div className="col-span-1 sm:col-span-1 md:col-span-4 flex justify-center">
              <QuestSearchButton />
            </div>
          </div>

          <p className="text-sm text-blue-200 bg-blue-500/20 rounded-full px-4 py-2 inline-block text-center w-full sm:w-auto">
            💡 <span className="font-semibold">Pro tip:</span> Start with your
            current location for the best recommendations
          </p>
        </div>
      </div>

      {/* Enhanced feature cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
        <div className="text-center group cursor-pointer">
          <div className="bg-gradient-to-br from-emerald-400/20 to-blue-400/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl">
            <Target className="h-10 w-10 text-emerald-300 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
            🎯 Personalized
          </h3>
          <p className="text-blue-100 group-hover:text-white transition-colors">
            Quests tailored to your preferences and budget
          </p>
        </div>

        <div className="text-center group cursor-pointer">
          <div className="bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl">
            <Users className="h-10 w-10 text-blue-300 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
            🤝 Social
          </h3>
          <p className="text-blue-100 group-hover:text-white transition-colors">
            Perfect for groups, couples, or solo adventurers
          </p>
        </div>

        <div className="text-center group cursor-pointer">
          <div className="bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl">
            <Sparkles className="h-10 w-10 text-purple-300 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
            🎮 Gamified
          </h3>
          <p className="text-blue-100 group-hover:text-white transition-colors">
            Complete challenges and earn achievement badges
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestModal;
