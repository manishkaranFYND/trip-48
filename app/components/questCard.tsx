/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, DollarSign, MapPin, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getQuestProgress } from "@/lib/questProgress";
import { useEffect, useState } from "react";

interface Quest {
  id: string;
  title: string;
  short_description: string;
  category: string;
  duration_hours: number;
  difficulty_level: number;
  min_budget: number;
  max_budget: number;
  min_group_size: number;
  max_group_size: number;
  rating_avg: number;
  best_time: string;
  tags: string[];
  estimated_travel_time?: string;
}

interface QuestCardProps {
  quest: Quest;
}

const difficultyLabels = {
  1: "Easy",
  2: "Moderate",
  3: "Challenging",
  4: "Hard",
  5: "Expert"
};

const difficultyColors = {
  1: "bg-green-100 text-green-800",
  2: "bg-blue-100 text-blue-800",
  3: "bg-yellow-100 text-yellow-800",
  4: "bg-orange-100 text-orange-800",
  5: "bg-red-100 text-red-800"
};

const categoryColors: Record<string, string> = {
  urban: "bg-purple-100 text-purple-800",
  culture: "bg-pink-100 text-pink-800",
  nature: "bg-green-100 text-green-800",
  adventure: "bg-orange-100 text-orange-800",
  food: "bg-yellow-100 text-yellow-800"
};

export default function QuestCard({ quest }: QuestCardProps) {
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>("not_started");

  useEffect(() => {
    const questProgress = getQuestProgress(quest.id);
    if (questProgress) {
      setProgress(questProgress.overallProgress);
      setStatus(questProgress.status);
    }
  }, [quest.id]);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300 relative overflow-hidden">
      {/* Progress indicator bar */}
      {progress > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
              {quest.title}
            </CardTitle>
            <CardDescription className="mt-2 line-clamp-2">
              {quest.short_description}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{quest.rating_avg}</span>
            </div>
            {status !== "not_started" && (
              <Badge 
                variant="outline" 
                className={status === "completed" ? "bg-green-50 text-green-700 border-green-300" : "bg-blue-50 text-blue-700 border-blue-300"}
              >
                {status === "completed" ? "Completed" : `${progress}%`}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className={categoryColors[quest.category] || "bg-gray-100 text-gray-800"}>
            {quest.category}
          </Badge>
          <Badge className={difficultyColors[quest.difficulty_level as keyof typeof difficultyColors] || "bg-gray-100"}>
            {difficultyLabels[quest.difficulty_level as keyof typeof difficultyLabels]}
          </Badge>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-300">
            {quest.best_time}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {/* Quest Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>{quest.duration_hours}h</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-purple-500" />
            <span>{quest.min_group_size}-{quest.max_group_size} people</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="w-4 h-4 text-purple-500" />
            <span>₹{quest.min_budget}-{quest.max_budget}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-purple-500" />
            <span className="truncate">{quest.estimated_travel_time || "Nearby"}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {quest.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {quest.tags.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{quest.tags.length - 4} more
            </Badge>
          )}
        </div>

        {/* CTA Button */}
        <Link href={`/quests/${quest.id}`} className="w-full block">
          <Button className="w-full group-hover:bg-purple-600 transition-colors">
            {status === "completed" ? "View Details" : status === "in_progress" ? "Continue Quest" : "Start Quest"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}






