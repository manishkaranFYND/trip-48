/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Sparkles, TrendingUp } from 'lucide-react';
import QuestCard from '../components/questCard';
import { getQuestStats } from '@/lib/questProgress';
import { getUserStats, calculateLevel } from '@/lib/achievements';
import Link from 'next/link';

// This would normally come from your API/database
// For now, using localStorage to get cached quests
const QuestsListing = () => {
  const [quests, setQuests] = useState<any[]>([]);
  const [filteredQuests, setFilteredQuests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stats, setStats] = useState({ total: 0, inProgress: 0, completed: 0 });
  const [userStats, setUserStats] = useState(getUserStats());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load quests from localStorage (or API)
    loadQuests();
    const questStats = getQuestStats();
    setStats(questStats);
    const userAchievementStats = getUserStats();
    setUserStats(userAchievementStats);
  }, []);

  useEffect(() => {
    // Filter quests based on search and category
    let filtered = quests;

    if (searchQuery) {
      filtered = filtered.filter(
        (quest) =>
          quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quest.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quest.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((quest) => quest.category === selectedCategory);
    }

    setFilteredQuests(filtered);
  }, [searchQuery, selectedCategory, quests]);

  const loadQuests = () => {
    // Try to get quests from localStorage (from previous generation)
    const cachedData = localStorage.getItem('latest_generated_quests');
    if (cachedData) {
      try {
        const data = JSON.parse(cachedData);
        setQuests(data.quests || []);
        setFilteredQuests(data.quests || []);
      } catch (error) {
        console.error('Error loading quests:', error);
      }
    }
    setLoading(false);
  };

  const categories = [
    { value: 'all', label: 'All Quests', icon: '🌟' },
    { value: 'urban', label: 'Urban', icon: '🏙️' },
    { value: 'culture', label: 'Culture', icon: '🎨' },
    { value: 'nature', label: 'Nature', icon: '🌿' },
    { value: 'adventure', label: 'Adventure', icon: '⛰️' },
    { value: 'food', label: 'Food', icon: '🍜' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Your Quests</h1>
          </div>
          <p className="text-purple-100 text-lg mb-6">
            Embark on amazing adventures tailored just for you
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-purple-100">Total Quests</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <div className="text-sm text-purple-100">In Progress</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{stats.completed}</div>
              <div className="text-sm text-purple-100">Completed</div>
            </div>
            <Link href="/stats" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer border-2 border-white/30">
              <div className="text-2xl font-bold flex items-center gap-1">
                <TrendingUp className="w-5 h-5" />
                Lv.{userStats.level}
              </div>
              <div className="text-sm text-purple-100">View Stats →</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search quests by name, tags, or description..."
              className="pl-10 py-6 text-lg border-2 focus:border-purple-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.value)}
                className={selectedCategory === category.value ? 'bg-purple-600' : ''}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {quests.length === 0 && (
          <div className="text-center py-20">
            <MapPin className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Quests Yet</h2>
            <p className="text-gray-500 mb-6">
              Generate your first quest to start your adventure!
            </p>
            <Link href="/">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Quests
              </Button>
            </Link>
          </div>
        )}

        {/* No Results */}
        {quests.length > 0 && filteredQuests.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Quests Found</h2>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Quest Grid */}
        {filteredQuests.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedCategory === 'all' 
                  ? `All Quests (${filteredQuests.length})`
                  : `${categories.find(c => c.value === selectedCategory)?.label} Quests (${filteredQuests.length})`
                }
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          </>
        )}

        {/* Generate More CTA */}
        {quests.length > 0 && (
          <div className="mt-12 text-center bg-white rounded-xl shadow-lg p-8">
            <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Want More Adventures?</h3>
            <p className="text-gray-600 mb-6">
              Generate new personalized quests based on your preferences
            </p>
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate New Quests
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestsListing;
