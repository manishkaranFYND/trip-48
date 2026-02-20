/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import generateQuest from "@/lib/utils";
import { z } from "zod";
import crypto from "crypto";

// Validation schema for quest preferences
const QuestPreferencesSchema = z.object({
  location: z.object({
    area: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
  }),
  groupType: z.string().min(1),
  groupSize: z.number().min(1).max(50),
  budget: z.number().min(100).max(100000),
  duration: z.string().min(1),
  interests: z.array(z.string()).min(1),
});

type QuestPreferences = z.infer<typeof QuestPreferencesSchema>;

// Helper function to generate a consistent cache key
function generateQuestKey(preferences: QuestPreferences): string {
  const roundedGroupSize = Math.round(preferences.groupSize / 2) * 2;
  const roundedBudget = Math.round(preferences.budget / 500) * 500;
  let durationNum = 0;
    const durationMatch = preferences.duration.match(/(\d+(\.\d+)?)/);
    if (durationMatch) {
      durationNum = parseFloat(durationMatch[1]);
    }
    const roundedDuration = Math.round(durationNum / 2) * 2;


  const keyData = {
    location: preferences.location,
    groupSize: roundedGroupSize,
    budget: roundedBudget,
    duration: roundedDuration,
    interests: preferences.interests.sort(), // Sort to ensure consistent ordering
  };
  
  const keyString = JSON.stringify(keyData);
  return crypto.createHash('md5').update(keyString).digest('hex');
}
export async function POST(req: NextRequest) {
  try {
    // 1. Get the authenticated user using better-auth
    const session = await auth.api.getSession({
      headers: req.headers
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required. Please log in to generate quests." },
        { status: 401 }
      );
    }

    // 2. Parse and validate the request body
    const body = await req.json();
    
    let validatedPreferences;
    try {
      validatedPreferences = QuestPreferencesSchema.parse(body);
    } catch (validationError) {
      return NextResponse.json(
        { 
          error: "Invalid quest preferences", 
          details: validationError instanceof z.ZodError ? validationError.errors : "Validation failed"
        },
        { status: 400 }
      );
    }

    // 3. Generate a unique cache key for these preferences
    const questKey = generateQuestKey(validatedPreferences);
    const locationString = `${validatedPreferences.location.area}, ${validatedPreferences.location.city}, ${validatedPreferences.location.state}, ${validatedPreferences.location.country}`;

    // 4. Initialize Supabase client
    const supabase = await createClient();

    // 5. Check if quest already exists in database
    const { data: existingQuest, error: fetchError } = await supabase
      .from('quests')
      .select('*')
      .eq('quest_key', questKey)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Database fetch error:', fetchError);
      return NextResponse.json(
        { error: "Database error while checking for existing quests" },
        { status: 500 }
      );
    }

    // 6. If quest exists and is recent (less than 24 hours old), return cached version
    if (existingQuest) {
      const questAge = Date.now() - new Date(existingQuest.created_at).getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (questAge < twentyFourHours) {
        return NextResponse.json({
          ...existingQuest.quest_data,
          cached: true,
          cache_age_hours: Math.round(questAge / (60 * 60 * 1000)),
          message: "Retrieved from cache - quests are cached for 24 hours"
        });
      }
    }

    // 7. Generate new quest using Gemini API
    console.log('Generating new quest for user:', session.user.id);
    let questData;
    
    try {
      questData = await generateQuest(validatedPreferences);
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      return NextResponse.json(
        { 
          error: "Failed to generate quest. Please try again later.",
          details: "AI service temporarily unavailable"
        },
        { status: 503 }
      );
    }

    // 8. Store the new quest in database
    const { data: savedQuest, error: saveError } = await supabase
      .from('quests')
      .insert({
        user_id: session.user.id,
        quest_key: questKey,
        quest: questData.quests,
        preferences: validatedPreferences,
      })
      .select()
      .single();

    if (saveError) {
      console.error('Database save error:', saveError);
      // Still return the quest data even if saving fails
      return NextResponse.json({
        ...questData,
        cached: false,
        warning: "Quest generated successfully but not saved to cache"
      });
    }

    // 9. Return successful response
    return NextResponse.json({
      ...questData,
      cached: true,
      database_id: savedQuest.id,
      message: "Quest generated successfully and saved to cache"
    });

  } catch (error) {
    console.error('Unexpected error in quest generation:', error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: "An unexpected error occurred while generating your quest"
      },
      { status: 500 }
    );
  }
}