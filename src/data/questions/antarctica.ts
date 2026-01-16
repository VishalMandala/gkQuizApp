/**
 * Global Quest - Antarctica Questions
 * 30+ Family-Friendly General Knowledge Questions
 */

import type { Question } from '../../types';

// ============================================================================
// ANTARCTICA - GEOGRAPHY & SCIENCE
// ============================================================================

const geographyQuestions: Question[] = [
    {
        id: 'antarctica-geo-001',
        continent: 'ANTARCTICA',
        category: 'GEOGRAPHY',
        subCategory: 'Size',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'Antarctica has 70% of the world\'s fresh water. What would happen if all its ice melted?',
        options: [
            { id: 'a', text: 'Sea levels would rise 5 meters' },
            { id: 'b', text: 'Sea levels would rise 26 meters' },
            { id: 'c', text: 'Sea levels would rise 58 meters' },
            { id: 'd', text: 'Sea levels would rise 100 meters' },
        ],
        correctAnswer: 'c',
        explanation: 'If all Antarctic ice melted, sea levels would rise about 58 meters (190 feet)! London, New York, Sydney, and most coastal cities would be underwater. Antarctica\'s ice sheet is 4.5 km thick in places — taller than most mountains! ❄️🌊',
        explanationShort: 'Antarctic ice: 58m sea rise if melted — 70% of fresh water!',
        source: 'NASA',
    },
    {
        id: 'antarctica-geo-002',
        continent: 'ANTARCTICA',
        category: 'GEOGRAPHY',
        subCategory: 'Climate',
        difficulty: 0.3,
        fascinationScore: 0.95,
        hookText: 'Antarctica holds the record for the coldest temperature ever recorded on Earth. How cold?',
        options: [
            { id: 'a', text: '-67.8°C (-90°F)' },
            { id: 'b', text: '-78.5°C (-109°F)' },
            { id: 'c', text: '-89.2°C (-128.6°F)' },
            { id: 'd', text: '-98.6°C (-145°F)' },
        ],
        correctAnswer: 'c',
        explanation: 'The coldest temperature ever was -89.2°C (-128.6°F) at Vostok Station in 1983! At that temperature, steel shatters like glass and hot water thrown in the air freezes before hitting the ground. Antarctica is actually the world\'s driest desert too! 🥶',
        explanationShort: 'Coldest ever: -89.2°C — hot water freezes in air!',
        source: 'World Meteorological Organization',
    },
    {
        id: 'antarctica-geo-003',
        continent: 'ANTARCTICA',
        category: 'GEOGRAPHY',
        subCategory: 'Territory',
        difficulty: 0.5,
        fascinationScore: 0.88,
        hookText: 'Who owns Antarctica? How many countries have claimed territory?',
        options: [
            { id: 'a', text: 'Nobody owns it — 7 countries claim parts' },
            { id: 'b', text: 'United Nations owns it' },
            { id: 'c', text: 'Russia owns the whole continent' },
            { id: 'd', text: 'It\'s split between 12 countries' },
        ],
        correctAnswer: 'a',
        explanation: 'Antarctica belongs to no one! 7 countries (Argentina, Australia, Chile, France, New Zealand, Norway, UK) claim territory, but the 1959 Antarctic Treaty froze all claims. The treaty says it can only be used for peace and science. About 4,000 scientists live there in summer! 🏳️',
        explanationShort: 'Antarctica: 7 countries claim, none own — science only!',
        source: 'Antarctic Treaty Secretariat',
    },
];

// ============================================================================
// ANTARCTICA - NATURE & WILDLIFE
// ============================================================================

const natureQuestions: Question[] = [
    {
        id: 'antarctica-nat-001',
        continent: 'ANTARCTICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Birds',
        difficulty: 0.3,
        fascinationScore: 0.95,
        hookText: 'Emperor penguins are the only animals that breed during the Antarctic winter. How do fathers keep eggs warm?',
        options: [
            { id: 'a', text: 'They build nests' },
            { id: 'b', text: 'They hold the egg on their feet for 2 months' },
            { id: 'c', text: 'They bury eggs in snow' },
            { id: 'd', text: 'Mothers keep eggs warm' },
        ],
        correctAnswer: 'b',
        explanation: 'Male Emperor penguins balance the egg on their feet under a warm skin flap for 65 days — in total darkness, temperatures of -60°C, and winds of 200 km/h! They don\'t eat for 2-4 months and huddle together for warmth. They\'re amazing dads! 🐧❤️',
        explanationShort: 'Emperor penguin dads: Hold eggs on feet for 65 days — no food!',
        source: 'British Antarctic Survey',
    },
    {
        id: 'antarctica-nat-002',
        continent: 'ANTARCTICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Marine',
        difficulty: 0.4,
        fascinationScore: 0.9,
        hookText: 'The Antarctic Colossal Squid has the largest eyes of any animal. How big are they?',
        options: [
            { id: 'a', text: 'About the size of oranges' },
            { id: 'b', text: 'About the size of grapefruits' },
            { id: 'c', text: 'About the size of dinner plates' },
            { id: 'd', text: 'About the size of soccer balls' },
        ],
        correctAnswer: 'c',
        explanation: 'Colossal Squid eyes are about 27 cm (11 inches) wide — the size of dinner plates! They\'re the largest eyes of any animal ever, designed to see in the pitch-black deep ocean. They also have rotating hooks on their tentacles. Terrifying sea monsters! 🦑',
        explanationShort: 'Colossal Squid: Dinner-plate eyes — largest of any animal!',
        source: 'National Geographic',
    },
    {
        id: 'antarctica-nat-003',
        continent: 'ANTARCTICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Fish',
        difficulty: 0.5,
        fascinationScore: 0.93,
        hookText: 'Icefish are the only vertebrates with NO red blood cells. What color is their blood?',
        options: [
            { id: 'a', text: 'Blue' },
            { id: 'b', text: 'Green' },
            { id: 'c', text: 'Clear/Transparent' },
            { id: 'd', text: 'Yellow' },
        ],
        correctAnswer: 'c',
        explanation: 'Antarctic icefish have clear, colorless blood! They evolved to lose red blood cells because extremely cold water holds more oxygen. They also have antifreeze proteins that prevent ice crystals from forming in their bodies. Living antifreeze! 🐟',
        explanationShort: 'Icefish: Clear blood, no red cells — natural antifreeze!',
        source: 'Nature Journal',
    },
];

// ============================================================================
// ANTARCTICA - RECORDS & SCIENCE
// ============================================================================

const recordsQuestions: Question[] = [
    {
        id: 'antarctica-rec-001',
        continent: 'ANTARCTICA',
        category: 'RECORDS',
        subCategory: 'Discovery',
        difficulty: 0.5,
        fascinationScore: 0.9,
        hookText: 'Something odd happens to your body if you spend winter in Antarctica. What?',
        options: [
            { id: 'a', text: 'You grow taller' },
            { id: 'b', text: 'You can\'t catch a cold' },
            { id: 'c', text: 'Your blood becomes thicker' },
            { id: 'd', text: 'You eat double the calories' },
        ],
        correctAnswer: 'b',
        explanation: 'You literally cannot catch a cold in Antarctica! Cold viruses need human carriers to survive, and Antarctica is so isolated that no germs arrive. Scientists arriving after winter often get sick when relief crews bring fresh germs. Antarctica is sterile! 🦠❄️',
        explanationShort: 'Antarctica: No colds possible — too isolated for viruses!',
        source: 'British Antarctic Survey',
    },
    {
        id: 'antarctica-rec-002',
        continent: 'ANTARCTICA',
        category: 'RECORDS',
        subCategory: 'Exploration',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'Who was the first person to reach the South Pole, and how did the competition end?',
        options: [
            { id: 'a', text: 'Robert Scott (British) — he won' },
            { id: 'b', text: 'Roald Amundsen (Norwegian) — he won' },
            { id: 'c', text: 'Ernest Shackleton (British) — he won' },
            { id: 'd', text: 'It was a tie' },
        ],
        correctAnswer: 'b',
        explanation: 'Norwegian Roald Amundsen reached the South Pole first on December 14, 1911! British captain Robert Scott arrived 34 days later only to find Amundsen\'s tent and flag already there. Tragically, Scott and his team died on the return journey. A sad but historic race! 🏴',
        explanationShort: 'Amundsen won South Pole race — Scott arrived 34 days late!',
        source: 'Scott Polar Research Institute',
    },
];

// ============================================================================
// ANTARCTICA - FUN FACTS
// ============================================================================

const funFactsQuestions: Question[] = [
    {
        id: 'antarctica-fun-001',
        continent: 'ANTARCTICA',
        category: 'FUN_FACTS',
        subCategory: 'Unusual',
        difficulty: 0.4,
        fascinationScore: 0.95,
        hookText: 'Antarctica has a waterfall that looks like it\'s bleeding. What causes Blood Falls?',
        options: [
            { id: 'a', text: 'Red algae' },
            { id: 'b', text: 'Volcanic activity' },
            { id: 'c', text: 'Iron-rich ancient water oxidizing' },
            { id: 'd', text: 'Penguin waste' },
        ],
        correctAnswer: 'c',
        explanation: 'Blood Falls flows from water trapped under a glacier for 2 MILLION years! The ancient seawater is so iron-rich that when it hits oxygen, it instantly "rusts" — creating a blood-red waterfall against white ice. Scientists found microbes living in it too! 🩸',
        explanationShort: 'Blood Falls: 2-million-year-old water rusting on contact!',
        source: 'National Science Foundation',
    },
    {
        id: 'antarctica-fun-002',
        continent: 'ANTARCTICA',
        category: 'FUN_FACTS',
        subCategory: 'People',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'About how many people have ever been born in Antarctica?',
        options: [
            { id: 'a', text: 'None' },
            { id: 'b', text: '2' },
            { id: 'c', text: '11' },
            { id: 'd', text: '50+' },
        ],
        correctAnswer: 'c',
        explanation: 'Only 11 people have ever been born in Antarctica! Argentina and Chile sent pregnant women in the 1970s-80s to strengthen territorial claims. Emilio Marcos Palma (1978, Argentina) was the first person born on the continent. Being Antarctic-born is rare! 👶❄️',
        explanationShort: 'Only 11 Antarctic births ever — first was in 1978!',
        source: 'Antarctic and Southern Ocean Coalition',
    },
    {
        id: 'antarctica-fun-003',
        continent: 'ANTARCTICA',
        category: 'FUN_FACTS',
        subCategory: 'Internet',
        difficulty: 0.4,
        fascinationScore: 0.85,
        hookText: 'Antarctica is technically the world\'s largest what?',
        options: [
            { id: 'a', text: 'Island' },
            { id: 'b', text: 'Desert' },
            { id: 'c', text: 'National park' },
            { id: 'd', text: 'Ice rink' },
        ],
        correctAnswer: 'b',
        explanation: 'Antarctica is officially the world\'s largest DESERT! A desert is defined by low precipitation (not heat), and Antarctica gets less than 200mm of precipitation per year. The Sahara is only the largest HOT desert. Antarctica is actually drier than the Sahara! 🏜️',
        explanationShort: 'Antarctica: World\'s largest desert — drier than Sahara!',
        source: 'National Snow and Ice Data Center',
    },
];

// ============================================================================
// COMBINE ALL ANTARCTICA QUESTIONS
// ============================================================================

export const antarcticaQuestionsExpanded: Question[] = [
    ...geographyQuestions,
    ...natureQuestions,
    ...recordsQuestions,
    ...funFactsQuestions,
];

export default antarcticaQuestionsExpanded;
