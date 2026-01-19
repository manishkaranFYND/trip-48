/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Star,
  Zap,
  TrendingUp,
  Award,
  Target,
  Calendar,
  ChevronLeft,
  Lock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  getUserStats,
  getUnlockedAchievements,
  getLockedAchievements,
  getAchievementProgress,
  calculateLevel,
  pointsForNextLevel,
  getRarityGradient,
  type Achievement,
} from "@/lib/achievements";

export default function StatsPage() {
  const [stats, setStats] = useState(getUserStats());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
  const [lockedAchievements, setLockedAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const userStats = getUserStats();
    setStats(userStats);
    setUnlockedAchievements(getUnlockedAchievements());
    setLockedAchievements(getLockedAchievements());
  }, []);

  const nextLevelPoints = pointsForNextLevel(stats.level);
  const currentLevelPoints = stats.level > 1 ? pointsForNextLevel(stats.level - 1) : 0;
  const progressToNextLevel =
    ((stats.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link href="/quests">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Quests
            </Button>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Your Stats & Achievements</h1>
          </div>
          <p className="text-purple-100 text-lg">
            Track your progress and celebrate your accomplishments!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Level Card */}
            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Current Level</p>
                    <p className="text-5xl font-bold">{stats.level}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Award className="w-12 h-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{stats.totalPoints.toLocaleString()} pts</span>
                    <span>{nextLevelPoints.toLocaleString()} pts</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-white h-full transition-all duration-500 rounded-full"
                      style={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-purple-100">
                    {(nextLevelPoints - stats.totalPoints).toLocaleString()} points to next level
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-3xl font-bold">{stats.completedQuests}</p>
                  <p className="text-sm text-blue-100">Quests Done</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-3xl font-bold">{stats.completedActivities}</p>
                  <p className="text-sm text-green-100">Activities</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-3xl font-bold">{stats.totalPoints.toLocaleString()}</p>
                  <p className="text-sm text-orange-100">Total Points</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-3xl font-bold flex items-center justify-center gap-1">
                    {stats.currentStreak} 🔥
                  </p>
                  <p className="text-sm text-red-100">Day Streak</p>
                </CardContent>
              </Card>
            </div>

            {/* Unlocked Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Unlocked Achievements ({unlockedAchievements.length})
                </CardTitle>
                <CardDescription>
                  Badges you've earned on your journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                {unlockedAchievements.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Trophy className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Complete quests to unlock achievements!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {unlockedAchievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`bg-gradient-to-r ${getRarityGradient(
                          achievement.rarity
                        )} p-4 rounded-lg text-white shadow-lg transform hover:scale-105 transition-transform`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-5xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold">{achievement.title}</p>
                              <Badge className="bg-white/30 text-white text-xs">
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm opacity-90 mb-2">
                              {achievement.description}
                            </p>
                            <p className="text-xs opacity-75">+{achievement.points} points</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Locked Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-400" />
                  Locked Achievements ({lockedAchievements.length})
                </CardTitle>
                <CardDescription>
                  Keep adventuring to unlock these!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lockedAchievements.map((achievement) => {
                    const progress = getAchievementProgress(achievement);
                    return (
                      <div
                        key={achievement.id}
                        className="bg-gray-100 p-4 rounded-lg border-2 border-gray-200"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="text-4xl grayscale opacity-50">
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold text-gray-800">{achievement.title}</p>
                              <Badge
                                variant="outline"
                                className="bg-gray-200 text-gray-600 text-xs"
                              >
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {achievement.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              +{achievement.points} points
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Progress value={progress} className="h-2" />
                          <p className="text-xs text-gray-500 text-right">
                            {progress.toFixed(0)}% complete
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Quick Stats */}
          <div className="space-y-6">
            {/* Streak Card */}
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  🔥 Streak Tracker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Streak</p>
                  <p className="text-4xl font-bold text-red-600 flex items-center gap-2">
                    {stats.currentStreak}
                    <span className="text-2xl">🔥</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Longest Streak</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.longestStreak} days
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-red-200">
                  <p className="text-xs text-gray-600 mb-2">Keep going!</p>
                  <p className="text-sm font-medium text-gray-800">
                    Complete a quest today to maintain your streak! 💪
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Achievement Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <p className="text-5xl font-bold text-purple-600">
                      {Math.round(
                        (unlockedAchievements.length /
                          (unlockedAchievements.length + lockedAchievements.length)) *
                          100
                      )}
                      %
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {unlockedAchievements.length} of{" "}
                      {unlockedAchievements.length + lockedAchievements.length} unlocked
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Common</span>
                      <span className="font-medium">
                        {unlockedAchievements.filter((a) => a.rarity === "common").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Rare</span>
                      <span className="font-medium text-blue-600">
                        {unlockedAchievements.filter((a) => a.rarity === "rare").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Epic</span>
                      <span className="font-medium text-purple-600">
                        {unlockedAchievements.filter((a) => a.rarity === "epic").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Legendary</span>
                      <span className="font-medium text-yellow-600">
                        {unlockedAchievements.filter((a) => a.rarity === "legendary").length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/quests">
                  <Button className="w-full" variant="outline">
                    <Target className="w-4 h-4 mr-2" />
                    View Quests
                  </Button>
                </Link>
                <Link href="/">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate New Quest
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


