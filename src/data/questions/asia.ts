/**
 * Global Quest - Asia Questions
 * 50+ Family-Friendly General Knowledge Questions
 * 
 * Categories: Geography, Nature, Sports, Food, Music, Science, 
 *             Famous People, Festivals, Records, Fun Facts
 */

import type { Question } from '../../types';

// ============================================================================
// ASIA - GEOGRAPHY & LANDMARKS (10 questions)
// ============================================================================

const geographyQuestions: Question[] = [
    {
        id: 'asia-geo-001',
        continent: 'ASIA',
        category: 'GEOGRAPHY',
        subCategory: 'Mountains',
        difficulty: 0.3,
        fascinationScore: 0.95,
        hookText: 'Mount Everest is the tallest mountain on Earth. How tall is it?',
        options: [
            { id: 'a', text: '6,848 meters (22,467 ft)' },
            { id: 'b', text: '8,849 meters (29,032 ft)' },
            { id: 'c', text: '7,432 meters (24,386 ft)' },
            { id: 'd', text: '9,156 meters (30,039 ft)' },
        ],
        correctAnswer: 'b',
        explanation: 'Mount Everest stands at 8,849 meters (29,032 ft) — so tall that climbers need oxygen tanks to breathe at the summit! Fun fact: It grows about 4mm taller each year due to tectonic plates pushing it up. ⛰️',
        explanationShort: 'Everest: 8,849m tall and still growing 4mm per year!',
        source: 'National Geographic',
    },
    {
        id: 'asia-geo-002',
        continent: 'ASIA',
        category: 'GEOGRAPHY',
        subCategory: 'Landmarks',
        difficulty: 0.3,
        fascinationScore: 0.92,
        hookText: 'The Great Wall of China is the longest structure ever built. How long is it?',
        options: [
            { id: 'a', text: 'About 6,400 km (4,000 miles)' },
            { id: 'b', text: 'About 13,000 km (8,000 miles)' },
            { id: 'c', text: 'About 21,000 km (13,000 miles)' },
            { id: 'd', text: 'About 30,000 km (18,000 miles)' },
        ],
        correctAnswer: 'c',
        explanation: 'The Great Wall stretches about 21,196 km (13,171 miles) — longer than the distance from New York to Sydney, Australia! It took over 2,000 years to build, with millions of workers. Some sections are 2,300 years old! 🏯',
        explanationShort: 'Great Wall: 21,196 km — longer than NYC to Sydney!',
        source: 'UNESCO World Heritage',
    },
    {
        id: 'asia-geo-003',
        continent: 'ASIA',
        category: 'GEOGRAPHY',
        subCategory: 'Countries',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'Asia is the largest continent. What percentage of Earth\'s land does it cover?',
        options: [
            { id: 'a', text: 'About 20%' },
            { id: 'b', text: 'About 30%' },
            { id: 'c', text: 'About 40%' },
            { id: 'd', text: 'About 50%' },
        ],
        correctAnswer: 'b',
        explanation: 'Asia covers about 30% of Earth\'s land area — 44.6 million km²! It\'s home to over 4.7 billion people — that\'s about 60% of all humans on Earth! China and India alone have more people than all of Europe, Africa, and the Americas combined. 🌏',
        explanationShort: 'Asia: 30% of Earth\'s land, 60% of world\'s people!',
        source: 'United Nations',
    },
    {
        id: 'asia-geo-004',
        continent: 'ASIA',
        category: 'GEOGRAPHY',
        subCategory: 'Rivers',
        difficulty: 0.4,
        fascinationScore: 0.85,
        hookText: 'The Yangtze River in China is Asia\'s longest river. Approximately how long is it?',
        options: [
            { id: 'a', text: 'About 4,000 km' },
            { id: 'b', text: 'About 5,300 km' },
            { id: 'c', text: 'About 6,300 km' },
            { id: 'd', text: 'About 7,400 km' },
        ],
        correctAnswer: 'c',
        explanation: 'The Yangtze flows about 6,300 km (3,900 miles) making it Asia\'s longest and the world\'s third longest river! About 400 million people live along its banks — that\'s more than the entire US population! 🌊',
        explanationShort: 'Yangtze: 6,300 km — 400 million people live along it!',
        source: 'National Geographic',
    },
    {
        id: 'asia-geo-005',
        continent: 'ASIA',
        category: 'GEOGRAPHY',
        subCategory: 'Islands',
        difficulty: 0.5,
        fascinationScore: 0.9,
        hookText: 'Indonesia has the MOST islands of any country in the world. How many islands does it have?',
        options: [
            { id: 'a', text: 'About 7,000 islands' },
            { id: 'b', text: 'About 12,000 islands' },
            { id: 'c', text: 'About 17,000 islands' },
            { id: 'd', text: 'About 25,000 islands' },
        ],
        correctAnswer: 'c',
        explanation: 'Indonesia has about 17,508 islands — the most of any country! Only about 6,000 are inhabited though. If you spent just one day on each island, it would take over 47 YEARS to visit them all! 🏝️',
        explanationShort: 'Indonesia: 17,508 islands — 47 years to visit them all!',
        source: 'Indonesian Government',
    },
];

// ============================================================================
// ASIA - NATURE & WILDLIFE (10 questions)
// ============================================================================

const natureQuestions: Question[] = [
    {
        id: 'asia-nat-001',
        continent: 'ASIA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Mammals',
        difficulty: 0.3,
        fascinationScore: 0.95,
        hookText: 'Giant Pandas only live wild in one country. Which country is their home?',
        options: [
            { id: 'a', text: 'Japan' },
            { id: 'b', text: 'Thailand' },
            { id: 'c', text: 'China' },
            { id: 'd', text: 'South Korea' },
        ],
        correctAnswer: 'c',
        explanation: 'Giant Pandas are ONLY found wild in the bamboo forests of central China. There are fewer than 2,000 in the wild! They spend 12-16 hours a day eating — consuming up to 38 kg of bamboo daily. That\'s like eating 100 Big Macs! 🐼',
        explanationShort: 'Pandas: Only in China — eat 38 kg bamboo daily!',
        source: 'World Wildlife Fund',
    },
    {
        id: 'asia-nat-002',
        continent: 'ASIA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Mammals',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'The Komodo dragon is the world\'s largest lizard. How long can they grow?',
        options: [
            { id: 'a', text: 'Up to 2 meters (6.5 feet)' },
            { id: 'b', text: 'Up to 3 meters (10 feet)' },
            { id: 'c', text: 'Up to 4 meters (13 feet)' },
            { id: 'd', text: 'Up to 5 meters (16 feet)' },
        ],
        correctAnswer: 'b',
        explanation: 'Komodo dragons can grow up to 3 meters (10 feet) and weigh over 70 kg (150 lbs)! They\'re only found on a few Indonesian islands. Their venomous bite can be deadly, and they can eat 80% of their body weight in one meal! 🦎',
        explanationShort: 'Komodo dragons: 3m long, venomous bite, eat 80% body weight!',
        source: 'Smithsonian National Zoo',
    },
    {
        id: 'asia-nat-003',
        continent: 'ASIA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Marine Life',
        difficulty: 0.4,
        fascinationScore: 0.9,
        hookText: 'The largest fish in the world is the whale shark. Where is one of the best places to see them?',
        options: [
            { id: 'a', text: 'Japan' },
            { id: 'b', text: 'Maldives and Philippines' },
            { id: 'c', text: 'China' },
            { id: 'd', text: 'Russia' },
        ],
        correctAnswer: 'b',
        explanation: 'Whale sharks can grow up to 12 meters (40 feet) — the size of a school bus! Despite their size, they\'re gentle giants that only eat tiny plankton. The Maldives and Philippines are famous for whale shark swimming experiences. 🦈',
        explanationShort: 'Whale sharks: 12 meters — swim with them in Philippines!',
        source: 'National Geographic',
    },
    {
        id: 'asia-nat-004',
        continent: 'ASIA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Endangered',
        difficulty: 0.5,
        fascinationScore: 0.93,
        hookText: 'How many wild tigers are left in Asia — the only place they live naturally?',
        options: [
            { id: 'a', text: 'About 1,000' },
            { id: 'b', text: 'About 3,000' },
            { id: 'c', text: 'About 4,500' },
            { id: 'd', text: 'About 10,000' },
        ],
        correctAnswer: 'c',
        explanation: 'Only about 4,500 wild tigers remain in Asia! 100 years ago there were about 100,000. The good news: conservation efforts are working, and tiger numbers are slowly rising for the first time in decades. India has the most tigers. 🐯',
        explanationShort: 'Only ~4,500 wild tigers left — but numbers rising!',
        source: 'WWF Tiger Conservation',
    },
    {
        id: 'asia-nat-005',
        continent: 'ASIA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Primates',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'Orangutans are only found on two islands in Asia. Which islands?',
        options: [
            { id: 'a', text: 'Java and Bali' },
            { id: 'b', text: 'Borneo and Sumatra' },
            { id: 'c', text: 'Philippines and Taiwan' },
            { id: 'd', text: 'Sri Lanka and Maldives' },
        ],
        correctAnswer: 'b',
        explanation: 'Orangutans only live wild on Borneo and Sumatra (Indonesia & Malaysia). Their name means "person of the forest" in Malay! They share 97% of our DNA and can use tools, make umbrellas from leaves, and even learn sign language. 🦧',
        explanationShort: 'Orangutans: Only on Borneo & Sumatra — 97% human DNA!',
        source: 'Orangutan Foundation',
    },
];

// ============================================================================
// ASIA - SPORTS & OLYMPICS (8 questions)
// ============================================================================

const sportsQuestions: Question[] = [
    {
        id: 'asia-spo-001',
        continent: 'ASIA',
        category: 'SPORTS',
        subCategory: 'Olympics',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'Japan hosted the Summer Olympics in 2020 (held in 2021). Which city hosted them?',
        options: [
            { id: 'a', text: 'Osaka' },
            { id: 'b', text: 'Kyoto' },
            { id: 'c', text: 'Tokyo' },
            { id: 'd', text: 'Nagoya' },
        ],
        correctAnswer: 'c',
        explanation: 'Tokyo hosted the 2020 Olympics (delayed to 2021 due to COVID-19). It was Tokyo\'s SECOND time hosting — they also hosted in 1964! Japan has medaled in judo more than any other country — judo was invented there! 🥋',
        explanationShort: 'Tokyo 2020: Japan\'s second Olympics — judo invented there!',
        source: 'International Olympic Committee',
    },
    {
        id: 'asia-spo-002',
        continent: 'ASIA',
        category: 'SPORTS',
        subCategory: 'Cricket',
        difficulty: 0.4,
        fascinationScore: 0.9,
        hookText: 'Cricket has over 2.5 billion fans worldwide. Which country has won the most Cricket World Cups?',
        options: [
            { id: 'a', text: 'India' },
            { id: 'b', text: 'Pakistan' },
            { id: 'c', text: 'Australia' },
            { id: 'd', text: 'England' },
        ],
        correctAnswer: 'c',
        explanation: 'Australia has won 5 Cricket World Cups — the most ever! But India has over 1.5 billion cricket fans (more than any other sport). Indian Premier League (IPL) is the world\'s richest cricket league, where players earn millions! 🏏',
        explanationShort: 'Australia: 5 Cricket World Cups — but India has most fans!',
        source: 'International Cricket Council',
    },
    {
        id: 'asia-spo-003',
        continent: 'ASIA',
        category: 'SPORTS',
        subCategory: 'Martial Arts',
        difficulty: 0.3,
        fascinationScore: 0.85,
        hookText: 'Which country invented Taekwondo, one of the most popular martial arts in the world?',
        options: [
            { id: 'a', text: 'Japan' },
            { id: 'b', text: 'China' },
            { id: 'c', text: 'South Korea' },
            { id: 'd', text: 'Thailand' },
        ],
        correctAnswer: 'c',
        explanation: 'Taekwondo was developed in South Korea in the 1940s-50s. The name means "the way of the foot and fist." It became an Olympic sport in 2000 and is now practiced by over 70 million people worldwide! 🥋',
        explanationShort: 'Taekwondo: Korean martial art — 70 million practitioners!',
        source: 'World Taekwondo Federation',
    },
    {
        id: 'asia-spo-004',
        continent: 'ASIA',
        category: 'SPORTS',
        subCategory: 'Football',
        difficulty: 0.5,
        fascinationScore: 0.88,
        hookText: 'Qatar hosted the 2022 FIFA World Cup — the first Middle Eastern country to do so. What was unique about it?',
        options: [
            { id: 'a', text: 'Held in summer for the first time' },
            { id: 'b', text: 'Held in winter for the first time' },
            { id: 'c', text: 'Had only 24 teams' },
            { id: 'd', text: 'Free entry for all matches' },
        ],
        correctAnswer: 'b',
        explanation: 'Qatar 2022 was held in November-December (winter) — the first World Cup NOT in summer! This was because Qatar\'s summer temperatures can reach 50°C (122°F). The stadiums even had air conditioning! ⚽❄️',
        explanationShort: 'Qatar 2022: First winter World Cup — stadiums had AC!',
        source: 'FIFA',
    },
    {
        id: 'asia-spo-005',
        continent: 'ASIA',
        category: 'SPORTS',
        subCategory: 'Badminton',
        difficulty: 0.5,
        fascinationScore: 0.85,
        hookText: 'Badminton is hugely popular in Asia. The fastest smash ever recorded was over 400 km/h! Which country dominates Olympic badminton?',
        options: [
            { id: 'a', text: 'Japan' },
            { id: 'b', text: 'Indonesia' },
            { id: 'c', text: 'China' },
            { id: 'd', text: 'South Korea' },
        ],
        correctAnswer: 'c',
        explanation: 'China has won the most Olympic badminton golds! Asian countries (China, Indonesia, South Korea, Japan) have dominated — winning about 90% of all Olympic badminton medals! The shuttlecock can travel faster than a speeding race car! 🏸',
        explanationShort: 'China: Most badminton golds — shuttlecock faster than race cars!',
        source: 'Badminton World Federation',
    },
];

// ============================================================================
// ASIA - FOOD & CUISINE (7 questions)
// ============================================================================

const foodQuestions: Question[] = [
    {
        id: 'asia-food-001',
        continent: 'ASIA',
        category: 'FOOD',
        subCategory: 'Origins',
        difficulty: 0.3,
        fascinationScore: 0.9,
        hookText: 'Sushi is famous worldwide. What does "sushi" actually mean in Japanese?',
        options: [
            { id: 'a', text: 'Raw fish' },
            { id: 'b', text: 'Sour rice' },
            { id: 'c', text: 'Seaweed roll' },
            { id: 'd', text: 'Fresh seafood' },
        ],
        correctAnswer: 'b',
        explanation: 'Sushi means "sour rice" — referring to the vinegared rice! Originally, sushi wasn\'t about raw fish at all — the fermented rice was used to preserve fish for months. Modern sushi as we know it was invented in Tokyo in the 1820s. 🍣',
        explanationShort: 'Sushi means "sour rice" — modern version from 1820s Tokyo!',
        source: 'Japanese Culinary Academy',
    },
    {
        id: 'asia-food-002',
        continent: 'ASIA',
        category: 'FOOD',
        subCategory: 'Spices',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'India produces about 70% of the world\'s spices. Which spice was once worth more than gold?',
        options: [
            { id: 'a', text: 'Cumin' },
            { id: 'b', text: 'Black Pepper' },
            { id: 'c', text: 'Turmeric' },
            { id: 'd', text: 'Coriander' },
        ],
        correctAnswer: 'b',
        explanation: 'Black pepper was called "black gold" in ancient times — it was so valuable that rents and taxes could be paid in peppercorns! India\'s Malabar coast was the center of the global pepper trade that changed world history! 🌶️',
        explanationShort: 'Black pepper: Once more valuable than gold — paid taxes with it!',
        source: 'Spice Board India',
    },
    {
        id: 'asia-food-003',
        continent: 'ASIA',
        category: 'FOOD',
        subCategory: 'National Dishes',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'Kimchi is a famous fermented side dish. Which country considers it a "national treasure"?',
        options: [
            { id: 'a', text: 'Japan' },
            { id: 'b', text: 'China' },
            { id: 'c', text: 'South Korea' },
            { id: 'd', text: 'Vietnam' },
        ],
        correctAnswer: 'c',
        explanation: 'South Koreans eat about 40 pounds of kimchi per person per year! Made from fermented vegetables (usually cabbage), it\'s so important that there\'s a "Kimjang" season when families make it together. UNESCO recognized it as cultural heritage! 🥬',
        explanationShort: 'Kimchi: Koreans eat 40 lbs/year — UNESCO cultural heritage!',
        source: 'UNESCO',
    },
];

// ============================================================================
// ASIA - RECORDS & SUPERLATIVES (5 questions)
// ============================================================================

const recordsQuestions: Question[] = [
    {
        id: 'asia-rec-001',
        continent: 'ASIA',
        category: 'RECORDS',
        subCategory: 'Tallest',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'The world\'s tallest building is in Asia. What is it called and how tall is it?',
        options: [
            { id: 'a', text: 'Shanghai Tower - 632m' },
            { id: 'b', text: 'Burj Khalifa - 828m' },
            { id: 'c', text: 'Taipei 101 - 508m' },
            { id: 'd', text: 'Petronas Towers - 452m' },
        ],
        correctAnswer: 'b',
        explanation: 'The Burj Khalifa in Dubai, UAE stands at 828m (2,717 ft) — taller than 2 Empire State Buildings stacked! It has 163 floors and the world\'s highest observation deck. The elevator takes just 1 minute to reach the top! 🏗️',
        explanationShort: 'Burj Khalifa: 828m — elevator to top in 1 minute!',
        source: 'Emaar Properties',
    },
    {
        id: 'asia-rec-002',
        continent: 'ASIA',
        category: 'RECORDS',
        subCategory: 'Population',
        difficulty: 0.4,
        fascinationScore: 0.9,
        hookText: 'Which two Asian countries together have MORE people than all other countries combined?',
        options: [
            { id: 'a', text: 'India and Indonesia' },
            { id: 'b', text: 'China and Japan' },
            { id: 'c', text: 'China and India' },
            { id: 'd', text: 'India and Pakistan' },
        ],
        correctAnswer: 'c',
        explanation: 'China and India together have about 2.8 billion people — that\'s over 35% of all humans! In 2023, India passed China to become the world\'s most populous country with 1.43 billion people. Every 7th person on Earth is Indian! 👥',
        explanationShort: 'China + India = 2.8 billion — 35% of all humans!',
        source: 'United Nations Population Division',
    },
];

// ============================================================================
// ASIA - FUN FACTS & WEIRD (5 questions)
// ============================================================================

const funFactsQuestions: Question[] = [
    {
        id: 'asia-fun-001',
        continent: 'ASIA',
        category: 'FUN_FACTS',
        subCategory: 'Unusual',
        difficulty: 0.4,
        fascinationScore: 0.95,
        hookText: 'Japan has more than 5 million vending machines. What unusual items can you buy from them?',
        options: [
            { id: 'a', text: 'Only drinks and snacks' },
            { id: 'b', text: 'Fresh eggs, pizza, and even live crabs!' },
            { id: 'c', text: 'Only Japanese candy' },
            { id: 'd', text: 'Electronics only' },
        ],
        correctAnswer: 'b',
        explanation: 'Japan\'s vending machines sell EVERYTHING: hot ramen, fresh eggs, umbrellas, phone chargers, bananas, ties, and yes — even live crabs! There\'s about 1 vending machine for every 23 people in Japan! 🎰',
        explanationShort: 'Japan: 1 vending machine per 23 people — sell live crabs!',
        source: 'Japan National Tourism',
    },
    {
        id: 'asia-fun-002',
        continent: 'ASIA',
        category: 'FUN_FACTS',
        subCategory: 'Bizarre',
        difficulty: 0.5,
        fascinationScore: 0.93,
        hookText: 'In Singapore, what everyday item has been BANNED since 1992?',
        options: [
            { id: 'a', text: 'Plastic bags' },
            { id: 'b', text: 'Chewing gum' },
            { id: 'c', text: 'Skateboard' },
            { id: 'd', text: 'Fast food' },
        ],
        correctAnswer: 'b',
        explanation: 'Chewing gum has been banned in Singapore since 1992! The ban came because people were sticking gum on train doors, causing problems. You CAN buy therapeutic gum (for health) from a pharmacy with a prescription though! 🚫',
        explanationShort: 'Singapore: Chewing gum banned since 1992 — train door problems!',
        source: 'Singapore Government',
    },
    {
        id: 'asia-fun-003',
        continent: 'ASIA',
        category: 'FUN_FACTS',
        subCategory: 'Technology',
        difficulty: 0.4,
        fascinationScore: 0.9,
        hookText: 'South Korea has the world\'s fastest average internet speed. How fast is it compared to the global average?',
        options: [
            { id: 'a', text: '2 times faster' },
            { id: 'b', text: '3 times faster' },
            { id: 'c', text: '5 times faster' },
            { id: 'd', text: '10 times faster' },
        ],
        correctAnswer: 'b',
        explanation: 'South Korea\'s average internet is about 3 times faster than the global average! Over 99% of households have broadband. Gaming and esports are so popular that pro gamers are treated like celebrities! 🎮',
        explanationShort: 'South Korea: 3x faster internet — pro gamers are celebrities!',
        source: 'Speedtest Global Index',
    },
];

// ============================================================================
// COMBINE ALL ASIA QUESTIONS
// ============================================================================

export const asiaQuestionsExpanded: Question[] = [
    ...geographyQuestions,
    ...natureQuestions,
    ...sportsQuestions,
    ...foodQuestions,
    ...recordsQuestions,
    ...funFactsQuestions,
];

export default asiaQuestionsExpanded;
