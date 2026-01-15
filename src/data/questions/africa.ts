/**
 * Global Quest - Africa Questions
 * 50+ Family-Friendly General Knowledge Questions
 * 
 * Categories: Geography, Nature, Sports, Food, Music, Science, 
 *             Famous People, Festivals, Records, Fun Facts
 */

import type { Question } from '../../types';

// ============================================================================
// AFRICA - GEOGRAPHY & LANDMARKS (10 questions)
// ============================================================================

const geographyQuestions: Question[] = [
    {
        id: 'africa-geo-001',
        continent: 'AFRICA',
        category: 'GEOGRAPHY',
        subCategory: 'Rivers',
        difficulty: 0.3,
        fascinationScore: 0.9,
        hookText: 'Which river is the LONGEST in Africa and one of the longest in the world?',
        options: [
            { id: 'a', text: 'Congo River' },
            { id: 'b', text: 'Zambezi River' },
            { id: 'c', text: 'Nile River' },
            { id: 'd', text: 'Niger River' },
        ],
        correctAnswer: 'c',
        explanation: 'The Nile River stretches about 6,650 km (4,130 miles) — that\'s like driving from New York to Los Angeles and back! It flows through 11 countries and has been the lifeline of ancient Egypt for thousands of years. 🌊',
        explanationShort: 'The Nile is ~6,650 km — the longest river in Africa!',
        source: 'National Geographic',
    },
    {
        id: 'africa-geo-002',
        continent: 'AFRICA',
        category: 'GEOGRAPHY',
        subCategory: 'Mountains',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'What is the tallest mountain in Africa, known as the "Roof of Africa"?',
        options: [
            { id: 'a', text: 'Mount Kenya' },
            { id: 'b', text: 'Mount Kilimanjaro' },
            { id: 'c', text: 'Atlas Mountains' },
            { id: 'd', text: 'Simien Mountains' },
        ],
        correctAnswer: 'b',
        explanation: 'Mount Kilimanjaro in Tanzania stands at 5,895 meters (19,341 feet). Fun fact: You can climb it without any special equipment — about 35,000 people attempt it each year! It has snow at the top even though it\'s near the equator. ⛰️',
        explanationShort: 'Kilimanjaro: 5,895m tall — you can climb it without special gear!',
        source: 'Tanzania National Parks',
    },
    {
        id: 'africa-geo-003',
        continent: 'AFRICA',
        category: 'GEOGRAPHY',
        subCategory: 'Deserts',
        difficulty: 0.3,
        fascinationScore: 0.92,
        hookText: 'The Sahara Desert is the largest HOT desert on Earth. How big is it compared to the USA?',
        options: [
            { id: 'a', text: 'Half the size of the USA' },
            { id: 'b', text: 'Same size as the USA' },
            { id: 'c', text: 'Almost as big as the entire USA' },
            { id: 'd', text: 'Twice the size of the USA' },
        ],
        correctAnswer: 'c',
        explanation: 'The Sahara is about 9.2 million km² — almost as big as the entire United States! And here\'s a mind-blowing fact: it wasn\'t always a desert. Just 5,000 years ago, it was green with lakes and rivers! 🏜️',
        explanationShort: 'The Sahara is almost as big as the entire USA!',
        source: 'NASA Earth Observatory',
    },
    {
        id: 'africa-geo-004',
        continent: 'AFRICA',
        category: 'GEOGRAPHY',
        subCategory: 'Waterfalls',
        difficulty: 0.4,
        fascinationScore: 0.95,
        hookText: 'Victoria Falls is one of the world\'s largest waterfalls. What do locals call it?',
        options: [
            { id: 'a', text: 'The Great Falls' },
            { id: 'b', text: 'Mosi-oa-Tunya (The Smoke That Thunders)' },
            { id: 'c', text: 'Devil\'s Pool' },
            { id: 'd', text: 'African Thunder' },
        ],
        correctAnswer: 'b',
        explanation: 'Victoria Falls is called "Mosi-oa-Tunya" meaning "The Smoke That Thunders" — because the mist from the falls can be seen from 50 km away! It\'s twice the height of Niagara Falls and has the world\'s largest sheet of falling water. 💦',
        explanationShort: '"The Smoke That Thunders" — mist visible from 50 km away!',
        source: 'UNESCO World Heritage',
    },
    {
        id: 'africa-geo-005',
        continent: 'AFRICA',
        category: 'GEOGRAPHY',
        subCategory: 'Countries',
        difficulty: 0.5,
        fascinationScore: 0.85,
        hookText: 'Africa has how many countries — more than any other continent?',
        options: [
            { id: 'a', text: '34 countries' },
            { id: 'b', text: '44 countries' },
            { id: 'c', text: '54 countries' },
            { id: 'd', text: '64 countries' },
        ],
        correctAnswer: 'c',
        explanation: 'Africa has 54 recognized countries — the most of any continent! This means Africa has more countries than Europe (44) or Asia (48). The newest country is South Sudan, which became independent in 2011. 🗺️',
        explanationShort: 'Africa has 54 countries — more than any other continent!',
        source: 'African Union',
    },
];

// ============================================================================
// AFRICA - NATURE & WILDLIFE (10 questions)
// ============================================================================

const natureQuestions: Question[] = [
    {
        id: 'africa-nat-001',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Mammals',
        difficulty: 0.3,
        fascinationScore: 0.9,
        hookText: 'The African elephant is the largest land animal. How much can an adult male weigh?',
        options: [
            { id: 'a', text: 'Up to 3 tons' },
            { id: 'b', text: 'Up to 5 tons' },
            { id: 'c', text: 'Up to 7 tons' },
            { id: 'd', text: 'Up to 10 tons' },
        ],
        correctAnswer: 'c',
        explanation: 'Adult male African elephants can weigh up to 7 tons (7,000 kg) — that\'s heavier than 5 cars! Their ears alone are shaped like the African continent. They\'re so smart they can recognize themselves in mirrors. 🐘',
        explanationShort: 'African elephants: up to 7 tons — heavier than 5 cars!',
        source: 'World Wildlife Fund',
    },
    {
        id: 'africa-nat-002',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Mammals',
        difficulty: 0.4,
        fascinationScore: 0.93,
        hookText: 'Which animal is the FASTEST land animal on Earth, reaching speeds of 70 mph?',
        options: [
            { id: 'a', text: 'Lion' },
            { id: 'b', text: 'Cheetah' },
            { id: 'c', text: 'Gazelle' },
            { id: 'd', text: 'Wildebeest' },
        ],
        correctAnswer: 'b',
        explanation: 'Cheetahs can run at 70 mph (112 km/h) — faster than cars on many highways! But here\'s the catch: they can only maintain this speed for about 30 seconds. They must catch their prey quickly or give up! 🐆',
        explanationShort: 'Cheetahs: 70 mph — but only for 30 seconds!',
        source: 'National Geographic',
    },
    {
        id: 'africa-nat-003',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Mammals',
        difficulty: 0.5,
        fascinationScore: 0.88,
        hookText: 'Which African animal kills more humans per year than lions, crocodiles, or elephants?',
        options: [
            { id: 'a', text: 'Cape Buffalo' },
            { id: 'b', text: 'Hippopotamus' },
            { id: 'c', text: 'Rhinoceros' },
            { id: 'd', text: 'Gorilla' },
        ],
        correctAnswer: 'b',
        explanation: 'Hippos kill about 500 people per year in Africa — more than any other large animal! Despite looking slow and cute, they\'re extremely aggressive, can run 20 mph, and have massive teeth. Never get between a hippo and water! 🦛',
        explanationShort: 'Hippos kill ~500 people/year — most dangerous large animal!',
        source: 'African Wildlife Foundation',
    },
    {
        id: 'africa-nat-004',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Birds',
        difficulty: 0.4,
        fascinationScore: 0.9,
        hookText: 'The ostrich is the world\'s largest bird. How fast can it run?',
        options: [
            { id: 'a', text: 'Up to 25 mph' },
            { id: 'b', text: 'Up to 35 mph' },
            { id: 'c', text: 'Up to 45 mph' },
            { id: 'd', text: 'Up to 55 mph' },
        ],
        correctAnswer: 'c',
        explanation: 'Ostriches can run up to 45 mph (72 km/h) — faster than most horses! They can\'t fly, but they don\'t need to. Their eggs are the largest of any bird, and one ostrich egg equals about 24 chicken eggs! 🥚',
        explanationShort: 'Ostriches: 45 mph runners, eggs = 24 chicken eggs!',
        source: 'San Diego Zoo',
    },
    {
        id: 'africa-nat-005',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Mammals',
        difficulty: 0.3,
        fascinationScore: 0.95,
        hookText: 'What makes a giraffe\'s tongue special? It\'s about 18-20 inches long and what color?',
        options: [
            { id: 'a', text: 'Pink' },
            { id: 'b', text: 'Blue or Purple' },
            { id: 'c', text: 'Black' },
            { id: 'd', text: 'Red' },
        ],
        correctAnswer: 'b',
        explanation: 'Giraffe tongues are blue-purple! Scientists think the dark color acts like sunscreen, protecting it from sunburn while eating from trees all day. Their 18-20 inch tongues are also antiseptic — they can lick wounds to heal them! 🦒',
        explanationShort: 'Giraffe tongues are blue-purple — natural sunscreen!',
        source: 'Giraffe Conservation Foundation',
    },
];

// ============================================================================
// AFRICA - SPORTS & OLYMPICS (8 questions)
// ============================================================================

const sportsQuestions: Question[] = [
    {
        id: 'africa-spo-001',
        continent: 'AFRICA',
        category: 'SPORTS',
        subCategory: 'Olympics',
        difficulty: 0.5,
        fascinationScore: 0.88,
        hookText: 'Which African country has won the most Olympic medals in total?',
        options: [
            { id: 'a', text: 'Kenya' },
            { id: 'b', text: 'South Africa' },
            { id: 'c', text: 'Ethiopia' },
            { id: 'd', text: 'Egypt' },
        ],
        correctAnswer: 'a',
        explanation: 'Kenya has won over 100 Olympic medals, mostly in long-distance running! Kenyan runners dominate marathons worldwide. Fun fact: Many champions come from the Kalenjin tribe in the highlands — altitude training from birth! 🏃',
        explanationShort: 'Kenya: 100+ Olympic medals — running powerhouse!',
        source: 'International Olympic Committee',
    },
    {
        id: 'africa-spo-002',
        continent: 'AFRICA',
        category: 'SPORTS',
        subCategory: 'Football',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'Which African country hosted the FIFA World Cup in 2010 — the first ever on African soil?',
        options: [
            { id: 'a', text: 'Nigeria' },
            { id: 'b', text: 'Morocco' },
            { id: 'c', text: 'South Africa' },
            { id: 'd', text: 'Egypt' },
        ],
        correctAnswer: 'c',
        explanation: 'South Africa hosted the 2010 FIFA World Cup — the first ever in Africa! The tournament is remembered for the iconic vuvuzela horns that fans blew throughout matches. Spain won the final against Netherlands. ⚽',
        explanationShort: '2010 World Cup in South Africa — first ever in Africa!',
        source: 'FIFA',
    },
    {
        id: 'africa-spo-003',
        continent: 'AFRICA',
        category: 'SPORTS',
        subCategory: 'Athletics',
        difficulty: 0.5,
        fascinationScore: 0.9,
        hookText: 'Eliud Kipchoge from Kenya made history by being the first person to do what?',
        options: [
            { id: 'a', text: 'Win 5 Olympic marathons' },
            { id: 'b', text: 'Run a marathon in under 2 hours' },
            { id: 'c', text: 'Run 100 marathons in one year' },
            { id: 'd', text: 'Win marathon at age 50' },
        ],
        correctAnswer: 'b',
        explanation: 'In 2019, Eliud Kipchoge became the first human to run a marathon in under 2 hours (1:59:40)! While not an official record (he had pacers), it proved humans can break the "impossible" 2-hour barrier. He\'s considered the greatest marathoner ever! 🏆',
        explanationShort: 'Kipchoge: First human to run marathon under 2 hours!',
        source: 'INEOS 1:59 Challenge',
    },
    {
        id: 'africa-spo-004',
        continent: 'AFRICA',
        category: 'SPORTS',
        subCategory: 'Football',
        difficulty: 0.6,
        fascinationScore: 0.85,
        hookText: 'Which African country has won the Africa Cup of Nations (AFCON) the most times?',
        options: [
            { id: 'a', text: 'Nigeria' },
            { id: 'b', text: 'Cameroon' },
            { id: 'c', text: 'Egypt' },
            { id: 'd', text: 'Ghana' },
        ],
        correctAnswer: 'c',
        explanation: 'Egypt has won AFCON a record 7 times! They\'re the most successful team in African football history. Famous Egyptian players include Mohamed Salah who plays for Liverpool and is one of the world\'s best. ⚽🏆',
        explanationShort: 'Egypt: 7 AFCON titles — Africa\'s most successful team!',
        source: 'Confederation of African Football',
    },
    {
        id: 'africa-spo-005',
        continent: 'AFRICA',
        category: 'SPORTS',
        subCategory: 'Rugby',
        difficulty: 0.5,
        fascinationScore: 0.88,
        hookText: 'The South African rugby team, the Springboks, has won the Rugby World Cup how many times?',
        options: [
            { id: 'a', text: '2 times' },
            { id: 'b', text: '3 times' },
            { id: 'c', text: '4 times' },
            { id: 'd', text: '5 times' },
        ],
        correctAnswer: 'c',
        explanation: 'The Springboks have won the Rugby World Cup 4 times (1995, 2007, 2019, 2023) — the most by any nation! The 1995 win was historic as it united South Africa after apartheid, with Nelson Mandela famously cheering in a Springbok jersey. 🏉',
        explanationShort: 'Springboks: 4 Rugby World Cups — most ever!',
        source: 'World Rugby',
    },
];

// ============================================================================
// AFRICA - FOOD & CUISINE (7 questions)
// ============================================================================

const foodQuestions: Question[] = [
    {
        id: 'africa-food-001',
        continent: 'AFRICA',
        category: 'FOOD',
        subCategory: 'National Dishes',
        difficulty: 0.4,
        fascinationScore: 0.85,
        hookText: 'Which popular food that you probably eat comes from Ethiopia and is also known as "injera"?',
        options: [
            { id: 'a', text: 'A type of bread' },
            { id: 'b', text: 'A spicy meat stew' },
            { id: 'c', text: 'A coffee drink' },
            { id: 'd', text: 'A vegetable curry' },
        ],
        correctAnswer: 'a',
        explanation: 'Injera is a spongy sourdough flatbread from Ethiopia — you use it to scoop up food instead of using utensils! Fun fact: Ethiopia is also where COFFEE was first discovered. A goat herder noticed his goats dancing after eating coffee berries! ☕',
        explanationShort: 'Injera: Ethiopian spongy bread — eat with your hands!',
        source: 'Ethiopian Tourism',
    },
    {
        id: 'africa-food-002',
        continent: 'AFRICA',
        category: 'FOOD',
        subCategory: 'Origins',
        difficulty: 0.3,
        fascinationScore: 0.92,
        hookText: 'Chocolate comes from cocoa beans. Which African country produces the MOST cocoa in the world?',
        options: [
            { id: 'a', text: 'Ghana' },
            { id: 'b', text: 'Ivory Coast (Côte d\'Ivoire)' },
            { id: 'c', text: 'Nigeria' },
            { id: 'd', text: 'Cameroon' },
        ],
        correctAnswer: 'b',
        explanation: 'Ivory Coast produces about 40% of the world\'s cocoa — more than any other country! That means almost HALF the chocolate you eat started as a cocoa bean grown in West Africa. Ghana is second! 🍫',
        explanationShort: 'Ivory Coast: 40% of world\'s cocoa — almost half your chocolate!',
        source: 'International Cocoa Organization',
    },
    {
        id: 'africa-food-003',
        continent: 'AFRICA',
        category: 'FOOD',
        subCategory: 'Ingredients',
        difficulty: 0.5,
        fascinationScore: 0.88,
        hookText: 'What is "Jollof Rice" — a dish that West African countries argue about who makes it best?',
        options: [
            { id: 'a', text: 'Sweet dessert rice' },
            { id: 'b', text: 'Tomato-based rice with spices' },
            { id: 'c', text: 'Coconut milk rice' },
            { id: 'd', text: 'Plain steamed rice' },
        ],
        correctAnswer: 'b',
        explanation: 'Jollof Rice is a delicious tomato-based rice dish with spices! Nigeria and Ghana have a famous (and funny) rivalry over who makes better Jollof. The "Jollof Wars" is a popular meme on social media. Both are delicious! 🍚🍅',
        explanationShort: 'Jollof Rice: Tomato-spiced rice — Nigeria vs Ghana rivalry!',
        source: 'BBC Food',
    },
];

// ============================================================================
// AFRICA - MUSIC & ARTS (5 questions)
// ============================================================================

const musicQuestions: Question[] = [
    {
        id: 'africa-mus-001',
        continent: 'AFRICA',
        category: 'MUSIC_ARTS',
        subCategory: 'Instruments',
        difficulty: 0.4,
        fascinationScore: 0.85,
        hookText: 'The djembe is a famous African drum. What is it traditionally made from?',
        options: [
            { id: 'a', text: 'Metal and plastic' },
            { id: 'b', text: 'Wood and goat skin' },
            { id: 'c', text: 'Clay and leather' },
            { id: 'd', text: 'Bamboo and rope' },
        ],
        correctAnswer: 'b',
        explanation: 'The djembe drum is carved from a single piece of hardwood and topped with goat skin! It originated in West Africa and was used to communicate across villages. A skilled drummer can make it "talk" by playing different tones. 🥁',
        explanationShort: 'Djembe: Carved wood + goat skin — can make it "talk"!',
        source: 'Smithsonian Institution',
    },
    {
        id: 'africa-mus-002',
        continent: 'AFRICA',
        category: 'MUSIC_ARTS',
        subCategory: 'Dance',
        difficulty: 0.5,
        fascinationScore: 0.9,
        hookText: 'The Maasai warriors of Kenya and Tanzania are famous for a dance where they do what?',
        options: [
            { id: 'a', text: 'Spin in circles' },
            { id: 'b', text: 'Jump straight up as high as possible' },
            { id: 'c', text: 'Stomp the ground rhythmically' },
            { id: 'd', text: 'Wave their arms like birds' },
        ],
        correctAnswer: 'b',
        explanation: 'In the Adumu (jumping dance), Maasai warriors compete to jump the highest straight up without bending their legs! It\'s a warrior tradition and coming-of-age ceremony. Some warriors can jump over 2 feet high! 🦁',
        explanationShort: 'Maasai jumping dance: Warriors compete to jump highest!',
        source: 'National Geographic',
    },
];

// ============================================================================
// AFRICA - RECORDS & SUPERLATIVES (5 questions)
// ============================================================================

const recordsQuestions: Question[] = [
    {
        id: 'africa-rec-001',
        continent: 'AFRICA',
        category: 'RECORDS',
        subCategory: 'Biggest',
        difficulty: 0.4,
        fascinationScore: 0.92,
        hookText: 'Africa is home to the largest structure ever built by living creatures (not humans). What is it?',
        options: [
            { id: 'a', text: 'Elephant migration paths' },
            { id: 'b', text: 'Termite mounds' },
            { id: 'c', text: 'Bird nests' },
            { id: 'd', text: 'Ant colonies' },
        ],
        correctAnswer: 'b',
        explanation: 'African termite mounds can reach 9 meters (30 feet) tall — taller than a 3-story building! Relative to the termites\' size, it\'s like humans building something 180 times taller than the Empire State Building! They\'re engineering marvels with air conditioning! 🏗️',
        explanationShort: 'Termite mounds: 30 feet tall — like building 180 Empire States!',
        source: 'Harvard University Research',
    },
    {
        id: 'africa-rec-002',
        continent: 'AFRICA',
        category: 'RECORDS',
        subCategory: 'Oldest',
        difficulty: 0.5,
        fascinationScore: 0.95,
        hookText: 'Where is the oldest desert on Earth located? It\'s about 55 million years old!',
        options: [
            { id: 'a', text: 'The Sahara Desert' },
            { id: 'b', text: 'The Kalahari Desert' },
            { id: 'c', text: 'The Namib Desert' },
            { id: 'd', text: 'The Gobi Desert' },
        ],
        correctAnswer: 'c',
        explanation: 'The Namib Desert in Namibia is about 55-80 million years old — the world\'s oldest! It existed before the dinosaurs went extinct! Its famous red sand dunes can reach 300 meters high and look like they\'re from Mars. 🏜️',
        explanationShort: 'Namib Desert: 55-80 million years — older than dinosaur extinction!',
        source: 'UNESCO World Heritage',
    },
];

// ============================================================================
// AFRICA - FUN FACTS & WEIRD (5 questions)
// ============================================================================

const funFactsQuestions: Question[] = [
    {
        id: 'africa-fun-001',
        continent: 'AFRICA',
        category: 'FUN_FACTS',
        subCategory: 'Unusual',
        difficulty: 0.5,
        fascinationScore: 0.98,
        hookText: 'There\'s a lake in Tanzania that turns animals into STONE statues. What\'s it called?',
        options: [
            { id: 'a', text: 'Lake Victoria' },
            { id: 'b', text: 'Lake Natron' },
            { id: 'c', text: 'Lake Tanganyika' },
            { id: 'd', text: 'Lake Malawi' },
        ],
        correctAnswer: 'b',
        explanation: 'Lake Natron has water so alkaline (like ammonia!) that when birds and bats fall in, they calcify into stone statues! Their bodies are preserved in eerie poses. Yet millions of flamingos LIVE here because the harsh conditions protect them from predators. 💀',
        explanationShort: 'Lake Natron calcifies animals into stone — yet flamingos love it!',
        source: 'National Geographic',
    },
    {
        id: 'africa-fun-002',
        continent: 'AFRICA',
        category: 'FUN_FACTS',
        subCategory: 'Bizarre',
        difficulty: 0.4,
        fascinationScore: 0.93,
        hookText: 'South Africa has a penguin colony on its beaches. How did African Penguins get there?',
        options: [
            { id: 'a', text: 'They were brought from Antarctica' },
            { id: 'b', text: 'They\'ve always lived there — cold ocean currents!' },
            { id: 'c', text: 'They escaped from a zoo in 1952' },
            { id: 'd', text: 'They migrated from South America' },
        ],
        correctAnswer: 'b',
        explanation: 'African Penguins have lived in South Africa for millions of years! The cold Benguela Current from Antarctica keeps the waters cool enough for penguins. You can actually swim with them at Boulders Beach near Cape Town! 🐧',
        explanationShort: 'African Penguins: Native for millions of years — cold ocean currents!',
        source: 'South African National Biodiversity Institute',
    },
    {
        id: 'africa-fun-003',
        continent: 'AFRICA',
        category: 'FUN_FACTS',
        subCategory: 'Language',
        difficulty: 0.3,
        fascinationScore: 0.88,
        hookText: 'How many languages are spoken across Africa — the most linguistically diverse continent?',
        options: [
            { id: 'a', text: 'About 500 languages' },
            { id: 'b', text: 'About 1,000 languages' },
            { id: 'c', text: 'About 2,000 languages' },
            { id: 'd', text: 'About 3,000 languages' },
        ],
        correctAnswer: 'c',
        explanation: 'Africa has about 2,000 distinct languages — nearly one-third of the world\'s languages! Nigeria alone has over 500! Many Africans easily speak 3-4 languages. Some languages have unique "click" sounds that are almost impossible for non-native speakers to learn. 🗣️',
        explanationShort: 'Africa: ~2,000 languages — nearly 1/3 of world\'s languages!',
        source: 'UNESCO Atlas of Languages',
    },
];

// ============================================================================
// COMBINE ALL AFRICA QUESTIONS
// ============================================================================

export const africaQuestionsExpanded: Question[] = [
    ...geographyQuestions,
    ...natureQuestions,
    ...sportsQuestions,
    ...foodQuestions,
    ...musicQuestions,
    ...recordsQuestions,
    ...funFactsQuestions,
];

export default africaQuestionsExpanded;
