/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Users,
  DollarSign,
  MapPin,
  Star,
  ChevronLeft,
  Play,
  CheckCircle2,
  Circle,
  Trophy,
  Camera,
  Lightbulb,
  Navigation,
  Target,
  Award,
  Info,
} from "lucide-react";
import Link from "next/link";
import {
  getQuestProgress,
  startQuest,
  completeActivity,
  uncompleteActivity,
  resetQuestProgress,
  type QuestProgress,
} from "@/lib/questProgress";
import {
  awardQuestPoints,
  awardActivityPoints,
  type Achievement,
} from "@/lib/achievements";
import { cn } from "@/lib/utils";
import CelebrationModal from "@/app/components/celebrationModal";

interface Activity {
  id: string;
  title: string;
  description: string;
  order_index: number;
  estimated_duration: number;
  estimated_cost_min: number;
  estimated_cost_max: number;
  activity_type: string;
  location_coordinates: { lat: number; lng: number };
  location_name: string;
  instructions: string;
  tips: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  challenge_type: string;
  points: number;
  hint: string;
  difficulty_level: number;
}

interface HiddenGem {
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
}

interface Quest {
  id: string;
  title: string;
  short_description: string;
  description: string;
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
  activities: Activity[];
  challenges: Challenge[];
  hidden_gems: HiddenGem[];
  estimated_travel_time?: string;
  transportation?: string;
}

const activityTypeIcons: Record<string, any> = {
  sightseeing: MapPin,
  food: "🍽️",
  nature: "🌿",
  adventure: "⛰️",
  museum: "🏛️",
  art: "🎨",
};

export default function QuestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const questId = params.id as string;

  const [quest, setQuest] = useState<Quest | null>(null);
  const [progress, setProgress] = useState<QuestProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{
    pointsEarned: number;
    newLevel?: number;
    newAchievements: Achievement[];
  }>({ pointsEarned: 0, newAchievements: [] });

  useEffect(() => {
    loadQuest();
    loadProgress();
  }, [questId]);

  const loadQuest = () => {
    // Load from localStorage (in production, fetch from API)
    const cachedData = localStorage.getItem("latest_generated_quests");
    if (cachedData) {
      try {
        const data = JSON.parse(cachedData);
        const foundQuest = data.quests?.find((q: Quest) => q.id === questId);
        setQuest(foundQuest || null);
      } catch (error) {
        console.error("Error loading quest:", error);
      }
    }
    setLoading(false);
  };

  const loadProgress = () => {
    const questProgress = getQuestProgress(questId);
    setProgress(questProgress);
  };

  const handleStartQuest = () => {
    if (!quest) return;
    const activityIds = quest.activities.map((a) => a.id);
    const newProgress = startQuest(questId, activityIds);
    setProgress(newProgress);
  };

  const handleToggleActivity = (activityId: string) => {
    const activityProgress = progress?.activities.find(
      (a) => a.activityId === activityId
    );

    if (activityProgress?.completed) {
      // Uncomplete activity
      const updated = uncompleteActivity(questId, activityId);
      setProgress(updated);
    } else {
      // Complete activity
      const updated = completeActivity(questId, activityId);
      setProgress(updated);
      
      // Award points for completing activity
      const pointsEarned = awardActivityPoints(50);
      
      // Check if quest is now complete
      if (updated && updated.status === 'completed' && quest) {
        // Award quest completion points and check achievements
        const result = awardQuestPoints(quest.difficulty_level, quest.activities.length);
        
        // Show celebration modal
        setCelebrationData({
          pointsEarned: result.points + pointsEarned,
          newLevel: undefined, // Will be calculated in modal
          newAchievements: result.newAchievements,
        });
        setShowCelebration(true);
      }
    }
  };

  const handleResetQuest = () => {
    if (confirm("Are you sure you want to reset this quest? All progress will be lost.")) {
      resetQuestProgress(questId);
      setProgress(null);
    }
  };

  const openInMaps = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quest...</p>
        </div>
      </div>
    );
  }

  if (!quest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Quest Not Found</h1>
          <Link href="/quests">
            <Button>Back to Quests</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isActivityCompleted = (activityId: string) => {
    return progress?.activities.find((a) => a.activityId === activityId)?.completed || false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link href="/quests">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Quests
            </Button>
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  {quest.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  <span className="font-semibold">{quest.rating_avg}</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-3">{quest.title}</h1>
              <p className="text-purple-100 text-lg mb-4">{quest.short_description}</p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{quest.duration_hours}h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>
                    {quest.min_group_size}-{quest.max_group_size} people
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span>
                    ₹{quest.min_budget}-{quest.max_budget}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Circle */}
            {progress && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center min-w-[150px]">
                <div className="relative w-24 h-24 mx-auto mb-2">
                  <svg className="transform -rotate-90 w-24 h-24">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-white/20"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 40 * (1 - progress.overallProgress / 100)
                      }`}
                      className="text-yellow-300 transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{progress.overallProgress}%</span>
                  </div>
                </div>
                <div className="text-sm text-purple-100">
                  {progress.status === "completed"
                    ? "Completed!"
                    : `${progress.activities.filter((a) => a.completed).length} / ${
                        progress.activities.length
                      } activities`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-purple-600" />
                  About This Quest
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{quest.description}</p>
              </CardContent>
            </Card>

            {/* Start/Reset Quest Button */}
            {!progress && (
              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Ready for Adventure?</h3>
                      <p className="text-purple-100">
                        Start tracking your progress through this quest
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-purple-50"
                      onClick={handleStartQuest}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Quest
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {progress && progress.status === "completed" && (
              <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Trophy className="w-12 h-12" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1">Quest Completed! 🎉</h3>
                      <p className="text-green-100">
                        You've completed all activities in this quest. Amazing work!
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                      onClick={handleResetQuest}
                    >
                      Reset Quest
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Activities List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Activities ({quest.activities.length})
                </CardTitle>
                <CardDescription>
                  Follow these activities in order for the best experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quest.activities
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((activity, index) => {
                    const completed = isActivityCompleted(activity.id);
                    return (
                      <Card
                        key={activity.id}
                        className={cn(
                          "border-2 transition-all",
                          completed
                            ? "bg-green-50 border-green-300"
                            : "hover:shadow-md border-gray-200"
                        )}
                      >
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            {/* Activity Number */}
                            <div
                              className={cn(
                                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
                                completed
                                  ? "bg-green-500 text-white"
                                  : "bg-purple-100 text-purple-600"
                              )}
                            >
                              {completed ? (
                                <CheckCircle2 className="w-6 h-6" />
                              ) : (
                                index + 1
                              )}
                            </div>

                            {/* Activity Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                  <h4 className="font-semibold text-lg">{activity.title}</h4>
                                  <Badge variant="secondary" className="mt-1">
                                    {activity.activity_type}
                                  </Badge>
                                </div>
                                {progress && (
                                  <Button
                                    size="sm"
                                    variant={completed ? "outline" : "default"}
                                    onClick={() => handleToggleActivity(activity.id)}
                                    className={completed ? "bg-green-50" : ""}
                                  >
                                    {completed ? "Undo" : "Complete"}
                                  </Button>
                                )}
                              </div>

                              <p className="text-gray-700 mb-3">{activity.description}</p>

                              {/* Activity Meta */}
                              <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {activity.estimated_duration} min
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  ₹{activity.estimated_cost_min}-₹{activity.estimated_cost_max}
                                </div>
                              </div>

                              {/* Location */}
                              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-start gap-2 flex-1 min-w-0">
                                    <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium">
                                      {activity.location_name}
                                    </span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      openInMaps(
                                        activity.location_coordinates.lat,
                                        activity.location_coordinates.lng,
                                        activity.location_name
                                      )
                                    }
                                  >
                                    <Navigation className="w-4 h-4 mr-1" />
                                    Navigate
                                  </Button>
                                </div>
                              </div>

                              {/* Instructions */}
                              <div className="bg-blue-50 rounded-lg p-3 mb-2">
                                <div className="flex items-start gap-2">
                                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <div className="font-medium text-sm text-blue-900 mb-1">
                                      Instructions
                                    </div>
                                    <p className="text-sm text-blue-800">
                                      {activity.instructions}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Tips */}
                              <div className="bg-yellow-50 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                  <Lightbulb className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <div className="font-medium text-sm text-yellow-900 mb-1">
                                      Pro Tip
                                    </div>
                                    <p className="text-sm text-yellow-800">{activity.tips}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </CardContent>
            </Card>

            {/* Challenges */}
            {quest.challenges && quest.challenges.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    Challenges ({quest.challenges.length})
                  </CardTitle>
                  <CardDescription>
                    Complete these optional challenges for extra fun!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quest.challenges.map((challenge) => (
                    <Card key={challenge.id} className="border-2 border-orange-200 bg-orange-50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Camera className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="font-semibold">{challenge.title}</h4>
                              <Badge className="bg-orange-600">
                                {challenge.points} pts
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              {challenge.description}
                            </p>
                            <div className="text-xs text-gray-600 italic">
                              💡 Hint: {challenge.hint}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quest Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quest Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Best Time</div>
                  <div className="font-medium capitalize">{quest.best_time}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Difficulty</div>
                  <div className="font-medium">
                    Level {quest.difficulty_level} / 5
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Travel Time</div>
                  <div className="font-medium">{quest.estimated_travel_time}</div>
                </div>
                {quest.transportation && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Transportation</div>
                    <div className="text-sm">{quest.transportation}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {quest.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hidden Gems */}
            {quest.hidden_gems && quest.hidden_gems.length > 0 && (
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-purple-600" />
                    Hidden Gems
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quest.hidden_gems.map((gem, index) => (
                    <div key={index} className="bg-white rounded-lg p-3">
                      <h4 className="font-semibold mb-1">{gem.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{gem.description}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          openInMaps(gem.coordinates.lat, gem.coordinates.lng, gem.name)
                        }
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        View on Map
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Reset Quest */}
            {progress && (
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-300 hover:bg-red-50"
                onClick={handleResetQuest}
              >
                Reset Quest Progress
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      {quest && (
        <CelebrationModal
          open={showCelebration}
          onClose={() => setShowCelebration(false)}
          questTitle={quest.title}
          pointsEarned={celebrationData.pointsEarned}
          newLevel={celebrationData.newLevel}
          newAchievements={celebrationData.newAchievements}
          totalActivities={quest.activities.length}
        />
      )}
    </div>
  );
}





