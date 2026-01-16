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

    // MORE GEOGRAPHY
    { factText: 'Canada has more lakes than the rest of the world combined. There are about 2 million lakes in Canada!', factShort: 'Canada: More lakes than rest of world combined!', source: 'Natural Resources Canada', continent: 'NORTH_AMERICA', category: 'GEOGRAPHY' },
    { factText: 'Africa is the only continent in all four hemispheres — it crosses the equator and the prime meridian.', factShort: 'Africa: Only continent in all 4 hemispheres!', source: 'National Geographic', continent: 'AFRICA', category: 'GEOGRAPHY' },
    { factText: 'The Dead Sea is so salty that you can float without trying. It\'s 10 times saltier than the ocean!', factShort: 'Dead Sea: Float without trying — 10x saltier!', source: 'Smithsonian', continent: 'ASIA', category: 'GEOGRAPHY' },
    { factText: 'Iceland has no mosquitoes. The climate changes too rapidly for them to complete their breeding cycle.', factShort: 'Iceland: Zero mosquitoes — too cold for them!', source: 'University of Iceland', continent: 'EUROPE', category: 'GEOGRAPHY' },
    { factText: 'Australia is wider than the moon. Australia is 4,000 km across; the moon is 3,400 km in diameter.', factShort: 'Australia: Wider than the moon! 🌙', source: 'NASA', continent: 'AUSTRALIA_OCEANIA', category: 'GEOGRAPHY' },
    { factText: 'The Sahara Desert is almost as big as the entire United States. It\'s 9.2 million km²!', factShort: 'Sahara: Almost as big as the entire USA!', source: 'World Atlas', continent: 'AFRICA', category: 'GEOGRAPHY' },
    { factText: 'Every continent has a city called Rome. There are Romes in North America, Europe, Africa, and Australia!', factShort: 'Rome exists on every continent!', source: 'Geographic Names', category: 'GEOGRAPHY' },
    { factText: 'The Pacific Ocean is larger than all landmasses combined. It covers more than 30% of Earth\'s surface.', factShort: 'Pacific Ocean: Bigger than ALL land combined!', source: 'NOAA', continent: 'AUSTRALIA_OCEANIA', category: 'GEOGRAPHY' },

    // MORE NATURE
    { factText: 'A shrimp\'s heart is in its head. They also have 10 legs and can swim backwards!', factShort: 'Shrimp: Heart is in its head! 🦐', source: 'Marine Biology', category: 'NATURE_WILDLIFE' },
    { factText: 'Elephants are the only animals that can\'t jump. Their legs are designed for supporting weight, not springing.', factShort: 'Elephants: Only animals that can\'t jump!', source: 'Smithsonian', continent: 'AFRICA', category: 'NATURE_WILDLIFE' },
    { factText: 'A snail can sleep for 3 years. They enter hibernation when conditions are too dry.', factShort: 'Snails: Can sleep for 3 years straight!', source: 'National Geographic', category: 'NATURE_WILDLIFE' },
    { factText: 'Tigers have striped skin, not just striped fur. Each tiger\'s pattern is unique like a fingerprint.', factShort: 'Tigers: Striped skin — unique like fingerprints!', source: 'WWF', continent: 'ASIA', category: 'NATURE_WILDLIFE' },
    { factText: 'Hummingbirds are the only birds that can fly backwards and upside down.', factShort: 'Hummingbirds: Fly backwards AND upside down!', source: 'Audubon Society', continent: 'NORTH_AMERICA', category: 'NATURE_WILDLIFE' },
    { factText: 'Dolphins sleep with one eye open. Half their brain stays awake to watch for predators!', factShort: 'Dolphins: Sleep with one eye open — half-brain awake!', source: 'Marine Science', category: 'NATURE_WILDLIFE' },
    { factText: 'A single tree can absorb 22 kg of CO2 per year and produce enough oxygen for 2 people.', factShort: 'One tree = oxygen for 2 people per year!', source: 'USDA Forest Service', category: 'NATURE_WILDLIFE' },
    { factText: 'Penguins propose to their mates with a pebble. They search for the perfect one!', factShort: 'Penguins: Propose with the perfect pebble! 💎', source: 'BBC Earth', continent: 'ANTARCTICA', category: 'NATURE_WILDLIFE' },

    // MORE HISTORY
    { factText: 'Vikings used to give kittens to new brides for good luck. Cats were sacred to Freya, goddess of love.', factShort: 'Vikings: Gave kittens as wedding gifts!', source: 'Smithsonian', continent: 'EUROPE', category: 'HISTORY' },
    { factText: 'Ancient Egyptians shaved off their eyebrows to mourn the deaths of their cats.', factShort: 'Ancient Egypt: Shaved eyebrows when cats died!', source: 'British Museum', continent: 'AFRICA', category: 'HISTORY' },
    { factText: 'The Great Wall of China is not visible from space with the naked eye. That\'s a myth!', factShort: 'Great Wall: NOT visible from space — myth busted!', source: 'NASA', continent: 'ASIA', category: 'HISTORY' },
    { factText: 'Coca-Cola was first sold as medicine for headaches and exhaustion in 1886.', factShort: 'Coca-Cola: Started as medicine in 1886!', source: 'Coca-Cola Archives', continent: 'NORTH_AMERICA', category: 'HISTORY' },
    { factText: 'The Eiffel Tower was supposed to be temporary. It was built for the 1889 World\'s Fair and meant to be dismantled!', factShort: 'Eiffel Tower: Was supposed to be temporary!', source: 'Tour Eiffel', continent: 'EUROPE', category: 'HISTORY' },
    { factText: 'The first computer programmer was a woman — Ada Lovelace, in the 1840s.', factShort: 'First programmer: Ada Lovelace — 1840s woman!', source: 'Computer History Museum', continent: 'EUROPE', category: 'HISTORY' },

    // MORE SCIENCE
    { factText: 'Your brain uses 20% of your body\'s energy, despite being only 2% of your weight.', factShort: 'Brain: 2% of weight, uses 20% of energy!', source: 'NIH', category: 'SCIENCE' },
    { factText: 'Hot water freezes faster than cold water. This is called the Mpemba effect.', factShort: 'Hot water freezes FASTER than cold! 🧊', source: 'Royal Society of Chemistry', category: 'SCIENCE' },
    { factText: 'Lightning strikes Earth about 8 million times per day — that\'s 100 strikes per second!', factShort: 'Lightning: 8 million strikes per day!', source: 'NOAA', category: 'SCIENCE' },
    { factText: 'Sound travels 4.3 times faster in water than in air. Whales can hear each other from 1,000 miles away.', factShort: 'Sound: 4.3x faster in water — whales hear 1000 miles!', source: 'NOAA', category: 'SCIENCE' },
    { factText: 'The average person walks 100,000 miles in their lifetime — 4 times around the Earth!', factShort: 'Walk 100,000 miles in life = 4x around Earth!', source: 'Journal of Sports Medicine', category: 'SCIENCE' },
    { factText: 'A teaspoon of neutron star weighs 6 billion tons — as much as Mount Everest!', factShort: 'Teaspoon of neutron star = 6 billion tons!', source: 'NASA', category: 'SCIENCE' },

    // MORE CULTURE
    { factText: 'In Thailand, it\'s illegal to step on money because the King\'s face is on it.', factShort: 'Thailand: Illegal to step on money!', source: 'Thai Law', continent: 'ASIA', category: 'CULTURE' },
    { factText: 'In Greece, nodding your head means "no" and shaking it means "yes" — opposite of most countries!', factShort: 'Greece: Nodding means NO — opposite of most places!', source: 'Greek Culture Guide', continent: 'EUROPE', category: 'CULTURE' },
    { factText: 'In Ethiopia, the calendar has 13 months and it\'s currently 7-8 years behind the Western calendar.', factShort: 'Ethiopia: 13 months, 7 years behind our calendar!', source: 'Ethiopian Calendar', continent: 'AFRICA', category: 'CULTURE' },
    { factText: 'In India, the "head wobble" can mean yes, no, maybe, or "I understand" depending on context.', factShort: 'India: Head wobble = yes, no, AND maybe!', source: 'BBC Culture', continent: 'ASIA', category: 'CULTURE' },
    { factText: 'In Denmark, if you\'re still unmarried at 25, friends throw cinnamon at you on your birthday!', factShort: 'Denmark: Cinnamon thrown at single 25-year-olds!', source: 'Danish Traditions', continent: 'EUROPE', category: 'CULTURE' },

    // MORE SPORTS
    { factText: 'The Olympics were held every 4 years for over 1,100 years (776 BCE - 393 CE) in ancient Greece.', factShort: 'Ancient Olympics: 1,100 years of games!', source: 'Olympic History', continent: 'EUROPE', category: 'SPORTS' },
    { factText: 'Golf balls have 336 dimples. They help the ball fly farther by reducing air resistance.', factShort: 'Golf balls: Exactly 336 dimples!', source: 'Golf Digest', category: 'SPORTS' },
    { factText: 'The longest tennis match lasted 11 hours and 5 minutes over 3 days (2010 Wimbledon).', factShort: 'Longest tennis match: 11 hours over 3 days!', source: 'Wimbledon', continent: 'EUROPE', category: 'SPORTS' },
    { factText: 'The first basketball game was played with a soccer ball and peach baskets in 1891.', factShort: 'Basketball 1891: Soccer ball + peach baskets!', source: 'NBA History', continent: 'NORTH_AMERICA', category: 'SPORTS' },

    // MORE FOOD
    { factText: 'Apples float because they are 25% air. That\'s why bobbing for apples works!', factShort: 'Apples: 25% air — that\'s why they float!', source: 'USDA', category: 'FOOD' },
    { factText: 'Carrots were originally purple before the 17th century when orange ones were bred in the Netherlands.', factShort: 'Carrots: Were purple before 17th century!', source: 'World Carrot Museum', continent: 'EUROPE', category: 'FOOD' },
    { factText: 'The most expensive coffee in the world is made from beans eaten and pooped out by civets ($600/lb).', factShort: 'Kopi Luwak: $600/lb — civet poop coffee!', source: 'National Geographic', continent: 'ASIA', category: 'FOOD' },
    { factText: 'Peanuts aren\'t nuts — they\'re legumes and grow underground like potatoes.', factShort: 'Peanuts: NOT nuts — legumes that grow underground!', source: 'USDA', category: 'FOOD' },
    { factText: 'The world\'s hottest pepper (Carolina Reaper) is 200x hotter than a jalapeño.', factShort: 'Carolina Reaper: 200x hotter than jalapeño! 🌶️', source: 'Guinness World Records', continent: 'NORTH_AMERICA', category: 'FOOD' },
    { factText: 'Chocolate was once used as currency by the Aztecs. They valued cacao beans as much as gold!', factShort: 'Aztecs: Used chocolate as money! 🍫', source: 'Smithsonian', continent: 'NORTH_AMERICA', category: 'FOOD' },

    // MORE FUN FACTS
    { factText: 'Astronauts can\'t cry in space. Tears form but don\'t fall — they just blob around your eyes!', factShort: 'Space tears: Blob around eyes — don\'t fall!', source: 'NASA', category: 'FUN_FACTS' },
    { factText: 'A cloud can weigh more than 1 million pounds. They float because the water is spread over a huge area.', factShort: 'Clouds: Weigh 1 million pounds — still float!', source: 'USGS', category: 'FUN_FACTS' },
    { factText: 'Your nose can remember 50,000 different scents. Smell is the sense most linked to memory.', factShort: 'Nose: Remembers 50,000 scents!', source: 'Scientific American', category: 'FUN_FACTS' },
    { factText: 'The word "set" has the most definitions of any English word — over 430 different meanings!', factShort: '"Set": 430+ definitions — most of any word!', source: 'Oxford Dictionary', category: 'FUN_FACTS' },
    { factText: 'A group of porcupines is called a "prickle." Other fun names: murder of crows, parliament of owls.', factShort: 'Porcupines group: Called a "prickle"! 🦔', source: 'Oxford Dictionary', category: 'FUN_FACTS' },
    { factText: 'Maine is the closest US state to Africa. It\'s farther east than you\'d think!', factShort: 'Maine: Closest US state to Africa!', source: 'National Geographic', continent: 'NORTH_AMERICA', category: 'FUN_FACTS' },
    { factText: 'The inventor of the microwave only received $2 for his discovery. He then cooked popcorn with it!', factShort: 'Microwave inventor: Got only $2 — made popcorn first!', source: 'Smithsonian', continent: 'NORTH_AMERICA', category: 'FUN_FACTS' },
    { factText: 'A day on Mars is only 37 minutes longer than a day on Earth — almost the same!', factShort: 'Mars day: Only 37 minutes longer than Earth!', source: 'NASA', category: 'FUN_FACTS' },

    // MORE RECORDS
    { factText: 'The longest word in English has 189,819 letters. It\'s the chemical name for the protein titin.', factShort: 'Longest word: 189,819 letters — takes 3 hours to say!', source: 'Chemical Nomenclature', category: 'RECORDS' },
    { factText: 'The world\'s oldest tree is over 5,000 years old — older than the Egyptian pyramids!', factShort: 'Oldest tree: 5,000 years — older than pyramids!', source: 'US Forest Service', continent: 'NORTH_AMERICA', category: 'RECORDS' },
    { factText: 'The deepest point in the ocean is 36,000 feet deep — you could fit Mount Everest inside with room to spare.', factShort: 'Mariana Trench: Everest would fit with room to spare!', source: 'NOAA', category: 'RECORDS' },
    { factText: 'The longest flight of a chicken is 13 seconds. Chickens can fly, just not very well!', factShort: 'Chicken flight record: 13 seconds! 🐔', source: 'Guinness World Records', category: 'RECORDS' },

    // ANTARCTICA SPECIAL
    { factText: 'Antarctica is the only continent with no native human population. Everyone there is a visitor.', factShort: 'Antarctica: No native humans — all visitors!', source: 'Antarctic Treaty', continent: 'ANTARCTICA', category: 'GEOGRAPHY' },
    { factText: 'There\'s a blood-red waterfall in Antarctica called Blood Falls. It\'s caused by iron-rich water.', factShort: 'Blood Falls: Red waterfall in Antarctica!', source: 'Antarctic Science', continent: 'ANTARCTICA', category: 'NATURE_WILDLIFE' },
    { factText: 'Antarctica has active volcanoes under the ice. Mount Erebus has a permanent lava lake!', factShort: 'Antarctica: Active volcanoes under ice!', source: 'USGS', continent: 'ANTARCTICA', category: 'GEOGRAPHY' },

    // SOUTH AMERICA SPECIAL
    { factText: 'The Amazon produces 20% of Earth\'s oxygen. It\'s often called "the lungs of the planet."', factShort: 'Amazon: Produces 20% of Earth\'s oxygen!', source: 'WWF', continent: 'SOUTH_AMERICA', category: 'NATURE_WILDLIFE' },
    { factText: 'Angel Falls in Venezuela is 15 times higher than Niagara Falls — the world\'s tallest waterfall!', factShort: 'Angel Falls: 15x taller than Niagara!', source: 'National Geographic', continent: 'SOUTH_AMERICA', category: 'GEOGRAPHY' },
    { factText: 'Brazil shares a border with every South American country except Chile and Ecuador.', factShort: 'Brazil: Borders all but 2 S. American countries!', source: 'World Atlas', continent: 'SOUTH_AMERICA', category: 'GEOGRAPHY' },

    // AUSTRALIA SPECIAL  
    { factText: 'Kangaroos can\'t walk backwards. Neither can emus — that\'s why they\'re on Australia\'s coat of arms!', factShort: 'Kangaroos AND emus: Can\'t walk backwards!', source: 'Australian Government', continent: 'AUSTRALIA_OCEANIA', category: 'NATURE_WILDLIFE' },
    { factText: 'Australia has more sheep than people — about 75 million sheep to 26 million humans!', factShort: 'Australia: 75 million sheep, 26 million people!', source: 'Australian Bureau of Statistics', continent: 'AUSTRALIA_OCEANIA', category: 'FUN_FACTS' },
    { factText: 'The platypus is venomous. Males have venomous spurs on their back legs!', factShort: 'Platypus: One of few venomous mammals!', source: 'Australian Museum', continent: 'AUSTRALIA_OCEANIA', category: 'NATURE_WILDLIFE' },

    // FAMOUS PEOPLE
    { factText: 'Albert Einstein failed his first college entrance exam. He later revolutionized physics.', factShort: 'Einstein: Failed first college exam!', source: 'Biography.com', continent: 'EUROPE', category: 'FAMOUS_PEOPLE' },
    { factText: 'Leonardo da Vinci could write with one hand while drawing with the other simultaneously.', factShort: 'Da Vinci: Write and draw at same time!', source: 'Smithsonian', continent: 'EUROPE', category: 'FAMOUS_PEOPLE' },
    { factText: 'Oprah Winfrey was fired from her first TV job as a news anchor in Baltimore.', factShort: 'Oprah: Fired from first TV job!', source: 'Biography.com', continent: 'NORTH_AMERICA', category: 'FAMOUS_PEOPLE' },
    { factText: 'Mahatma Gandhi never won the Nobel Peace Prize despite being nominated 5 times.', factShort: 'Gandhi: Never won Nobel — nominated 5 times!', source: 'Nobel Prize', continent: 'ASIA', category: 'FAMOUS_PEOPLE' },
    { factText: 'Nelson Mandela was in prison for 27 years before becoming South Africa\'s president.', factShort: 'Mandela: 27 years prison → President!', source: 'Nelson Mandela Foundation', continent: 'AFRICA', category: 'FAMOUS_PEOPLE' },
    { factText: 'Stephen Hawking was told he had 2 years to live at 21. He lived to 76 and revolutionized physics.', factShort: 'Hawking: Given 2 years to live — lived to 76!', source: 'Biography.com', continent: 'EUROPE', category: 'FAMOUS_PEOPLE' },
    { factText: 'Walt Disney was fired from a newspaper for "lacking imagination." He won 22 Oscars.', factShort: 'Disney: Fired for no imagination — won 22 Oscars!', source: 'Disney Archives', continent: 'NORTH_AMERICA', category: 'FAMOUS_PEOPLE' },
    { factText: 'Frida Kahlo started painting after a bus accident left her bedridden for months.', factShort: 'Frida Kahlo: Started painting after accident!', source: 'Museo Frida Kahlo', continent: 'NORTH_AMERICA', category: 'FAMOUS_PEOPLE' },

    // MUSIC & ARTS
    { factText: 'Beethoven composed his greatest works while completely deaf, including his 9th Symphony.', factShort: 'Beethoven: Composed masterpieces while DEAF!', source: 'Smithsonian', continent: 'EUROPE', category: 'MUSIC_ARTS' },
    { factText: 'The song "Happy Birthday" was copyrighted until 2016 — it earned $2 million per year in royalties.', factShort: 'Happy Birthday: $2 million/year until 2016!', source: 'Time Magazine', continent: 'NORTH_AMERICA', category: 'MUSIC_ARTS' },
    { factText: 'The Mona Lisa has no eyebrows. It was fashionable in Renaissance Florence to shave them.', factShort: 'Mona Lisa: No eyebrows — Renaissance fashion!', source: 'Louvre Museum', continent: 'EUROPE', category: 'MUSIC_ARTS' },
    { factText: 'The piano has 88 keys because that\'s as many notes as the human ear can distinguish.', factShort: 'Piano: 88 keys = human ear\'s limit!', source: 'Steinway', continent: 'EUROPE', category: 'MUSIC_ARTS' },
    { factText: 'Vincent van Gogh only sold ONE painting during his lifetime. Now his works sell for $100+ million.', factShort: 'Van Gogh: Sold 1 painting alive — now $100M+!', source: 'Van Gogh Museum', continent: 'EUROPE', category: 'MUSIC_ARTS' },
    { factText: 'ABBA turned down $1 billion for a reunion tour. They eventually reunited in 2021 as holograms!', factShort: 'ABBA: Said no to $1 billion — came back as holograms!', source: 'BBC', continent: 'EUROPE', category: 'MUSIC_ARTS' },

    // TECHNOLOGY
    { factText: 'The first iPhone had less computing power than a modern singing birthday card.', factShort: 'First iPhone: Less power than a birthday card!', source: 'Computer History', continent: 'NORTH_AMERICA', category: 'SCIENCE' },
    { factText: 'Google was originally called "BackRub." The name "Google" is a misspelling of "googol" (10^100).', factShort: 'Google: Was called "BackRub" originally!', source: 'Google', continent: 'NORTH_AMERICA', category: 'SCIENCE' },
    { factText: 'The first computer virus was created in 1986 and was called "Brain."', factShort: 'First virus 1986: Called "Brain"!', source: 'Computer Security', continent: 'ASIA', category: 'SCIENCE' },
    { factText: 'The QWERTY keyboard was designed to SLOW typists down so typewriters wouldn\'t jam.', factShort: 'QWERTY: Designed to SLOW you down!', source: 'Smithsonian', continent: 'NORTH_AMERICA', category: 'SCIENCE' },
    { factText: 'More people own a mobile phone than a toothbrush. 6.8 billion phones vs 4.5 billion toothbrushes.', factShort: 'More phones than toothbrushes worldwide!', source: 'UN Telecom', category: 'SCIENCE' },

    // MORE GEOGRAPHY
    { factText: 'Monaco is smaller than Central Park in New York City. Only 2 km² vs 3.4 km²!', factShort: 'Monaco: Smaller than Central Park!', source: 'World Atlas', continent: 'EUROPE', category: 'GEOGRAPHY' },
    { factText: 'There\'s a town in Norway where the sun doesn\'t set for 76 days straight in summer.', factShort: 'Norway: 76 days of continuous sunlight!', source: 'Visit Norway', continent: 'EUROPE', category: 'GEOGRAPHY' },
    { factText: 'The driest place on Earth is in Antarctica, not Africa. Some areas haven\'t had rain in 2 million years.', factShort: 'Driest place: Antarctica — no rain for 2 million years!', source: 'NASA', continent: 'ANTARCTICA', category: 'GEOGRAPHY' },
    { factText: 'Lake Baikal in Russia holds 20% of the world\'s unfrozen fresh water — more than all the Great Lakes combined.', factShort: 'Lake Baikal: 20% of world\'s fresh water!', source: 'Smithsonian', continent: 'ASIA', category: 'GEOGRAPHY' },
    { factText: 'The shortest place name in the world is "Å" — a village in Norway. It means "stream" in Norse.', factShort: 'Shortest place name: "Å" in Norway!', source: 'Visit Norway', continent: 'EUROPE', category: 'GEOGRAPHY' },

    // MORE NATURE
    { factText: 'A woodpecker\'s tongue wraps around its skull. It protects the brain from impact!', factShort: 'Woodpecker: Tongue wraps around skull!', source: 'Audubon Society', category: 'NATURE_WILDLIFE' },
    { factText: 'Starfish don\'t have blood. They pump seawater through their bodies instead!', factShort: 'Starfish: No blood — use seawater!', source: 'Marine Biology', category: 'NATURE_WILDLIFE' },
    { factText: 'Butterflies taste with their feet. They land on food to check if it\'s edible!', factShort: 'Butterflies: Taste with their feet!', source: 'Smithsonian', category: 'NATURE_WILDLIFE' },
    { factText: 'Giraffes only need 30 minutes of sleep per day, taken in 5-minute naps.', factShort: 'Giraffes: 30 minutes sleep/day in 5-min naps!', source: 'San Diego Zoo', continent: 'AFRICA', category: 'NATURE_WILDLIFE' },
    { factText: 'Koalas sleep 22 hours per day. Eucalyptus leaves provide so little energy!', factShort: 'Koalas: Sleep 22 hours daily!', source: 'Australia Zoo', continent: 'AUSTRALIA_OCEANIA', category: 'NATURE_WILDLIFE' },
    { factText: 'Sea otters hold hands while sleeping so they don\'t drift apart.', factShort: 'Sea otters: Hold hands while sleeping! 🦦', source: 'Monterey Bay Aquarium', continent: 'NORTH_AMERICA', category: 'NATURE_WILDLIFE' },
    { factText: 'Axolotls can regenerate their brain. They can regrow limbs, hearts, and even parts of their brain!', factShort: 'Axolotls: Can regrow their BRAIN!', source: 'Nature', continent: 'NORTH_AMERICA', category: 'NATURE_WILDLIFE' },

    // MORE HISTORY
    { factText: 'The Great Fire of London in 1666 destroyed 13,000 houses but only 6 people died.', factShort: 'Great Fire of London: 13,000 houses, 6 deaths!', source: 'Museum of London', continent: 'EUROPE', category: 'HISTORY' },
    { factText: 'Genghis Khan\'s empire was so large that 0.5% of the world\'s population today may be related to him.', factShort: 'Genghis Khan: 0.5% of humans related to him!', source: 'Nature Genetics', continent: 'ASIA', category: 'HISTORY' },
    { factText: 'The Berlin Wall fell because a spokesman accidentally said borders were open "immediately."', factShort: 'Berlin Wall: Fell due to accidental announcement!', source: 'History.com', continent: 'EUROPE', category: 'HISTORY' },
    { factText: 'Ancient Romans used urine as mouthwash. The ammonia actually does whiten teeth!', factShort: 'Romans: Used urine as mouthwash! 😬', source: 'Smithsonian', continent: 'EUROPE', category: 'HISTORY' },
    { factText: 'The first person convicted of speeding was going 8 mph in a 2 mph zone in 1896.', factShort: 'First speeding ticket: 8 mph in 2 mph zone!', source: 'BBC', continent: 'EUROPE', category: 'HISTORY' },

    // MORE SCIENCE
    { factText: 'Your body has enough iron to make a 3-inch nail.', factShort: 'Your body: Enough iron for a 3-inch nail!', source: 'NIH', category: 'SCIENCE' },
    { factText: 'If you drilled a tunnel through Earth and jumped in, you\'d arrive at the other side in 42 minutes.', factShort: 'Tunnel through Earth = 42 minute trip!', source: 'Physics Today', category: 'SCIENCE' },
    { factText: 'The smell of rain has a name: "petrichor." It\'s caused by bacteria in the soil.', factShort: 'Rain smell = "Petrichor" — from soil bacteria!', source: 'Nature', category: 'SCIENCE' },
    { factText: 'Your stomach gets a completely new lining every 3-4 days. Otherwise it would digest itself!', factShort: 'Stomach: New lining every 3-4 days!', source: 'NIH', category: 'SCIENCE' },
    { factText: 'One tablespoon of a neutron star would weigh 6 billion tons.', factShort: 'Neutron star: 1 tablespoon = 6 billion tons!', source: 'NASA', category: 'SCIENCE' },
    { factText: 'Glass is actually a liquid that flows very slowly. Ancient windows are thicker at the bottom.', factShort: 'Glass: Actually a slow-flowing liquid!', source: 'Scientific American', category: 'SCIENCE' },

    // MORE CULTURE
    { factText: 'In South Korea, your "age" goes up on New Year\'s Day, not your birthday!', factShort: 'Korea: Age changes on New Year — not birthday!', source: 'Korea Herald', continent: 'ASIA', category: 'CULTURE' },
    { factText: 'In Japan, slurping your soup is a compliment to the chef and helps cool it down.', factShort: 'Japan: Slurp soup = compliment to chef!', source: 'Japan Tourism', continent: 'ASIA', category: 'CULTURE' },
    { factText: 'In some parts of China, brides wear red instead of white. White is for funerals.', factShort: 'China: Brides wear red — white is for funerals!', source: 'Chinese Culture', continent: 'ASIA', category: 'CULTURE' },
    { factText: 'In Brazil, the OK hand gesture is considered very offensive.', factShort: 'Brazil: OK gesture is offensive!', source: 'Culture Guide', continent: 'SOUTH_AMERICA', category: 'CULTURE' },
    { factText: 'In Russia, giving someone an even number of flowers is only for funerals.', factShort: 'Russia: Even flowers = funeral only!', source: 'Russian Culture', continent: 'EUROPE', category: 'CULTURE' },

    // MORE FUN FACTS
    { factText: 'A single strand of spaghetti is called a "spaghetto."', factShort: 'One spaghetti = "spaghetto"!', source: 'Italian Language', continent: 'EUROPE', category: 'FUN_FACTS' },
    { factText: 'Humans are the only animals that blush. Charles Darwin called it "the most peculiar expression."', factShort: 'Only humans blush — Darwin called it peculiar!', source: 'Darwin', category: 'FUN_FACTS' },
    { factText: 'A group of cats is called a "clowder." A group of kittens is a "kindle."', factShort: 'Cats: "Clowder" — Kittens: "Kindle"! 🐱', source: 'Oxford Dictionary', category: 'FUN_FACTS' },
    { factText: 'Nintendo originally sold playing cards, then vacuum cleaners, then love hotels before video games.', factShort: 'Nintendo: Playing cards → vacuums → love hotels → games!', source: 'Nintendo History', continent: 'ASIA', category: 'FUN_FACTS' },
    { factText: 'Cashews grow on the bottom of apples. The "cashew apple" fruit is edible too!', factShort: 'Cashews: Grow on apples!', source: 'USDA', continent: 'SOUTH_AMERICA', category: 'FUN_FACTS' },
    { factText: 'Your tongue print is as unique as your fingerprint.', factShort: 'Tongue print: Unique like fingerprints!', source: 'Biometrics', category: 'FUN_FACTS' },
    { factText: 'A blue whale\'s fart bubble is large enough to enclose a horse.', factShort: 'Blue whale fart: Big enough for a horse!', source: 'Marine Biology', category: 'FUN_FACTS' },
    { factText: 'Cows have best friends and get stressed when separated from them.', factShort: 'Cows: Have best friends — get stressed apart!', source: 'Animal Behavior', category: 'FUN_FACTS' },

    // MORE SPORTS
    { factText: 'Michael Jordan was cut from his high school basketball team sophomore year.', factShort: 'Jordan: Cut from high school team!', source: 'ESPN', continent: 'NORTH_AMERICA', category: 'SPORTS' },
    { factText: 'The Olympic flame is lit using a parabolic mirror and the sun in Greece for every Games.', factShort: 'Olympic flame: Lit by sunlight in Greece!', source: 'Olympics', continent: 'EUROPE', category: 'SPORTS' },
    { factText: 'Baseball was invented in 1846 but didn\'t have gloves until 1875. Players caught with bare hands!', factShort: 'Baseball 1846-1875: No gloves — bare hands!', source: 'Baseball Hall of Fame', continent: 'NORTH_AMERICA', category: 'SPORTS' },
    { factText: 'The Super Bowl halftime show is the most watched musical event in the world.', factShort: 'Super Bowl halftime: Most watched music event!', source: 'NFL', continent: 'NORTH_AMERICA', category: 'SPORTS' },
    { factText: 'Usain Bolt ate 1,000 Chicken McNuggets during the 2008 Beijing Olympics and won 3 gold medals.', factShort: 'Bolt: 1,000 McNuggets at Olympics — won 3 golds!', source: 'ESPN', continent: 'NORTH_AMERICA', category: 'SPORTS' },

    // MORE FOOD
    { factText: 'Ketchup was sold as medicine in the 1830s. It was believed to cure diarrhea!', factShort: 'Ketchup 1830s: Sold as medicine!', source: 'Smithsonian', continent: 'NORTH_AMERICA', category: 'FOOD' },
    { factText: 'Fortune cookies were invented in California, not China. Chinese restaurants in China don\'t have them!', factShort: 'Fortune cookies: Invented in California — not China!', source: 'NPR', continent: 'NORTH_AMERICA', category: 'FOOD' },
    { factText: 'Honey is the only food that never spoils. 3,000-year-old honey was found edible in Egyptian tombs.', factShort: 'Honey: Never spoils — 3,000-year-old still edible!', source: 'National Geographic', continent: 'AFRICA', category: 'FOOD' },
    { factText: 'Strawberries have more vitamin C than oranges. One cup has 150% of your daily needs!', factShort: 'Strawberries: More vitamin C than oranges!', source: 'USDA', category: 'FOOD' },
    { factText: 'The world\'s most stolen food is cheese. About 4% of all cheese produced is stolen!', factShort: 'Cheese: Most stolen food — 4% disappears!', source: 'British Cheese Board', continent: 'EUROPE', category: 'FOOD' },

    // MORE RECORDS
    { factText: 'The world\'s largest snowflake ever recorded was 15 inches wide — in Montana, 1887.', factShort: 'Biggest snowflake: 15 inches — Montana 1887!', source: 'Guinness World Records', continent: 'NORTH_AMERICA', category: 'RECORDS' },
    { factText: 'The most expensive painting ever sold was Da Vinci\'s Salvator Mundi for $450 million.', factShort: 'Most expensive painting: $450 million!', source: 'Christie\'s', continent: 'EUROPE', category: 'RECORDS' },
    { factText: 'The tallest man ever was 8\'11" (2.72m). Robert Wadlow was still growing when he died at 22.', factShort: 'Tallest man ever: 8\'11" — still growing!', source: 'Guinness World Records', continent: 'NORTH_AMERICA', category: 'RECORDS' },
    { factText: 'The smallest country by population is Vatican City with about 800 residents.', factShort: 'Vatican City: 800 people — smallest population!', source: 'Vatican', continent: 'EUROPE', category: 'RECORDS' },
    { factText: 'The loudest animal is the sperm whale — 230 decibels. That\'s louder than a rocket launch!', factShort: 'Sperm whale: 230 decibels — louder than rockets!', source: 'NOAA', category: 'RECORDS' },

    // FESTIVALS
    { factText: 'Diwali uses more fireworks than any other event in the world — over 1 billion each year.', factShort: 'Diwali: 1 billion fireworks — most in world!', source: 'Times of India', continent: 'ASIA', category: 'FESTIVALS' },
    { factText: 'Carnival in Rio has 2 million people dancing in the streets daily for a week.', factShort: 'Rio Carnival: 2 million dancing daily!', source: 'Rio Tourism', continent: 'SOUTH_AMERICA', category: 'FESTIVALS' },
    { factText: 'Oktoberfest serves 7 million liters of beer in just 16 days. That\'s 1.3 million gallons!', factShort: 'Oktoberfest: 7 million liters in 16 days!', source: 'Munich Tourism', continent: 'EUROPE', category: 'FESTIVALS' },
    { factText: 'The Holi festival of colors uses naturally colored powders from flowers and turmeric.', factShort: 'Holi colors: Made from flowers + turmeric!', source: 'India Tourism', continent: 'ASIA', category: 'FESTIVALS' },
    { factText: 'La Tomatina festival throws 150,000 tomatoes in one hour. Participants must squish tomatoes before throwing!', factShort: 'La Tomatina: 150,000 tomatoes in 1 hour!', source: 'Spain Tourism', continent: 'EUROPE', category: 'FESTIVALS' },
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
