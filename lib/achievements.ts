/* eslint-disable @typescript-eslint/no-unused-vars */
// Achievement and Gamification System

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'quests_completed' | 'activities_completed' | 'streak' | 'distance' | 'points' | 'challenges';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlockedAt?: string;
}

export interface UserStats {
  totalQuests: number;
  completedQuests: number;
  totalActivities: number;
  completedActivities: number;
  totalPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate?: string;
  totalDistance: number; // in km
  challengesCompleted: number;
  achievements: string[]; // array of achievement IDs
  createdAt: string;
}

// Define all achievements
export const ALL_ACHIEVEMENTS: Achievement[] = [
  // Quest Completions
  {
    id: 'first_quest',
    title: 'First Adventure',
    description: 'Complete your first quest',
    icon: '🎯',
    requirement: 1,
    type: 'quests_completed',
    rarity: 'common',
    points: 100,
  },
  {
    id: 'quest_master',
    title: 'Quest Master',
    description: 'Complete 5 quests',
    icon: '🏆',
    requirement: 5,
    type: 'quests_completed',
    rarity: 'rare',
    points: 500,
  },
  {
    id: 'legendary_explorer',
    title: 'Legendary Explorer',
    description: 'Complete 10 quests',
    icon: '👑',
    requirement: 10,
    type: 'quests_completed',
    rarity: 'epic',
    points: 1000,
  },
  {
    id: 'ultimate_adventurer',
    title: 'Ultimate Adventurer',
    description: 'Complete 25 quests',
    icon: '💎',
    requirement: 25,
    type: 'quests_completed',
    rarity: 'legendary',
    points: 2500,
  },

  // Activity Completions
  {
    id: 'task_starter',
    title: 'Task Starter',
    description: 'Complete 10 activities',
    icon: '✅',
    requirement: 10,
    type: 'activities_completed',
    rarity: 'common',
    points: 100,
  },
  {
    id: 'activity_champion',
    title: 'Activity Champion',
    description: 'Complete 50 activities',
    icon: '⚡',
    requirement: 50,
    type: 'activities_completed',
    rarity: 'rare',
    points: 500,
  },
  {
    id: 'activity_legend',
    title: 'Activity Legend',
    description: 'Complete 100 activities',
    icon: '🌟',
    requirement: 100,
    type: 'activities_completed',
    rarity: 'epic',
    points: 1000,
  },

  // Streaks
  {
    id: 'consistent_explorer',
    title: 'Consistent Explorer',
    description: 'Complete quests on 3 consecutive days',
    icon: '🔥',
    requirement: 3,
    type: 'streak',
    rarity: 'common',
    points: 150,
  },
  {
    id: 'streak_master',
    title: 'Streak Master',
    description: 'Complete quests on 7 consecutive days',
    icon: '🔥🔥',
    requirement: 7,
    type: 'streak',
    rarity: 'rare',
    points: 700,
  },
  {
    id: 'unstoppable',
    title: 'Unstoppable',
    description: 'Complete quests on 30 consecutive days',
    icon: '🔥🔥🔥',
    requirement: 30,
    type: 'streak',
    rarity: 'legendary',
    points: 3000,
  },

  // Points
  {
    id: 'point_collector',
    title: 'Point Collector',
    description: 'Earn 1000 points',
    icon: '💰',
    requirement: 1000,
    type: 'points',
    rarity: 'common',
    points: 100,
  },
  {
    id: 'point_master',
    title: 'Point Master',
    description: 'Earn 5000 points',
    icon: '💎',
    requirement: 5000,
    type: 'points',
    rarity: 'epic',
    points: 500,
  },

  // Special
  {
    id: 'challenge_seeker',
    title: 'Challenge Seeker',
    description: 'Complete 10 challenges',
    icon: '🎮',
    requirement: 10,
    type: 'challenges',
    rarity: 'rare',
    points: 500,
  },
];

// Get user stats from localStorage
export const getUserStats = (): UserStats => {
  if (typeof window === 'undefined') {
    return getDefaultStats();
  }
  
  const stored = localStorage.getItem('user_stats');
  if (stored) {
    return JSON.parse(stored);
  }
  
  const defaultStats = getDefaultStats();
  localStorage.setItem('user_stats', JSON.stringify(defaultStats));
  return defaultStats;
};

const getDefaultStats = (): UserStats => ({
  totalQuests: 0,
  completedQuests: 0,
  totalActivities: 0,
  completedActivities: 0,
  totalPoints: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  totalDistance: 0,
  challengesCompleted: 0,
  achievements: [],
  createdAt: new Date().toISOString(),
});

// Save user stats
export const saveUserStats = (stats: UserStats): void => {
  localStorage.setItem('user_stats', JSON.stringify(stats));
};

// Calculate level from points
export const calculateLevel = (points: number): number => {
  // Level progression: 100 points per level, exponentially increasing
  return Math.floor(Math.sqrt(points / 100)) + 1;
};

// Calculate points needed for next level
export const pointsForNextLevel = (currentLevel: number): number => {
  return Math.pow(currentLevel, 2) * 100;
};

// Update streak
export const updateStreak = (stats: UserStats): UserStats => {
  const today = new Date().toDateString();
  const lastDate = stats.lastActivityDate ? new Date(stats.lastActivityDate).toDateString() : null;
  
  if (!lastDate) {
    // First activity
    stats.currentStreak = 1;
    stats.lastActivityDate = new Date().toISOString();
  } else if (lastDate === today) {
    // Same day, no change
    return stats;
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastDate === yesterdayStr) {
      // Consecutive day
      stats.currentStreak += 1;
      stats.lastActivityDate = new Date().toISOString();
      
      if (stats.currentStreak > stats.longestStreak) {
        stats.longestStreak = stats.currentStreak;
      }
    } else {
      // Streak broken
      stats.currentStreak = 1;
      stats.lastActivityDate = new Date().toISOString();
    }
  }
  
  return stats;
};

// Award points for completing activity
export const awardActivityPoints = (basePoints: number = 50): number => {
  const stats = getUserStats();
  stats.completedActivities += 1;
  stats.totalPoints += basePoints;
  stats.level = calculateLevel(stats.totalPoints);
  
  const updatedStats = updateStreak(stats);
  saveUserStats(updatedStats);
  
  return basePoints;
};

// Award points for completing quest
export const awardQuestPoints = (difficulty: number, activitiesCount: number): { points: number; newAchievements: Achievement[] } => {
  const stats = getUserStats();
  
  // Calculate points based on difficulty and activities
  const basePoints = 100;
  const difficultyMultiplier = difficulty * 50;
  const activityBonus = activitiesCount * 30;
  const totalPoints = basePoints + difficultyMultiplier + activityBonus;
  
  stats.completedQuests += 1;
  stats.totalPoints += totalPoints;
  stats.level = calculateLevel(stats.totalPoints);
  
  const updatedStats = updateStreak(stats);
  
  // Check for new achievements
  const newAchievements = checkForNewAchievements(updatedStats);
  
  // Award achievement points
  newAchievements.forEach(achievement => {
    updatedStats.totalPoints += achievement.points;
    updatedStats.achievements.push(achievement.id);
  });
  
  updatedStats.level = calculateLevel(updatedStats.totalPoints);
  saveUserStats(updatedStats);
  
  return { points: totalPoints, newAchievements };
};

// Check for newly unlocked achievements
export const checkForNewAchievements = (stats: UserStats): Achievement[] => {
  const newAchievements: Achievement[] = [];
  
  ALL_ACHIEVEMENTS.forEach(achievement => {
    // Skip if already unlocked
    if (stats.achievements.includes(achievement.id)) {
      return;
    }
    
    let qualified = false;
    
    switch (achievement.type) {
      case 'quests_completed':
        qualified = stats.completedQuests >= achievement.requirement;
        break;
      case 'activities_completed':
        qualified = stats.completedActivities >= achievement.requirement;
        break;
      case 'streak':
        qualified = stats.currentStreak >= achievement.requirement;
        break;
      case 'points':
        qualified = stats.totalPoints >= achievement.requirement;
        break;
      case 'challenges':
        qualified = stats.challengesCompleted >= achievement.requirement;
        break;
      default:
        break;
    }
    
    if (qualified) {
      newAchievements.push({
        ...achievement,
        unlockedAt: new Date().toISOString(),
      });
    }
  });
  
  return newAchievements;
};

// Get unlocked achievements
export const getUnlockedAchievements = (): Achievement[] => {
  const stats = getUserStats();
  return ALL_ACHIEVEMENTS.filter(a => stats.achievements.includes(a.id)).map(a => ({
    ...a,
    unlockedAt: new Date().toISOString(),
  }));
};

// Get locked achievements
export const getLockedAchievements = (): Achievement[] => {
  const stats = getUserStats();
  return ALL_ACHIEVEMENTS.filter(a => !stats.achievements.includes(a.id));
};

// Get progress for an achievement
export const getAchievementProgress = (achievement: Achievement): number => {
  const stats = getUserStats();
  
  let current = 0;
  switch (achievement.type) {
    case 'quests_completed':
      current = stats.completedQuests;
      break;
    case 'activities_completed':
      current = stats.completedActivities;
      break;
    case 'streak':
      current = stats.currentStreak;
      break;
    case 'points':
      current = stats.totalPoints;
      break;
    case 'challenges':
      current = stats.challengesCompleted;
      break;
  }
  
  return Math.min((current / achievement.requirement) * 100, 100);
};

// Rarity colors
export const getRarityColor = (rarity: Achievement['rarity']): string => {
  switch (rarity) {
    case 'common':
      return 'bg-gray-500';
    case 'rare':
      return 'bg-blue-500';
    case 'epic':
      return 'bg-purple-500';
    case 'legendary':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

export const getRarityGradient = (rarity: Achievement['rarity']): string => {
  switch (rarity) {
    case 'common':
      return 'from-gray-400 to-gray-600';
    case 'rare':
      return 'from-blue-400 to-blue-600';
    case 'epic':
      return 'from-purple-400 to-purple-600';
    case 'legendary':
      return 'from-yellow-400 via-yellow-500 to-orange-500';
    default:
      return 'from-gray-400 to-gray-600';
  }
};


