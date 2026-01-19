/* eslint-disable @typescript-eslint/no-unused-vars */
// Quest Progress Management Utility
export interface ActivityProgress {
  activityId: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface QuestProgress {
  questId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt?: string;
  completedAt?: string;
  activities: ActivityProgress[];
  overallProgress: number; // 0-100
}

// Get all quest progress from localStorage
export const getAllQuestProgress = (): QuestProgress[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('quest_progress');
  return stored ? JSON.parse(stored) : [];
};

// Get progress for a specific quest
export const getQuestProgress = (questId: string): QuestProgress | null => {
  const allProgress = getAllQuestProgress();
  return allProgress.find(q => q.questId === questId) || null;
};

// Initialize quest progress
export const startQuest = (questId: string, activityIds: string[]): QuestProgress => {
  const allProgress = getAllQuestProgress();
  
  // Check if quest already exists
  const existingIndex = allProgress.findIndex(q => q.questId === questId);
  
  const newProgress: QuestProgress = {
    questId,
    status: 'in_progress',
    startedAt: new Date().toISOString(),
    activities: activityIds.map(id => ({
      activityId: id,
      completed: false
    })),
    overallProgress: 0
  };
  
  if (existingIndex >= 0) {
    allProgress[existingIndex] = newProgress;
  } else {
    allProgress.push(newProgress);
  }
  
  localStorage.setItem('quest_progress', JSON.stringify(allProgress));
  return newProgress;
};

// Mark activity as complete
export const completeActivity = (questId: string, activityId: string, notes?: string): QuestProgress | null => {
  const allProgress = getAllQuestProgress();
  const questIndex = allProgress.findIndex(q => q.questId === questId);
  
  if (questIndex < 0) return null;
  
  const quest = allProgress[questIndex];
  const activityIndex = quest.activities.findIndex(a => a.activityId === activityId);
  
  if (activityIndex < 0) return null;
  
  // Mark activity as complete
  quest.activities[activityIndex] = {
    ...quest.activities[activityIndex],
    completed: true,
    completedAt: new Date().toISOString(),
    notes
  };
  
  // Calculate overall progress
  const completedCount = quest.activities.filter(a => a.completed).length;
  quest.overallProgress = Math.round((completedCount / quest.activities.length) * 100);
  
  // Check if all activities are complete
  if (completedCount === quest.activities.length) {
    quest.status = 'completed';
    quest.completedAt = new Date().toISOString();
  }
  
  allProgress[questIndex] = quest;
  localStorage.setItem('quest_progress', JSON.stringify(allProgress));
  
  return quest;
};

// Mark activity as incomplete
export const uncompleteActivity = (questId: string, activityId: string): QuestProgress | null => {
  const allProgress = getAllQuestProgress();
  const questIndex = allProgress.findIndex(q => q.questId === questId);
  
  if (questIndex < 0) return null;
  
  const quest = allProgress[questIndex];
  const activityIndex = quest.activities.findIndex(a => a.activityId === activityId);
  
  if (activityIndex < 0) return null;
  
  // Mark activity as incomplete
  quest.activities[activityIndex] = {
    activityId,
    completed: false
  };
  
  // Recalculate progress
  const completedCount = quest.activities.filter(a => a.completed).length;
  quest.overallProgress = Math.round((completedCount / quest.activities.length) * 100);
  
  // Update status
  if (quest.status === 'completed') {
    quest.status = 'in_progress';
    quest.completedAt = undefined;
  }
  
  allProgress[questIndex] = quest;
  localStorage.setItem('quest_progress', JSON.stringify(allProgress));
  
  return quest;
};

// Delete quest progress
export const resetQuestProgress = (questId: string): void => {
  const allProgress = getAllQuestProgress();
  const filtered = allProgress.filter(q => q.questId !== questId);
  localStorage.setItem('quest_progress', JSON.stringify(filtered));
};

// Get quest statistics
export const getQuestStats = () => {
  const allProgress = getAllQuestProgress();
  return {
    total: allProgress.length,
    inProgress: allProgress.filter(q => q.status === 'in_progress').length,
    completed: allProgress.filter(q => q.status === 'completed').length,
    notStarted: allProgress.filter(q => q.status === 'not_started').length
  };
};






