/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { headers } from "next/headers";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



const generateQuest=async()=>{
    const geminiKey=process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  console.log("Function initiateddddd",geminiKey)

  const sampleInput = {
  location: {
    area: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
  },
  groupType: "friends",
  groupSize: 4,
  budget: {
    min: 800,
    max: 2500
  },
  duration: "7 hours",
  interests: [
    "nature",
    "hiking",
    "cafes",
  ]
  }
  const { location, groupType, groupSize, budget, duration, interests } = sampleInput;

  const interestsList = interests.map(i => `**${i}**`).join(", ");
  const tagsArray = interests.map(i => `"${i}"`).concat([
    `"${location.city.toLowerCase()}"`,
    `"${location.area.toLowerCase()}"`
  ]).join(", ");

  const questGenerationPrompt = `
  You are an expert AI travel guide trained to create highly personalized, fun, and immersive weekend quests for a group of *${groupType}* based in **${location.area}, ${location.city}, ${location.state}, ${location.country}**. The group has ${groupSize} people, a budget between ₹${budget.min} and ₹${budget.max}, and approximately **${duration}** for the experience.

  Their interests include: ${interestsList}.

  Your goal is to generate **3 rich, highly engaging quests** that offer an unforgettable weekend experience within the specified budget and time. Use precise locations by leveraging **Google Maps or Apple Maps** data (including coordinates) to suggest **real activities, cafes, parks, cultural spots**, and **hidden gems**.

  Each quest must:
  - Fit the ₹${budget.min}–₹${budget.max} budget range
  - Be suitable for a group of ${groupSize} ${groupType}
  - Be tailored to their interests: ${interests.join(", ")}
  - Fit within or slightly below ${duration}
  - Be located within 45–60 minutes max from ${location.area}
  - Include **detailed activities** with title, description, cost, time, location, coordinates, instructions, and tips
  - Include **unique challenges** and **hidden gems**
  - Mention transportation options and weather considerations

  Respond in the following **strict JSON format**:

  \`\`\`json
  {
    "status": "success",
    "generated_quests": 3,
    "user_location": "${location.area}, ${location.city}, ${location.state}, ${location.country}",
    "ai_service_used": "gemini",
    "processing_time": "[auto-calculate or mock: e.g. '2.3s']",
    "quests": [
      {
        "id": "[unique quest ID]",
        "title": "[fun, catchy quest title]",
        "short_description": "[one-line summary of the experience]",
        "description": "[full detailed quest description]",
        "category": "[e.g. nature, urban, culture]",
        "duration_hours": [integer],
        "difficulty_level": [1–5],
        "min_budget": ${budget.min},
        "max_budget": ${budget.max},
        "min_group_size": ${groupSize},
        "max_group_size": ${groupSize},
        "rating_avg": [float between 4.0 and 5.0],
        "best_time": "[e.g. morning, afternoon]",
        "tags": [${tagsArray}],
        "activities": [
          {
            "id": "[unique activity ID]",
            "title": "[activity title]",
            "description": "[what to expect]",
            "order_index": [1-n],
            "estimated_duration": [minutes],
            "estimated_cost_min": [number],
            "estimated_cost_max": [number],
            "activity_type": "[e.g. food, nature, sightseeing, shopping]",
            "location_coordinates": { "lat": [latitude], "lng": [longitude] },
            "location_name": "[venue/landmark name]",
            "instructions": "[how to navigate or enjoy this activity]",
            "tips": "[helpful insights, crowd times, etc.]"
          }
        ],
        "challenges": [
          {
            "id": "[unique challenge ID]",
            "title": "[challenge name]",
            "description": "[what to do]",
            "challenge_type": "[photo | experience | trivia]",
            "points": [int],
            "hint": "[helpful hint]",
            "difficulty_level": [1–5]
          }
        ],
        "hidden_gems": [
          {
            "name": "[place name]",
            "description": "[why it’s a gem]",
            "coordinates": { "lat": [latitude], "lng": [longitude] }
          }
        ],
        "estimated_travel_time": "[how long it takes from ${location.area}]",
        "transportation": "[mode and cost: e.g. Uber, train, walking]"
      }
    ],
    "user_feedback": {
      "personalization_score": [int out of 100],
      "budget_optimization": "All quests fit within your ₹${budget.min}–₹${budget.max} budget",
      "distance_optimization": "[how far quests are]",
      "group_size_match": "All activities suitable for ${groupSize} people",
      "duration_match": "All quests fit your ${duration} timeframe"
    },
    "next_steps": {
      "booking_required": ["any places needing reservation"],
      "weather_check": "[indoor/outdoor mix]",
      "transportation_tips": "[how to move around best]"
    },
    "ai_insights": {
      "best_match": "[which quest fits user best and why]",
      "weather_backup": "[rain-proof or not]",
      "local_tip": "[area-specific hack or travel tip]"
    }
  }
  \`\`\`

  Notes:
  - Use real cafés, landmarks, or cultural sites using maps or local listings
  - Inject real joy, surprise, and *vibes* into your writing
  - Make each quest feel like a mini adventure with natural storytelling
  - Make the output JSON **strictly syntactically valid**
  `;
  const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${geminiKey}`,
  {
    contents: [
      {
        parts: [
          {
            text: `${questGenerationPrompt}`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
    }
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  );
   if (!response.status) throw new Error(`Gemini API error: ${response.status}`);
  
  const result = await response.data;
  const text = result.candidates[0].content.parts[0].text;
  const formatted=text.replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
  const responseQuest=JSON.parse(formatted);
  console.log("Quest Response::::",responseQuest);




}

export default generateQuest;


