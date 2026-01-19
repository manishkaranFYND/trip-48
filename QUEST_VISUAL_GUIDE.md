# Quest System Visual Guide

## 🎨 Visual Walkthrough of the Quest System

---

## 1. Quest Listing Page (`/quests`)

### Header Section:
```
┌─────────────────────────────────────────────────────────────┐
│  [Purple to Pink Gradient Background]                       │
│                                                              │
│  ✨ Your Quests                                             │
│  Embark on amazing adventures tailored just for you         │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │    5     │  │    2     │  │    1     │                 │
│  │  Total   │  │In Progress│ │ Completed│                 │
│  │  Quests  │  │  Quests  │  │  Quests  │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

### Search & Filter Section:
```
┌─────────────────────────────────────────────────────────────┐
│  🔍 [Search quests by name, tags, or description...]        │
│                                                              │
│  [🌟 All]  [🏙️ Urban]  [🎨 Culture]  [🌿 Nature]           │
│  [⛰️ Adventure]  [🍜 Food]                                  │
└─────────────────────────────────────────────────────────────┘
```

### Quest Cards Grid:
```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ [Progress Bar]   │  │ [Progress Bar]   │  │                  │
│                  │  │                  │  │                  │
│ Bandra Mural &   │  │ Fort Art &       │  │ Powai Lakefront  │
│ Seafront Saga    │  │ Heritage Exp.    │  │ Adventure        │
│ ⭐ 4.8           │  │ ⭐ 4.9          │  │ ⭐ 4.6          │
│                  │  │                  │  │                  │
│ [urban]          │  │ [culture]        │  │ [nature]         │
│ [Moderate]       │  │ [Challenging]    │  │ [Moderate]       │
│ [afternoon]      │  │ [morning]        │  │ [afternoon]      │
│                  │  │                  │  │                  │
│ ⏰ 5h  👥 3      │  │ ⏰ 6h  👥 3     │  │ ⏰ 4h  👥 3     │
│ 💰 800-2500      │  │ 💰 1500-4000    │  │ 💰 500-3000     │
│ 📍 45-60 min     │  │ 📍 50-60 min    │  │ 📍 20-30 min    │
│                  │  │                  │  │                  │
│ #adventure #art  │  │ #museum #art     │  │ #adventure       │
│ #cafes #travel   │  │ #cafes #travel   │  │ #cafes #nature   │
│                  │  │                  │  │                  │
│ [Start Quest]    │  │ [In Progress]    │  │ [Start Quest]    │
└──────────────────┘  └──────────────────┘  └──────────────────┘
     67% complete           100% complete
```

---

## 2. Quest Detail Page (`/quests/[id]`)

### Hero Header:
```
┌─────────────────────────────────────────────────────────────────┐
│  [Purple to Pink Gradient Background]                           │
│                                                                  │
│  ← Back to Quests                                               │
│                                                                  │
│  [urban] ⭐ 4.8                         ╭─────────────╮        │
│                                          │   ⟳ 67%    │        │
│  The Bandra Mural & Seafront Saga       │             │        │
│  Hunt for vibrant street art, chill at  │   2 / 3     │        │
│  an iconic cafe, and catch sunset...    │ activities  │        │
│                                          ╰─────────────╯        │
│  ⏰ 5h  👥 3  💰 ₹800-2500                                      │
└─────────────────────────────────────────────────────────────────┘
```

### Main Content - About Section:
```
┌─────────────────────────────────────────────────────────────────┐
│  ℹ️ About This Quest                                            │
│  ─────────────────────────────────────────────────────────────  │
│  Unleash your inner explorer on this quest through the artsy    │
│  heart of Bandra. You'll navigate the historic, colourful       │
│  bylanes of Ranwar village, discovering incredible murals...    │
└─────────────────────────────────────────────────────────────────┘
```

### Activity List (3 Examples):
```
┌─────────────────────────────────────────────────────────────────┐
│  🎯 Activities (3)                                              │
│  Follow these activities in order for the best experience       │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ [✓] The Great Bandra Mural Hunt      [Undo]              ││
│  │ [sightseeing]                                             ││
│  │                                                            ││
│  │ Begin your quest by diving into the narrow, winding lanes ││
│  │ of Chapel Road and Waroda Road. This area is an open-air  ││
│  │ art gallery...                                             ││
│  │                                                            ││
│  │ ⏰ 90 min   💰 ₹0-0                                       ││
│  │                                                            ││
│  │ 📍 Chapel Road Street Art, Bandra West    [🧭 Navigate]  ││
│  │                                                            ││
│  │ ┌──────────────────────────────────────────────────────┐ ││
│  │ │ ℹ️ Instructions                                       │ ││
│  │ │ Start from the St. Francis of Assisi's Church end... │ ││
│  │ └──────────────────────────────────────────────────────┘ ││
│  │                                                            ││
│  │ ┌──────────────────────────────────────────────────────┐ ││
│  │ │ 💡 Pro Tip                                            │ ││
│  │ │ Go in the afternoon for the best light. Wear...      │ ││
│  │ └──────────────────────────────────────────────────────┘ ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ [2] Recharge at a Foodie Landmark     [Complete]        ││
│  │ [food]                                                    ││
│  │                                                            ││
│  │ After your art walk, you've earned a break! Head to      ││
│  │ Candies, a beloved Bandra institution...                  ││
│  │                                                            ││
│  │ ⏰ 75 min   💰 ₹900-1500                                 ││
│  │                                                            ││
│  │ 📍 Candies Cafe                          [🧭 Navigate]  ││
│  │                                                            ││
│  │ [Instructions and Tips sections...]                       ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ [3] Sunset Stroll on the Promenade    [Complete]        ││
│  │ [nature]                                                  ││
│  │ [Activity details...]                                     ││
│  └────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Challenges Section:
```
┌─────────────────────────────────────────────────────────────────┐
│  🏆 Challenges (1)                                              │
│  Complete these optional challenges for extra fun!              │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ 📷 Mural Mimicry                              [100 pts]   ││
│  │                                                            ││
│  │ Find the most expressive piece of street art featuring a  ││
│  │ face or character and have your group try to mimic...     ││
│  │                                                            ││
│  │ 💡 Hint: The murals on Waroda Road often have large...   ││
│  └────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Sidebar (Desktop):
```
┌──────────────────────────────┐
│  Quest Details               │
│  ──────────────────────────  │
│  Best Time                   │
│  Afternoon                   │
│                              │
│  Difficulty                  │
│  Level 2 / 5                 │
│                              │
│  Travel Time                 │
│  45-60 minutes from...       │
│                              │
│  Transportation              │
│  Take the Central Line...    │
└──────────────────────────────┘

┌──────────────────────────────┐
│  Tags                        │
│  ──────────────────────────  │
│  #adventure  #art            │
│  #cafes      #travel         │
│  #mumbai     #bandra         │
│  #street art                 │
└──────────────────────────────┘

┌──────────────────────────────┐
│  💡 Hidden Gems              │
│  ──────────────────────────  │
│  ┌────────────────────────┐ │
│  │ Ranwar Village         │ │
│  │ Tucked away from the   │ │
│  │ main hustle...         │ │
│  │ [🧭 View on Map]      │ │
│  └────────────────────────┘ │
└──────────────────────────────┘

┌──────────────────────────────┐
│  [Reset Quest Progress]      │
└──────────────────────────────┘
```

---

## 3. Progress States

### Not Started:
```
┌─────────────────────────────────────────────────────────────────┐
│  [Purple Gradient Banner]                                       │
│  Ready for Adventure?                          [Start Quest]    │
│  Start tracking your progress through this quest                │
└─────────────────────────────────────────────────────────────────┘

Activities show as:
[1] Activity Title                               [No Button]
[2] Activity Title                               [No Button]
[3] Activity Title                               [No Button]
```

### In Progress:
```
Progress bar at top of page: [████████░░░░░░░░] 67%

Activities show as:
[✓] Activity Title (green background)            [Undo]
[2] Activity Title                               [Complete]
[3] Activity Title                               [Complete]
```

### Completed:
```
┌─────────────────────────────────────────────────────────────────┐
│  [Green Gradient Banner]                                        │
│  🏆 Quest Completed! 🎉                        [Reset Quest]    │
│  You've completed all activities in this quest. Amazing work!   │
└─────────────────────────────────────────────────────────────────┘

Progress circle: 100%

All activities:
[✓] Activity #1 (green)                          [Undo]
[✓] Activity #2 (green)                          [Undo]
[✓] Activity #3 (green)                          [Undo]
```

---

## 4. Responsive Layouts

### Mobile View:
```
┌────────────────┐
│   Hero Header  │
│   (full width) │
│                │
│   Quest Card 1 │
│   (full width) │
│                │
│   Quest Card 2 │
│   (full width) │
│                │
│   Quest Card 3 │
│   (full width) │
└────────────────┘
```

### Tablet View:
```
┌──────────────────────────────────┐
│      Hero Header (full width)    │
│                                   │
│ ┌──────────────┬──────────────┐ │
│ │ Quest Card 1 │ Quest Card 2 │ │
│ └──────────────┴──────────────┘ │
│ ┌──────────────┬──────────────┐ │
│ │ Quest Card 3 │ Quest Card 4 │ │
│ └──────────────┴──────────────┘ │
└──────────────────────────────────┘
```

### Desktop View:
```
┌──────────────────────────────────────────────┐
│         Hero Header (full width)             │
│                                               │
│ ┌─────────┬─────────┬─────────┐            │
│ │ Quest 1 │ Quest 2 │ Quest 3 │            │
│ └─────────┴─────────┴─────────┘            │
│ ┌─────────┬─────────┬─────────┐            │
│ │ Quest 4 │ Quest 5 │ Quest 6 │            │
│ └─────────┴─────────┴─────────┘            │
└──────────────────────────────────────────────┘
```

### Detail Page - Desktop Layout:
```
┌─────────────────────────────────────────────────────────────────┐
│                      Hero Header (full)                          │
├─────────────────────────────────────────────────┬───────────────┤
│  Main Content (66%)                             │ Sidebar (33%) │
│  ┌───────────────────────────────────────────┐ │               │
│  │ About This Quest                          │ │ Quest Details │
│  └───────────────────────────────────────────┘ │               │
│  ┌───────────────────────────────────────────┐ │ Tags          │
│  │ Start Quest Banner                        │ │               │
│  └───────────────────────────────────────────┘ │ Hidden Gems   │
│  ┌───────────────────────────────────────────┐ │               │
│  │ Activity #1                               │ │ Reset Button  │
│  │ Activity #2                               │ │               │
│  │ Activity #3                               │ │               │
│  └───────────────────────────────────────────┘ │               │
│  ┌───────────────────────────────────────────┐ │               │
│  │ Challenges                                │ │               │
│  └───────────────────────────────────────────┘ │               │
└─────────────────────────────────────────────────┴───────────────┘
```

---

## 5. Color Coding System

### Category Badges:
```
[Urban]      → Purple background
[Culture]    → Pink background
[Nature]     → Green background
[Adventure]  → Orange background
[Food]       → Yellow background
```

### Difficulty Badges:
```
[Easy]       → Green background (Level 1)
[Moderate]   → Blue background (Level 2)
[Challenging]→ Yellow background (Level 3)
[Hard]       → Orange background (Level 4)
[Expert]     → Red background (Level 5)
```

### Status Badges:
```
[In Progress] → Blue badge with percentage
[Completed]   → Green badge with checkmark
```

### Activity Types:
```
[sightseeing] → Gray badge
[food]        → Gray badge
[nature]      → Gray badge
[adventure]   → Gray badge
[museum]      → Gray badge
[art]         → Gray badge
```

---

## 6. Interactive Elements

### Buttons:
```
Primary:    [Purple gradient] → Hover: [Darker purple]
Secondary:  [White with border] → Hover: [Light gray bg]
Danger:     [Red border] → Hover: [Light red bg]
Success:    [Green bg] → Hover: [Darker green]
```

### Cards:
```
Normal State:  [White] with subtle shadow
Hover State:   [White] with larger shadow + slight scale
Active State:  [White] with purple border
Completed:     [Green tint] with green border
```

### Progress Indicators:
```
Linear Bar:
  Background: [Light gray]
  Fill: [Purple to Pink gradient]
  Animation: Smooth fill from 0 to X%

Circular:
  Background: [Light gray circle]
  Fill: [Yellow arc]
  Center: [Percentage number]
  Animation: Clockwise fill
```

---

## 7. Empty & Error States

### No Quests Generated:
```
┌─────────────────────────────────────────┐
│         📍 (Large gray icon)            │
│                                          │
│        No Quests Yet                    │
│   Generate your first quest to          │
│   start your adventure!                 │
│                                          │
│     [✨ Generate Quests]                │
└─────────────────────────────────────────┘
```

### No Search Results:
```
┌─────────────────────────────────────────┐
│         🔍 (Large gray icon)            │
│                                          │
│        No Quests Found                  │
│   Try adjusting your search or          │
│   filter criteria                       │
└─────────────────────────────────────────┘
```

### Quest Not Found:
```
┌─────────────────────────────────────────┐
│                                          │
│        Quest Not Found                  │
│                                          │
│     [Back to Quests]                    │
└─────────────────────────────────────────┘
```

### Loading State:
```
┌─────────────────────────────────────────┐
│         ⟳ (Spinning icon)               │
│                                          │
│       Loading quests...                 │
└─────────────────────────────────────────┘
```

---

## 8. Micro-interactions

### Activity Completion:
```
Before Click:  [2] Activity Title    [Complete]
During Click:  [2] Activity Title    [Loading...]
After Click:   [✓] Activity Title    [Undo]
               (Green background fades in)
               (Progress bar animates)
```

### Navigation Button:
```
Idle:    [🧭 Navigate]
Hover:   [🧭 Navigate] (slight scale + shadow)
Click:   Opens Google Maps in new tab
```

### Search Input:
```
Empty:   [🔍 Search quests...]
Focus:   [🔍 Search quests...] (Purple border)
Typing:  [🔍 adventure] (Results filter live)
```

### Category Filter:
```
Not Selected:  [White with border]
Selected:      [Purple with white text]
Transition:    Smooth color fade (200ms)
```

---

## 9. Typography Hierarchy

```
H1 (Page Title):      text-4xl font-bold (36px)
H2 (Section Title):   text-2xl font-semibold (24px)
H3 (Card Title):      text-xl font-semibold (20px)
H4 (Activity Title):  text-lg font-semibold (18px)
Body Large:           text-lg (18px)
Body Normal:          text-base (16px)
Body Small:           text-sm (14px)
Caption:              text-xs (12px)
```

---

## 10. Icon Usage

```
Quest Listing:
  ✨ Sparkles → Quest title
  📊 TrendingUp → Generate more
  🔍 Search → Search bar
  🔧 Filter → Filter button
  📍 MapPin → Location
  ⏰ Clock → Duration
  👥 Users → Group size
  💰 DollarSign → Budget
  ⭐ Star → Rating

Quest Detail:
  ℹ️ Info → About section
  🎯 Target → Activities
  🏆 Trophy → Completed
  ▶️ Play → Start quest
  ✓ CheckCircle → Completed activity
  ○ Circle → Uncompleted activity
  🧭 Navigation → Navigate button
  💡 Lightbulb → Tips & Hidden gems
  📷 Camera → Challenges
  🏅 Award → Challenge points
  ← ChevronLeft → Back button
  → ChevronRight → Next/View more
```

---

This visual guide shows the complete UI/UX design of the quest system!






