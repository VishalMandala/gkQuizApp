/**
 * Global Quest - Daily Puzzles System
 * 
 * Core Features:
 * - Daily Challenge: 5 questions across all continents
 * - Daily Discovery: Learn a new fascinating fact each day
 * - Streak System: Consecutive days of completion
 * - Weekly Themes: Special themed challenges each week
 */

import type { Question, Continent, Category, DailyChallenge, DailyDiscovery } from '../types';

// ============================================================================
// DAILY CHALLENGE CONFIGURATION
// ============================================================================

export interface DailyChallengeConfig {
    questionCount: number;
    timeLimit: number;  // seconds per question
    xpReward: number;
    streakBonusMultiplier: number;
    perfectBonusXP: number;
}

export const dailyChallengeConfig: DailyChallengeConfig = {
    questionCount: 5,
    timeLimit: 30,
    xpReward: 100,
    streakBonusMultiplier: 0.1, // 10% per streak day
    perfectBonusXP: 50,
};

// ============================================================================
// STREAK REWARDS
// ============================================================================

export interface StreakReward {
    days: number;
    name: string;
    description: string;
    icon: string;
    xpBonus: number;
    reward?: string;
}

export const streakRewards: StreakReward[] = [
    { days: 3, name: 'Getting Started', description: '3-day streak!', icon: '🔥', xpBonus: 25 },
    { days: 7, name: 'Week Warrior', description: '7-day streak!', icon: '⚡', xpBonus: 75, reward: 'Streak Shield x1' },
    { days: 14, name: 'Two Week Champion', description: '14-day streak!', icon: '🌟', xpBonus: 150, reward: 'Double XP Token' },
    { days: 21, name: 'Three Week Legend', description: '21-day streak!', icon: '💫', xpBonus: 250, reward: 'Rare Badge' },
    { days: 30, name: 'Monthly Master', description: '30-day streak!', icon: '👑', xpBonus: 500, reward: 'Exclusive Avatar Frame' },
    { days: 50, name: 'Dedication Hero', description: '50-day streak!', icon: '🏆', xpBonus: 750, reward: 'Legendary Badge' },
    { days: 100, name: 'Century Legend', description: '100-day streak!', icon: '💎', xpBonus: 1500, reward: 'Mythical Title' },
    { days: 365, name: 'Year of Wisdom', description: '365-day streak!', icon: '🌍', xpBonus: 5000, reward: 'Omniscient Badge' },
];

// ============================================================================
// WEEKLY THEMES
// ============================================================================

export interface WeeklyTheme {
    weekNumber: number;  // Week of the year (1-52)
    name: string;
    description: string;
    icon: string;
    focusContinent?: Continent;
    focusCategory?: Category;
    bonusXPMultiplier: number;
}

export const weeklyThemes: WeeklyTheme[] = [
    // January themes
    { weekNumber: 1, name: 'New Year, New Knowledge', icon: '🎉', description: 'Start the year learning!', bonusXPMultiplier: 1.5 },
    { weekNumber: 2, name: 'African Adventures', icon: '🦁', focusContinent: 'AFRICA', description: 'Explore Africa!', bonusXPMultiplier: 1.25 },
    { weekNumber: 3, name: 'Science & Discovery', icon: '🔬', focusCategory: 'SCIENCE', description: 'Scientific wonders!', bonusXPMultiplier: 1.25 },
    { weekNumber: 4, name: 'European Exploration', icon: '🏰', focusContinent: 'EUROPE', description: 'Castle to coast!', bonusXPMultiplier: 1.25 },

    // February themes
    { weekNumber: 5, name: 'World Wildlife Week', icon: '🐘', focusCategory: 'NATURE_WILDLIFE', description: 'Amazing animals!', bonusXPMultiplier: 1.25 },
    { weekNumber: 6, name: 'Asian Wonders', icon: '🐉', focusContinent: 'ASIA', description: 'Mysteries of Asia!', bonusXPMultiplier: 1.25 },
    { weekNumber: 7, name: 'Food Festival', icon: '🍕', focusCategory: 'FOOD', description: 'Global cuisine!', bonusXPMultiplier: 1.25 },
    { weekNumber: 8, name: 'Sports Champions', icon: '⚽', focusCategory: 'SPORTS', description: 'World of sports!', bonusXPMultiplier: 1.25 },

    // March themes
    { weekNumber: 9, name: "Women's History", icon: '👑', focusCategory: 'FAMOUS_PEOPLE', description: 'Celebrating women who changed the world!', bonusXPMultiplier: 1.5 },
    { weekNumber: 10, name: 'North American Journey', icon: '🗽', focusContinent: 'NORTH_AMERICA', description: 'From Canada to Caribbean!', bonusXPMultiplier: 1.25 },
    { weekNumber: 11, name: 'Music Around the World', icon: '🎵', focusCategory: 'MUSIC_ARTS', description: 'Rhythms of culture!', bonusXPMultiplier: 1.25 },
    { weekNumber: 12, name: 'South American Spirit', icon: '🌴', focusContinent: 'SOUTH_AMERICA', description: 'Amazon to Andes!', bonusXPMultiplier: 1.25 },

    // Special weeks
    { weekNumber: 16, name: 'Earth Day Week', icon: '🌍', focusCategory: 'GEOGRAPHY', description: 'Our amazing planet!', bonusXPMultiplier: 1.5 },
    { weekNumber: 22, name: 'World Ocean Day', icon: '🌊', focusContinent: 'AUSTRALIA_OCEANIA', description: 'Pacific wonders!', bonusXPMultiplier: 1.5 },
    { weekNumber: 35, name: 'Frozen Frontiers', icon: '🐧', focusContinent: 'ANTARCTICA', description: 'Ice continent mysteries!', bonusXPMultiplier: 1.5 },
    { weekNumber: 52, name: 'Year in Review', icon: '🎊', description: 'Final week celebration!', bonusXPMultiplier: 2.0 },
];

// ============================================================================
// DAILY DISCOVERY FACTS
// ============================================================================

export const dailyDiscoveries: Omit<DailyDiscovery, 'id' | 'date' | 'isCollected'>[] = [
    // GEOGRAPHY wonders
    {
        factText: 'There are 195 countries in the world. The newest is South Sudan (2011), and the oldest continuous nation-state is San Marino (301 CE).',
        factShort: '195 countries — newest is South Sudan (2011)!',
        source: 'United Nations',
        continent: 'AFRICA',
        category: 'GEOGRAPHY',
    },
    {
        factText: 'Mount Everest grows 4mm taller every year. The tectonic plates pushing India into Asia are still active!',
        factShort: 'Everest grows 4mm taller every year!',
        source: 'National Geographic',
        continent: 'ASIA',
        category: 'GEOGRAPHY',
    },
    {
        factText: 'Russia spans 11 time zones — more than any other country. When it\'s midnight in Moscow, it\'s 8 AM the same day in Vladivostok!',
        factShort: 'Russia: 11 time zones — breakfast and midnight at once!',
        source: 'World Atlas',
        continent: 'ASIA',
        category: 'GEOGRAPHY',
    },
    {
        factText: 'The Amazon River has no bridges across it. The 4,000-mile river flows through dense rainforest where there are simply no roads to bridge.',
        factShort: 'Amazon River: 4,000 miles — zero bridges!',
        source: 'Smithsonian',
        continent: 'SOUTH_AMERICA',
        category: 'GEOGRAPHY',
    },
    {
        factText: 'Vatican City is so small (0.44 km²) that you could walk around the entire country in 40 minutes.',
        factShort: 'Vatican City: Walk around the country in 40 minutes!',
        source: 'Vatican City State',
        continent: 'EUROPE',
        category: 'GEOGRAPHY',
    },

    // NATURE wonders
    {
        factText: 'A group of flamingos is called a "flamboyance." They can sleep standing on one leg and are born gray — they turn pink from eating shrimp!',
        factShort: 'Flamingos: A group is called a "flamboyance"!',
        source: 'National Geographic',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
    },
    {
        factText: 'Octopuses have three hearts, blue blood, and can squeeze through any gap bigger than their beak. They\'re also excellent at escaping aquariums.',
        factShort: 'Octopuses: 3 hearts, blue blood, escape artists!',
        source: 'Monterey Bay Aquarium',
        category: 'NATURE_WILDLIFE',
    },
    {
        factText: 'Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible!',
        factShort: 'Honey never spoils — 3,000-year-old honey still edible!',
        source: 'Smithsonian',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
    },
    {
        factText: 'Crows can recognize human faces and hold grudges. They\'ll remember a threatening person and warn other crows about them for years!',
        factShort: 'Crows remember faces — hold grudges for years!',
        source: 'University of Washington',
        category: 'NATURE_WILDLIFE',
    },
    {
        factText: 'The Great Barrier Reef is the only living thing visible from space. It\'s made up of 2,900 individual reef systems.',
        factShort: 'Great Barrier Reef: Only living thing visible from space!',
        source: 'NASA',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'NATURE_WILDLIFE',
    },

    // HISTORY wonders
    {
        factText: 'Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid. The pyramids were already ancient to her!',
        factShort: 'Cleopatra: Closer to Moon landing than to the pyramids!',
        source: 'History.com',
        continent: 'AFRICA',
        category: 'HISTORY',
    },
    {
        factText: 'Oxford University is older than the Aztec Empire. Oxford was teaching students by 1096, while the Aztec Empire wasn\'t founded until 1325.',
        factShort: 'Oxford University: Older than the Aztec Empire!',
        source: 'Oxford University',
        continent: 'EUROPE',
        category: 'HISTORY',
    },
    {
        factText: 'Nintendo was founded in 1889 — about 80 years before the Internet. They originally made playing cards!',
        factShort: 'Nintendo: Founded 1889 — started with playing cards!',
        source: 'Nintendo',
        continent: 'ASIA',
        category: 'HISTORY',
    },
    {
        factText: 'The shortest war in history lasted 38-45 minutes. The Anglo-Zanzibar War of 1896 ended when the Sultan\'s palace was destroyed.',
        factShort: 'Shortest war: 38 minutes — Anglo-Zanzibar 1896!',
        source: 'Guinness World Records',
        continent: 'AFRICA',
        category: 'HISTORY',
    },

    // SCIENCE wonders
    {
        factText: 'If you could fold a piece of paper 42 times, it would reach the Moon. Paper doubles in thickness with each fold!',
        factShort: 'Fold paper 42 times = reach the Moon!',
        source: 'Science Illustrated',
        category: 'SCIENCE',
    },
    {
        factText: 'There are more possible games of chess than atoms in the observable universe. The number is 10^120!',
        factShort: 'Chess games possible: More than atoms in the universe!',
        source: 'MIT',
        category: 'SCIENCE',
    },
    {
        factText: 'A day on Venus is longer than its year. Venus rotates so slowly that a year (orbit around sun) is shorter than one full day.',
        factShort: 'Venus: A day is longer than a year!',
        source: 'NASA',
        category: 'SCIENCE',
    },
    {
        factText: 'Human DNA is 99.9% identical. All of human diversity comes from just 0.1% of our genetic code.',
        factShort: 'Humans: 99.9% identical DNA — diversity in 0.1%!',
        source: 'National Human Genome Research Institute',
        category: 'SCIENCE',
    },

    // CULTURE wonders
    {
        factText: 'In Japan, slurping your noodles is considered polite — it shows you\'re enjoying the food. The louder, the better!',
        factShort: 'Japan: Slurping noodles is polite — shows enjoyment!',
        source: 'Japan National Tourism Organization',
        continent: 'ASIA',
        category: 'CULTURE',
    },
    {
        factText: 'In Finland, there are more saunas than cars. About 3.3 million saunas for 5.5 million people!',
        factShort: 'Finland: More saunas than cars — 3.3 million total!',
        source: 'Visit Finland',
        continent: 'EUROPE',
        category: 'CULTURE',
    },
    {
        factText: 'In Scotland, there\'s a tradition where finding a four-leaf clover and then giving it away brings even more luck than keeping it.',
        factShort: 'Scotland: Giving away a four-leaf clover = more luck!',
        source: 'VisitScotland',
        continent: 'EUROPE',
        category: 'CULTURE',
    },

    // FUN FACTS
    {
        factText: 'Bananas are berries, but strawberries aren\'t. Botanically, berries develop from a single ovary — which bananas do!',
        factShort: 'Bananas are berries — strawberries aren\'t!',
        source: 'Scientific American',
        category: 'FUN_FACTS',
    },
    {
        factText: 'A jiffy is an actual unit of time — 1/100th of a second. "I\'ll be back in a jiffy" is very precise!',
        factShort: '"Jiffy" = 1/100th second — it\'s a real measurement!',
        source: 'Oxford Dictionary',
        category: 'FUN_FACTS',
    },
    {
        factText: 'The inventor of the Pringles can is buried in one. Fredric Baur\'s ashes were placed in a Pringles can as per his wishes.',
        factShort: 'Pringles inventor: Buried in a Pringles can! 🥔',
        source: 'Time Magazine',
        continent: 'NORTH_AMERICA',
        category: 'FUN_FACTS',
    },
    {
        factText: 'The longest hiccuping spree lasted 68 years. Charles Osborne started hiccuping in 1922 and stopped in 1990.',
        factShort: '68-year hiccups: 1922-1990 — longest ever!',
        source: 'Guinness World Records',
        continent: 'NORTH_AMERICA',
        category: 'FUN_FACTS',
    },
    {
        factText: 'Scotland\'s national animal is the unicorn. It has been a Scottish heraldic symbol since the 12th century.',
        factShort: 'Scotland\'s national animal: The unicorn! 🦄',
        source: 'VisitScotland',
        continent: 'EUROPE',
        category: 'FUN_FACTS',
    },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get today's date seed for consistent daily content
 */
export const getDailyDateSeed = (date: Date = new Date()): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

/**
 * Simple hash function for date-based randomization
 */
export const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
};

/**
 * Get today's Daily Discovery fact
 */
export const getTodaysDiscovery = (date: Date = new Date()): Omit<DailyDiscovery, 'id' | 'date' | 'isCollected'> => {
    const dateSeed = getDailyDateSeed(date);
    const index = hashString(dateSeed) % dailyDiscoveries.length;
    return dailyDiscoveries[index];
};

/**
 * Get the current week's theme
 */
export const getCurrentWeekTheme = (date: Date = new Date()): WeeklyTheme | undefined => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);

    return weeklyThemes.find(theme => theme.weekNumber === weekNumber);
};

/**
 * Calculate streak bonus XP
 */
export const calculateStreakBonus = (streakDays: number, baseXP: number): number => {
    const multiplier = 1 + (Math.min(streakDays, 30) * dailyChallengeConfig.streakBonusMultiplier);
    return Math.floor(baseXP * multiplier);
};

/**
 * Get next streak milestone
 */
export const getNextStreakMilestone = (currentStreak: number): StreakReward | undefined => {
    return streakRewards.find(reward => reward.days > currentStreak);
};

/**
 * Check if streak milestone reached
 */
export const checkStreakMilestone = (streakDays: number): StreakReward | undefined => {
    return streakRewards.find(reward => reward.days === streakDays);
};

/**
 * Calculate time remaining until daily reset (midnight local time)
 */
export const getTimeUntilReset = (): number => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return Math.floor((tomorrow.getTime() - now.getTime()) / 1000);
};

/**
 * Format time remaining as string
 */
export const formatTimeRemaining = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
};

// ============================================================================
// DAILY CHALLENGE GENERATOR
// ============================================================================

/**
 * Generate today's daily challenge questions
 * Uses date as seed for consistent questions throughout the day
 */
export const generateDailyChallengeQuestions = async (
    allQuestions: Question[],
    date: Date = new Date()
): Promise<Question[]> => {
    const dateSeed = getDailyDateSeed(date);
    const hash = hashString(dateSeed);

    // Get current theme if any
    const weekTheme = getCurrentWeekTheme(date);

    // Filter questions based on theme (if applicable)
    let questionPool = [...allQuestions];

    if (weekTheme?.focusContinent) {
        // 60% from focus continent, 40% random
        const focusQuestions = questionPool.filter(q => q.continent === weekTheme.focusContinent);
        const otherQuestions = questionPool.filter(q => q.continent !== weekTheme.focusContinent);

        const focusCount = Math.ceil(dailyChallengeConfig.questionCount * 0.6);
        const otherCount = dailyChallengeConfig.questionCount - focusCount;

        // Shuffle and pick
        const shuffledFocus = focusQuestions.sort(() => (hash + Math.random()) % 1 - 0.5);
        const shuffledOther = otherQuestions.sort(() => (hash + Math.random()) % 1 - 0.5);

        return [
            ...shuffledFocus.slice(0, focusCount),
            ...shuffledOther.slice(0, otherCount),
        ];
    }

    if (weekTheme?.focusCategory) {
        // 60% from focus category, 40% random
        const focusQuestions = questionPool.filter(q => q.category === weekTheme.focusCategory);
        const otherQuestions = questionPool.filter(q => q.category !== weekTheme.focusCategory);

        const focusCount = Math.ceil(dailyChallengeConfig.questionCount * 0.6);
        const otherCount = dailyChallengeConfig.questionCount - focusCount;

        const shuffledFocus = focusQuestions.sort(() => (hash + Math.random()) % 1 - 0.5);
        const shuffledOther = otherQuestions.sort(() => (hash + Math.random()) % 1 - 0.5);

        return [
            ...shuffledFocus.slice(0, focusCount),
            ...shuffledOther.slice(0, otherCount),
        ];
    }

    // Default: Mix of continents (one from each if possible)
    const continents: Continent[] = ['AFRICA', 'ASIA', 'EUROPE', 'NORTH_AMERICA', 'SOUTH_AMERICA', 'AUSTRALIA_OCEANIA', 'ANTARCTICA'];
    const selectedQuestions: Question[] = [];

    for (let i = 0; i < dailyChallengeConfig.questionCount; i++) {
        const continent = continents[i % continents.length];
        const continentQuestions = questionPool.filter(q => q.continent === continent);

        if (continentQuestions.length > 0) {
            const index = (hash + i) % continentQuestions.length;
            selectedQuestions.push(continentQuestions[index]);
        }
    }

    // Fill remaining with random questions if needed
    while (selectedQuestions.length < dailyChallengeConfig.questionCount) {
        const index = (hash + selectedQuestions.length) % questionPool.length;
        const question = questionPool[index];
        if (!selectedQuestions.includes(question)) {
            selectedQuestions.push(question);
        }
    }

    return selectedQuestions;
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
    dailyChallengeConfig,
    streakRewards,
    weeklyThemes,
    dailyDiscoveries,
    getDailyDateSeed,
    getTodaysDiscovery,
    getCurrentWeekTheme,
    calculateStreakBonus,
    getNextStreakMilestone,
    checkStreakMilestone,
    getTimeUntilReset,
    formatTimeRemaining,
    generateDailyChallengeQuestions,
};
