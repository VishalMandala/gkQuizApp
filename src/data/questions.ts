/**
 * Global Quest - Sample Question Data
 * Masterpiece questions for content demonstration
 */

import type { Question, Continent, Category } from '../types';

// ============================================================================
// ASIA QUESTIONS
// ============================================================================

export const asiaQuestions: Question[] = [
    {
        id: 'asia-001',
        continent: 'ASIA',
        category: 'CULTURE',
        subCategory: 'Languages',
        difficulty: 0.6,
        fascinationScore: 0.95,
        hookText: 'Which country has a village where EVERYONE can whistle their conversations — and it\'s not a joke?',
        options: [
            { id: 'a', text: 'Japan' },
            { id: 'b', text: 'Nepal' },
            { id: 'c', text: 'Turkey' },
            { id: 'd', text: 'Philippines' },
        ],
        correctAnswer: 'c',
        explanation: 'In the village of Kuşköy, Turkey, people communicate using a "bird language" called kuş dili — a complex whistling system that can travel up to 2 MILES across mountain valleys! UNESCO recognized it as intangible heritage. Farmers literally whistle sentences like "Come home for dinner" across entire hillsides. 🐦',
        explanationShort: 'Turkey\'s Kuşköy village uses whistling language that travels 2 miles!',
        visualInstruction: 'Show split-screen: Turkish mountain village on one side, animated sound waves between whistling figures on other. Add bird chirping ambient sound.',
        source: 'UNESCO Intangible Cultural Heritage',
    },
    {
        id: 'asia-002',
        continent: 'ASIA',
        category: 'GEOGRAPHY',
        subCategory: 'Islands',
        difficulty: 0.7,
        fascinationScore: 0.98,
        hookText: 'There\'s an island in India where a tribe kills anyone who approaches. The government made it ILLEGAL to go there. Which island?',
        options: [
            { id: 'a', text: 'Lakshadweep' },
            { id: 'b', text: 'North Sentinel Island' },
            { id: 'c', text: 'Port Blair' },
            { id: 'd', text: 'Nicobar Island' },
        ],
        correctAnswer: 'b',
        explanation: 'The Sentinelese people have rejected ALL contact with the outside world for 60,000 years. They\'ve attacked helicopters with arrows! After the 2004 tsunami, when a Navy helicopter checked if they survived, a tribesman shot arrows at it. The Indian government now protects their isolation by law. They might be the most isolated humans on Earth. 🏝️',
        explanationShort: 'North Sentinel Island\'s tribe has rejected contact for 60,000 years!',
        visualInstruction: 'Dark, mysterious island silhouette with restricted zone markers. Animate helicopter approaching, arrows flying toward it.',
        source: 'Indian Government - Andaman and Nicobar Protection Regulations',
    },
];

// ============================================================================
// AFRICA QUESTIONS
// ============================================================================

export const africaQuestions: Question[] = [
    {
        id: 'africa-001',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Lakes',
        difficulty: 0.65,
        fascinationScore: 0.97,
        hookText: 'Which African lake is so toxic that it turns dead animals into perfectly preserved stone statues?',
        options: [
            { id: 'a', text: 'Lake Victoria' },
            { id: 'b', text: 'Lake Tanganyika' },
            { id: 'c', text: 'Lake Natron' },
            { id: 'd', text: 'Lake Malawi' },
        ],
        correctAnswer: 'c',
        explanation: 'Lake Natron in Tanzania has water so alkaline (pH 10.5 — like ammonia!) that when birds and bats die in it, they calcify into eerie stone statues. Photographer Nick Brandt discovered these "stone animals" frozen in lifelike poses — wings spread, beaks open. It looks like Medusa visited. Yet flamingos THRIVE here because the toxicity keeps predators away! 💀',
        explanationShort: 'Lake Natron calcifies dead animals into haunting stone statues!',
        visualInstruction: 'Fade in on calcified bird statue. Slowly reveal red-tinged water. Add eerie ambient sound. Show before/after: living flamingo → stone statue.',
        source: 'National Geographic - Nick Brandt Photography',
    },
    {
        id: 'africa-002',
        continent: 'AFRICA',
        category: 'HISTORY',
        subCategory: 'Slavery',
        difficulty: 0.55,
        fascinationScore: 0.92,
        hookText: 'Africa has a "Door of No Return" — what is it, and why does it still make visitors cry today?',
        options: [
            { id: 'a', text: 'A prison gate in South Africa' },
            { id: 'b', text: 'The last door slaves walked through before being shipped away' },
            { id: 'c', text: 'An ancient Egyptian tomb entrance' },
            { id: 'd', text: 'A dangerous cave in the Congo' },
        ],
        correctAnswer: 'b',
        explanation: 'On Gorée Island, Senegal, there\'s a door facing the Atlantic Ocean. For 300+ years, captured Africans walked through this door onto ships — knowing they would never return. Today, visitors from around the world stand in that doorway and weep. Presidents, celebrities, and ordinary people have traced their ancestors\' final steps on African soil. It\'s now a UNESCO site of memory. 🚪',
        explanationShort: 'Door of No Return: Last step on African soil for millions of slaves.',
        visualInstruction: 'Slow zoom through dark corridor toward bright doorway to ocean. Warm-to-cold color transition. Soft, somber instrumental. Historical ship overlay.',
        source: 'UNESCO World Heritage - Gorée Island',
    },
];

// ============================================================================
// EUROPE QUESTIONS
// ============================================================================

export const europeQuestions: Question[] = [
    {
        id: 'europe-001',
        continent: 'EUROPE',
        category: 'HISTORY',
        subCategory: 'Architecture',
        difficulty: 0.6,
        fascinationScore: 0.88,
        hookText: 'There\'s a country in Europe with more castles than any other country on Earth. It has over 800. Which one?',
        options: [
            { id: 'a', text: 'France' },
            { id: 'b', text: 'Wales' },
            { id: 'c', text: 'Germany' },
            { id: 'd', text: 'Scotland' },
        ],
        correctAnswer: 'b',
        explanation: 'Wales has more castles per square mile than ANY country in the world — over 600 are still standing! During medieval times, English kings built castles to control the Welsh, and Welsh princes built castles to resist them. Today, you literally can\'t drive 20 minutes without seeing castle ruins. Some towns have TWO castles! 🏰',
        explanationShort: 'Wales has more castles per square mile than any country on Earth!',
        visualInstruction: 'Aerial drone shot over Welsh countryside with castles appearing one after another. Counter in corner: "1... 2... 3..." Map showing castle density.',
        source: 'Visit Wales - Castles of Wales',
    },
    {
        id: 'europe-002',
        continent: 'EUROPE',
        category: 'CULTURE',
        subCategory: 'Traditions',
        difficulty: 0.5,
        fascinationScore: 0.9,
        hookText: 'Norway gave London a Christmas tree every year since 1947. Why do they still do it?',
        options: [
            { id: 'a', text: 'A tourism promotion deal' },
            { id: 'b', text: 'Gratitude for helping Norway during WWII' },
            { id: 'c', text: 'An ancient Viking tradition' },
            { id: 'd', text: 'The British Royal Family requested it' },
        ],
        correctAnswer: 'b',
        explanation: 'Every December since 1947, Norway sends a 70-80 foot Norwegian spruce to London\'s Trafalgar Square — as a "thank you" for British support during Nazi occupation. The tree is selected from the Oslo forest, and the Lord Mayor of Westminster attends the lighting ceremony. It\'s been 75+ years and Norway STILL hasn\'t forgotten. That\'s what gratitude looks like. 🎄',
        explanationShort: 'Norway\'s annual tree gift: 75+ years of WWII gratitude!',
        visualInstruction: 'Split screen: 1947 B&W footage of first tree with modern footage. Animated timeline: "76 YEARS OF GRATITUDE" with tree icons.',
        source: 'City of Oslo - Trafalgar Square Christmas Tree',
    },
];

// ============================================================================
// NORTH AMERICA QUESTIONS
// ============================================================================

export const northAmericaQuestions: Question[] = [
    {
        id: 'namerica-001',
        continent: 'NORTH_AMERICA',
        category: 'HISTORY',
        subCategory: 'Land Deals',
        difficulty: 0.55,
        fascinationScore: 0.93,
        hookText: 'The United States bought Alaska from Russia in 1867. How much did they pay — per acre?',
        options: [
            { id: 'a', text: '$10 per acre' },
            { id: 'b', text: '$1 per acre' },
            { id: 'c', text: '$0.02 per acre (2 cents)' },
            { id: 'd', text: '$100 per acre' },
        ],
        correctAnswer: 'c',
        explanation: 'The U.S. paid Russia $7.2 million for Alaska — about 2 CENTS per acre! Critics called it "Seward\'s Folly" after Secretary of State William Seward who negotiated it. Then they discovered GOLD (1896 Gold Rush), then OIL (billions of barrels). Today, Alaska\'s oil industry alone has generated over $180 BILLION. Greatest real estate deal in history? 💰',
        explanationShort: 'Alaska: 2 cents per acre → $180+ BILLION in oil alone!',
        visualInstruction: 'Animate 2-cent coin transforming into gold bars, then oil barrels. Scale: "2¢" vs "$180,000,000,000". Text: "BEST. DEAL. EVER."',
        source: 'U.S. Department of State - Alaska Purchase',
    },
    {
        id: 'namerica-002',
        continent: 'NORTH_AMERICA',
        category: 'GEOGRAPHY',
        subCategory: 'Records',
        difficulty: 0.6,
        fascinationScore: 0.85,
        hookText: 'If you walked Canada\'s coastline, how many YEARS would it take?',
        options: [
            { id: 'a', text: '3 years' },
            { id: 'b', text: '10 years' },
            { id: 'c', text: '33 years' },
            { id: 'd', text: '50+ years' },
        ],
        correctAnswer: 'c',
        explanation: 'Canada\'s coastline is 202,080 km — the longest of ANY country, touching three oceans! If you walked 16 km/day without rest, it would take 33 YEARS to complete. This coastline is so vast that it equals more than 4 times the circumference of Earth. No other country comes close. Indonesia is second with less than HALF. 🌊',
        explanationShort: 'Canada\'s coastline = 33 years of walking = 4x around Earth!',
        visualInstruction: 'Animated hiker walk cycle. Time-lapse calendar: "Year 1... 10... 20... 33." Map overlay showing coastline wrapping around globe 4x.',
        source: 'Statistics Canada - Coastline Data',
    },
];

// ============================================================================
// SOUTH AMERICA QUESTIONS
// ============================================================================

export const southAmericaQuestions: Question[] = [
    {
        id: 'samerica-001',
        continent: 'SOUTH_AMERICA',
        category: 'GEOGRAPHY',
        subCategory: 'Rivers',
        difficulty: 0.7,
        fascinationScore: 0.94,
        hookText: 'The Amazon River has no bridges. ZERO. Not a single one. Why?',
        options: [
            { id: 'a', text: 'Bridges are banned by law' },
            { id: 'b', text: 'The river is too wide and the banks are uninhabited jungle' },
            { id: 'c', text: 'Indigenous tribes destroy any bridge attempts' },
            { id: 'd', text: 'The water is too acidic for bridge foundations' },
        ],
        correctAnswer: 'b',
        explanation: 'For 4,000 miles (longer than the width of the USA!), the Amazon has ZERO bridges. Not because it\'s impossible, but because there are no roads to connect TO. The surrounding jungle is so dense and population so sparse that nobody needs bridges. In some spots, the Amazon is 30 miles wide during flood season. People just use boats! 🌊🌴',
        explanationShort: 'Amazon: 4,000 miles, ZERO bridges — no roads to connect!',
        visualInstruction: 'Aerial zoom out from boat on Amazon, revealing massive scale with no roads. Overlay: "4,000 MILES. ZERO BRIDGES." USA width comparison.',
        source: 'National Geographic - Amazon River',
    },
    {
        id: 'samerica-002',
        continent: 'SOUTH_AMERICA',
        category: 'WEIRD_FASCINATING',
        subCategory: 'Hotels',
        difficulty: 0.55,
        fascinationScore: 0.91,
        hookText: 'Bolivia has a hotel made entirely of salt — even the beds. Why doesn\'t it dissolve when it rains?',
        options: [
            { id: 'a', text: 'It\'s covered with protective coating' },
            { id: 'b', text: 'It almost never rains there' },
            { id: 'c', text: 'The salt is treated to be waterproof' },
            { id: 'd', text: 'It\'s rebuilt after every rainy season' },
        ],
        correctAnswer: 'b',
        explanation: 'The Palacio de Sal sits on the Salar de Uyuni — the world\'s largest salt flat. This area gets less than 3 inches of rain per YEAR (drier than most deserts). The hotel is made from 1 million blocks of salt: walls, furniture, even the beds! Guests are asked not to lick the walls (yes, that\'s an actual rule). 🧂',
        explanationShort: 'Bolivia\'s salt hotel: 1 million blocks, "Please don\'t lick the walls"!',
        visualInstruction: '360° pan inside salt hotel showing salt furniture. Guest doing lick test. Overlay: "RULE #1: Please don\'t lick the walls."',
        source: 'Palacio de Sal - Bolivia',
    },
];

// ============================================================================
// AUSTRALIA/OCEANIA QUESTIONS
// ============================================================================

export const australiaQuestions: Question[] = [
    {
        id: 'australia-001',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Lakes',
        difficulty: 0.5,
        fascinationScore: 0.92,
        hookText: 'Australia has a lake that\'s naturally BUBBLEGUM PINK year-round. What causes the color?',
        options: [
            { id: 'a', text: 'Reflection of sunset clouds' },
            { id: 'b', text: 'Algae and bacteria' },
            { id: 'c', text: 'Mineral deposits' },
            { id: 'd', text: 'Flamingo waste' },
        ],
        correctAnswer: 'b',
        explanation: 'Lake Hillier in Western Australia is bubblegum PINK — and scientists aren\'t 100% sure why! The leading theory: a unique combo of algae (Dunaliella salina) and bacteria thrive in the super-salty water, producing pink pigments. Unlike some pink lakes that change color, Lake Hillier stays pink even when you put the water in a glass. 💗',
        explanationShort: 'Lake Hillier stays pink even in a glass — mystery not fully solved!',
        visualInstruction: 'Drone approaching normal shoreline, revealing shocking pink lake. Split screen: normal lake vs pink lake. Glass being filled with pink water.',
        source: 'Western Australia Tourism',
    },
    {
        id: 'australia-002',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'GEOGRAPHY',
        subCategory: 'Structures',
        difficulty: 0.65,
        fascinationScore: 0.89,
        hookText: 'Australia has a fence so long you could stretch it from NYC to LA... TWICE. What\'s it keeping out?',
        options: [
            { id: 'a', text: 'Kangaroos' },
            { id: 'b', text: 'Dingoes' },
            { id: 'c', text: 'Emus' },
            { id: 'd', text: 'Rabbits' },
        ],
        correctAnswer: 'b',
        explanation: 'The Dingo Fence is 5,614 km — world\'s longest fence! Built to protect sheep from wild dingoes. It has its own patrol officers and repair crews. One of the longest structures humans ever made! 🐕',
        explanationShort: 'Dingo Fence: 5,614 km — NYC to LA, twice!',
        visualInstruction: 'Map showing fence stretching across Australia. Comparison with NYC-LA distance. Patrol vehicle driving along fence.',
        source: 'Australian Government - Dingo Fence',
    },
];

// ============================================================================
// ANTARCTICA QUESTIONS
// ============================================================================

export const antarcticaQuestions: Question[] = [
    {
        id: 'antarctica-001',
        continent: 'ANTARCTICA',
        category: 'SCIENCE_MAGIC',
        subCategory: 'Biology',
        difficulty: 0.6,
        fascinationScore: 0.9,
        hookText: 'Antarctica is the only continent where you literally CANNOT catch a common cold. Why?',
        options: [
            { id: 'a', text: 'Too cold for viruses' },
            { id: 'b', text: 'No common cold viruses exist there' },
            { id: 'c', text: 'Special immunity develops' },
            { id: 'd', text: 'Filtered air in research stations' },
        ],
        correctAnswer: 'b',
        explanation: 'Cold viruses need human hosts to survive. Antarctica\'s isolation means no infected humans bring viruses. Scientists arriving after winter actually catch colds when relief crews arrive — they bring fresh germs! 🦠',
        explanationShort: 'No cold viruses in Antarctica — until relief crews bring them!',
        visualInstruction: 'Scientist in Antarctica, healthy. Ship arriving. Scientist suddenly sneezing. Text: "Fresh germs incoming!"',
        source: 'British Antarctic Survey',
    },
    {
        id: 'antarctica-002',
        continent: 'ANTARCTICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Geology',
        difficulty: 0.7,
        fascinationScore: 0.96,
        hookText: 'Antarctica has a waterfall that looks like it\'s bleeding. What causes Blood Falls?',
        options: [
            { id: 'a', text: 'Volcanic activity' },
            { id: 'b', text: 'Iron-rich ancient water' },
            { id: 'c', text: 'Red algae' },
            { id: 'd', text: 'Rust deposits' },
        ],
        correctAnswer: 'b',
        explanation: 'Blood Falls flows from water trapped under a glacier for 2 MILLION years! The water is so iron-rich that when it hits oxygen, it "rusts" instantly — creating a blood-red waterfall on white ice. 🩸',
        explanationShort: 'Blood Falls: 2-million-year-old water rusting on contact with air!',
        visualInstruction: 'Dramatic shot of Blood Falls. Cut to underwater glacier chamber. Iron particles meeting oxygen, turning red.',
        source: 'National Science Foundation',
    },
];

// ============================================================================
// ALL QUESTIONS COMBINED
// ============================================================================

export const allQuestions: Question[] = [
    ...asiaQuestions,
    ...africaQuestions,
    ...europeQuestions,
    ...northAmericaQuestions,
    ...southAmericaQuestions,
    ...australiaQuestions,
    ...antarcticaQuestions,
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getQuestionsByContinent = (continent: Continent): Question[] => {
    return allQuestions.filter(q => q.continent === continent);
};

export const getQuestionsByCategory = (category: Category): Question[] => {
    return allQuestions.filter(q => q.category === category);
};

export const getRandomQuestion = (
    continent?: Continent,
    category?: Category,
    difficulty?: { min: number; max: number }
): Question | null => {
    let filtered = [...allQuestions];

    if (continent) {
        filtered = filtered.filter(q => q.continent === continent);
    }
    if (category) {
        filtered = filtered.filter(q => q.category === category);
    }
    if (difficulty) {
        filtered = filtered.filter(
            q => q.difficulty >= difficulty.min && q.difficulty <= difficulty.max
        );
    }

    if (filtered.length === 0) return null;

    return filtered[Math.floor(Math.random() * filtered.length)];
};

export default allQuestions;
