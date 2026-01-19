# Trip48 – V1 Development Board

A complete Jira-style task board for building the Trip48 MVP.

---

# 🗂 Board: Trip48 – V1 Tasks

## Backlog

### Project Initialization
- Create Next.js 14 + TypeScript project
- Setup TailwindCSS
- Install shadcn/ui
- Setup alias paths (e.g., @/components)
- Create /lib, /types, /components, /app/api folders
- Initialize GitHub repository
- Connect Vercel project

### Supabase Setup
- Create new Supabase project
- Add .env.local file with required keys
- Install Supabase client
- Create table: generated_quests
- Create table: user_searches
- Create table: errors
- Configure RLS & permissions

### UserPreferences Form
- Create UserPreferences form layout
- Add Location text input
- Add GroupType dropdown
- Add GroupSize selector
- Add Budget min/max inputs
- Add Duration dropdown
- Add Interests multi-select
- Add Zod validation

### Quest API Setup
- Create /api/generate-quest route
- Validate incoming request
- Return mock quest JSON initially
- Connect form → API → response
- Display basic quest card

### Free AI Layer
- Add Gemini (free tier) integration
- Add HuggingFace fallback integration
- Add template fallback generator
- Create generateQuestDescription(prompt)
- Add Supabase error logging

### Quest Template Engine
- Create quest themes: culture, nature, food, urban
- Add template activity sets per theme
- Add cost estimation logic
- Add duration logic
- Add difficulty calculation
- Add city-based micro templates

### Activity Generator
- Generate 5–7 activities
- Add title + description generator
- Add cost estimation per activity
- Add tips + instructions
- Ensure output matches schema

### Challenges & Hidden Gems
- Add generateChallenges()
- Add generateHiddenGems()
- Add 2 challenges per quest
- Add 1 hidden gem per quest
- Add points & difficulty scoring

### Quest Result UI
- Create QuestCard component
- Create QuestDetails page
- Add collapsible activity sections
- Add cost summary section
- Add challenge list
- Add hidden gem section

### Frontend Polish
- Add loading skeletons
- Add error alerts
- Add “Regenerate Quest” button
- Add mobile-responsive layout
- Add city-based styling

### Supabase Storage
- Add saveGeneratedQuest()
- Save quests to DB after creation
- Add Recent Searches page
- Query and show recent quests

### Pre-Launch Polish
- Add icons (lucide-react)
- Improve spacing + colors
- Add simple branding for Trip48
- Add onboarding text
- Add footer + header

### Deployment
- Push final changes to GitHub
- Deploy to Vercel
- Verify env variables
- Test API rate limits
- Fix post-deploy bugs

---

## To Do (This Week)
_(Leave empty — you will drag items here)_

---

## In Progress
_(Leave empty)_

---

## Review / Testing
_(Leave empty)_

---

## Done
_(Leave empty)_

