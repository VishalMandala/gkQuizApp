# Global Quest 🌍

> **Transform idle moments into mind-expanding adventures that make you the most interesting person in any room.**

A next-generation General Knowledge quiz app built as a "knowledge adventure game" — not a boring MCQ app!

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run in browser
npm run web
```

## 📁 Project Structure

```
GKApp/
├── App.tsx                 # Main entry point with navigation
├── src/
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.tsx     # Bento grid dashboard
│   │   ├── WorldMapScreen.tsx # Interactive continent map
│   │   └── QuestionScreen.tsx # Quiz experience
│   ├── theme/             # Design system
│   │   └── index.ts           # Colors, typography, spacing
│   ├── types/             # TypeScript definitions
│   │   └── index.ts           # All app types
│   └── data/              # Content & mock data
│       └── questions.ts       # Sample questions
├── prisma/
│   └── schema.prisma      # Database schema
├── docs/
│   └── PRODUCT_ARCHITECTURE.md  # Full product spec
└── assets/
    └── fonts/             # Custom fonts (Inter, Outfit)
```

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366F1) — Knowledge, wisdom
- **Secondary**: Amber (#F59E0B) — Achievement, warmth
- **Success**: Emerald (#10B981) — Correct answers
- **Background**: Slate 900 (#0F172A) — Premium dark mode

### Typography
- **Display**: Outfit — Headlines, big text
- **Body**: Inter — UI elements, paragraphs

## 📱 Features

### MVP (30 days)
- [ ] Core quiz flow with adaptive difficulty
- [ ] Daily Challenge (5 questions)
- [ ] Streak tracking
- [ ] World Map exploration
- [ ] Basic leaderboard
- [ ] 500+ questions (Asia focus)

### Growth (60 days)
- [ ] All 7 continents (4,000+ questions)
- [ ] Social duels via share links
- [ ] Push notifications
- [ ] India Special category
- [ ] Rewarded ads

### Scale (6 months)
- [ ] Real-time multiplayer
- [ ] Premium subscription
- [ ] 5 regional languages
- [ ] AI-generated daily content

## 🗄️ Database

Using Prisma with PostgreSQL. Key tables:
- `User` — Player profiles
- `Question` — Quiz content
- `UserProgress` — Per-continent mastery
- `UserStreak` — Streak tracking
- `Duel` — Social challenges
- `Achievement` — Badges & rewards

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Open Prisma Studio
npm run db:studio
```

## 🧠 Adaptive Difficulty Engine

The app keeps users in **flow state** (65-75% accuracy):
- Too many correct → Increase difficulty
- Too many wrong → Decrease difficulty + confidence boosters
- Fatigue detected → Easier, more engaging questions

## 📊 Key Metrics

| Metric | Target (Month 3) |
|--------|------------------|
| Downloads | 500K |
| D1 Retention | 60% |
| D7 Retention | 40% |
| D30 Retention | 20% |
| Avg Session | 8 min |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

Private — All rights reserved.

---

Built with ❤️ for curious minds everywhere.
