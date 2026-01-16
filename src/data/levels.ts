/**
 * Global Quest - Level System & Progression
 * Designed for scale to 100M users
 * 
 * Core Philosophy:
 * - 1000 levels for long-term engagement
 * - Early levels are fast (hook users quickly)
 * - Mid levels provide steady progression
 * - Late levels are prestigious achievements
 * - Every 100 levels = major milestone
 * - Every 10 levels = minor milestone
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
    type: 'CONTINENT' | 'FEATURE' | 'MODE' | 'REWARD' | 'ARTIFACT' | 'TITLE' | 'SPECIAL';
    name: string;
    description: string;
    icon: string;
}

export type LevelTier =
    | 'BEGINNER'       // 1-50
    | 'NOVICE'         // 51-100
    | 'APPRENTICE'     // 101-200
    | 'EXPLORER'       // 201-300
    | 'ADVENTURER'     // 301-400
    | 'SCHOLAR'        // 401-500
    | 'EXPERT'         // 501-600
    | 'MASTER'         // 601-700
    | 'GRANDMASTER'    // 701-800
    | 'LEGEND'         // 801-900
    | 'MYTHIC';        // 901-1000

// ============================================================================
// XP CURVE FORMULA (1000 Levels)
// ============================================================================

/**
 * XP Curve Design for 1000 Levels:
 * - Levels 1-50: Very Quick (~100-300 XP) - Hook phase
 * - Levels 51-100: Quick (~300-500 XP) - Engagement phase
 * - Levels 101-200: Moderate (~500-800 XP) - Habit building
 * - Levels 201-400: Steady (~800-1500 XP) - Core gameplay
 * - Levels 401-600: Challenging (~1500-2500 XP) - Mastery phase
 * - Levels 601-800: Hard (~2500-4000 XP) - Expert phase
 * - Levels 801-900: Very Hard (~4000-6000 XP) - Legend phase
 * - Levels 901-1000: Prestigious (~6000-10000 XP) - Mythic phase
 * 
 * Average player playing 15 min/day = ~200 XP/day
 * Time to reach key milestones:
 * - Level 50: ~1 week
 * - Level 100: ~3 weeks
 * - Level 200: ~2 months
 * - Level 500: ~8 months
 * - Level 1000: ~3 years (hardcore players: 1 year)
 */
export const calculateXPForLevel = (level: number): number => {
    if (level <= 1) return 0;
    if (level <= 50) return Math.floor(80 + level * 4);           // 84-280 XP
    if (level <= 100) return Math.floor(200 + level * 3);         // 353-500 XP
    if (level <= 200) return Math.floor(400 + level * 2);         // 602-800 XP
    if (level <= 400) return Math.floor(600 + level * 2.5);       // 1102-1600 XP
    if (level <= 600) return Math.floor(1000 + level * 3);        // 2203-2800 XP
    if (level <= 800) return Math.floor(1500 + level * 3.5);      // 3604-4300 XP
    if (level <= 900) return Math.floor(2000 + level * 4);        // 5204-5600 XP
    return Math.floor(3000 + level * 5);                          // 7505-8000 XP
};

export const calculateTotalXPForLevel = (level: number): number => {
    let total = 0;
    for (let i = 1; i <= level; i++) {
        total += calculateXPForLevel(i);
    }
    return total;
};

// ============================================================================
// LEVEL TITLES (1000 Levels)
// ============================================================================

export const getLevelTitle = (level: number): string => {
    // Beginner (1-50)
    if (level <= 10) return 'Curious Mind';
    if (level <= 20) return 'Eager Learner';
    if (level <= 30) return 'Fact Finder';
    if (level <= 40) return 'Knowledge Seeker';
    if (level <= 50) return 'Rising Star';

    // Novice (51-100)
    if (level <= 60) return 'Globe Trotter';
    if (level <= 70) return 'World Watcher';
    if (level <= 80) return 'Culture Curious';
    if (level <= 90) return 'Trivia Trainee';
    if (level <= 100) return 'Century Achiever';

    // Apprentice (101-200)
    if (level <= 125) return 'Knowledge Apprentice';
    if (level <= 150) return 'Wisdom Seeker';
    if (level <= 175) return 'Lore Keeper';
    if (level <= 200) return 'Scholar\'s Path';

    // Explorer (201-300)
    if (level <= 225) return 'World Explorer';
    if (level <= 250) return 'Continental Champion';
    if (level <= 275) return 'Horizon Chaser';
    if (level <= 300) return 'Discovery Master';

    // Adventurer (301-400)
    if (level <= 325) return 'Bold Adventurer';
    if (level <= 350) return 'Quest Conqueror';
    if (level <= 375) return 'Trailblazer';
    if (level <= 400) return 'Legendary Voyager';

    // Scholar (401-500)
    if (level <= 425) return 'Enlightened Scholar';
    if (level <= 450) return 'Sage of Facts';
    if (level <= 475) return 'Knowledge Guardian';
    if (level <= 500) return 'Grand Sage';

    // Expert (501-600)
    if (level <= 525) return 'Expert Analyst';
    if (level <= 550) return 'Master Researcher';
    if (level <= 575) return 'Wisdom Keeper';
    if (level <= 600) return 'Supreme Expert';

    // Master (601-700)
    if (level <= 625) return 'World Master';
    if (level <= 650) return 'Continental Master';
    if (level <= 675) return 'Universal Authority';
    if (level <= 700) return 'Grand Master';

    // Grandmaster (701-800)
    if (level <= 725) return 'Grandmaster I';
    if (level <= 750) return 'Grandmaster II';
    if (level <= 775) return 'Grandmaster III';
    if (level <= 800) return 'Supreme Grandmaster';

    // Legend (801-900)
    if (level <= 825) return 'Rising Legend';
    if (level <= 850) return 'Eternal Legend';
    if (level <= 875) return 'Immortal Legend';
    if (level <= 900) return 'Legendary Titan';

    // Mythic (901-1000)
    if (level <= 925) return 'Mythic Ascendant';
    if (level <= 950) return 'Cosmic Intellect';
    if (level <= 975) return 'Universal Mind';
    if (level <= 999) return 'Omniscient Being';

    return 'The Infinite One'; // Level 1000
};

export const getLevelTier = (level: number): LevelTier => {
    if (level <= 50) return 'BEGINNER';
    if (level <= 100) return 'NOVICE';
    if (level <= 200) return 'APPRENTICE';
    if (level <= 300) return 'EXPLORER';
    if (level <= 400) return 'ADVENTURER';
    if (level <= 500) return 'SCHOLAR';
    if (level <= 600) return 'EXPERT';
    if (level <= 700) return 'MASTER';
    if (level <= 800) return 'GRANDMASTER';
    if (level <= 900) return 'LEGEND';
    return 'MYTHIC';
};

export const getTierColor = (tier: LevelTier): string => {
    switch (tier) {
        case 'BEGINNER': return '#94A3B8';      // Gray
        case 'NOVICE': return '#10B981';        // Green
        case 'APPRENTICE': return '#3B82F6';    // Blue
        case 'EXPLORER': return '#06B6D4';      // Cyan
        case 'ADVENTURER': return '#8B5CF6';    // Purple
        case 'SCHOLAR': return '#EC4899';       // Pink
        case 'EXPERT': return '#F59E0B';        // Orange
        case 'MASTER': return '#EF4444';        // Red
        case 'GRANDMASTER': return '#DC2626';   // Dark Red
        case 'LEGEND': return '#FBBF24';        // Gold
        case 'MYTHIC': return '#E879F9';        // Magenta/Mythic
    }
};

export const getTierBadge = (tier: LevelTier): string => {
    switch (tier) {
        case 'BEGINNER': return '🌱';
        case 'NOVICE': return '�';
        case 'APPRENTICE': return '📖';
        case 'EXPLORER': return '🧭';
        case 'ADVENTURER': return '⚔️';
        case 'SCHOLAR': return '📚';
        case 'EXPERT': return '🎓';
        case 'MASTER': return '👑';
        case 'GRANDMASTER': return '💎';
        case 'LEGEND': return '⭐';
        case 'MYTHIC': return '🌟';
    }
};

// ============================================================================
// MILESTONE UNLOCKS
// ============================================================================

export const getMilestoneUnlocks = (level: number): LevelUnlock[] => {
    const unlocks: LevelUnlock[] = [];

    // ========== CONTINENT UNLOCKS (Early game: 1-25) ==========
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

    // ========== FEATURE UNLOCKS (Through level 200) ==========
    if (level === 8) {
        unlocks.push({ type: 'FEATURE', name: 'Daily Challenges', description: 'Earn bonus XP with daily quests!', icon: '📅' });
    }
    if (level === 12) {
        unlocks.push({ type: 'MODE', name: 'Timed Mode', description: 'Race against the clock!', icon: '⏱️' });
    }
    if (level === 18) {
        unlocks.push({ type: 'MODE', name: 'Duel Mode', description: 'Challenge friends to knowledge battles!', icon: '⚔️' });
    }
    if (level === 30) {
        unlocks.push({ type: 'FEATURE', name: 'Leaderboards', description: 'Compete with players worldwide!', icon: '🏆' });
    }
    if (level === 40) {
        unlocks.push({ type: 'MODE', name: 'Expert Mode', description: 'Questions for true masters!', icon: '🎓' });
    }
    if (level === 50) {
        unlocks.push({ type: 'FEATURE', name: 'Create Questions', description: 'Submit your own questions!', icon: '✍️' });
        unlocks.push({ type: 'SPECIAL', name: 'Beginner Complete!', description: 'You\'ve graduated from Beginner tier!', icon: '🎉' });
    }
    if (level === 75) {
        unlocks.push({ type: 'MODE', name: 'Marathon Mode', description: 'Answer 50 questions in one session!', icon: '🏃' });
    }
    if (level === 100) {
        unlocks.push({ type: 'FEATURE', name: 'Custom Avatars', description: 'Personalize your profile!', icon: '🎭' });
        unlocks.push({ type: 'SPECIAL', name: 'Century Club!', description: 'Welcome to Level 100!', icon: '💯' });
    }
    if (level === 150) {
        unlocks.push({ type: 'MODE', name: 'Hardcore Mode', description: 'One wrong answer ends it all!', icon: '💀' });
    }
    if (level === 200) {
        unlocks.push({ type: 'FEATURE', name: 'Mentor System', description: 'Help new players learn!', icon: '🤝' });
        unlocks.push({ type: 'SPECIAL', name: 'Double Century!', description: 'Level 200 achieved!', icon: '🌟' });
    }

    // ========== MID-GAME UNLOCKS (201-500) ==========
    if (level === 250) {
        unlocks.push({ type: 'MODE', name: 'Category Master', description: 'Focus on single category challenges!', icon: '📊' });
    }
    if (level === 300) {
        unlocks.push({ type: 'FEATURE', name: 'Guild System', description: 'Create or join player guilds!', icon: '🏰' });
        unlocks.push({ type: 'SPECIAL', name: 'Explorer Elite!', description: 'Level 300 - True Explorer!', icon: '🧭' });
    }
    if (level === 350) {
        unlocks.push({ type: 'MODE', name: 'Boss Battles', description: 'Face ultimate knowledge challenges!', icon: '🐉' });
    }
    if (level === 400) {
        unlocks.push({ type: 'FEATURE', name: 'Custom Themes', description: 'Unlock exclusive app themes!', icon: '🎨' });
        unlocks.push({ type: 'SPECIAL', name: 'Adventurer Legend!', description: 'Level 400 milestone!', icon: '⚔️' });
    }
    if (level === 450) {
        unlocks.push({ type: 'MODE', name: 'Team Battles', description: 'Compete with your guild!', icon: '🤼' });
    }
    if (level === 500) {
        unlocks.push({ type: 'FEATURE', name: 'VIP Lounge', description: 'Access exclusive VIP features!', icon: '👑' });
        unlocks.push({ type: 'SPECIAL', name: 'Half Millennium!', description: 'Level 500 - Scholar Elite!', icon: '📚' });
    }

    // ========== LATE-GAME UNLOCKS (501-800) ==========
    if (level === 600) {
        unlocks.push({ type: 'FEATURE', name: 'Tournament Host', description: 'Create your own tournaments!', icon: '🏟️' });
        unlocks.push({ type: 'SPECIAL', name: 'Expert Supreme!', description: 'Level 600 achieved!', icon: '🎓' });
    }
    if (level === 700) {
        unlocks.push({ type: 'FEATURE', name: 'Question Editor', description: 'Edit official questions!', icon: '✏️' });
        unlocks.push({ type: 'SPECIAL', name: 'Grand Master!', description: 'Level 700 - True Master!', icon: '👑' });
    }
    if (level === 800) {
        unlocks.push({ type: 'FEATURE', name: 'Beta Tester', description: 'Access new features first!', icon: '🧪' });
        unlocks.push({ type: 'SPECIAL', name: 'Grandmaster Supreme!', description: 'Level 800 achieved!', icon: '💎' });
    }

    // ========== END-GAME UNLOCKS (801-1000) ==========
    if (level === 900) {
        unlocks.push({ type: 'FEATURE', name: 'Legend Council', description: 'Help shape the game\'s future!', icon: '🏛️' });
        unlocks.push({ type: 'SPECIAL', name: 'Legendary Titan!', description: 'Level 900 - Near the top!', icon: '⭐' });
    }
    if (level === 950) {
        unlocks.push({ type: 'SPECIAL', name: 'Almost There!', description: 'Just 50 more levels to immortality!', icon: '🔥' });
    }
    if (level === 1000) {
        unlocks.push({ type: 'FEATURE', name: 'God Mode', description: 'Unlimited power and access!', icon: '⚡' });
        unlocks.push({ type: 'SPECIAL', name: 'THE INFINITE ONE', description: 'You have achieved the impossible!', icon: '🌟' });
        unlocks.push({ type: 'ARTIFACT', name: 'Infinity Crown', description: 'The ultimate symbol of mastery!', icon: '👑' });
    }

    // ========== ARTIFACT UNLOCKS (Special rewards) ==========
    if (level === 35) {
        unlocks.push({ type: 'ARTIFACT', name: 'Explorer\'s Compass', description: 'A rare artifact for true explorers', icon: '🧭' });
    }
    if (level === 55) {
        unlocks.push({ type: 'ARTIFACT', name: 'Scholar\'s Tome', description: 'Ancient wisdom at your fingertips', icon: '📖' });
    }
    if (level === 100) {
        unlocks.push({ type: 'ARTIFACT', name: 'Century Medallion', description: 'Proof of 100 levels conquered!', icon: '🏅' });
    }
    if (level === 200) {
        unlocks.push({ type: 'ARTIFACT', name: 'Crystal Globe', description: 'See the world clearly!', icon: '🔮' });
    }
    if (level === 300) {
        unlocks.push({ type: 'ARTIFACT', name: 'Explorer\'s Telescope', description: 'Discover new horizons!', icon: '🔭' });
    }
    if (level === 400) {
        unlocks.push({ type: 'ARTIFACT', name: 'Adventurer\'s Shield', description: 'Protection for your journey!', icon: '🛡️' });
    }
    if (level === 500) {
        unlocks.push({ type: 'ARTIFACT', name: 'Scholar\'s Lantern', description: 'Light the way to knowledge!', icon: '🏮' });
    }
    if (level === 600) {
        unlocks.push({ type: 'ARTIFACT', name: 'Expert\'s Scepter', description: 'Wield the power of expertise!', icon: '🪄' });
    }
    if (level === 700) {
        unlocks.push({ type: 'ARTIFACT', name: 'Master\'s Crown', description: 'The crown of knowledge masters!', icon: '👑' });
    }
    if (level === 800) {
        unlocks.push({ type: 'ARTIFACT', name: 'Diamond Heart', description: 'Unbreakable dedication!', icon: '💎' });
    }
    if (level === 900) {
        unlocks.push({ type: 'ARTIFACT', name: 'Legendary Star', description: 'Shine among the legends!', icon: '⭐' });
    }

    // ========== TITLE UNLOCKS (Every 25 levels) ==========
    if (level % 25 === 0) {
        unlocks.push({
            type: 'TITLE',
            name: getLevelTitle(level),
            description: `Achieved Level ${level}!`,
            icon: getTierBadge(getLevelTier(level)),
        });
    }

    // ========== CENTURY MILESTONES (Every 100 levels) ==========
    if (level % 100 === 0 && level > 0) {
        unlocks.push({
            type: 'REWARD',
            name: `${level / 100}x Century Bonus`,
            description: `+${level * 10} bonus XP for reaching Level ${level}!`,
            icon: '🎁',
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
    while (calculateTotalXPForLevel(level + 1) <= totalXP && level < 1000) {
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
