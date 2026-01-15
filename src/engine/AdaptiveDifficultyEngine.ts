/**
 * Global Quest - Adaptive Difficulty Engine
 * Core algorithm for keeping users in flow state
 */

import type { Question, Continent, Category } from '../types';

// ============================================================================
// TYPES
// ============================================================================

export interface UserPerformanceState {
    // Rolling accuracy (last N questions)
    rollingAccuracy: number;

    // Confidence index (0 = crushed, 1 = overconfident)
    confidenceIndex: number;

    // Fatigue score (increases with session length)
    fatigueScore: number;

    // Current skill level (0-1 scale)
    skillLevel: number;

    // Recent answer history
    recentAnswers: AnswerRecord[];

    // Strong categories for this user
    strongCategories: Category[];

    // Weak categories for this user
    weakCategories: Category[];
}

export interface AnswerRecord {
    questionId: string;
    continent: Continent;
    category: Category;
    difficulty: number;
    isCorrect: boolean;
    timeTakenMs: number;
    timestamp: Date;
}

export interface DifficultyResult {
    targetDifficulty: number;
    selectionStrategy: 'normal' | 'confidence_boost' | 'reinforcement' | 'fatigue_friendly';
    reason: string;
}

export interface QuestionSelectionResult {
    question: Question;
    strategy: string;
    targetDifficulty: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

// Flow state boundaries
const FLOW_FLOOR = 0.60;      // Below this: user frustrated
const FLOW_CEILING = 0.80;    // Above this: user bored
const OPTIMAL_ACCURACY = 0.70; // Target accuracy for flow

// Confidence thresholds
const CONFIDENCE_CRITICAL = 0.25;  // Need immediate recovery
const CONFIDENCE_LOW = 0.40;       // Should consider easier questions

// Fatigue thresholds
const FATIGUE_MODERATE = 0.50;     // Start showing easier questions
const FATIGUE_HIGH = 0.70;         // Suggest breaks, shorter questions

// Timing thresholds (ms)
const FAST_ANSWER_THRESHOLD = 3000;   // Very quick answer
const SLOW_ANSWER_THRESHOLD = 15000;  // Taking too long

// XP rewards
const BASE_XP = 20;
const DIFFICULTY_BONUS_MULTIPLIER = 10;
const STREAK_BONUS_MULTIPLIER = 5;

// ============================================================================
// ADAPTIVE DIFFICULTY ENGINE
// ============================================================================

export class AdaptiveDifficultyEngine {
    private state: UserPerformanceState;
    private sessionQuestionCount: number = 0;
    private sessionStartTime: Date;
    private consecutiveCorrect: number = 0;
    private consecutiveWrong: number = 0;

    constructor(initialState?: Partial<UserPerformanceState>) {
        this.state = {
            rollingAccuracy: 0.70,
            confidenceIndex: 0.50,
            fatigueScore: 0.0,
            skillLevel: 0.50,
            recentAnswers: [],
            strongCategories: [],
            weakCategories: [],
            ...initialState,
        };
        this.sessionStartTime = new Date();
    }

    // ============================================================================
    // CORE METHODS
    // ============================================================================

    /**
     * Calculate the target difficulty for the next question
     */
    calculateTargetDifficulty(): DifficultyResult {
        // Check if confidence recovery is needed
        if (this.state.confidenceIndex < CONFIDENCE_CRITICAL) {
            return {
                targetDifficulty: Math.max(0.1, this.state.skillLevel - 0.25),
                selectionStrategy: 'confidence_boost',
                reason: 'User confidence critically low - serving easier question',
            };
        }

        // Check if user just narrowly missed a question
        if (this.shouldReinforce()) {
            return {
                targetDifficulty: this.state.skillLevel,
                selectionStrategy: 'reinforcement',
                reason: 'Reinforcing concept from recent near-miss',
            };
        }

        // Check fatigue level
        if (this.state.fatigueScore > FATIGUE_MODERATE) {
            return {
                targetDifficulty: Math.max(0.2, this.state.skillLevel - 0.15),
                selectionStrategy: 'fatigue_friendly',
                reason: 'User showing fatigue signs - easier, engaging questions',
            };
        }

        // Normal flow optimization
        const recentAccuracy = this.calculateRecentAccuracy(10);
        let targetDifficulty = this.state.skillLevel;

        if (recentAccuracy > FLOW_CEILING) {
            // User crushing it - increase challenge
            targetDifficulty = Math.min(1.0, this.state.skillLevel + 0.15);
            return {
                targetDifficulty,
                selectionStrategy: 'normal',
                reason: `High accuracy (${(recentAccuracy * 100).toFixed(0)}%) - increasing difficulty`,
            };
        } else if (recentAccuracy < FLOW_FLOOR) {
            // User struggling - reduce challenge
            targetDifficulty = Math.max(0.1, this.state.skillLevel - 0.15);
            return {
                targetDifficulty,
                selectionStrategy: 'normal',
                reason: `Low accuracy (${(recentAccuracy * 100).toFixed(0)}%) - decreasing difficulty`,
            };
        }

        // User in flow - maintain current level with slight variation
        const variation = (Math.random() - 0.5) * 0.1;
        targetDifficulty = Math.max(0.1, Math.min(1.0, this.state.skillLevel + variation));

        return {
            targetDifficulty,
            selectionStrategy: 'normal',
            reason: `User in flow state (${(recentAccuracy * 100).toFixed(0)}% accuracy)`,
        };
    }

    /**
     * Select the optimal next question from a pool
     */
    selectQuestion(questionPool: Question[]): QuestionSelectionResult | null {
        if (questionPool.length === 0) return null;

        const difficultyResult = this.calculateTargetDifficulty();
        let candidates = [...questionPool];

        // Filter based on strategy
        switch (difficultyResult.selectionStrategy) {
            case 'confidence_boost':
                // Select from strong categories, high fascination score
                candidates = this.filterForConfidenceBoost(candidates);
                break;

            case 'reinforcement':
                // Select similar topic to recent miss
                candidates = this.filterForReinforcement(candidates);
                break;

            case 'fatigue_friendly':
                // Select shorter, more visual questions
                candidates = this.filterForFatigue(candidates);
                break;

            default:
                // Normal selection - filter by difficulty range
                candidates = this.filterByDifficulty(candidates, difficultyResult.targetDifficulty);
        }

        // If no candidates match, fall back to any question
        if (candidates.length === 0) {
            candidates = questionPool;
        }

        // Select randomly from candidates
        const selected = candidates[Math.floor(Math.random() * candidates.length)];

        return {
            question: selected,
            strategy: difficultyResult.selectionStrategy,
            targetDifficulty: difficultyResult.targetDifficulty,
        };
    }

    /**
     * Process an answer and update all state
     */
    processAnswer(
        question: Question,
        selectedAnswer: string,
        timeTakenMs: number
    ): {
        isCorrect: boolean;
        xpEarned: number;
        streakBonus: number;
        message: string;
        shouldShowBreak: boolean;
    } {
        const isCorrect = selectedAnswer === question.correctAnswer;

        // Update session count
        this.sessionQuestionCount++;

        // Record answer
        const record: AnswerRecord = {
            questionId: question.id,
            continent: question.continent,
            category: question.category,
            difficulty: question.difficulty,
            isCorrect,
            timeTakenMs,
            timestamp: new Date(),
        };
        this.state.recentAnswers.push(record);

        // Keep only last 50 answers
        if (this.state.recentAnswers.length > 50) {
            this.state.recentAnswers.shift();
        }

        // Update streaks
        if (isCorrect) {
            this.consecutiveCorrect++;
            this.consecutiveWrong = 0;
        } else {
            this.consecutiveWrong++;
            this.consecutiveCorrect = 0;
        }

        // Update rolling accuracy
        this.state.rollingAccuracy = this.calculateRecentAccuracy(10);

        // Update confidence
        this.updateConfidence(isCorrect, timeTakenMs, question.difficulty);

        // Update fatigue
        this.updateFatigue(timeTakenMs);

        // Update skill level (slower moving average)
        this.updateSkillLevel(isCorrect, question.difficulty);

        // Update category strengths
        this.updateCategoryStrengths(question.category, isCorrect);

        // Calculate XP
        const baseXP = isCorrect ? BASE_XP : 0;
        const difficultyBonus = isCorrect
            ? Math.floor(question.difficulty * DIFFICULTY_BONUS_MULTIPLIER)
            : 0;
        const streakBonus = this.consecutiveCorrect >= 3
            ? this.consecutiveCorrect * STREAK_BONUS_MULTIPLIER
            : 0;
        const xpEarned = baseXP + difficultyBonus;

        // Generate message
        let message: string;
        if (isCorrect) {
            if (this.consecutiveCorrect >= 5) {
                message = `🔥 ${this.consecutiveCorrect} IN A ROW! Unstoppable!`;
            } else if (this.consecutiveCorrect >= 3) {
                message = `✨ ${this.consecutiveCorrect} correct in a row!`;
            } else {
                message = 'Correct! 🎉';
            }
        } else {
            if (this.wasCloseAnswer(question, selectedAnswer)) {
                message = "SO CLOSE! You were on the right track.";
            } else {
                message = "Here's something amazing...";
            }
        }

        // Check if break should be suggested
        const shouldShowBreak = this.shouldSuggestBreak();

        return {
            isCorrect,
            xpEarned,
            streakBonus,
            message,
            shouldShowBreak,
        };
    }

    // ============================================================================
    // FILTERING METHODS
    // ============================================================================

    private filterForConfidenceBoost(questions: Question[]): Question[] {
        // Prefer strong categories, easier difficulty, high fascination
        return questions.filter(q =>
            q.difficulty < this.state.skillLevel - 0.1 &&
            q.fascinationScore > 0.7 &&
            (this.state.strongCategories.length === 0 ||
                this.state.strongCategories.includes(q.category))
        );
    }

    private filterForReinforcement(questions: Question[]): Question[] {
        // Find the most recent wrong answer
        const recentWrong = [...this.state.recentAnswers]
            .reverse()
            .find(a => !a.isCorrect);

        if (!recentWrong) return questions;

        // Find questions in the same category/continent
        return questions.filter(q =>
            (q.category === recentWrong.category || q.continent === recentWrong.continent) &&
            q.id !== recentWrong.questionId &&
            q.difficulty <= recentWrong.difficulty + 0.1
        );
    }

    private filterForFatigue(questions: Question[]): Question[] {
        // Prefer easier questions with high fascination (to re-engage)
        return questions.filter(q =>
            q.difficulty < this.state.skillLevel &&
            q.fascinationScore > 0.8
        );
    }

    private filterByDifficulty(questions: Question[], target: number): Question[] {
        const tolerance = 0.15;
        return questions.filter(q =>
            Math.abs(q.difficulty - target) <= tolerance
        );
    }

    // ============================================================================
    // STATE UPDATE METHODS
    // ============================================================================

    private updateConfidence(isCorrect: boolean, timeTakenMs: number, difficulty: number) {
        const baseChange = isCorrect ? 0.05 : -0.10;

        // Adjust based on speed (fast correct = confidence boost)
        let speedModifier = 0;
        if (isCorrect && timeTakenMs < FAST_ANSWER_THRESHOLD) {
            speedModifier = 0.03; // Quick correct = extra confidence
        } else if (!isCorrect && timeTakenMs > SLOW_ANSWER_THRESHOLD) {
            speedModifier = -0.02; // Slow wrong = extra confidence hit
        }

        // Adjust based on difficulty
        const difficultyModifier = isCorrect
            ? difficulty * 0.02  // Harder correct = more confidence
            : (1 - difficulty) * -0.02;  // Easier wrong = bigger hit

        this.state.confidenceIndex = Math.max(0, Math.min(1,
            this.state.confidenceIndex + baseChange + speedModifier + difficultyModifier
        ));
    }

    private updateFatigue(timeTakenMs: number) {
        // Fatigue increases with time and question count
        const sessionMinutes = (Date.now() - this.sessionStartTime.getTime()) / 60000;
        const questionFatigue = this.sessionQuestionCount * 0.02;
        const timeFatigue = sessionMinutes * 0.03;

        // Slow answers indicate mental fatigue
        const slownessFatigue = timeTakenMs > SLOW_ANSWER_THRESHOLD ? 0.05 : 0;

        this.state.fatigueScore = Math.min(1, questionFatigue + timeFatigue + slownessFatigue);
    }

    private updateSkillLevel(isCorrect: boolean, difficulty: number) {
        // Skill level moves slower than other metrics (learning takes time)
        const learningRate = 0.02;

        if (isCorrect && difficulty >= this.state.skillLevel) {
            // Got a hard question right - skill increased
            this.state.skillLevel = Math.min(1, this.state.skillLevel + learningRate);
        } else if (!isCorrect && difficulty <= this.state.skillLevel) {
            // Got an easy question wrong - slight skill decrease
            this.state.skillLevel = Math.max(0.1, this.state.skillLevel - learningRate * 0.5);
        }
    }

    private updateCategoryStrengths(category: Category, isCorrect: boolean) {
        // Track category performance
        const categoryAnswers = this.state.recentAnswers.filter(a => a.category === category);
        if (categoryAnswers.length < 5) return;

        const categoryAccuracy = categoryAnswers.filter(a => a.isCorrect).length / categoryAnswers.length;

        if (categoryAccuracy > 0.8 && !this.state.strongCategories.includes(category)) {
            this.state.strongCategories.push(category);
            // Remove from weak if present
            this.state.weakCategories = this.state.weakCategories.filter(c => c !== category);
        } else if (categoryAccuracy < 0.4 && !this.state.weakCategories.includes(category)) {
            this.state.weakCategories.push(category);
            // Remove from strong if present
            this.state.strongCategories = this.state.strongCategories.filter(c => c !== category);
        }
    }

    // ============================================================================
    // HELPER METHODS
    // ============================================================================

    private calculateRecentAccuracy(n: number): number {
        const recent = this.state.recentAnswers.slice(-n);
        if (recent.length === 0) return this.state.rollingAccuracy;
        return recent.filter(a => a.isCorrect).length / recent.length;
    }

    private shouldReinforce(): boolean {
        // Check if user just got a question wrong that they previously got right
        const lastAnswer = this.state.recentAnswers[this.state.recentAnswers.length - 1];
        if (!lastAnswer || lastAnswer.isCorrect) return false;

        // Check if they were close (answered within 3 seconds of closing)
        return this.consecutiveWrong === 1 && lastAnswer.timeTakenMs < 5000;
    }

    private wasCloseAnswer(question: Question, selectedAnswer: string): boolean {
        // Simplified - in real implementation, would check semantic similarity
        // For now, just check if both wrong and correct start with similar letters
        // or are in adjacent positions
        const options = ['a', 'b', 'c', 'd'];
        const selectedIndex = options.indexOf(selectedAnswer);
        const correctIndex = options.indexOf(question.correctAnswer);
        return Math.abs(selectedIndex - correctIndex) === 1;
    }

    private shouldSuggestBreak(): boolean {
        // Suggest break at natural stopping points
        if (this.sessionQuestionCount === 10) return true;  // Quick 10
        if (this.sessionQuestionCount === 15) return true;  // Expert round
        if (this.sessionQuestionCount >= 25) return true;   // Legendary
        if (this.state.fatigueScore > FATIGUE_HIGH) return true;

        return false;
    }

    // ============================================================================
    // GETTERS
    // ============================================================================

    getState(): UserPerformanceState {
        return { ...this.state };
    }

    getSessionStats() {
        return {
            questionCount: this.sessionQuestionCount,
            currentStreak: this.consecutiveCorrect,
            accuracy: this.calculateRecentAccuracy(this.sessionQuestionCount),
            fatigueLevel: this.state.fatigueScore,
            confidenceLevel: this.state.confidenceIndex,
        };
    }

    resetSession() {
        this.sessionQuestionCount = 0;
        this.sessionStartTime = new Date();
        this.consecutiveCorrect = 0;
        this.consecutiveWrong = 0;
        this.state.fatigueScore = 0;
    }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

let engineInstance: AdaptiveDifficultyEngine | null = null;

export function getAdaptiveDifficultyEngine(initialState?: Partial<UserPerformanceState>): AdaptiveDifficultyEngine {
    if (!engineInstance) {
        engineInstance = new AdaptiveDifficultyEngine(initialState);
    }
    return engineInstance;
}

export function resetAdaptiveDifficultyEngine() {
    engineInstance = null;
}

export default AdaptiveDifficultyEngine;
