# 🌍 GLOBAL QUEST
## Complete Product Architecture & Design Specification
### Version 1.0 — Founder-Level Blueprint

---

# PART 0 — FOUNDATIONAL PHILOSOPHY

## The "Knowledge as Adventure" Paradigm

Traditional quiz apps fail because they treat knowledge as a **destination** (pass/fail). Global Quest treats knowledge as a **journey** (exploration, discovery, wonder).

| Traditional Quiz Apps | Global Quest |
|----------------------|--------------|
| "Test your knowledge" | "Discover the world" |
| Failure feels punishing | Every answer teaches |
| Sessions feel like exams | Sessions feel like adventures |
| Static difficulty | Adaptive, flow-optimizing |
| Solo grind | Social expedition |

## The Three Laws of Global Quest

1. **The Wonder Law**: Every single interaction must spark curiosity or deliver delight
2. **The Progress Law**: Users must feel measurably smarter after every session
3. **The Return Law**: The cost of not returning must exceed the effort of returning

---

# PART 1 — CORE PRODUCT VISION

## One-Sentence Product Promise

> **"Global Quest transforms idle moments into mind-expanding adventures that make you the most interesting person in any room."**

## Primary Emotional Triggers (The CPMS Framework)

### 1. **Curiosity** — The Initial Hook
- Trigger: "Did you know there's a lake in Africa that turns animals to stone?"
- Every question begins with intrigue, never with "What is..."

### 2. **Progress** — The Session Driver
- Visible XP bars, map unlocks, knowledge score rising
- Micro-progress indicators every 3-5 questions

### 3. **Mastery** — The Week Driver
- "You've mastered 60% of African geography!"
- Category mastery rings, continental completion badges

### 4. **Social Pride** — The Viral Driver
- "You know more about Europe than 94% of players"
- Beautiful share cards, leaderboard positions, duel victories

## Why Users Return Daily — The Habit Loop

```
┌─────────────────────────────────────────────────────────────┐
│                    GLOBAL QUEST HABIT LOOP                   │
├─────────────────────────────────────────────────────────────┤
│   TRIGGER → ACTION → VARIABLE REWARD → INVESTMENT           │
│                                                              │
│   TRIGGER: Push notification with curiosity hook             │
│   "🌍 Antarctica mystery: Why can't you catch a cold there?"│
│                                                              │
│   ACTION: Open app, answer daily challenge                   │
│                                                              │
│   VARIABLE REWARD:                                           │
│   • New mind-blowing fact (content)                         │
│   • XP and level progress (achievement)                     │
│   • Leaderboard position change (social)                    │
│                                                              │
│   INVESTMENT:                                                │
│   • Streak built up                                         │
│   • Continent progress                                      │
│   • Collection items earned                                 │
└─────────────────────────────────────────────────────────────┘
```

### What Breaks If They Miss a Day

| Investment at Risk | Psychological Pain | Recovery Mechanism |
|-------------------|-------------------|-------------------|
| **Streak (Day 1-7)** | Low | Free restart |
| **Streak (Day 8-30)** | Medium | Streak Freeze (earned) |
| **Streak (Day 31+)** | High | Streak Shield (premium) |
| **Daily Leaderboard** | Medium | Double XP comeback |

---

# PART 2 — COGNITIVE & PSYCHOLOGICAL DESIGN

## A. Adaptive Difficulty Engine (ADE)

### The Flow Optimization Algorithm

```python
class AdaptiveDifficultyEngine:
    """Keeps users in flow state (65-75% accuracy)"""
    
    FLOW_FLOOR = 0.60      # Below: frustrated
    FLOW_CEILING = 0.80    # Above: bored
    
    def get_next_question(self, user, question_pool):
        # Calculate target difficulty based on recent performance
        recent_accuracy = self.get_ewma_accuracy(window=10)
        
        if recent_accuracy > self.FLOW_CEILING:
            # User crushing it — increase challenge
            target = min(1.0, user.skill_level + 0.15)
        elif recent_accuracy < self.FLOW_FLOOR:
            # User struggling — reduce challenge
            target = max(0.1, user.skill_level - 0.15)
        else:
            # User in flow — maintain
            target = user.skill_level
        
        # Check confidence recovery needs
        if user.confidence_index < 0.3:
            return self.get_confidence_booster(question_pool)
        
        return self.select_optimal_question(question_pool, target)
    
    def get_confidence_booster(self, pool):
        """When confidence low, serve easier fascinating question"""
        return pool.filter(
            category__in=user.strong_categories,
            difficulty__lt=user.skill_level - 0.2,
            fascination_score__gt=0.8
        ).random()
```

## B. Dopamine & Insight Engine

### The Insight Rule
> **"Every question must contain a fact worth sharing at dinner."**

### Question Engineering Formula

```
GREAT QUESTION = (HOOK) + (UNKNOWN) + (EXPLANATION)

✗ BAD:  "What is the largest country in Africa by area?"
✓ GOOD: "Which African country is so big, you could fit 
         France, Spain, Portugal, AND Germany inside it?"
```

### Explanation Writing (SLAM Framework)

| Component | Purpose | Example |
|-----------|---------|---------|
| **S**urprise | Hook attention | "Wait, it's not Egypt?" |
| **L**ink | Connect to known | "Bigger than Texas + California combined" |
| **A**mplify | Add drama | "You could fit 2 Germanys inside!" |
| **M**emory | Stick in brain | "A for Algeria, A for Africa's largest" |

## C. Anti-Burnout Design

### Session Length Control

| Milestone | Message | Options |
|-----------|---------|---------|
| Question 5 | "Quick 5! Already learned 5 things" | Keep going |
| Question 10 | "10 FACTS COLLECTED! 🎓" | Continue to Expert |
| Question 15 | "EXPERT ROUND COMPLETE!" | Done / Legendary Round |
| Question 25 | "🏆 LEGENDARY STATUS!" | Celebrate & Exit |

---

# PART 3 — CONTENT ARCHITECTURE

## A. Primary Mode — CONTINENT QUEST

### 7 Main Continents with Sub-Categories

| Sub-Category | Purpose | Engagement Driver |
|--------------|---------|-------------------|
| **Geography** | Physical features, countries | Foundation |
| **Culture** | Traditions, festivals, food | Emotional connection |
| **History** | Key events, civilizations | Story-driven |
| **Economy** | Trade, innovation | Real-world relevance |
| **Nature & Wildlife** | Animals, ecosystems | Visual delight |
| **Politics** | Government (neutral, factual) | Adult engagement |
| **Weird & Fascinating** | Unusual facts, mysteries | Viral potential |

### Content Volume (MVP)

| Continent | Questions | Priority | Reason |
|-----------|-----------|----------|--------|
| 🌏 ASIA | 1,200 | 1 | India-first market |
| 🦁 AFRICA | 600 | 2 | Underexplored, high WoW |
| 🇪🇺 EUROPE | 800 | 3 | Aspirational, historical |
| 🌎 N. AMERICA | 500 | 4 | Pop culture relevance |
| 🌎 S. AMERICA | 400 | 5 | Nature, mystery heavy |
| 🦘 AUSTRALIA | 350 | 6 | Unique wildlife |
| 🐧 ANTARCTICA | 150 | 7 | Exclusive, mystery |
| **TOTAL MVP** | **4,000** | - | - |

## B. Secondary High-Retention Categories

| Category | Hook | Viral Factor |
|----------|------|--------------|
| 🦁 Animals & Nature | Universal appeal | 🔥🔥🔥🔥🔥 |
| 🍕 Food & Origins | Daily relevance | 🔥🔥🔥🔥 |
| 🔬 Science Magic | Wonder, impossibility | 🔥🔥🔥🔥 |
| 🔮 World Mysteries | Unsolved intrigue | 🔥🔥🔥🔥🔥 |
| 🇮🇳 India Special | National pride + exam | 🔥🔥🔥🔥 |
| 🇺🇸 USA Special | Global pop culture | 🔥🔥🔥 |
| 📚 Competitive Exam Lite | Career relevance | 🔥🔥 |

---

# PART 4 — UI/UX & INTERACTION DESIGN

## A. Home Screen — Bento Grid Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🌅 GOOD MORNING, USER!                        🔔  👤      │
│  "Today's mystery: Why do no rivers flow OUT of the sea?" │
├────────────────────────────┬────────────────────────────────┤
│   🔥 DAILY CHALLENGE       │   🏆 YOUR STREAK              │
│   ⏱️ 23:47:12 remaining    │   🔥🔥🔥🔥🔥🔥🔥              │
│   5 Questions • +100 XP    │   47 DAYS "Unstoppable!"      │
│   [ START CHALLENGE ]      │   53 to Platinum              │
├────────────────────────────┴────────────────────────────────┤
│   🌍 EXPLORE THE WORLD                                      │
│   [ASIA 32%] [AFRICA 80%] [EUROPE 65%] [AMERICAS 28%]      │
│   [ VIEW WORLD MAP ]                                        │
├──────────────────────┬──────────────────────────────────────┤
│  ⚔️ FRIEND DUELS     │  💡 TODAY'S DISCOVERY               │
│  3 Challenges        │  "Honey never spoils. 3000-year-old │
│  waiting!            │   honey found in Egyptian tombs —   │
│  [ BATTLE NOW ]      │   still edible!"                    │
├──────────────────────┴──────────────────────────────────────┤
│   📊 GLOBAL LEADERBOARD • #4,823 of 127,459 • ▲234 today   │
├─────────────────────────────────────────────────────────────┤
│     🏠        🌍        📊        🏆        👤              │
│    Home      Map     Progress  Rewards   Profile            │
└─────────────────────────────────────────────────────────────┘
```

## B. Living World Map

### Interaction Design
- **Idle**: Globe slowly rotates, completed continents glow gold
- **Hover/Tap**: Continent lifts with 3D effect, progress ring appears
- **Transition**: Camera zooms in, parallax layers reveal category cards

### Haptic Feedback
- Light tap: Hover state (iOS) / 20ms vibrate (Android)
- Medium tap: Selection (iOS) / 50ms vibrate (Android)

## C. Question Experience Flow

### Phase Timeline
1. **Anticipation** (0-300ms): Shimmer loading effect
2. **Reveal** (300-600ms): Question types in, options stagger-fade
3. **Selection**: Highlighted option scales up
4. **Feedback**: Correct = green pulse + confetti | Wrong = gentle "Now you know..."

### Celebration Tiers
| Tier | Trigger | Animation |
|------|---------|-----------|
| 1 | Every correct | Green pulse, +XP float |
| 2 | 5/10/15 streak | Confetti burst, banner |
| 3 | Session complete | Stars fly in, summary |
| 4 | Major milestone | Full takeover, badge spin |

## D. Age Adaptation

### Kids Mode (< 16)
- Font: 20px base, 1.6 line height
- Emojis on answer options
- Warmer, brighter colors
- Playful mascot guide

### Adult Mode (16+)
- Font: 16px base, 1.4 line height
- Text-only options (cleaner)
- Sophisticated dark mode
- Subtle gradients

---

# PART 5 — SAMPLE CONTENT (14 MASTERPIECE QUESTIONS)

## 🌏 ASIA — Question 1

**Hook:** *Which country has a village where EVERYONE can whistle their conversations?*

**Options:** A) Japan | B) Nepal | C) Turkey ✓ | D) Philippines

**Explanation:** In Kuşköy, Turkey, people use "kuş dili" (bird language) — a whistling system that travels 2 MILES across mountain valleys! UNESCO heritage. Farmers whistle "Come home for dinner" across hillsides. 🐦

---

## 🌏 ASIA — Question 2

**Hook:** *There's an island in India where a tribe kills anyone who approaches. The government made it ILLEGAL to go there. Which island?*

**Options:** A) Lakshadweep | B) North Sentinel Island ✓ | C) Port Blair | D) Nicobar

**Explanation:** The Sentinelese have rejected ALL contact for 60,000 years. They attack helicopters with arrows! After 2004 tsunami, Navy chopper checking on them was shot at. Most isolated humans on Earth. 🏝️

---

## 🦁 AFRICA — Question 1

**Hook:** *Which African lake is so toxic it turns dead animals into stone statues?*

**Options:** A) Lake Victoria | B) Lake Tanganyika | C) Lake Natron ✓ | D) Lake Malawi

**Explanation:** Lake Natron (pH 10.5 — like ammonia!) calcifies dead birds into eerie statues. Photographer Nick Brandt found them frozen mid-flight. Yet flamingos THRIVE here — toxicity keeps predators away! 💀

---

## 🦁 AFRICA — Question 2

**Hook:** *Africa has a "Door of No Return" — what is it?*

**Options:** A) Prison gate | B) Last door slaves walked through before ships ✓ | C) Tomb entrance | D) Dangerous cave

**Explanation:** On Gorée Island, Senegal, captured Africans walked through this door onto ships for 300+ years. Today visitors worldwide stand there and weep. Presidents trace their ancestors' final steps. UNESCO site. 🚪

---

## 🇪🇺 EUROPE — Question 1

**Hook:** *Which European country has MORE castles per square mile than any other on Earth?*

**Options:** A) France | B) Wales ✓ | C) Germany | D) Scotland

**Explanation:** Wales has 600+ standing castles! English kings built them to control Welsh; Welsh princes built to resist. You can't drive 20 minutes without seeing one. Some towns have TWO! 🏰

---

## 🇪🇺 EUROPE — Question 2

**Hook:** *Norway has given London a Christmas tree EVERY year since 1947. Why?*

**Options:** A) Tourism deal | B) WWII gratitude ✓ | C) Viking tradition | D) Royal request

**Explanation:** Every December, Norway sends a 70-80ft spruce to Trafalgar Square — thanking Britain for WWII support. 75+ years and Norway STILL hasn't forgotten. That's what gratitude looks like. 🎄

---

## 🌎 NORTH AMERICA — Question 1

**Hook:** *The US bought Alaska from Russia in 1867. How much per acre?*

**Options:** A) $10 | B) $1 | C) $0.02 (2 cents) ✓ | D) $100

**Explanation:** $7.2 million total — 2 CENTS per acre! Critics called it "Seward's Folly." Then: Gold Rush (1896), then OIL (billions of barrels). Alaska's oil industry has generated $180+ BILLION. Greatest deal ever? 💰

---

## 🌎 NORTH AMERICA — Question 2

**Hook:** *If you walked Canada's coastline, how many YEARS would it take?*

**Options:** A) 3 years | B) 10 years | C) 33 years ✓ | D) 50+ years

**Explanation:** 202,080 km — longest coastline on Earth, touching 3 oceans! At 16 km/day = 33 YEARS. This equals 4x Earth's circumference. Indonesia is second with less than HALF! 🌊

---

## 🌎 SOUTH AMERICA — Question 1

**Hook:** *The Amazon River has how many bridges crossing it?*

**Options:** A) Over 50 | B) About 10 | C) Just 3 | D) ZERO ✓

**Explanation:** For 4,000 miles (longer than the USA!), ZERO bridges. Not impossible — just no roads to connect TO. Surrounding jungle too dense, population too sparse. In flood season it's 30 miles wide! 🌴

---

## 🌎 SOUTH AMERICA — Question 2

**Hook:** *Bolivia has a hotel made entirely of salt — even the beds. Why doesn't it dissolve?*

**Options:** A) Protective coating | B) Almost never rains there ✓ | C) Waterproof salt | D) Rebuilt yearly

**Explanation:** Palacio de Sal sits on Salar de Uyuni — world's largest salt flat. Less than 3 inches rain per YEAR. Made from 1 million salt blocks. Actual rule: "Please don't lick the walls." 🧂

---

## 🦘 AUSTRALIA — Question 1

**Hook:** *Australia has a lake that's naturally BUBBLEGUM PINK year-round. Why?*

**Options:** A) Sunset reflection | B) Algae and bacteria ✓ | C) Minerals | D) Flamingo waste

**Explanation:** Lake Hillier's pink color comes from unique algae + bacteria in super-salty water. Unlike other pink lakes, it stays pink even in a glass! Scientists still aren't 100% sure of the exact cause. 💗

---

## 🦘 AUSTRALIA — Question 2

**Hook:** *Australia has a fence so long you could stretch it from NYC to LA... TWICE. What's it keeping out?*

**Options:** A) Kangaroos | B) Dingoes ✓ | C) Emus | D) Rabbits

**Explanation:** The Dingo Fence is 5,614 km — world's longest fence! Built to protect sheep from wild dingoes. It has its own patrol officers and repair crews. One of the longest structures humans ever made! 🐕

---

## 🐧 ANTARCTICA — Question 1

**Hook:** *Antarctica is the only continent where you literally CANNOT catch a common cold. Why?*

**Options:** A) Too cold for viruses | B) No common cold viruses exist there ✓ | C) Special immunity | D) Filtered air

**Explanation:** Cold viruses need human hosts to survive. Antarctica's isolation means no infected humans bring viruses. Scientists arriving after winter actually catch colds when relief crews arrive — they bring fresh germs! 🦠

---

## 🐧 ANTARCTICA — Question 2

**Hook:** *Antarctica has a waterfall that looks like it's bleeding. What causes Blood Falls?*

**Options:** A) Volcanic activity | B) Iron-rich ancient water ✓ | C) Red algae | D) Rust deposits

**Explanation:** Blood Falls flows from water trapped under a glacier for 2 MILLION years! The water is so iron-rich that when it hits oxygen, it "rusts" instantly — creating a blood-red waterfall on white ice. 🩸

---

# PART 6 — GAMIFICATION & PROGRESSION

## Progression System

### XP & Levels
```
Level 1-10:   Novice Explorer      (500 XP each)
Level 11-25:  Knowledge Seeker     (1,000 XP each)
Level 26-50:  World Traveler       (2,000 XP each)
Level 51-75:  Master Scholar       (3,500 XP each)
Level 76-99:  Global Sage          (5,000 XP each)
Level 100:    Legendary Mind       (One-time achievement)
```

### Streak Milestones
| Days | Badge | Reward |
|------|-------|--------|
| 7 | Bronze Flame | 1 Streak Freeze |
| 30 | Silver Flame | 2 Streak Freezes + Badge |
| 100 | Gold Flame | Special Avatar Frame |
| 365 | Diamond Flame | "Year of Wisdom" Title |

### Mastery Badges (Per Continent)
- **25%**: Explorer Badge
- **50%**: Discoverer Badge
- **75%**: Expert Badge
- **100%**: Master Badge + Special Artifact

## Prestige System — Digital Artifacts

Collectible items earned through continental mastery:

| Continent | 100% Artifact | Description |
|-----------|---------------|-------------|
| Asia | Jade Dragon | Animated dragon coils around profile |
| Africa | Golden Mask | Traditional mask with particle effects |
| Europe | Crown Jewels | Sparkling crown for avatar |
| N. America | Eagle Feather | Majestic animated feather |
| S. America | Jungle Totem | Glowing ancient totem |
| Australia | Dreamtime Spirit | Aboriginal art animation |
| Antarctica | Ice Crystal | Shimmering crystal effect |

**Complete all 7**: Unlock **"Orb of Knowledge"** — animated globe orbiting profile

---

# PART 7 — VIRAL GROWTH ENGINE

## A. Social Duels

### Challenge Flow
1. User taps "Challenge a Friend"
2. Selects continent/category
3. Generates shareable link (WhatsApp, SMS, copy)
4. Friend opens → 60-second lightning round
5. Real-time score comparison
6. Winner gets XP bonus, loser gets "revenge match" option

### Stakes System
- **Casual**: Just for fun, no stakes
- **XP Wager**: Winner takes 50 XP from loser
- **Streak Shield**: Winner steals loser's streak protection

## B. Shareable Moments

### Auto-Generated Share Cards
```
┌─────────────────────────────────────┐
│  🌍 GLOBAL QUEST                    │
│                                     │
│  VISHAL just conquered AFRICA! 🦁   │
│                                     │
│  ████████████████████████ 100%     │
│                                     │
│  "Smarter than 94% of players"      │
│                                     │
│  Can you beat this? 👇              │
│  [globalquest.app/challenge/xyz]    │
└─────────────────────────────────────┘
```

### Trigger Moments
- Streak milestones (7, 30, 100 days)
- Continental mastery (25/50/75/100%)
- Leaderboard jumps (top 10%, top 1%)
- Duel victories
- "Mind-blowing fact" discoveries

## C. India-Specific Growth Strategy

### Target Segments
1. **UPSC/SSC Aspirants** (5M+ active)
   - "Competitive Exam Lite" mode
   - Daily UPSC-style questions
   - Leaderboard by exam type

2. **College Students** (30M+)
   - Inter-college competitions
   - Campus ambassador program
   - WhatsApp group challenges

3. **Regional Pride**
   - State-vs-State leaderboards
   - "Represent Your State" campaigns
   - Local language support (Hindi, Tamil, Telugu, Bengali)

### Viral Hooks
- "Delhi vs Mumbai: Which city knows more?"
- "Are you smarter than an UPSC topper?"
- "Your General Knowledge IQ is ___"

---

# PART 8 — MONETIZATION (NON-INTRUSIVE)

## Revenue Streams

### 1. Rewarded Ads
- **Trigger**: After milestone completion (not mid-question)
- **Reward**: +50 XP, 1 hint, streak freeze
- **Frequency**: Max 3 per session
- **User control**: "Watch ad for reward" (optional)

### 2. Premium Subscription ($2.99/month India, $4.99/month global)
- Ad-free experience
- Unlimited streak freezes
- Exclusive continental artifacts
- Early access to new content
- Detailed analytics dashboard

### 3. Cosmetics (One-time purchases $0.99-$4.99)
- Avatar frames
- Profile themes
- Celebration animations
- Custom titles

### 4. Future: Sponsored Quizzes
- Brand-sponsored question packs
- Example: "Space Quiz by ISRO"
- Clearly labeled, opt-in only

---

# PART 9 — TECHNICAL ARCHITECTURE

## A. Frontend — React Native (Recommended)

### Why React Native over Flutter:
| Factor | React Native | Flutter |
|--------|--------------|---------|
| Developer pool | Larger (especially India) | Growing |
| JS ecosystem | Full access | Limited |
| Hot reload | Excellent | Excellent |
| Native feel | Very good | Excellent |
| Bundle size | ~25MB | ~15MB |

**Decision**: React Native for faster hiring and JS ecosystem access.

### Key Libraries
- **Navigation**: React Navigation 6
- **State**: Zustand (lightweight) + React Query (server)
- **Animations**: Reanimated 3 + Lottie
- **UI**: Custom design system (no UI kit)
- **Maps**: react-native-maps + custom SVG overlays

## B. Backend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND SERVICES                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   API       │  │  Question   │  │   User      │         │
│  │  Gateway    │──│  Service    │  │  Service    │         │
│  │  (FastAPI)  │  │  (Python)   │  │  (Python)   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│         │                │                │                  │
│         └────────────────┼────────────────┘                  │
│                          │                                   │
│                   ┌──────┴──────┐                           │
│                   │  PostgreSQL │                           │
│                   │  + Redis    │                           │
│                   └─────────────┘                           │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Leaderboard │  │   Duel      │  │    AI       │         │
│  │  Service    │  │  Service    │  │  Content    │         │
│  │  (Redis)    │  │ (WebSocket) │  │  Generator  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema (Core)
```sql
-- Users
users (id, email, name, avatar_url, created_at, settings_json)

-- Progress
user_progress (user_id, continent, category, questions_answered, 
               correct_count, mastery_percentage)

-- Streaks
user_streaks (user_id, current_streak, longest_streak, 
              last_activity_date, freeze_count)

-- Questions
questions (id, continent, category, difficulty, hook_text, 
           options_json, correct_answer, explanation, 
           visual_instruction, fascination_score)

-- User Question History
user_answers (user_id, question_id, answer, is_correct, 
              time_taken_ms, answered_at)
```

## C. AI Integration (Claude Opus API)

### Daily Content Generation Pipeline
```python
async def generate_daily_questions():
    """Generate 50 new questions daily using Claude"""
    
    prompt = """
    Generate 5 Global Quest questions for {continent} - {category}.
    
    Requirements:
    1. Hook must create curiosity gap
    2. Answer should surprise 70%+ of adults
    3. Explanation must be shareable at dinner
    4. Include visual instruction for animation
    
    Format: [structured JSON output]
    """
    
    # Generate with Claude Opus
    response = await claude.generate(prompt)
    questions = parse_questions(response)
    
    # Quality checks
    for q in questions:
        # Duplicate check (semantic similarity)
        if await is_duplicate(q):
            continue
        
        # Accuracy verification (fact-check API)
        if not await verify_fact(q):
            flag_for_review(q)
            continue
        
        # Fascination score (engagement prediction)
        q.fascination_score = await score_fascination(q)
        
        await save_question(q)
```

### Duplicate Prevention
- Semantic similarity check (embeddings comparison)
- Key entity extraction + exact match
- Hook pattern deduplication

## D. Performance Requirements

| Metric | Target |
|--------|--------|
| App size | < 50MB (download) |
| Cold start | < 2 seconds |
| Question load | < 200ms |
| Animation FPS | 60fps constant |
| Offline support | Last 50 questions cached |
| Battery | < 3% per 15-min session |

### Animation Strategy
- **Lottie**: Celebration effects, badges
- **Rive**: Interactive map, complex state machines
- **Reanimated**: UI transitions, micro-interactions

---

# PART 10 — MVP → SCALE ROADMAP

## Phase 1: 30-Day MVP

### Scope
- [ ] 1 continent fully populated (Asia — 500 questions)
- [ ] Core quiz flow (question → answer → explanation)
- [ ] Basic progression (XP, levels)
- [ ] Simple streak tracking
- [ ] Daily challenge (5 questions)
- [ ] Basic leaderboard (global)
- [ ] Profile page

### Tech Stack
- React Native (Expo for speed)
- Supabase (auth + database + realtime)
- Lottie (basic celebrations)

### Team
- 1 Full-stack developer
- 1 Mobile developer
- 1 Content writer (AI-assisted)

---

## Phase 2: 60-Day Growth Version

### New Features
- [ ] All 7 continents (4,000+ questions)
- [ ] Interactive world map
- [ ] Social duels (link-based)
- [ ] Share cards (auto-generated)
- [ ] Push notifications (daily hooks)
- [ ] India Special category
- [ ] Rewarded ads integration

### Growth Targets
- 100K downloads
- 30K DAU
- 40% D7 retention

---

## Phase 3: 6-Month Scale Vision

### Features
- [ ] Real-time multiplayer duels
- [ ] Team/friends leaderboards
- [ ] Premium subscription
- [ ] Regional language support (5 languages)
- [ ] Campus competitions
- [ ] Brand-sponsored quizzes
- [ ] AI-personalized learning paths

### Growth Targets
- 1M+ downloads
- 200K DAU
- 25% D30 retention
- $50K MRR

---

# APPENDIX A — DESIGN TOKENS

```css
/* Colors */
--primary: #6366F1;        /* Indigo — knowledge, wisdom */
--secondary: #F59E0B;      /* Amber — achievement, warmth */
--success: #10B981;        /* Emerald — correct, growth */
--error: #EF4444;          /* Red — gentle error (not harsh) */
--background: #0F172A;     /* Slate 900 — premium dark */
--surface: #1E293B;        /* Slate 800 — cards */
--text-primary: #F8FAFC;   /* Slate 50 */
--text-secondary: #94A3B8; /* Slate 400 */

/* Typography */
--font-display: 'Outfit', sans-serif;
--font-body: 'Inter', sans-serif;
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
--font-size-2xl: 24px;
--font-size-3xl: 30px;

/* Spacing */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;

/* Borders */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
--shadow-md: 0 4px 6px rgba(0,0,0,0.3);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.4);
```

---

# APPENDIX B — SUCCESS METRICS

## North Star Metric
**Weekly Active Learners (WAL)**: Users who complete ≥3 sessions per week

## Supporting Metrics

| Category | Metric | Target (Month 3) |
|----------|--------|------------------|
| Acquisition | Downloads | 500K |
| Activation | D1 Retention | 60% |
| Retention | D7 Retention | 40% |
| Retention | D30 Retention | 20% |
| Engagement | Avg. Session Length | 8 min |
| Engagement | Questions/Session | 12 |
| Viral | Invite Conversion | 15% |
| Revenue | Premium Conversion | 3% |

---

*Document Version: 1.0*
*Created: January 2026*
*Author: Global Quest Product Team*
