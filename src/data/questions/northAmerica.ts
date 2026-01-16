/**
 * Global Quest - North America Questions
 * 50+ Family-Friendly General Knowledge Questions
 * 
 * Categories: Geography, Nature, Sports, Food, Music, Science, 
 *             Famous People, Festivals, Records, Fun Facts
 */

import type { Question } from '../../types';

// ============================================================================
// NORTH AMERICA - GEOGRAPHY & LANDMARKS (12 questions)
// ============================================================================

const geographyQuestions: Question[] = [
    {
        id: 'namerica-geo-001',
        continent: 'NORTH_AMERICA',
        category: 'GEOGRAPHY',
        subCategory: 'Landmarks',
        difficulty: 0.3,
        fascinationScore: 0.92,
        hookText: 'The Grand Canyon is so big you can fit the entire country of Singapore inside it. How deep is it?',
        options: [
            { id: 'a', text: 'About 500 meters (1,640 ft)' },
            { id: 'b', text: 'About 1,000 meters (3,280 ft)' },
            { id: 'c', text: 'About 1,800 meters (6,000 ft)' },
            { id: 'd', text: 'About 2,500 meters (8,200 ft)' },
        ],
        correctAnswer: 'c',
        explanation: 'The Grand Canyon is over 1,800 meters (6,000 ft) deep! It was carved by the Colorado River over 5-6 million years. The rocks at the bottom are 2 billion years old — nearly half the age of Earth itself! 🏜️',
        explanationShort: 'Grand Canyon: 1,800m deep — rocks 2 billion years old!',
        source: 'National Park Service',
    },
    {
        id: 'namerica-geo-002',
        continent: 'NORTH_AMERICA',
        category: 'GEOGRAPHY',
        subCategory: 'Lakes',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'The Great Lakes contain what percentage of the world\'s fresh surface water?',
        options: [
            { id: 'a', text: 'About 5%' },
            { id: 'b', text: 'About 10%' },
            { id: 'c', text: 'About 20%' },
            { id: 'd', text: 'About 35%' },
        ],
        correctAnswer: 'c',
        explanation: 'The Great Lakes hold about 20% of the world\'s fresh surface water! That\'s enough water to cover all of North and South America 1 foot deep. Lake Superior alone is so big you could fit all other Great Lakes inside it! 🌊',
        explanationShort: 'Great Lakes: 20% of world\'s fresh surface water!',
        source: 'EPA',
    },
    {
        id: 'namerica-geo-003',
        continent: 'NORTH_AMERICA',
        category: 'GEOGRAPHY',
        subCategory: 'Borders',
        difficulty: 0.3,
        fascinationScore: 0.9,
        hookText: 'The border between USA and Canada is the longest international border in the world. How long is it?',
        options: [
            { id: 'a', text: 'About 4,000 km' },
            { id: 'b', text: 'About 6,000 km' },
            { id: 'c', text: 'About 8,900 km' },
            { id: 'd', text: 'About 12,000 km' },
        ],
        correctAnswer: 'c',
        explanation: 'The USA-Canada border is 8,891 km (5,525 miles) — the longest in the world! Most of it is unguarded. There\'s even a library that sits on the border where you can enter from one country and exit in another! 📚🇺🇸🇨🇦',
        explanationShort: 'USA-Canada border: 8,891 km — world\'s longest, mostly unguarded!',
        source: 'International Boundary Commission',
    },
    {
        id: 'namerica-geo-004',
        continent: 'NORTH_AMERICA',
        category: 'GEOGRAPHY',
        subCategory: 'Landmarks',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'Niagara Falls is so powerful it generates electricity for 2 countries. How much water goes over it per second?',
        options: [
            { id: 'a', text: 'About 500,000 gallons' },
            { id: 'b', text: 'About 700,000 gallons' },
            { id: 'c', text: 'About 1,000,000 gallons' },
            { id: 'd', text: 'About 2,000,000 gallons' },
        ],
        correctAnswer: 'b',
        explanation: 'About 750,000 gallons (2.8 million liters) of water go over Niagara Falls every SECOND! It generates enough power for 3.8 million homes. The falls are also slowly eroding — they\'ve moved 7 miles upstream in 12,000 years! ⚡💦',
        explanationShort: 'Niagara: 750,000 gallons/second — powers 3.8 million homes!',
        source: 'Niagara Parks Commission',
    },
    {
        id: 'namerica-geo-005',
        continent: 'NORTH_AMERICA',
        category: 'GEOGRAPHY',
        subCategory: 'Cities',
        difficulty: 0.3,
        fascinationScore: 0.85,
        hookText: 'Mexico City was built on top of an ancient lake. Why does it sink every year?',
        options: [
            { id: 'a', text: 'Heavy buildings' },
            { id: 'b', text: 'Earthquakes' },
            { id: 'c', text: 'Pumping out groundwater' },
            { id: 'd', text: 'Underground rivers' },
        ],
        correctAnswer: 'c',
        explanation: 'Mexico City sinks about 20 inches (50 cm) per year because groundwater is being pumped out faster than it can be replaced! The city was built on the ruins of the Aztec capital Tenochtitlan, which was on an island in a lake. 🏙️',
        explanationShort: 'Mexico City: Sinks 50 cm/year — built on ancient Aztec lake!',
        source: 'National Geographic',
    },
];

// ============================================================================
// NORTH AMERICA - NATURE & WILDLIFE (10 questions)
// ============================================================================

const natureQuestions: Question[] = [
    {
        id: 'namerica-nat-001',
        continent: 'NORTH_AMERICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Mammals',
        difficulty: 0.3,
        fascinationScore: 0.9,
        hookText: 'The American bison nearly went extinct. From 30 million, how few were left in 1889?',
        options: [
            { id: 'a', text: 'About 50,000' },
            { id: 'b', text: 'About 10,000' },
            { id: 'c', text: 'About 1,000' },
            { id: 'd', text: 'About 500' },
        ],
        correctAnswer: 'c',
        explanation: 'From 30 million bison, only about 1,000 remained by 1889 due to overhunting! Thanks to conservation, there are now about 500,000 bison in North America. Yellowstone National Park has the only wild bison that never went extinct locally. 🦬',
        explanationShort: 'Bison: From 30 million to 1,000 — now 500,000 again!',
        source: 'National Park Service',
    },
    {
        id: 'namerica-nat-002',
        continent: 'NORTH_AMERICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Migration',
        difficulty: 0.4,
        fascinationScore: 0.95,
        hookText: 'Monarch butterflies migrate 3,000 miles. How do they know where to go if they\'ve never been there?',
        options: [
            { id: 'a', text: 'They follow other butterflies' },
            { id: 'b', text: 'An internal compass using the sun and Earth\'s magnetic field' },
            { id: 'c', text: 'They smell the destination' },
            { id: 'd', text: 'Random chance' },
        ],
        correctAnswer: 'b',
        explanation: 'Monarch butterflies have a built-in compass that uses the sun\'s position and Earth\'s magnetic field! They fly 3,000 miles from Canada to Mexico — a trip that takes 3-4 generations. The butterflies that return are great-great-grandchildren of those that left! 🦋',
        explanationShort: 'Monarchs: 3,000-mile journey — takes 4 generations!',
        source: 'National Geographic',
    },
    {
        id: 'namerica-nat-003',
        continent: 'NORTH_AMERICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Marine',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'The California sea otter sleeps holding hands with other otters. Why?',
        options: [
            { id: 'a', text: 'To show affection' },
            { id: 'b', text: 'To keep warm' },
            { id: 'c', text: 'So they don\'t drift apart while sleeping' },
            { id: 'd', text: 'To protect from predators' },
        ],
        correctAnswer: 'c',
        explanation: 'Sea otters hold hands (called a "raft") so they don\'t drift apart while sleeping on the ocean! They also wrap themselves in kelp like a blanket. Otters are keystone species — without them, sea urchins would destroy entire kelp forests. 🦦❤️',
        explanationShort: 'Sea otters: Hold hands to not drift apart — super cute!',
        source: 'Monterey Bay Aquarium',
    },
    {
        id: 'namerica-nat-004',
        continent: 'NORTH_AMERICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Birds',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'The California Condor is North America\'s largest flying bird. What\'s its wingspan?',
        options: [
            { id: 'a', text: 'About 2 meters (6.5 ft)' },
            { id: 'b', text: 'About 2.5 meters (8 ft)' },
            { id: 'c', text: 'About 3 meters (9.8 ft)' },
            { id: 'd', text: 'About 3.5 meters (11.5 ft)' },
        ],
        correctAnswer: 'c',
        explanation: 'California Condors have a wingspan of nearly 3 meters (9.8 ft) — taller than most basketball players! In 1987, only 27 existed. Thanks to conservation breeding programs, there are now over 500. Each bird is numbered and tracked! 🦅',
        explanationShort: 'California Condor: 3m wingspan, saved from extinction!',
        source: 'US Fish & Wildlife Service',
    },
];

// ============================================================================
// NORTH AMERICA - SPORTS (10 questions)
// ============================================================================

const sportsQuestions: Question[] = [
    {
        id: 'namerica-spo-001',
        continent: 'NORTH_AMERICA',
        category: 'SPORTS',
        subCategory: 'Basketball',
        difficulty: 0.3,
        fascinationScore: 0.9,
        hookText: 'The NBA was created in which year, and in which city was the first game played?',
        options: [
            { id: 'a', text: '1946 in New York' },
            { id: 'b', text: '1946 in Toronto' },
            { id: 'c', text: '1956 in Boston' },
            { id: 'd', text: '1936 in Chicago' },
        ],
        correctAnswer: 'b',
        explanation: 'The first NBA game (then called BAA) was played in Toronto, Canada on November 1, 1946! The New York Knickerbockers beat the Toronto Huskies 68-66. Fun fact: Basketball was invented in Springfield, Massachusetts by Canadian James Naismith using peach baskets! 🏀',
        explanationShort: 'First NBA game: Toronto 1946 — invented with peach baskets!',
        source: 'NBA Official',
    },
    {
        id: 'namerica-spo-002',
        continent: 'NORTH_AMERICA',
        category: 'SPORTS',
        subCategory: 'American Football',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'The Super Bowl is the most-watched TV event in America. How many chicken wings are eaten on Super Bowl Sunday?',
        options: [
            { id: 'a', text: 'About 500 million' },
            { id: 'b', text: 'About 1 billion' },
            { id: 'c', text: 'About 1.4 billion' },
            { id: 'd', text: 'About 2 billion' },
        ],
        correctAnswer: 'c',
        explanation: 'Americans eat about 1.4 BILLION chicken wings on Super Bowl Sunday! That\'s enough to circle the Earth 3 times. The Super Bowl halftime show is watched by over 100 million people. Some companies pay $7 million for a 30-second ad! 🏈🍗',
        explanationShort: 'Super Bowl: 1.4 billion wings eaten, $7M for 30-sec ad!',
        source: 'National Chicken Council',
    },
    {
        id: 'namerica-spo-003',
        continent: 'NORTH_AMERICA',
        category: 'SPORTS',
        subCategory: 'Baseball',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'In baseball, what does it mean to "hit for the cycle"?',
        options: [
            { id: 'a', text: 'Hit a home run that circles the bases' },
            { id: 'b', text: 'Hit a single, double, triple, and home run in one game' },
            { id: 'c', text: 'Hit the ball in a circular motion' },
            { id: 'd', text: 'Get hits in 4 consecutive at-bats' },
        ],
        correctAnswer: 'b',
        explanation: 'Hitting for the cycle means getting a single, double, triple, AND home run all in the same game! It\'s super rare — only about 300 times in MLB history (since 1876). The triple is usually the hardest to get because you need speed! ⚾',
        explanationShort: 'Hitting the cycle: Single + Double + Triple + Home run = Rare!',
        source: 'Major League Baseball',
    },
    {
        id: 'namerica-spo-004',
        continent: 'NORTH_AMERICA',
        category: 'SPORTS',
        subCategory: 'Hockey',
        difficulty: 0.4,
        fascinationScore: 0.85,
        hookText: 'Ice hockey is Canada\'s national winter sport. How fast can a hockey puck travel?',
        options: [
            { id: 'a', text: 'Up to 100 mph (160 km/h)' },
            { id: 'b', text: 'Up to 125 mph (200 km/h)' },
            { id: 'c', text: 'Up to 150 mph (240 km/h)' },
            { id: 'd', text: 'Up to 175 mph (280 km/h)' },
        ],
        correctAnswer: 'a',
        explanation: 'NHL players shoot pucks at over 100 mph (160 km/h)! The fastest recorded shot was 108.8 mph by Zdeno Chara. The Stanley Cup is the oldest trophy in North American professional sports (since 1893), and every player gets to keep it for a day! 🏒',
        explanationShort: 'Hockey pucks: 100+ mph — Stanley Cup is oldest trophy!',
        source: 'NHL Official',
    },
];

// ============================================================================
// NORTH AMERICA - FOOD & CUISINE (8 questions)
// ============================================================================

const foodQuestions: Question[] = [
    {
        id: 'namerica-food-001',
        continent: 'NORTH_AMERICA',
        category: 'FOOD',
        subCategory: 'Origins',
        difficulty: 0.3,
        fascinationScore: 0.9,
        hookText: 'Chocolate chip cookies were invented by accident. What was Ruth Wakefield trying to make?',
        options: [
            { id: 'a', text: 'Chocolate cake' },
            { id: 'b', text: 'Chocolate cookies' },
            { id: 'c', text: 'Brownies' },
            { id: 'd', text: 'Hot chocolate' },
        ],
        correctAnswer: 'b',
        explanation: 'In 1938, Ruth Wakefield added broken chocolate pieces to cookies expecting them to melt and create chocolate cookies. Instead, the chips held their shape — and the chocolate chip cookie was born! She later sold the recipe to Nestlé for a lifetime supply of chocolate! 🍪',
        explanationShort: 'Choco chip cookies: Accident! Chips didn\'t melt as expected!',
        source: 'Smithsonian Magazine',
    },
    {
        id: 'namerica-food-002',
        continent: 'NORTH_AMERICA',
        category: 'FOOD',
        subCategory: 'National Dishes',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'Poutine is Canada\'s most famous dish. What are the three main ingredients?',
        options: [
            { id: 'a', text: 'Pasta, cheese, bacon' },
            { id: 'b', text: 'Fries, cheese curds, gravy' },
            { id: 'c', text: 'Rice, beans, meat' },
            { id: 'd', text: 'Potatoes, cream, onions' },
        ],
        correctAnswer: 'b',
        explanation: 'Poutine = French fries + cheese curds + brown gravy! It was invented in Quebec in the 1950s. The cheese MUST squeak when you bite it — that\'s how you know it\'s fresh! Canadians eat poutine at hockey games, fast food joints, and even fancy restaurants. 🍟',
        explanationShort: 'Poutine: Fries + squeaky cheese curds + gravy = Canadian magic!',
        source: 'Canadian Tourism Commission',
    },
    {
        id: 'namerica-food-003',
        continent: 'NORTH_AMERICA',
        category: 'FOOD',
        subCategory: 'Fast Food',
        difficulty: 0.3,
        fascinationScore: 0.85,
        hookText: 'How many McDonald\'s restaurants are there worldwide?',
        options: [
            { id: 'a', text: 'About 20,000' },
            { id: 'b', text: 'About 30,000' },
            { id: 'c', text: 'About 40,000' },
            { id: 'd', text: 'About 50,000' },
        ],
        correctAnswer: 'c',
        explanation: 'There are about 40,000 McDonald\'s in over 100 countries! About 69 million people eat at McDonald\'s every day — that\'s like the entire population of the UK! The first McDonald\'s opened in California in 1940 by brothers Richard and Maurice McDonald. 🍔',
        explanationShort: 'McDonald\'s: 40,000 locations — 69 million daily customers!',
        source: 'McDonald\'s Corporation',
    },
];

// ============================================================================
// NORTH AMERICA - RECORDS & FUN FACTS (8 questions)
// ============================================================================

const recordsAndFunFacts: Question[] = [
    {
        id: 'namerica-rec-001',
        continent: 'NORTH_AMERICA',
        category: 'RECORDS',
        subCategory: 'Tallest',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'California\'s redwood trees are the tallest living things on Earth. How tall can they grow?',
        options: [
            { id: 'a', text: 'About 80 meters (262 ft)' },
            { id: 'b', text: 'About 100 meters (328 ft)' },
            { id: 'c', text: 'About 115 meters (380 ft)' },
            { id: 'd', text: 'About 130 meters (426 ft)' },
        ],
        correctAnswer: 'c',
        explanation: 'The tallest tree ever measured is Hyperion, a coast redwood at 115.92 meters (380.3 ft) — taller than the Statue of Liberty! These trees can live over 2,000 years. Their bark is fire-resistant and can be 30 cm (1 foot) thick! 🌲',
        explanationShort: 'Hyperion redwood: 115.9m — taller than Statue of Liberty!',
        source: 'California State Parks',
    },
    {
        id: 'namerica-fun-001',
        continent: 'NORTH_AMERICA',
        category: 'FUN_FACTS',
        subCategory: 'Unusual',
        difficulty: 0.5,
        fascinationScore: 0.95,
        hookText: 'The US has ONE town with a population of exactly 1. What\'s the mayor\'s unusual job?',
        options: [
            { id: 'a', text: 'Running a gas station' },
            { id: 'b', text: 'Being the bartender at the only bar' },
            { id: 'c', text: 'Running the post office' },
            { id: 'd', text: 'Managing a motel' },
        ],
        correctAnswer: 'b',
        explanation: 'Monowi, Nebraska\'s only resident is Elsie Eiler. She\'s the mayor, the clerk, the librarian, and she runs the town\'s only bar — the Monowi Tavern! She gives herself a liquor license and pays taxes to herself. She even votes in elections (for herself)! 🍺',
        explanationShort: 'Monowi, Nebraska: Population 1 — she\'s her own mayor!',
        source: 'Atlas Obscura',
    },
    {
        id: 'namerica-fun-002',
        continent: 'NORTH_AMERICA',
        category: 'FUN_FACTS',
        subCategory: 'Bizarre',
        difficulty: 0.4,
        fascinationScore: 0.93,
        hookText: 'Alaska is so big that if you placed it over the Continental US, it would stretch from which city to which?',
        options: [
            { id: 'a', text: 'New York to Chicago' },
            { id: 'b', text: 'Los Angeles to Dallas' },
            { id: 'c', text: 'Los Angeles to Jacksonville, Florida (coast to coast!)' },
            { id: 'd', text: 'Seattle to Denver' },
        ],
        correctAnswer: 'c',
        explanation: 'Alaska is SO big it would stretch from California to Florida! It\'s 2.5 times the size of Texas. Alaska has more coastline than all other US states combined. And fun fact: there are more bears than people in some Alaskan towns! 🐻❄️',
        explanationShort: 'Alaska: Coast to coast! More coastline than all other states combined!',
        source: 'Alaska Geographic',
    },
    {
        id: 'namerica-fun-003',
        continent: 'NORTH_AMERICA',
        category: 'FUN_FACTS',
        subCategory: 'Technology',
        difficulty: 0.4,
        fascinationScore: 0.9,
        hookText: 'The internet was invented in the USA. What year was the first message sent between computers?',
        options: [
            { id: 'a', text: '1959' },
            { id: 'b', text: '1969' },
            { id: 'c', text: '1979' },
            { id: 'd', text: '1989' },
        ],
        correctAnswer: 'b',
        explanation: 'The first internet message was sent on October 29, 1969 between UCLA and Stanford. They tried to type "LOGIN" but the system crashed after "LO" — so the first message was accidentally "LO"! Now over 5 billion people use the internet. 💻',
        explanationShort: 'First internet message (1969): "LO" — system crashed before "LOGIN"!',
        source: 'Computer History Museum',
    },
];

// ============================================================================
// COMBINE ALL NORTH AMERICA QUESTIONS
// ============================================================================

export const northAmericaQuestionsExpanded: Question[] = [
    ...geographyQuestions,
    ...natureQuestions,
    ...sportsQuestions,
    ...foodQuestions,
    ...recordsAndFunFacts,
];

export default northAmericaQuestionsExpanded;
