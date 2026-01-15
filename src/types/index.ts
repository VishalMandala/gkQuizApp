/**
 * Global Quest - Type Definitions
 * Core TypeScript types for the application
 */

// ============================================================================
// USER TYPES
// ============================================================================

export type AgeGroup = 'KID' | 'TEEN' | 'ADULT';

export interface User {
    id: string;
    email?: string;
    phone?: string;
    name: string;
    avatarUrl?: string;
    ageGroup: AgeGroup;
    country: string;
    language: string;
    settings: UserSettings;
    createdAt: Date;
    lastActiveAt: Date;
}

export interface UserSettings {
    notifications: {
        dailyReminder: boolean;
        reminderTime: string; // "09:00"
        streakAlerts: boolean;
        duelChallenges: boolean;
    };
    sound: {
        enabled: boolean;
        volume: number; // 0-1
    };
    haptics: boolean;
    theme: 'dark' | 'light' | 'system';
    fontSize: 'small' | 'medium' | 'large';
}

// ============================================================================
// PROGRESSION TYPES
// ============================================================================

export interface UserProgress {
    id: string;
    userId: string;
    continent: Continent;
    category: Category;
    questionsAnswered: number;
    correctAnswers: number;
    masteryPercentage: number;
    skillLevel: number;
    confidenceIndex: number;
    lastPlayedAt?: Date;
}

export interface UserStreak {
    currentStreak: number;
    longestStreak: number;
    lastActivityDate?: Date;
    freezesAvailable: number;
    shieldsAvailable: number;
}

export interface UserXP {
    totalXP: number;
    currentLevel: number;
    xpToNextLevel: number;
    dailyXPEarned: number;
    weeklyXPEarned: number;
}

export interface LevelInfo {
    level: number;
    title: string;
    minXP: number;
    maxXP: number;
}

export const LEVEL_TIERS: LevelInfo[] = [
    // Novice Explorer (1-10)
    { level: 1, title: 'Novice Explorer', minXP: 0, maxXP: 500 },
    { level: 10, title: 'Novice Explorer', minXP: 4500, maxXP: 5000 },
    // Knowledge Seeker (11-25)
    { level: 11, title: 'Knowledge Seeker', minXP: 5000, maxXP: 6000 },
    { level: 25, title: 'Knowledge Seeker', minXP: 19000, maxXP: 20000 },
    // World Traveler (26-50)
    { level: 26, title: 'World Traveler', minXP: 20000, maxXP: 22000 },
    { level: 50, title: 'World Traveler', minXP: 68000, maxXP: 70000 },
    // Master Scholar (51-75)
    { level: 51, title: 'Master Scholar', minXP: 70000, maxXP: 73500 },
    { level: 75, title: 'Master Scholar', minXP: 153500, maxXP: 157000 },
    // Global Sage (76-99)
    { level: 76, title: 'Global Sage', minXP: 157000, maxXP: 162000 },
    { level: 99, title: 'Global Sage', minXP: 272000, maxXP: 277000 },
    // Legendary Mind (100)
    { level: 100, title: 'Legendary Mind', minXP: 277000, maxXP: Infinity },
];

// ============================================================================
// CONTENT TYPES
// ============================================================================

export type Continent =
    | 'ASIA'
    | 'AFRICA'
    | 'EUROPE'
    | 'NORTH_AMERICA'
    | 'SOUTH_AMERICA'
    | 'AUSTRALIA_OCEANIA'
    | 'ANTARCTICA';

export type Category =
    // Primary categories
    | 'GEOGRAPHY'
    | 'CULTURE'
    | 'HISTORY'
    | 'ECONOMY'
    | 'NATURE_WILDLIFE'
    | 'POLITICS'
    | 'WEIRD_FASCINATING'
    // Secondary categories
    | 'ANIMALS_NATURE'
    | 'FOOD_ORIGINS'
    | 'SCIENCE_MAGIC'
    | 'WORLD_MYSTERIES'
    | 'INDIA_SPECIAL'
    | 'USA_SPECIAL'
    | 'COMPETITIVE_EXAM';

export interface ContinentInfo {
    id: Continent;
    name: string;
    emoji: string;
    color: string;
    description: string;
    totalQuestions: number;
}

export const CONTINENTS: Record<Continent, ContinentInfo> = {
    ASIA: {
        id: 'ASIA',
        name: 'Asia',
        emoji: '🌏',
        color: '#F472B6',
        description: 'The largest continent with ancient civilizations',
        totalQuestions: 1200,
    },
    AFRICA: {
        id: 'AFRICA',
        name: 'Africa',
        emoji: '🦁',
        color: '#FBBF24',
        description: 'The cradle of humanity and wildlife paradise',
        totalQuestions: 600,
    },
    EUROPE: {
        id: 'EUROPE',
        name: 'Europe',
        emoji: '🏰',
        color: '#60A5FA',
        description: 'Centuries of history and cultural treasures',
        totalQuestions: 800,
    },
    NORTH_AMERICA: {
        id: 'NORTH_AMERICA',
        name: 'North America',
        emoji: '🗽',
        color: '#34D399',
        description: 'From arctic tundra to tropical beaches',
        totalQuestions: 500,
    },
    SOUTH_AMERICA: {
        id: 'SOUTH_AMERICA',
        name: 'South America',
        emoji: '🌎',
        color: '#A78BFA',
        description: 'Rainforests, mysteries, and ancient empires',
        totalQuestions: 400,
    },
    AUSTRALIA_OCEANIA: {
        id: 'AUSTRALIA_OCEANIA',
        name: 'Australia & Oceania',
        emoji: '🦘',
        color: '#FB923C',
        description: 'Unique wildlife and island wonders',
        totalQuestions: 350,
    },
    ANTARCTICA: {
        id: 'ANTARCTICA',
        name: 'Antarctica',
        emoji: '🐧',
        color: '#67E8F9',
        description: 'The frozen frontier of mysteries',
        totalQuestions: 150,
    },
};

// ============================================================================
// QUESTION TYPES
// ============================================================================

export interface QuestionOption {
    id: 'a' | 'b' | 'c' | 'd';
    text: string;
}

export interface Question {
    id: string;
    continent: Continent;
    category: Category;
    subCategory?: string;
    difficulty: number; // 0-1
    fascinationScore: number; // 0-1
    hookText: string;
    options: QuestionOption[];
    correctAnswer: 'a' | 'b' | 'c' | 'd';
    explanation: string;
    explanationShort?: string;
    visualInstruction?: string;
    imageUrl?: string;
    source?: string;
}

export interface UserAnswer {
    id: string;
    userId: string;
    questionId: string;
    selectedAnswer: 'a' | 'b' | 'c' | 'd';
    isCorrect: boolean;
    timeTakenMs: number;
    context: AnswerContext;
    answeredAt: Date;
}

export type AnswerContext =
    | 'FREE_PLAY'
    | 'DAILY_CHALLENGE'
    | 'DUEL'
    | 'REVIEW'
    | 'CONTINENT_QUEST';

// ============================================================================
// SESSION TYPES
// ============================================================================

export interface QuizSession {
    id: string;
    userId: string;
    continent?: Continent;
    category?: Category;
    context: AnswerContext;
    questions: Question[];
    currentIndex: number;
    answers: SessionAnswer[];
    startedAt: Date;
    completedAt?: Date;
}

export interface SessionAnswer {
    questionId: string;
    selectedAnswer: 'a' | 'b' | 'c' | 'd';
    isCorrect: boolean;
    timeTakenMs: number;
}

export interface SessionResult {
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    xpEarned: number;
    bonusXP: number;
    streakMaintained: boolean;
    newAchievements: Achievement[];
    masteryGain: Record<string, number>;
}

// ============================================================================
// DAILY CHALLENGE TYPES
// ============================================================================

export interface DailyChallenge {
    id: string;
    date: Date;
    questions: Question[];
    isCompleted: boolean;
    questionsAnswered: number;
    correctAnswers: number;
    xpEarned: number;
    timeRemaining: number; // seconds until expiry
}

// ============================================================================
// DUEL TYPES
// ============================================================================

export type DuelStakeType = 'CASUAL' | 'XP_WAGER' | 'STREAK_SHIELD';
export type DuelStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'CANCELLED';

export interface Duel {
    id: string;
    challengerId: string;
    challengerName: string;
    challengerAvatar?: string;
    opponentId?: string;
    opponentName?: string;
    opponentAvatar?: string;
    continent?: Continent;
    category?: Category;
    questionCount: number;
    timeLimitSeconds: number;
    stakeType: DuelStakeType;
    xpWager: number;
    challengerScore: number;
    opponentScore: number;
    status: DuelStatus;
    shareCode: string;
    expiresAt: Date;
    createdAt: Date;
}

export interface DuelInvite {
    shareCode: string;
    challengerName: string;
    challengerAvatar?: string;
    continent?: Continent;
    category?: Category;
    stakeType: DuelStakeType;
    xpWager: number;
    expiresAt: Date;
}

// ============================================================================
// ACHIEVEMENT & ARTIFACT TYPES
// ============================================================================

export type AchievementType =
    | 'STREAK_DAYS'
    | 'CONTINENT_MASTERY'
    | 'CATEGORY_MASTERY'
    | 'QUESTIONS_ANSWERED'
    | 'CORRECT_STREAK'
    | 'DUELS_WON'
    | 'LEVEL_REACHED';

export interface Achievement {
    id: string;
    code: string;
    name: string;
    description: string;
    iconUrl?: string;
    requirementType: AchievementType;
    requirementValue: number;
    continent?: Continent;
    category?: Category;
    xpReward: number;
    isUnlocked: boolean;
    currentProgress: number;
    unlockedAt?: Date;
}

export type ArtifactRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export interface Artifact {
    id: string;
    code: string;
    name: string;
    description: string;
    imageUrl: string;
    animationUrl?: string;
    rarity: ArtifactRarity;
    continent?: Continent;
    requirement?: string;
    isOwned: boolean;
    isEquipped: boolean;
    earnedAt?: Date;
}

// ============================================================================
// LEADERBOARD TYPES
// ============================================================================

export type LeaderboardType = 'GLOBAL' | 'COUNTRY' | 'CONTINENT' | 'FRIENDS';
export type LeaderboardPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME';

export interface LeaderboardEntry {
    rank: number;
    userId: string;
    userName: string;
    userAvatar?: string;
    score: number;
    level: number;
    isCurrentUser: boolean;
}

export interface Leaderboard {
    type: LeaderboardType;
    period: LeaderboardPeriod;
    scope?: string;
    entries: LeaderboardEntry[];
    userRank?: number;
    totalParticipants: number;
}

// ============================================================================
// DAILY DISCOVERY TYPES
// ============================================================================

export interface DailyDiscovery {
    id: string;
    date: Date;
    factText: string;
    factShort: string;
    source?: string;
    imageUrl?: string;
    continent?: Continent;
    category?: Category;
    isCollected: boolean;
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export type RootStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
    Auth: undefined;
    Main: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Map: undefined;
    Progress: undefined;
    Rewards: undefined;
    Profile: undefined;
};

export type HomeStackParamList = {
    HomeScreen: undefined;
    DailyChallenge: undefined;
    Quiz: {
        continent?: Continent;
        category?: Category;
        context: AnswerContext;
    };
    QuizResult: {
        sessionId: string;
    };
    Duel: {
        duelId: string;
    };
    DuelResult: {
        duelId: string;
    };
};

export type MapStackParamList = {
    WorldMap: undefined;
    ContinentDetail: {
        continent: Continent;
    };
    CategoryQuiz: {
        continent: Continent;
        category: Category;
    };
};

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
}

export interface PaginatedResponse<T> {
    items: T[];
    nextCursor?: string;
    hasMore: boolean;
    total: number;
}
