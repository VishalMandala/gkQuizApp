/**
 * Global Quest - Level System & Progression
 * Designed for scale to 100M users
 * 
 * Core Philosophy:
 * - Early levels are fast (hook users quickly)
 * - Mid levels provide steady progression
 * - Late levels are prestigious achievements
 * - Every 10 levels = major milestone
 */

import type { Continent } from '../types';

// ============================================================================
// LEVEL CONFIGURATION
// ============================================================================

export interface LevelConfig {
    level: number;
    title: string;
    xpRequired: number;        // Total XP to reach this level
    xpToNext: number;          // XP needed to advance to next level
    tier: LevelTier;
    badge: string;             // Emoji badge
    unlocks: LevelUnlock[];
    color: string;             // Theme color for this level range
}

export interface LevelUnlock {
    type: 'CONTINENT' | 'FEATURE' | 'MODE' | 'REWARD' | 'ARTIFACT' | 'TITLE';
    name: string;
    description: string;
    icon: string;
}

export type LevelTier =
    | 'NOVICE'      // 1-10
    | 'EXPLORER'    // 11-25
    | 'ADVENTURER'  // 26-40
    | 'SCHOLAR'     // 41-60
    | 'EXPERT'      // 61-80
    | 'MASTER'      // 81-95
    | 'LEGEND';     // 96-100

// ============================================================================
// XP CURVE FORMULA
// ============================================================================

/**
 * XP Curve Design:
 * - Levels 1-10: Quick (500-1500 XP each) - Hook phase
 * - Levels 11-25: Moderate (1500-3000 XP each) - Engagement phase
 * - Levels 26-50: Steady (3000-5000 XP each) - Habit phase
 * - Levels 51-75: Challenging (5000-8000 XP each) - Mastery phase
 * - Levels 76-100: Prestigious (8000-15000 XP each) - Legend phase
 */
export const calculateXPForLevel = (level: number): number => {
    if (level <= 1) return 0;
    if (level <= 10) return Math.floor(300 * level * 1.2);
    if (level <= 25) return Math.floor(800 * level * 1.15);
    if (level <= 50) return Math.floor(1500 * level * 1.1);
    if (level <= 75) return Math.floor(2500 * level * 1.08);
    return Math.floor(4000 * level * 1.05);
};

export const calculateTotalXPForLevel = (level: number): number => {
    let total = 0;
    for (let i = 1; i <= level; i++) {
        total += calculateXPForLevel(i);
    }
    return total;
};

// ============================================================================
// LEVEL TITLES
// ============================================================================

export const getLevelTitle = (level: number): string => {
    if (level <= 5) return 'Curious Mind';
    if (level <= 10) return 'Knowledge Seeker';
    if (level <= 15) return 'Globe Trotter';
    if (level <= 20) return 'Fact Finder';
    if (level <= 25) return 'World Explorer';
    if (level <= 30) return 'Culture Buff';
    if (level <= 35) return 'Trivia Ace';
    if (level <= 40) return 'Wisdom Hunter';
    if (level <= 45) return 'Enlightened One';
    if (level <= 50) return 'Grand Scholar';
    if (level <= 55) return 'Knowledge Keeper';
    if (level <= 60) return 'Master of Facts';
    if (level <= 65) return 'Sage';
    if (level <= 70) return 'World Authority';
    if (level <= 75) return 'Supreme Scholar';
    if (level <= 80) return 'Enlightened Master';
    if (level <= 85) return 'Oracle';
    if (level <= 90) return 'Grand Master';
    if (level <= 95) return 'Living Legend';
    if (level <= 99) return 'Mythical Mind';
    return 'Omniscient One'; // Level 100
};

export const getLevelTier = (level: number): LevelTier => {
    if (level <= 10) return 'NOVICE';
    if (level <= 25) return 'EXPLORER';
    if (level <= 40) return 'ADVENTURER';
    if (level <= 60) return 'SCHOLAR';
    if (level <= 80) return 'EXPERT';
    if (level <= 95) return 'MASTER';
    return 'LEGEND';
};

export const getTierColor = (tier: LevelTier): string => {
    switch (tier) {
        case 'NOVICE': return '#10B981';      // Green
        case 'EXPLORER': return '#3B82F6';    // Blue
        case 'ADVENTURER': return '#8B5CF6';  // Purple
        case 'SCHOLAR': return '#EC4899';     // Pink
        case 'EXPERT': return '#F59E0B';      // Orange
        case 'MASTER': return '#EF4444';      // Red
        case 'LEGEND': return '#FBBF24';      // Gold
    }
};

export const getTierBadge = (tier: LevelTier): string => {
    switch (tier) {
        case 'NOVICE': return '🌱';
        case 'EXPLORER': return '🧭';
        case 'ADVENTURER': return '⚔️';
        case 'SCHOLAR': return '📚';
        case 'EXPERT': return '🎓';
        case 'MASTER': return '👑';
        case 'LEGEND': return '⭐';
    }
};

// ============================================================================
// MILESTONE UNLOCKS
// ============================================================================

export const getMilestoneUnlocks = (level: number): LevelUnlock[] => {
    const unlocks: LevelUnlock[] = [];

    // Continent unlocks (early game)
    if (level === 1) {
        unlocks.push({
            type: 'CONTINENT',
            name: 'Africa & Europe',
            description: 'Your journey begins with two continents!',
            icon: '🌍',
        });
    }
    if (level === 5) {
        unlocks.push({
            type: 'CONTINENT',
            name: 'Asia',
            description: 'Explore the largest continent!',
            icon: '🌏',
        });
    }
    if (level === 10) {
        unlocks.push({
            type: 'CONTINENT',
            name: 'North America',
            description: 'Discover the Americas!',
            icon: '🗽',
        });
    }
    if (level === 15) {
        unlocks.push({
            type: 'CONTINENT',
            name: 'South America',
            description: 'Explore the Amazon and beyond!',
            icon: '🌴',
        });
    }
    if (level === 20) {
        unlocks.push({
            type: 'CONTINENT',
            name: 'Australia & Oceania',
            description: 'G\'day mate! Unlock Down Under!',
            icon: '🦘',
        });
    }
    if (level === 25) {
        unlocks.push({
            type: 'CONTINENT',
            name: 'Antarctica',
            description: 'The final frontier awaits!',
            icon: '🐧',
        });
    }

    // Feature unlocks (mid game)
    if (level === 8) {
        unlocks.push({
            type: 'FEATURE',
            name: 'Daily Challenges',
            description: 'Earn bonus XP with daily quests!',
            icon: '📅',
        });
    }
    if (level === 12) {
        unlocks.push({
            type: 'MODE',
            name: 'Timed Mode',
            description: 'Race against the clock!',
            icon: '⏱️',
        });
    }
    if (level === 18) {
        unlocks.push({
            type: 'MODE',
            name: 'Duel Mode',
            description: 'Challenge friends to knowledge battles!',
            icon: '⚔️',
        });
    }
    if (level === 30) {
        unlocks.push({
            type: 'FEATURE',
            name: 'Leaderboards',
            description: 'Compete with players worldwide!',
            icon: '🏆',
        });
    }
    if (level === 40) {
        unlocks.push({
            type: 'MODE',
            name: 'Expert Mode',
            description: 'Questions for true masters!',
            icon: '🎓',
        });
    }
    if (level === 50) {
        unlocks.push({
            type: 'FEATURE',
            name: 'Create Questions',
            description: 'Submit your own questions!',
            icon: '✍️',
        });
    }

    // Artifact unlocks (late game rewards)
    if (level === 35) {
        unlocks.push({
            type: 'ARTIFACT',
            name: 'Explorer\'s Compass',
            description: 'A rare artifact for true explorers',
            icon: '🧭',
        });
    }
    if (level === 55) {
        unlocks.push({
            type: 'ARTIFACT',
            name: 'Scholar\'s Tome',
            description: 'Ancient wisdom at your fingertips',
            icon: '📖',
        });
    }
    if (level === 75) {
        unlocks.push({
            type: 'ARTIFACT',
            name: 'Master\'s Crown',
            description: 'The crown of knowledge masters',
            icon: '👑',
        });
    }
    if (level === 100) {
        unlocks.push({
            type: 'ARTIFACT',
            name: 'Omniscient Orb',
            description: 'The ultimate artifact - you know everything!',
            icon: '🔮',
        });
    }

    // Title unlocks (prestige)
    if (level % 10 === 0) {
        unlocks.push({
            type: 'TITLE',
            name: getLevelTitle(level),
            description: `Achieved Level ${level}!`,
            icon: getTierBadge(getLevelTier(level)),
        });
    }

    return unlocks;
};

// ============================================================================
// CONTINENT MASTERY SYSTEM
// ============================================================================

export interface ContinentMastery {
    continent: Continent;
    name: string;
    emoji: string;
    questionsTotal: number;
    levels: ContinentMasteryLevel[];
}

export interface ContinentMasteryLevel {
    level: number;          // 1-5 mastery levels per continent
    name: string;
    questionsRequired: number;
    accuracyRequired: number; // Percentage
    reward: string;
    badge: string;
}

export const continentMasteryLevels: ContinentMasteryLevel[] = [
    { level: 1, name: 'Visitor', questionsRequired: 25, accuracyRequired: 50, reward: '+50 XP', badge: '🥉' },
    { level: 2, name: 'Explorer', questionsRequired: 75, accuracyRequired: 60, reward: '+150 XP', badge: '🥈' },
    { level: 3, name: 'Expert', questionsRequired: 150, accuracyRequired: 70, reward: '+300 XP + Artifact', badge: '🥇' },
    { level: 4, name: 'Master', questionsRequired: 300, accuracyRequired: 80, reward: '+500 XP + Title', badge: '🏆' },
    { level: 5, name: 'Legend', questionsRequired: 500, accuracyRequired: 90, reward: '+1000 XP + Exclusive Badge', badge: '⭐' },
];

export const continentMasteryData: ContinentMastery[] = [
    {
        continent: 'AFRICA',
        name: 'Africa',
        emoji: '🦁',
        questionsTotal: 500,
        levels: continentMasteryLevels,
    },
    {
        continent: 'ASIA',
        name: 'Asia',
        emoji: '🐼',
        questionsTotal: 500,
        levels: continentMasteryLevels,
    },
    {
        continent: 'EUROPE',
        name: 'Europe',
        emoji: '🏰',
        questionsTotal: 500,
        levels: continentMasteryLevels,
    },
    {
        continent: 'NORTH_AMERICA',
        name: 'North America',
        emoji: '🗽',
        questionsTotal: 500,
        levels: continentMasteryLevels,
    },
    {
        continent: 'SOUTH_AMERICA',
        name: 'South America',
        emoji: '🌴',
        questionsTotal: 500,
        levels: continentMasteryLevels,
    },
    {
        continent: 'AUSTRALIA_OCEANIA',
        name: 'Australia & Oceania',
        emoji: '🦘',
        questionsTotal: 500,
        levels: continentMasteryLevels,
    },
    {
        continent: 'ANTARCTICA',
        name: 'Antarctica',
        emoji: '🐧',
        questionsTotal: 500,
        levels: continentMasteryLevels,
    },
];

// ============================================================================
// QUESTION CATEGORIES
// ============================================================================

export interface QuestionCategory {
    id: string;
    name: string;
    emoji: string;
    description: string;
    subCategories: string[];
    color: string;
}

export const questionCategories: QuestionCategory[] = [
    {
        id: 'GEOGRAPHY',
        name: 'Geography & Landmarks',
        emoji: '🗺️',
        description: 'Mountains, rivers, capitals, and famous places',
        subCategories: ['Capitals', 'Mountains', 'Rivers', 'Lakes', 'Islands', 'Deserts', 'Landmarks', 'Borders'],
        color: '#3B82F6',
    },
    {
        id: 'NATURE_WILDLIFE',
        name: 'Nature & Wildlife',
        emoji: '🦁',
        description: 'Animals, plants, ecosystems, and natural wonders',
        subCategories: ['Mammals', 'Birds', 'Marine Life', 'Insects', 'Endangered Species', 'National Parks', 'Ecosystems'],
        color: '#10B981',
    },
    {
        id: 'SPORTS',
        name: 'Sports & Olympics',
        emoji: '⚽',
        description: 'World cups, Olympics, athletes, and sports records',
        subCategories: ['Football/Soccer', 'Olympics', 'Cricket', 'Tennis', 'Basketball', 'Athletics', 'Swimming', 'Records'],
        color: '#EF4444',
    },
    {
        id: 'FOOD',
        name: 'Food & Cuisine',
        emoji: '🍕',
        description: 'National dishes, ingredients, and food culture',
        subCategories: ['National Dishes', 'Street Food', 'Ingredients', 'Drinks', 'Desserts', 'Food Origins'],
        color: '#F59E0B',
    },
    {
        id: 'MUSIC_ARTS',
        name: 'Music & Arts',
        emoji: '🎵',
        description: 'Instruments, artists, genres, and cultural arts',
        subCategories: ['Instruments', 'Traditional Music', 'Famous Artists', 'Dance', 'Visual Arts', 'Architecture'],
        color: '#EC4899',
    },
    {
        id: 'SCIENCE',
        name: 'Science & Inventions',
        emoji: '🔬',
        description: 'Discoveries, inventions, and scientific facts',
        subCategories: ['Inventions', 'Discoveries', 'Space', 'Medicine', 'Technology', 'Famous Scientists'],
        color: '#8B5CF6',
    },
    {
        id: 'FAMOUS_PEOPLE',
        name: 'Famous People',
        emoji: '🌟',
        description: 'Leaders, explorers, artists, and achievers',
        subCategories: ['Explorers', 'Scientists', 'Artists', 'Athletes', 'Humanitarians', 'Pioneers'],
        color: '#FBBF24',
    },
    {
        id: 'FESTIVALS',
        name: 'Festivals & Traditions',
        emoji: '🎉',
        description: 'Celebrations, customs, and cultural practices',
        subCategories: ['National Holidays', 'Cultural Festivals', 'Traditional Clothing', 'Customs', 'Ceremonies'],
        color: '#06B6D4',
    },
    {
        id: 'RECORDS',
        name: 'Records & Superlatives',
        emoji: '🏆',
        description: 'Biggest, smallest, first, tallest, and extremes',
        subCategories: ['Biggest', 'Smallest', 'Tallest', 'Oldest', 'First', 'Fastest', 'Most Populous'],
        color: '#6366F1',
    },
    {
        id: 'FUN_FACTS',
        name: 'Fun Facts & Weird',
        emoji: '🤯',
        description: 'Surprising, unusual, and mind-blowing facts',
        subCategories: ['Unusual Laws', 'Strange Places', 'Weird Animals', 'Bizarre Traditions', 'Unbelievable Facts'],
        color: '#F472B6',
    },
];

// ============================================================================
// DIFFICULTY TIERS
// ============================================================================

export interface DifficultyTier {
    id: string;
    name: string;
    emoji: string;
    description: string;
    ageRange: string;
    difficultyRange: { min: number; max: number };
    xpMultiplier: number;
}

export const difficultyTiers: DifficultyTier[] = [
    {
        id: 'JUNIOR',
        name: 'Junior Explorer',
        emoji: '🌱',
        description: 'Fun facts perfect for young learners',
        ageRange: '6-10',
        difficultyRange: { min: 0.1, max: 0.3 },
        xpMultiplier: 1.0,
    },
    {
        id: 'TEEN',
        name: 'Teen Adventurer',
        emoji: '🎒',
        description: 'Interesting knowledge for curious teens',
        ageRange: '10-14',
        difficultyRange: { min: 0.3, max: 0.5 },
        xpMultiplier: 1.25,
    },
    {
        id: 'STANDARD',
        name: 'World Explorer',
        emoji: '🧭',
        description: 'General knowledge for everyone',
        ageRange: '14-18',
        difficultyRange: { min: 0.4, max: 0.6 },
        xpMultiplier: 1.5,
    },
    {
        id: 'ADVANCED',
        name: 'Knowledge Expert',
        emoji: '📚',
        description: 'Challenging questions for adults',
        ageRange: '18+',
        difficultyRange: { min: 0.6, max: 0.8 },
        xpMultiplier: 2.0,
    },
    {
        id: 'MASTER',
        name: 'Grand Master',
        emoji: '🎓',
        description: 'Competition-level difficulty',
        ageRange: 'Expert',
        difficultyRange: { min: 0.8, max: 1.0 },
        xpMultiplier: 3.0,
    },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getLevelProgress = (currentXP: number, level: number): number => {
    const xpForCurrentLevel = calculateTotalXPForLevel(level);
    const xpForNextLevel = calculateTotalXPForLevel(level + 1);
    const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;
    const xpProgress = currentXP - xpForCurrentLevel;
    return Math.min(Math.max(xpProgress / xpNeededForLevel, 0), 1) * 100;
};

export const getLevelFromXP = (totalXP: number): number => {
    let level = 1;
    while (calculateTotalXPForLevel(level + 1) <= totalXP && level < 100) {
        level++;
    }
    return level;
};

export const getXPForCorrectAnswer = (difficulty: number, streakBonus: number = 0): number => {
    // Base: 10-50 XP depending on difficulty
    const baseXP = Math.floor(10 + difficulty * 40);
    // Streak bonus: up to 50% extra
    const streakMultiplier = 1 + Math.min(streakBonus * 0.05, 0.5);
    return Math.floor(baseXP * streakMultiplier);
};

// ============================================================================
// CONTENT REQUIREMENTS SUMMARY
// ============================================================================

/**
 * CONTENT SCALE TARGET:
 * 
 * 7 Continents × 500 questions = 3,500 questions
 * 
 * Per Continent Breakdown:
 * - 10 categories × 50 questions each = 500 questions
 * - 5 difficulty tiers × 100 questions each = 500 questions (alternate view)
 * 
 * Category Distribution per Continent:
 * 1. Geography & Landmarks: 50 questions
 * 2. Nature & Wildlife: 50 questions
 * 3. Sports & Olympics: 50 questions
 * 4. Food & Cuisine: 50 questions
 * 5. Music & Arts: 50 questions
 * 6. Science & Inventions: 50 questions
 * 7. Famous People: 50 questions
 * 8. Festivals & Traditions: 50 questions
 * 9. Records & Superlatives: 50 questions
 * 10. Fun Facts & Weird: 50 questions
 * 
 * TOTAL: 3,500 questions for MVP launch
 * GOAL: 10,000+ questions for retention
 */

export default {
    calculateXPForLevel,
    calculateTotalXPForLevel,
    getLevelTitle,
    getLevelTier,
    getTierColor,
    getTierBadge,
    getMilestoneUnlocks,
    getLevelProgress,
    getLevelFromXP,
    getXPForCorrectAnswer,
    continentMasteryData,
    questionCategories,
    difficultyTiers,
};
