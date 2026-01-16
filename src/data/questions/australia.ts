/**
 * Global Quest - Australia & Oceania Questions
 * 50+ Family-Friendly General Knowledge Questions
 */

import type { Question } from '../../types';

// ============================================================================
// AUSTRALIA & OCEANIA - GEOGRAPHY & LANDMARKS
// ============================================================================

const geographyQuestions: Question[] = [
    {
        id: 'australia-geo-001',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'GEOGRAPHY',
        subCategory: 'Landmarks',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'Uluru (Ayers Rock) looks red. What color does it turn at sunrise and sunset?',
        options: [
            { id: 'a', text: 'Blue' },
            { id: 'b', text: 'Orange to crimson to purple' },
            { id: 'c', text: 'Green' },
            { id: 'd', text: 'It stays red' },
        ],
        correctAnswer: 'b',
        explanation: 'Uluru changes from orange to red to crimson to purple as the sun moves! It\'s 348 meters tall (taller than the Eiffel Tower) and 9.4 km around. Aboriginal Australians have considered it sacred for over 30,000 years. Climbing it was banned in 2019 out of respect. 🏜️',
        explanationShort: 'Uluru: Changes colors at sunset — sacred for 30,000+ years!',
        source: 'Parks Australia',
    },
    {
        id: 'australia-geo-002',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'GEOGRAPHY',
        subCategory: 'Reefs',
        difficulty: 0.3,
        fascinationScore: 0.95,
        hookText: 'The Great Barrier Reef is so big it can be seen from space. How big is it?',
        options: [
            { id: 'a', text: 'About 150,000 km²' },
            { id: 'b', text: 'About 250,000 km²' },
            { id: 'c', text: 'About 344,000 km²' },
            { id: 'd', text: 'About 500,000 km²' },
        ],
        correctAnswer: 'c',
        explanation: 'The Great Barrier Reef covers 344,400 km² — bigger than the UK, Netherlands, and Switzerland combined! It\'s made of 3,000 individual reef systems and 900 islands. It\'s the world\'s largest living structure, home to 1,500 fish species and 400 coral types! 🐠',
        explanationShort: 'Great Barrier Reef: 344,400 km² — visible from space!',
        source: 'Great Barrier Reef Marine Park Authority',
    },
    {
        id: 'australia-geo-003',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'GEOGRAPHY',
        subCategory: 'Islands',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'New Zealand was the last major land mass to be settled by humans. When did Polynesians arrive?',
        options: [
            { id: 'a', text: 'About 5,000 years ago' },
            { id: 'b', text: 'About 2,000 years ago' },
            { id: 'c', text: 'About 800 years ago' },
            { id: 'd', text: 'About 500 years ago' },
        ],
        correctAnswer: 'c',
        explanation: 'Polynesians (the Māori) reached New Zealand only about 800 years ago (around 1250-1300 AD)! It was the last major land mass to be discovered and settled by humans. They navigated over 3,000 km of open ocean using stars, birds, and waves. Incredible! 🛶',
        explanationShort: 'New Zealand: Settled only 800 years ago — last major land!',
        source: 'New Zealand History',
    },
];

// ============================================================================
// AUSTRALIA & OCEANIA - NATURE & WILDLIFE
// ============================================================================

const natureQuestions: Question[] = [
    {
        id: 'australia-nat-001',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Mammals',
        difficulty: 0.3,
        fascinationScore: 0.95,
        hookText: 'Kangaroos can\'t walk backwards. What\'s another surprising fact about them?',
        options: [
            { id: 'a', text: 'They can\'t swim' },
            { id: 'b', text: 'Baby kangaroos are only 2 cm long at birth' },
            { id: 'c', text: 'They live for 50 years' },
            { id: 'd', text: 'They eat meat' },
        ],
        correctAnswer: 'b',
        explanation: 'Baby kangaroos (joeys) are only 2 cm long at birth — about the size of a jellybean! They crawl into their mother\'s pouch and stay there for 8 months. Australia has 50 million kangaroos — more than twice the human population! 🦘',
        explanationShort: 'Joeys: 2 cm at birth — 50 million kangaroos in Australia!',
        source: 'Australian Government',
    },
    {
        id: 'australia-nat-002',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Mammals',
        difficulty: 0.4,
        fascinationScore: 0.93,
        hookText: 'The platypus is one of only 5 mammals that lays eggs. What else makes it special?',
        options: [
            { id: 'a', text: 'It can fly short distances' },
            { id: 'b', text: 'Males have venomous spurs on their feet' },
            { id: 'c', text: 'It can breathe underwater' },
            { id: 'd', text: 'It has no bones' },
        ],
        correctAnswer: 'b',
        explanation: 'Male platypuses have venomous spurs on their hind legs that can cause extreme pain! They also have a duck-bill, beaver tail, otter feet, and detect prey using electroreception (sensing electric fields). When first discovered, scientists thought it was a hoax! 🦔',
        explanationShort: 'Platypus: Lays eggs, has venom, detects electricity!',
        source: 'Australian Museum',
    },
    {
        id: 'australia-nat-003',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Birds',
        difficulty: 0.4,
        fascinationScore: 0.9,
        hookText: 'The kiwi bird from New Zealand is the only bird with nostrils at the tip of its beak. Why?',
        options: [
            { id: 'a', text: 'To sense temperature' },
            { id: 'b', text: 'To smell food underground' },
            { id: 'c', text: 'To breathe while swimming' },
            { id: 'd', text: 'To cool down' },
        ],
        correctAnswer: 'b',
        explanation: 'Kiwis have an amazing sense of smell — unique among birds! Their nostrils at the beak tip help them sniff out worms and insects underground. Kiwis are flightless, nocturnal, and their eggs are 25% of their body weight (like a human having a 30 lb baby)! 🥝',
        explanationShort: 'Kiwi: Smells food underground, egg is 25% of body weight!',
        source: 'New Zealand Department of Conservation',
    },
    {
        id: 'australia-nat-004',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Marine',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'The box jellyfish near Australia is considered the most venomous creature on Earth. How fast can it kill?',
        options: [
            { id: 'a', text: 'Within 5 minutes' },
            { id: 'b', text: 'Within 2 minutes' },
            { id: 'c', text: 'Within 30 seconds' },
            { id: 'd', text: 'Instantly' },
        ],
        correctAnswer: 'b',
        explanation: 'Box jellyfish venom can kill a human in about 2 minutes! They have 60 tentacles up to 3 meters long with 5,000 stinging cells each. Despite having no brain, they have 24 eyes. Australian beaches have special vinegar stations for jellyfish stings! 🪼',
        explanationShort: 'Box jellyfish: Can kill in 2 minutes — 24 eyes, no brain!',
        source: 'Australian Institute of Marine Science',
    },
];

// ============================================================================
// AUSTRALIA & OCEANIA - SPORTS
// ============================================================================

const sportsQuestions: Question[] = [
    {
        id: 'australia-spo-001',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'SPORTS',
        subCategory: 'Rugby',
        difficulty: 0.4,
        fascinationScore: 0.9,
        hookText: 'The New Zealand rugby team performs the "Haka" before matches. What is it?',
        options: [
            { id: 'a', text: 'A prayer' },
            { id: 'b', text: 'A Māori war dance' },
            { id: 'c', text: 'A team song' },
            { id: 'd', text: 'A good luck ritual' },
        ],
        correctAnswer: 'b',
        explanation: 'The Haka is a traditional Māori ceremonial dance/chant that was historically performed before battle. The All Blacks (New Zealand rugby team) perform "Ka Mate" before every match — stomping, chanting, and sticking out tongues to intimidate opponents! 🏉',
        explanationShort: 'Haka: Māori war dance — All Blacks perform it before every game!',
        source: 'New Zealand Rugby',
    },
    {
        id: 'australia-spo-002',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'SPORTS',
        subCategory: 'Cricket',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'Australian cricketer Don Bradman has the highest career batting average ever. What was it?',
        options: [
            { id: 'a', text: '72.57' },
            { id: 'b', text: '89.78' },
            { id: 'c', text: '99.94' },
            { id: 'd', text: '108.43' },
        ],
        correctAnswer: 'c',
        explanation: 'Don Bradman\'s batting average of 99.94 is considered the greatest achievement in any major sport! The next best average is about 62. He needed just 4 runs in his last match to finish with 100 average but was bowled for 0. Australia\'s greatest sporting hero! 🏏',
        explanationShort: 'Bradman: 99.94 average — greatest sports achievement ever!',
        source: 'Cricket Australia',
    },
];

// ============================================================================
// AUSTRALIA & OCEANIA - FUN FACTS
// ============================================================================

const funFactsQuestions: Question[] = [
    {
        id: 'australia-fun-001',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'FUN_FACTS',
        subCategory: 'Unusual',
        difficulty: 0.4,
        fascinationScore: 0.95,
        hookText: 'Australia fought a war against birds in 1932. Which birds and who won?',
        options: [
            { id: 'a', text: 'Cockatoos — birds won' },
            { id: 'b', text: 'Emus — birds won' },
            { id: 'c', text: 'Magpies — humans won' },
            { id: 'd', text: 'Pelicans — tie' },
        ],
        correctAnswer: 'b',
        explanation: 'The "Great Emu War" of 1932 saw Australian soldiers with machine guns fight 20,000 emus destroying crops. After using 10,000 bullets and killing only about 1,000 emus, the army withdrew. The emus won! A medal was jokingly proposed for the emu "commander." 🦆🎖️',
        explanationShort: 'Emu War: Australian army vs emus — THE EMUS WON!',
        source: 'Australian War Memorial',
    },
    {
        id: 'australia-fun-002',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'FUN_FACTS',
        subCategory: 'Records',
        difficulty: 0.4,
        fascinationScore: 0.9,
        hookText: 'Australia has a fence longer than the Great Wall of China. What\'s it keeping out?',
        options: [
            { id: 'a', text: 'Kangaroos' },
            { id: 'b', text: 'Dingoes' },
            { id: 'c', text: 'Rabbits' },
            { id: 'd', text: 'Foxes' },
        ],
        correctAnswer: 'b',
        explanation: 'The Dingo Fence stretches 5,614 km — longer than the Great Wall of China! It protects sheep from wild dingoes across southeastern Australia. There are also "rabbit-proof" fences (3,256 km) built to stop the rabbit plague. Fences are serious business in Australia! 🐕',
        explanationShort: 'Dingo Fence: 5,614 km — longer than Great Wall of China!',
        source: 'Australian Government',
    },
    {
        id: 'australia-fun-003',
        continent: 'AUSTRALIA_OCEANIA',
        category: 'FUN_FACTS',
        subCategory: 'Geography',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'Which country has more sheep than people — about 6 sheep per person?',
        options: [
            { id: 'a', text: 'Australia' },
            { id: 'b', text: 'New Zealand' },
            { id: 'c', text: 'Scotland' },
            { id: 'd', text: 'Iceland' },
        ],
        correctAnswer: 'b',
        explanation: 'New Zealand has about 30 million sheep for 5 million people — roughly 6 sheep per person! The country exports more sheep products than any other. There\'s even an annual sheep shearing competition where the fastest shearers become celebrities! 🐑',
        explanationShort: 'New Zealand: 6 sheep per person — 30 million total!',
        source: 'Statistics New Zealand',
    },
];

// ============================================================================
// COMBINE ALL AUSTRALIA & OCEANIA QUESTIONS
// ============================================================================

export const australiaQuestionsExpanded: Question[] = [
    ...geographyQuestions,
    ...natureQuestions,
    ...sportsQuestions,
    ...funFactsQuestions,
];

export default australiaQuestionsExpanded;
