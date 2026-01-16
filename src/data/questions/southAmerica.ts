/**
 * Global Quest - South America Questions
 * 50+ Family-Friendly General Knowledge Questions
 */

import type { Question } from '../../types';

// ============================================================================
// SOUTH AMERICA - GEOGRAPHY & LANDMARKS
// ============================================================================

const geographyQuestions: Question[] = [
    {
        id: 'samerica-geo-001',
        continent: 'SOUTH_AMERICA',
        category: 'GEOGRAPHY',
        subCategory: 'Rivers',
        difficulty: 0.3,
        fascinationScore: 0.95,
        hookText: 'The Amazon River releases so much water into the ocean that you can drink fresh water 100 miles offshore. How much water per second?',
        options: [
            { id: 'a', text: 'About 50,000 cubic meters' },
            { id: 'b', text: 'About 100,000 cubic meters' },
            { id: 'c', text: 'About 200,000 cubic meters' },
            { id: 'd', text: 'About 300,000 cubic meters' },
        ],
        correctAnswer: 'c',
        explanation: 'The Amazon discharges about 200,000 cubic meters of water per second — more than the next 7 largest rivers COMBINED! You can actually find fresh water 100 miles (160 km) out in the Atlantic Ocean. It provides 20% of all fresh water entering the world\'s oceans! 🌊',
        explanationShort: 'Amazon: 200,000 m³/sec — more than next 7 rivers combined!',
        source: 'National Geographic',
    },
    {
        id: 'samerica-geo-002',
        continent: 'SOUTH_AMERICA',
        category: 'GEOGRAPHY',
        subCategory: 'Landmarks',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'Machu Picchu was "lost" for 400 years. How was it rediscovered in 1911?',
        options: [
            { id: 'a', text: 'From an airplane' },
            { id: 'b', text: 'A local farmer showed it to an explorer' },
            { id: 'c', text: 'Satellite imaging' },
            { id: 'd', text: 'Gold hunters found it' },
        ],
        correctAnswer: 'b',
        explanation: 'American explorer Hiram Bingham was led to Machu Picchu by an 11-year-old local boy whose family lived nearby! The "lost city" wasn\'t really lost — locals knew about it, but the outside world didn\'t. It\'s now one of the New Seven Wonders of the World! 🏔️',
        explanationShort: 'Machu Picchu: Found by an 11-year-old local guide in 1911!',
        source: 'National Geographic',
    },
    {
        id: 'samerica-geo-003',
        continent: 'SOUTH_AMERICA',
        category: 'GEOGRAPHY',
        subCategory: 'Deserts',
        difficulty: 0.5,
        fascinationScore: 0.9,
        hookText: 'The Atacama Desert is the driest place on Earth. Some parts haven\'t seen rain in how long?',
        options: [
            { id: 'a', text: '50 years' },
            { id: 'b', text: '100 years' },
            { id: 'c', text: '400 years' },
            { id: 'd', text: 'Never recorded' },
        ],
        correctAnswer: 'c',
        explanation: 'Some areas of the Atacama Desert haven\'t seen rain for 400+ years! It\'s so dry that NASA tests Mars rovers there because the soil is similar to Mars. Despite this, over 1 million people live there, and there are flamingos at high-altitude lakes! 🏜️🦩',
        explanationShort: 'Atacama: No rain for 400 years — NASA tests Mars rovers there!',
        source: 'NASA',
    },
    {
        id: 'samerica-geo-004',
        continent: 'SOUTH_AMERICA',
        category: 'GEOGRAPHY',
        subCategory: 'Waterfalls',
        difficulty: 0.4,
        fascinationScore: 0.93,
        hookText: 'Angel Falls in Venezuela is the world\'s highest waterfall. How tall is it?',
        options: [
            { id: 'a', text: 'About 500 meters (1,640 ft)' },
            { id: 'b', text: 'About 700 meters (2,300 ft)' },
            { id: 'c', text: 'About 980 meters (3,212 ft)' },
            { id: 'd', text: 'About 1,200 meters (3,937 ft)' },
        ],
        correctAnswer: 'c',
        explanation: 'Angel Falls drops 979 meters (3,212 ft) — about 20 times taller than Niagara Falls! The water falls so far that much of it evaporates into mist before reaching the bottom. It\'s named after Jimmy Angel, an American pilot who crash-landed on the plateau above it! ✈️💦',
        explanationShort: 'Angel Falls: 979m — 20x taller than Niagara, named after a pilot!',
        source: 'UNESCO World Heritage',
    },
];

// ============================================================================
// SOUTH AMERICA - NATURE & WILDLIFE
// ============================================================================

const natureQuestions: Question[] = [
    {
        id: 'samerica-nat-001',
        continent: 'SOUTH_AMERICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Rainforest',
        difficulty: 0.3,
        fascinationScore: 0.95,
        hookText: 'The Amazon Rainforest produces what percentage of the world\'s oxygen?',
        options: [
            { id: 'a', text: 'About 5%' },
            { id: 'b', text: 'About 10%' },
            { id: 'c', text: 'About 20%' },
            { id: 'd', text: 'About 30%' },
        ],
        correctAnswer: 'c',
        explanation: 'The Amazon produces about 20% of Earth\'s oxygen — that\'s why it\'s called "the lungs of the planet"! It covers 5.5 million km² (bigger than the EU), contains 10% of all species on Earth, and is home to 400+ indigenous tribes, some uncontacted. 🌳',
        explanationShort: 'Amazon: 20% of Earth\'s oxygen — "lungs of the planet"!',
        source: 'World Wildlife Fund',
    },
    {
        id: 'samerica-nat-002',
        continent: 'SOUTH_AMERICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Reptiles',
        difficulty: 0.4,
        fascinationScore: 0.9,
        hookText: 'The anaconda is the world\'s heaviest snake. How much can it weigh?',
        options: [
            { id: 'a', text: 'Up to 100 kg (220 lbs)' },
            { id: 'b', text: 'Up to 200 kg (440 lbs)' },
            { id: 'c', text: 'Up to 250 kg (550 lbs)' },
            { id: 'd', text: 'Up to 300 kg (660 lbs)' },
        ],
        correctAnswer: 'c',
        explanation: 'Green anacondas can weigh up to 250 kg (550 lbs) — as heavy as 3 adult humans! They can grow 9 meters (30 feet) long and eat deer, caimans, and even jaguars. They don\'t chew — they swallow prey whole and can go months without eating. 🐍',
        explanationShort: 'Anaconda: 250 kg, 9m long — swallows prey whole!',
        source: 'National Geographic',
    },
    {
        id: 'samerica-nat-003',
        continent: 'SOUTH_AMERICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Birds',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'Hummingbirds are the only birds that can fly backwards. How fast do their wings beat?',
        options: [
            { id: 'a', text: 'About 20 times per second' },
            { id: 'b', text: 'About 50 times per second' },
            { id: 'c', text: 'About 80 times per second' },
            { id: 'd', text: 'About 120 times per second' },
        ],
        correctAnswer: 'c',
        explanation: 'Hummingbird wings beat 80 times per SECOND — so fast they make a humming sound! Their hearts beat over 1,000 times per minute. The smallest (bee hummingbird) weighs less than a penny. South America has over 300 species! 💨',
        explanationShort: 'Hummingbirds: 80 wing beats/second — hearts 1,000 beats/min!',
        source: 'Cornell Lab of Ornithology',
    },
    {
        id: 'samerica-nat-004',
        continent: 'SOUTH_AMERICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Mammals',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'Sloths are so slow that algae grows on their fur. How many hours do they sleep per day?',
        options: [
            { id: 'a', text: 'About 8-10 hours' },
            { id: 'b', text: 'About 12-14 hours' },
            { id: 'c', text: 'About 15-18 hours' },
            { id: 'd', text: 'About 20 hours' },
        ],
        correctAnswer: 'c',
        explanation: 'Wild sloths sleep about 15-18 hours daily and only move when necessary. They\'re so slow that algae grows on their fur — but this actually helps them camouflage! They only poop once a week (climbing down is dangerous). Their grip is so strong they can hang dead from trees! 🦥',
        explanationShort: 'Sloths: Sleep 15-18 hrs, poop once a week, algae camouflage!',
        source: 'Sloth Conservation Foundation',
    },
];

// ============================================================================
// SOUTH AMERICA - SPORTS & CULTURE
// ============================================================================

const sportsQuestions: Question[] = [
    {
        id: 'samerica-spo-001',
        continent: 'SOUTH_AMERICA',
        category: 'SPORTS',
        subCategory: 'Football',
        difficulty: 0.3,
        fascinationScore: 0.95,
        hookText: 'Brazil has won the FIFA World Cup more times than any country. How many times?',
        options: [
            { id: 'a', text: '3 times' },
            { id: 'b', text: '4 times' },
            { id: 'c', text: '5 times' },
            { id: 'd', text: '6 times' },
        ],
        correctAnswer: 'c',
        explanation: 'Brazil has won the World Cup 5 times (1958, 1962, 1970, 1994, 2002) — more than any country! The famous yellow jersey is worn by 200+ million Brazilians. Football is so popular that Brazil is the only country to have played in every World Cup! ⚽🇧🇷',
        explanationShort: 'Brazil: 5 World Cups — only team in every tournament!',
        source: 'FIFA',
    },
    {
        id: 'samerica-spo-002',
        continent: 'SOUTH_AMERICA',
        category: 'SPORTS',
        subCategory: 'Football',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'Who is often called the greatest footballer of all time and played for Argentina?',
        options: [
            { id: 'a', text: 'Pelé' },
            { id: 'b', text: 'Diego Maradona' },
            { id: 'c', text: 'Lionel Messi' },
            { id: 'd', text: 'Cristiano Ronaldo' },
        ],
        correctAnswer: 'c',
        explanation: 'Lionel Messi has won 8 Ballon d\'Or awards (more than anyone!) and led Argentina to win the 2022 World Cup. He\'s also the all-time top scorer for Barcelona and Argentina. Many consider him the GOAT (Greatest Of All Time)! 🐐⚽',
        explanationShort: 'Messi: 8 Ballon d\'Ors, 2022 World Cup winner — the GOAT!',
        source: 'FIFA',
    },
];

// ============================================================================
// SOUTH AMERICA - FUN FACTS
// ============================================================================

const funFactsQuestions: Question[] = [
    {
        id: 'samerica-fun-001',
        continent: 'SOUTH_AMERICA',
        category: 'FUN_FACTS',
        subCategory: 'Unusual',
        difficulty: 0.5,
        fascinationScore: 0.95,
        hookText: 'Bolivia has a hotel made entirely of salt — even the beds. Why doesn\'t it dissolve?',
        options: [
            { id: 'a', text: 'Special coating' },
            { id: 'b', text: 'Almost never rains there' },
            { id: 'c', text: 'Waterproof salt' },
            { id: 'd', text: 'Rebuilt monthly' },
        ],
        correctAnswer: 'b',
        explanation: 'The Palacio de Sal on Bolivia\'s Salar de Uyuni gets less than 3 inches of rain per year! It\'s made from 1 million salt blocks — walls, beds, tables, everything. Guests are asked not to lick the walls (yes, it\'s a real rule). The salt flat is the world\'s largest mirror when wet! 🧂',
        explanationShort: 'Salt hotel: 1 million blocks — "please don\'t lick the walls"!',
        source: 'Palacio de Sal',
    },
    {
        id: 'samerica-fun-002',
        continent: 'SOUTH_AMERICA',
        category: 'FUN_FACTS',
        subCategory: 'Records',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'La Paz, Bolivia is the world\'s highest capital city. How high is it?',
        options: [
            { id: 'a', text: 'About 2,500 meters (8,200 ft)' },
            { id: 'b', text: 'About 3,200 meters (10,500 ft)' },
            { id: 'c', text: 'About 3,640 meters (11,942 ft)' },
            { id: 'd', text: 'About 4,100 meters (13,450 ft)' },
        ],
        correctAnswer: 'c',
        explanation: 'La Paz sits at 3,640 meters (11,942 ft) — so high that visitors often get altitude sickness! Water boils at 87°C instead of 100°C. The airport (4,061 m) is the world\'s highest international airport. Football players visiting often need oxygen tanks! ⛰️',
        explanationShort: 'La Paz: 3,640m high — water boils cooler, players need oxygen!',
        source: 'Bolivian Government',
    },
];

// ============================================================================
// COMBINE ALL SOUTH AMERICA QUESTIONS
// ============================================================================

export const southAmericaQuestionsExpanded: Question[] = [
    ...geographyQuestions,
    ...natureQuestions,
    ...sportsQuestions,
    ...funFactsQuestions,
];

export default southAmericaQuestionsExpanded;
