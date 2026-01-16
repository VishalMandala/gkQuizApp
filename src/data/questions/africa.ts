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
// AFRICA - BATCH 2: GEOGRAPHY (10 more questions)
// ============================================================================

const geographyBatch2: Question[] = [
    {
        id: 'africa-geo-006',
        continent: 'AFRICA',
        category: 'GEOGRAPHY',
        subCategory: 'Capitals',
        difficulty: 0.2, // Easy - Kids
        fascinationScore: 0.85,
        hookText: 'What is the capital city of Egypt — home to the famous pyramids nearby?',
        options: [
            { id: 'a', text: 'Alexandria' },
            { id: 'b', text: 'Cairo' },
            { id: 'c', text: 'Luxor' },
            { id: 'd', text: 'Giza' },
        ],
        correctAnswer: 'b',
        explanation: 'Cairo is Egypt\'s capital and Africa\'s largest city with over 20 million people! The Great Pyramids of Giza are just 15 km away. Cairo is called "the city of a thousand minarets" because of its many mosques. 🏛️',
        explanationShort: 'Cairo: Africa\'s largest city — pyramids just 15 km away!',
        source: 'Egyptian Tourism Authority',
    },
    {
        id: 'africa-geo-007',
        continent: 'AFRICA',
        category: 'GEOGRAPHY',
        subCategory: 'Borders',
        difficulty: 0.5, // Medium
        fascinationScore: 0.88,
        hookText: 'Which African country has the most neighboring countries — touching 9 different nations?',
        options: [
            { id: 'a', text: 'Tanzania' },
            { id: 'b', text: 'Democratic Republic of Congo' },
            { id: 'c', text: 'Sudan' },
            { id: 'd', text: 'Ethiopia' },
        ],
        correctAnswer: 'b',
        explanation: 'The Democratic Republic of Congo (DRC) borders 9 countries — more than any other African nation! It\'s the 2nd largest country in Africa by area and contains the world\'s 2nd largest rainforest after the Amazon. 🗺️',
        explanationShort: 'DRC: 9 neighboring countries — 2nd largest rainforest!',
        source: 'African Union',
    },
    {
        id: 'africa-geo-008',
        continent: 'AFRICA',
        category: 'GEOGRAPHY',
        subCategory: 'Islands',
        difficulty: 0.6, // Medium-Hard
        fascinationScore: 0.9,
        hookText: 'Madagascar is the world\'s 4th largest island. What percentage of its wildlife is found NOWHERE else on Earth?',
        options: [
            { id: 'a', text: 'About 50%' },
            { id: 'b', text: 'About 70%' },
            { id: 'c', text: 'About 90%' },
            { id: 'd', text: 'About 95%' },
        ],
        correctAnswer: 'c',
        explanation: 'About 90% of Madagascar\'s wildlife is endemic — found nowhere else on Earth! This includes all lemur species (over 100!), most chameleon species, and unique baobab trees. It split from Africa 160 million years ago and evolved separately. 🦎',
        explanationShort: 'Madagascar: 90% wildlife found nowhere else on Earth!',
        source: 'WWF Madagascar',
    },
    {
        id: 'africa-geo-009',
        continent: 'AFRICA',
        category: 'GEOGRAPHY',
        subCategory: 'Lakes',
        difficulty: 0.4, // Medium-Easy
        fascinationScore: 0.87,
        hookText: 'Lake Victoria is Africa\'s largest lake. Which three countries share it?',
        options: [
            { id: 'a', text: 'Kenya, Tanzania, Uganda' },
            { id: 'b', text: 'Ethiopia, Sudan, South Sudan' },
            { id: 'c', text: 'Zambia, Zimbabwe, Botswana' },
            { id: 'd', text: 'Nigeria, Niger, Chad' },
        ],
        correctAnswer: 'a',
        explanation: 'Lake Victoria is shared by Kenya, Tanzania, and Uganda! It\'s about the size of Ireland and is the source of the Nile River. Over 30 million people depend on it for fishing, and it contains 200+ species of fish. 🐟',
        explanationShort: 'Lake Victoria: Size of Ireland — source of the Nile!',
        source: 'Lake Victoria Basin Commission',
    },
    {
        id: 'africa-geo-010',
        continent: 'AFRICA',
        category: 'GEOGRAPHY',
        subCategory: 'Volcanoes',
        difficulty: 0.7, // Hard
        fascinationScore: 0.95,
        hookText: 'There\'s an African volcano with the world\'s largest lava lake — you can see glowing lava 24/7. Where is it?',
        options: [
            { id: 'a', text: 'Mount Kenya, Kenya' },
            { id: 'b', text: 'Mount Nyiragongo, DR Congo' },
            { id: 'c', text: 'Mount Cameroon, Cameroon' },
            { id: 'd', text: 'Erta Ale, Ethiopia' },
        ],
        correctAnswer: 'b',
        explanation: 'Mount Nyiragongo in DR Congo has the world\'s largest lava lake — a bubbling pit of molten rock you can see glowing at night! Its lava is unusually fluid and can flow at 60 km/h — faster than a car in traffic! 🌋',
        explanationShort: 'Nyiragongo: Largest lava lake — lava flows 60 km/h!',
        source: 'Goma Volcano Observatory',
    },
];

// ============================================================================
// AFRICA - BATCH 2: NATURE & WILDLIFE (10 more questions)
// ============================================================================

const natureBatch2: Question[] = [
    {
        id: 'africa-nat-006',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Mammals',
        difficulty: 0.2, // Easy - Kids
        fascinationScore: 0.92,
        hookText: 'Zebras have stripes that are as unique as human fingerprints. What are the stripes probably used for?',
        options: [
            { id: 'a', text: 'Camouflage from predators' },
            { id: 'b', text: 'Confusing biting flies' },
            { id: 'c', text: 'Temperature control' },
            { id: 'd', text: 'All of the above' },
        ],
        correctAnswer: 'd',
        explanation: 'Scientists believe zebra stripes serve multiple purposes! They confuse biting flies (the flies can\'t land properly), help regulate temperature, and when zebras move in herds, the stripes make it hard for lions to target one individual. 🦓',
        explanationShort: 'Zebra stripes: Confuse flies, cool down, and confuse predators!',
        source: 'Journal of Experimental Biology',
    },
    {
        id: 'africa-nat-007',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Primates',
        difficulty: 0.4, // Medium-Easy
        fascinationScore: 0.95,
        hookText: 'Gorillas share about 98% of their DNA with humans. How do silverback gorillas show they\'re in charge?',
        options: [
            { id: 'a', text: 'By roaring loudly' },
            { id: 'b', text: 'By chest-beating' },
            { id: 'c', text: 'By fighting other males' },
            { id: 'd', text: 'By eating first' },
        ],
        correctAnswer: 'b',
        explanation: 'Silverback gorillas beat their chests to show dominance and communicate! The sound can travel 1 km through the forest. Despite their size (up to 200 kg), gorillas are mostly gentle vegetarians. Only about 1,000 mountain gorillas remain in the wild. 🦍',
        explanationShort: 'Chest-beating travels 1 km — only 1,000 mountain gorillas left!',
        source: 'Dian Fossey Gorilla Fund',
    },
    {
        id: 'africa-nat-008',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Reptiles',
        difficulty: 0.5, // Medium
        fascinationScore: 0.88,
        hookText: 'The Nile crocodile is Africa\'s largest reptile. How long can they hold their breath underwater?',
        options: [
            { id: 'a', text: 'About 15 minutes' },
            { id: 'b', text: 'About 30 minutes' },
            { id: 'c', text: 'About 1 hour' },
            { id: 'd', text: 'About 2 hours' },
        ],
        correctAnswer: 'd',
        explanation: 'Nile crocodiles can hold their breath for about 2 hours by slowing their heart rate! They can grow up to 6 meters long and weigh 750 kg. They\'ve existed for 200 million years — they lived with dinosaurs! 🐊',
        explanationShort: 'Nile crocs: 2 hours underwater — lived with dinosaurs!',
        source: 'National Geographic',
    },
    {
        id: 'africa-nat-009',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Migration',
        difficulty: 0.5, // Medium
        fascinationScore: 0.97,
        hookText: 'The Great Wildebeest Migration is Earth\'s largest land migration. How many animals participate?',
        options: [
            { id: 'a', text: 'About 500,000' },
            { id: 'b', text: 'About 1 million' },
            { id: 'c', text: 'About 1.5 million' },
            { id: 'd', text: 'About 2 million' },
        ],
        correctAnswer: 'c',
        explanation: 'About 1.5 million wildebeest plus 200,000 zebras and gazelles travel in a circle between Tanzania and Kenya every year! They cover 1,800 km following the rains. Over 250,000 don\'t survive the journey — crocodiles, lions, and exhaustion take their toll. 🦁',
        explanationShort: '1.5 million wildebeest — 1,800 km journey every year!',
        source: 'Serengeti National Park',
    },
    {
        id: 'africa-nat-010',
        continent: 'AFRICA',
        category: 'NATURE_WILDLIFE',
        subCategory: 'Insects',
        difficulty: 0.6, // Medium-Hard
        fascinationScore: 0.85,
        hookText: 'African driver ants form the largest ant colonies on Earth. How many ants in one colony?',
        options: [
            { id: 'a', text: 'About 1 million' },
            { id: 'b', text: 'About 5 million' },
            { id: 'c', text: 'About 20 million' },
            { id: 'd', text: 'About 50 million' },
        ],
        correctAnswer: 'c',
        explanation: 'African driver ant colonies can have 20 million members! They\'re blind but move in massive armies, eating anything in their path. They\'ve been known to kill animals as large as cows that can\'t escape. Local people actually use them to clean pests from their homes! 🐜',
        explanationShort: '20 million ants per colony — can take down a cow!',
        source: 'Smithsonian Institution',
    },
];

// ============================================================================
// AFRICA - BATCH 2: SPORTS (8 more questions)
// ============================================================================

const sportsBatch2: Question[] = [
    {
        id: 'africa-spo-006',
        continent: 'AFRICA',
        category: 'SPORTS',
        subCategory: 'Football',
        difficulty: 0.4,
        fascinationScore: 0.9,
        hookText: 'Who was the first African player to be named FIFA World Player of the Year?',
        options: [
            { id: 'a', text: 'Didier Drogba' },
            { id: 'b', text: 'Samuel Eto\'o' },
            { id: 'c', text: 'George Weah' },
            { id: 'd', text: 'Roger Milla' },
        ],
        correctAnswer: 'c',
        explanation: 'George Weah of Liberia won in 1995 — a historic moment for African football! He later became the President of Liberia in 2018, making him one of the few athletes to become a head of state. Football star to president! ⚽👔',
        explanationShort: 'Weah: First African world player — later became President!',
        source: 'FIFA',
    },
    {
        id: 'africa-spo-007',
        continent: 'AFRICA',
        category: 'SPORTS',
        subCategory: 'Athletics',
        difficulty: 0.5,
        fascinationScore: 0.92,
        hookText: 'Ethiopian runner Haile Gebrselassie broke 27 world records. At what altitude did he train?',
        options: [
            { id: 'a', text: 'Sea level' },
            { id: 'b', text: '1,500 meters' },
            { id: 'c', text: '2,400 meters' },
            { id: 'd', text: '3,500 meters' },
        ],
        correctAnswer: 'c',
        explanation: 'Ethiopian champions train at 2,400+ meters altitude in Addis Ababa! This develops more red blood cells to carry oxygen. When they compete at sea level, their bodies are "supercharged." This is why East Africans dominate distance running! 🏃',
        explanationShort: 'Altitude training at 2,400m — East African secret weapon!',
        source: 'International Association of Athletics',
    },
    {
        id: 'africa-spo-008',
        continent: 'AFRICA',
        category: 'SPORTS',
        subCategory: 'Swimming',
        difficulty: 0.7, // Hard
        fascinationScore: 0.88,
        hookText: 'Chad le Clos of South Africa shocked the world by beating which legendary swimmer at the 2012 Olympics?',
        options: [
            { id: 'a', text: 'Ryan Lochte' },
            { id: 'b', text: 'Michael Phelps' },
            { id: 'c', text: 'Ian Thorpe' },
            { id: 'd', text: 'Grant Hackett' },
        ],
        correctAnswer: 'b',
        explanation: 'Chad le Clos beat Michael Phelps — the GOAT with 23 Olympic golds — in the 200m butterfly by 0.05 seconds! The famous "dad reaction" video of his father celebrating went viral. Phelps got revenge in 2016 with the famous "death stare" photo! 🥇',
        explanationShort: 'Le Clos beat Phelps by 0.05 sec — famous dad reaction!',
        source: 'Olympics Official',
    },
];

// ============================================================================
// AFRICA - BATCH 2: SCIENCE & INVENTIONS (7 questions)
// ============================================================================

const scienceBatch2: Question[] = [
    {
        id: 'africa-sci-001',
        continent: 'AFRICA',
        category: 'SCIENCE',
        subCategory: 'Ancient Science',
        difficulty: 0.6,
        fascinationScore: 0.92,
        hookText: 'Ancient Egyptians invented which important material that we still use today for writing and packaging?',
        options: [
            { id: 'a', text: 'Plastic' },
            { id: 'b', text: 'Paper (papyrus)' },
            { id: 'c', text: 'Cardboard' },
            { id: 'd', text: 'Cloth scrolls' },
        ],
        correctAnswer: 'b',
        explanation: 'Egyptians invented papyrus around 3000 BCE — the first paper-like material! Made from the papyrus plant, it was so valuable that exporting it was banned. The word "paper" comes from papyrus. Some papyrus documents are still readable after 4,000 years! 📜',
        explanationShort: 'Papyrus: World\'s first paper — readable after 4,000 years!',
        source: 'British Museum',
    },
    {
        id: 'africa-sci-002',
        continent: 'AFRICA',
        category: 'SCIENCE',
        subCategory: 'Mathematics',
        difficulty: 0.7, // Hard
        fascinationScore: 0.88,
        hookText: 'The oldest known mathematical object is from Africa. What is the Ishango Bone?',
        options: [
            { id: 'a', text: 'A 20,000-year-old tally stick' },
            { id: 'b', text: 'An ancient calculator' },
            { id: 'c', text: 'A measuring tool' },
            { id: 'd', text: 'A star chart' },
        ],
        correctAnswer: 'a',
        explanation: 'The Ishango Bone from Congo is 20,000+ years old with mathematical notches! It may be the oldest evidence of humans counting or even understanding prime numbers. This suggests complex mathematical thinking existed in Africa long before anywhere else! 🔢',
        explanationShort: 'Ishango Bone: 20,000-year-old math from Congo!',
        source: 'Royal Belgian Institute of Natural Sciences',
    },
    {
        id: 'africa-sci-003',
        continent: 'AFRICA',
        category: 'SCIENCE',
        subCategory: 'Medicine',
        difficulty: 0.6,
        fascinationScore: 0.9,
        hookText: 'Ancient Egyptians performed surgeries 4,000 years ago. What did they use as stitches?',
        options: [
            { id: 'a', text: 'Metal clips' },
            { id: 'b', text: 'Linen thread' },
            { id: 'c', text: 'Animal sinew and hair' },
            { id: 'd', text: 'Plant fibers only' },
        ],
        correctAnswer: 'c',
        explanation: 'Egyptian surgeons used animal sinew, hair, and plant fibers as sutures! The Edwin Smith Papyrus (1600 BCE) describes 48 surgical cases including brain surgery. They also used honey as an antibiotic — which science now confirms works! 🏥',
        explanationShort: 'Ancient Egypt: Brain surgery — honey as antibiotic!',
        source: 'New York Academy of Medicine',
    },
];

// ============================================================================
// AFRICA - BATCH 2: FAMOUS PEOPLE (8 questions)
// ============================================================================

const famousPeopleBatch2: Question[] = [
    {
        id: 'africa-fam-001',
        continent: 'AFRICA',
        category: 'FAMOUS_PEOPLE',
        subCategory: 'Leaders',
        difficulty: 0.4,
        fascinationScore: 0.95,
        hookText: 'Nelson Mandela spent 27 years in prison. What was his prisoner number that he became known by?',
        options: [
            { id: 'a', text: '46664' },
            { id: 'b', text: '12345' },
            { id: 'c', text: '78910' },
            { id: 'd', text: '55555' },
        ],
        correctAnswer: 'a',
        explanation: 'Mandela\'s prisoner number 46664 became a powerful symbol. He was the 466th prisoner in 1964. After release, he became South Africa\'s first Black president and won the Nobel Peace Prize. The number 46664 is now a famous campaign against AIDS. ✊',
        explanationShort: 'Mandela: Prisoner 46664 → First Black president!',
        source: 'Nelson Mandela Foundation',
    },
    {
        id: 'africa-fam-002',
        continent: 'AFRICA',
        category: 'FAMOUS_PEOPLE',
        subCategory: 'Scientists',
        difficulty: 0.6,
        fascinationScore: 0.88,
        hookText: 'Who discovered the famous 3.2-million-year-old human ancestor skeleton "Lucy" in Ethiopia?',
        options: [
            { id: 'a', text: 'Richard Leakey' },
            { id: 'b', text: 'Mary Leakey' },
            { id: 'c', text: 'Donald Johanson' },
            { id: 'd', text: 'Tim White' },
        ],
        correctAnswer: 'c',
        explanation: 'Donald Johanson found Lucy in 1974 while listening to "Lucy in the Sky with Diamonds" — hence the name! Lucy proved humans walked upright 3.2 million years ago. Ethiopia is called the "Cradle of Humanity" because of such discoveries. 🦴',
        explanationShort: 'Lucy named after Beatles song — proved upright walking!',
        source: 'Smithsonian National Museum',
    },
    {
        id: 'africa-fam-003',
        continent: 'AFRICA',
        category: 'FAMOUS_PEOPLE',
        subCategory: 'Explorers',
        difficulty: 0.5,
        fascinationScore: 0.85,
        hookText: 'Wangari Maathai was the first African woman to win the Nobel Peace Prize. What did she do?',
        options: [
            { id: 'a', text: 'Ended a war' },
            { id: 'b', text: 'Planted 51 million trees' },
            { id: 'c', text: 'Invented a vaccine' },
            { id: 'd', text: 'Founded a school' },
        ],
        correctAnswer: 'b',
        explanation: 'Wangari Maathai of Kenya founded the Green Belt Movement, planting over 51 million trees! She won the 2004 Nobel Prize for linking environmental conservation with women\'s rights and peace. She proved that planting trees can change lives and politics! 🌳',
        explanationShort: 'Wangari Maathai: 51 million trees — Nobel Peace Prize!',
        source: 'Nobel Prize Foundation',
    },
];

// ============================================================================
// AFRICA - BATCH 2: FUN FACTS (7 more questions)
// ============================================================================

const funFactsBatch2: Question[] = [
    {
        id: 'africa-fun-004',
        continent: 'AFRICA',
        category: 'FUN_FACTS',
        subCategory: 'Demographics',
        difficulty: 0.4,
        fascinationScore: 0.88,
        hookText: 'Africa\'s population is growing fast. By 2050, what fraction of the world\'s young people will be African?',
        options: [
            { id: 'a', text: 'About 1/4 (25%)' },
            { id: 'b', text: 'About 1/3 (33%)' },
            { id: 'c', text: 'About 40%' },
            { id: 'd', text: 'About 50%' },
        ],
        correctAnswer: 'c',
        explanation: 'By 2050, 40% of all young people (under 25) will live in Africa! The continent\'s population will double to 2.5 billion by 2050. Nigeria alone will have more people than the USA. Africa is the youngest continent — median age is just 19! 👶',
        explanationShort: 'Africa 2050: 40% of world\'s youth — median age just 19!',
        source: 'United Nations Population Division',
    },
    {
        id: 'africa-fun-005',
        continent: 'AFRICA',
        category: 'FUN_FACTS',
        subCategory: 'Technology',
        difficulty: 0.5,
        fascinationScore: 0.92,
        hookText: 'M-Pesa mobile money from Kenya changed banking forever. What percentage of Kenya\'s GDP flows through it?',
        options: [
            { id: 'a', text: 'About 10%' },
            { id: 'b', text: 'About 25%' },
            { id: 'c', text: 'About 50%' },
            { id: 'd', text: 'About 75%' },
        ],
        correctAnswer: 'c',
        explanation: 'About 50% of Kenya\'s entire economy flows through M-Pesa! Launched in 2007, it lets people send money via text message. Over 50 million people in Africa use it. Kenya invented mobile payments before most developed countries! 📱💰',
        explanationShort: 'M-Pesa: 50% of Kenya\'s GDP — Africa invented mobile money!',
        source: 'World Bank',
    },
    {
        id: 'africa-fun-006',
        continent: 'AFRICA',
        category: 'FUN_FACTS',
        subCategory: 'Culture',
        difficulty: 0.3, // Easy
        fascinationScore: 0.85,
        hookText: 'Nollywood is Africa\'s biggest film industry. How many movies does it produce per year?',
        options: [
            { id: 'a', text: 'About 500 films' },
            { id: 'b', text: 'About 1,000 films' },
            { id: 'c', text: 'About 2,500 films' },
            { id: 'd', text: 'About 5,000 films' },
        ],
        correctAnswer: 'c',
        explanation: 'Nigeria\'s Nollywood produces about 2,500 films per year — second only to India\'s Bollywood! It employs 1 million people and generates $1 billion annually. Most films are made in just 2 weeks with tiny budgets but huge audiences! 🎬',
        explanationShort: 'Nollywood: 2,500 films/year — 2nd largest film industry!',
        source: 'UNESCO',
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
    // Batch 2
    ...geographyBatch2,
    ...natureBatch2,
    ...sportsBatch2,
    ...scienceBatch2,
    ...famousPeopleBatch2,
    ...funFactsBatch2,
];

export default africaQuestionsExpanded;

