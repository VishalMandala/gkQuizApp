/**
 * Global Quest - Questions Index
 * Central export for all continent questions
 * 
 * Content Scale Target: 3,500+ questions
 * - 7 continents × 500 questions = 3,500 questions minimum
 * - 10 categories per continent × 50 questions = 500 per continent
 */

import { africaQuestionsExpanded } from './africa';
import { asiaQuestionsExpanded } from './asia';
import type { Question, Continent, Category } from '../../types';

// Re-export individual continent question arrays
export { africaQuestionsExpanded } from './africa';
export { asiaQuestionsExpanded } from './asia';

// ============================================================================
// COMBINED QUESTIONS
// ============================================================================

/**
 * All expanded questions from the new modular structure
 * This will grow as we add more continents
 */
export const allExpandedQuestions: Question[] = [
    ...africaQuestionsExpanded,
    ...asiaQuestionsExpanded,
    // TODO: Add more continents
    // ...europeQuestionsExpanded,
    // ...northAmericaQuestionsExpanded,
    // ...southAmericaQuestionsExpanded,
    // ...australiaQuestionsExpanded,
    // ...antarcticaQuestionsExpanded,
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all questions for a specific continent
 */
export const getQuestionsByContinent = (continent: Continent): Question[] => {
    return allExpandedQuestions.filter(q => q.continent === continent);
};

/**
 * Get all questions for a specific category
 */
export const getQuestionsByCategory = (category: Category): Question[] => {
    return allExpandedQuestions.filter(q => q.category === category);
};

/**
 * Get questions by difficulty range
 */
export const getQuestionsByDifficulty = (min: number, max: number): Question[] => {
    return allExpandedQuestions.filter(q => q.difficulty >= min && q.difficulty <= max);
};

/**
 * Get a random question with optional filters
 */
export const getRandomQuestion = (options?: {
    continent?: Continent;
    category?: Category;
    difficultyRange?: { min: number; max: number };
    excludeIds?: string[];
}): Question | null => {
    let filtered = [...allExpandedQuestions];

    if (options?.continent) {
        filtered = filtered.filter(q => q.continent === options.continent);
    }
    if (options?.category) {
        filtered = filtered.filter(q => q.category === options.category);
    }
    if (options?.difficultyRange) {
        filtered = filtered.filter(
            q => q.difficulty >= options.difficultyRange!.min &&
                q.difficulty <= options.difficultyRange!.max
        );
    }
    if (options?.excludeIds) {
        filtered = filtered.filter(q => !options.excludeIds!.includes(q.id));
    }

    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
};

/**
 * Get question count statistics
 */
export const getQuestionStats = () => {
    const stats = {
        total: allExpandedQuestions.length,
        byContinent: {} as Record<string, number>,
        byCategory: {} as Record<string, number>,
        byDifficulty: {
            easy: 0,    // 0-0.3
            medium: 0,  // 0.3-0.6
            hard: 0,    // 0.6-0.8
            expert: 0,  // 0.8-1.0
        },
    };

    allExpandedQuestions.forEach(q => {
        // By continent
        stats.byContinent[q.continent] = (stats.byContinent[q.continent] || 0) + 1;

        // By category
        stats.byCategory[q.category] = (stats.byCategory[q.category] || 0) + 1;

        // By difficulty
        if (q.difficulty <= 0.3) stats.byDifficulty.easy++;
        else if (q.difficulty <= 0.6) stats.byDifficulty.medium++;
        else if (q.difficulty <= 0.8) stats.byDifficulty.hard++;
        else stats.byDifficulty.expert++;
    });

    return stats;
};

// ============================================================================
// CONTENT POPULATION TARGETS
// ============================================================================

/**
 * Target: 500 questions per continent
 * 
 * AFRICA:     50 questions ✅ (10% complete)
 * ASIA:       45 questions ✅ (9% complete)
 * EUROPE:     0 questions (TODO)
 * NORTH_AMERICA: 0 questions (TODO)
 * SOUTH_AMERICA: 0 questions (TODO)
 * AUSTRALIA_OCEANIA: 0 questions (TODO)
 * ANTARCTICA: 0 questions (TODO)
 * 
 * Total: ~95 questions / 3,500 target = 2.7% complete
 */

export default allExpandedQuestions;
