/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Sparkles, Share2, Download, X, Star, Zap, Award } from "lucide-react";
import confetti from "canvas-confetti";
import type { Achievement } from "@/lib/achievements";

interface CelebrationModalProps {
  open: boolean;
  onClose: () => void;
  questTitle: string;
  pointsEarned: number;
  newLevel?: number;
  newAchievements?: Achievement[];
  totalActivities?: number;
  completionTime?: string;
}

export default function CelebrationModal({
  open,
  onClose,
  questTitle,
  pointsEarned,
  newLevel,
  newAchievements = [],
  totalActivities = 0,
  completionTime,
}: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      // Trigger confetti
      setShowConfetti(true);
      fireConfetti();
      
      // Play celebration sound (optional - can add audio)
      // new Audio('/celebration.mp3').play().catch(() => {});
    }
  }, [open]);

  const fireConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleShare = async () => {
    const shareText = `🎉 Just completed "${questTitle}" on Trip48! Earned ${pointsEarned} points and unlocked ${newAchievements.length} achievements! 🏆`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quest Completed!',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Copied to clipboard!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 border-2 border-purple-300">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">
            🎉 Quest Completed! 🎉
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Main Celebration Card */}
          <Card className="bg-white border-2 border-purple-200 shadow-xl">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                {/* Trophy Icon */}
                <div className="flex justify-center">
                  <div className="relative">
                    <Trophy className="w-24 h-24 text-yellow-500 animate-bounce" />
                    <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-spin" />
                  </div>
                </div>

                {/* Quest Title */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {questTitle}
                  </h3>
                  <p className="text-gray-600">
                    You've completed this amazing adventure!
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <span className="text-3xl font-bold text-purple-700">
                        +{pointsEarned}
                      </span>
                    </div>
                    <p className="text-sm text-purple-600 font-medium">Points Earned</p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Star className="w-5 h-5 text-pink-600" />
                      <span className="text-3xl font-bold text-pink-700">
                        {totalActivities}
                      </span>
                    </div>
                    <p className="text-sm text-pink-600 font-medium">Activities Done</p>
                  </div>
                </div>

                {/* Level Up */}
                {newLevel && (
                  <div className="bg-gradient-to-r from-yellow-100 via-yellow-200 to-orange-200 rounded-lg p-4 border-2 border-yellow-400">
                    <div className="flex items-center justify-center gap-3">
                      <Award className="w-8 h-8 text-yellow-600 animate-pulse" />
                      <div>
                        <p className="text-sm text-yellow-700 font-medium">Level Up!</p>
                        <p className="text-2xl font-bold text-yellow-800">
                          Level {newLevel}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* New Achievements */}
          {newAchievements.length > 0 && (
            <Card className="bg-white border-2 border-yellow-300 shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  New Achievements Unlocked!
                </h4>
                <div className="space-y-3">
                  {newAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200"
                    >
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-gray-800">{achievement.title}</p>
                          <Badge className="bg-yellow-500 text-white text-xs">
                            +{achievement.points} pts
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Achievement
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Continue Exploring
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


