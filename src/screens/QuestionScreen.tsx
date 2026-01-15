/**
 * Global Quest - Question Screen Component
 * The core quiz experience with animations and feedback
 */

import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borders, typography, animation } from '../theme';
import type { Question, Continent, CONTINENTS } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// TYPES
// ============================================================================

interface QuestionScreenProps {
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    continent: Continent;
    onAnswer: (answer: 'a' | 'b' | 'c' | 'd', timeTakenMs: number) => void;
    onContinue: () => void;
}

type AnswerState = 'unanswered' | 'selected' | 'confirmed' | 'revealed';

// ============================================================================
// CONTINENT INFO (would come from constants in real app)
// ============================================================================

const CONTINENT_DISPLAY: Record<Continent, { name: string; emoji: string; color: string }> = {
    ASIA: { name: 'Asia', emoji: '🌏', color: '#F472B6' },
    AFRICA: { name: 'Africa', emoji: '🦁', color: '#FBBF24' },
    EUROPE: { name: 'Europe', emoji: '🏰', color: '#60A5FA' },
    NORTH_AMERICA: { name: 'North America', emoji: '🗽', color: '#34D399' },
    SOUTH_AMERICA: { name: 'South America', emoji: '🌎', color: '#A78BFA' },
    AUSTRALIA_OCEANIA: { name: 'Australia', emoji: '🦘', color: '#FB923C' },
    ANTARCTICA: { name: 'Antarctica', emoji: '🐧', color: '#67E8F9' },
};

// ============================================================================
// OPTION CARD COMPONENT
// ============================================================================

interface OptionCardProps {
    option: { id: 'a' | 'b' | 'c' | 'd'; text: string };
    isSelected: boolean;
    isCorrect: boolean | null; // null = not revealed yet
    isRevealed: boolean;
    onSelect: () => void;
    disabled: boolean;
    index: number;
}

const OptionCard: React.FC<OptionCardProps> = ({
    option,
    isSelected,
    isCorrect,
    isRevealed,
    onSelect,
    disabled,
    index,
}) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Stagger animation on mount
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: animation.duration.normal,
                delay: index * 50, // Stagger by 50ms
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: animation.duration.normal,
                delay: index * 50,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const getCardStyle = () => {
        if (!isRevealed) {
            return isSelected ? styles.optionSelected : styles.optionDefault;
        }
        if (isCorrect === true) {
            return styles.optionCorrect;
        }
        if (isCorrect === false && isSelected) {
            return styles.optionIncorrect;
        }
        return styles.optionDefault;
    };

    const getOptionLabel = () => {
        return option.id.toUpperCase();
    };

    return (
        <Animated.View
            style={[
                {
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            <TouchableOpacity
                style={[styles.optionCard, getCardStyle()]}
                onPress={onSelect}
                disabled={disabled}
                activeOpacity={0.8}
            >
                <View style={styles.optionLabelContainer}>
                    <Text style={styles.optionLabel}>[{getOptionLabel()}]</Text>
                </View>
                <Text style={styles.optionText}>{option.text}</Text>
                {isRevealed && isCorrect === true && (
                    <Text style={styles.optionIcon}>✓</Text>
                )}
                {isRevealed && isCorrect === false && isSelected && (
                    <Text style={styles.optionIcon}>✗</Text>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

// ============================================================================
// EXPLANATION CARD COMPONENT
// ============================================================================

interface ExplanationCardProps {
    isCorrect: boolean;
    explanation: string;
    onContinue: () => void;
    xpEarned: number;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({
    isCorrect,
    explanation,
    onContinue,
    xpEarned,
}) => {
    const slideAnim = useRef(new Animated.Value(50)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: animation.duration.normal,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.explanationCard,
                {
                    transform: [{ translateY: slideAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            {/* Header */}
            <View style={styles.explanationHeader}>
                {isCorrect ? (
                    <>
                        <Text style={styles.explanationEmoji}>✨</Text>
                        <Text style={styles.explanationTitle}>CORRECT!</Text>
                        <Text style={styles.explanationEmoji}>✨</Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.explanationEmoji}>💡</Text>
                        <Text style={styles.explanationTitleLearn}>HERE'S SOMETHING AMAZING...</Text>
                    </>
                )}
            </View>

            {/* XP Earned (if correct) */}
            {isCorrect && (
                <View style={styles.xpContainer}>
                    <Text style={styles.xpText}>+{xpEarned} XP</Text>
                </View>
            )}

            {/* Divider */}
            <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>
                    {isCorrect ? 'EXPLANATION' : 'NOW YOU KNOW'}
                </Text>
                <View style={styles.dividerLine} />
            </View>

            {/* Explanation Text */}
            <ScrollView style={styles.explanationScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.explanationText}>{explanation}</Text>
            </ScrollView>

            {/* Continue Button */}
            <TouchableOpacity
                style={styles.continueButton}
                onPress={onContinue}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={[colors.primary[500], colors.primary[600]]}
                    style={styles.continueButtonGradient}
                >
                    <Text style={styles.continueButtonText}>CONTINUE</Text>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const QuestionScreen: React.FC<QuestionScreenProps> = ({
    question,
    questionNumber,
    totalQuestions,
    continent,
    onAnswer,
    onContinue,
}) => {
    const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
    const [selectedAnswer, setSelectedAnswer] = useState<'a' | 'b' | 'c' | 'd' | null>(null);
    const [startTime] = useState(Date.now());
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const continentInfo = CONTINENT_DISPLAY[continent];
    const progress = (questionNumber / totalQuestions) * 100;

    const handleSelectOption = (optionId: 'a' | 'b' | 'c' | 'd') => {
        if (answerState === 'unanswered' || answerState === 'selected') {
            setSelectedAnswer(optionId);
            setAnswerState('selected');
        }
    };

    const handleConfirmAnswer = () => {
        if (selectedAnswer) {
            const timeTaken = Date.now() - startTime;
            const correct = selectedAnswer === question.correctAnswer;
            setIsCorrect(correct);
            setAnswerState('revealed');
            onAnswer(selectedAnswer, timeTaken);
        }
    };

    const handleContinue = () => {
        onContinue();
    };

    const getXPEarned = () => {
        if (!isCorrect) return 0;
        // Base XP + difficulty bonus
        return 20 + Math.floor(question.difficulty * 10);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.continentBadge}>
                    <Text style={styles.continentEmoji}>{continentInfo.emoji}</Text>
                    <Text style={styles.continentName}>{continentInfo.name.toUpperCase()}</Text>
                </View>
                <Text style={styles.questionCounter}>
                    Question {questionNumber} of {totalQuestions}
                </Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
            </View>

            {/* Question Card */}
            <View style={styles.questionCard}>
                <Text style={styles.questionText}>{question.hookText}</Text>
            </View>

            {/* Options */}
            <View style={styles.optionsContainer}>
                {question.options.map((option, index) => (
                    <OptionCard
                        key={option.id}
                        option={option}
                        isSelected={selectedAnswer === option.id}
                        isCorrect={
                            answerState === 'revealed'
                                ? option.id === question.correctAnswer
                                    ? true
                                    : option.id === selectedAnswer
                                        ? false
                                        : null
                                : null
                        }
                        isRevealed={answerState === 'revealed'}
                        onSelect={() => handleSelectOption(option.id)}
                        disabled={answerState === 'revealed'}
                        index={index}
                    />
                ))}
            </View>

            {/* Confirm Button (only show when answer selected, not revealed) */}
            {answerState === 'selected' && (
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleConfirmAnswer}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={[colors.primary[500], colors.primary[600]]}
                        style={styles.confirmButtonGradient}
                    >
                        <Text style={styles.confirmButtonText}>CONFIRM ANSWER</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )}

            {/* Explanation Overlay */}
            {answerState === 'revealed' && isCorrect !== null && (
                <View style={styles.explanationOverlay}>
                    <ExplanationCard
                        isCorrect={isCorrect}
                        explanation={question.explanation}
                        onContinue={handleContinue}
                        xpEarned={getXPEarned()}
                    />
                </View>
            )}
        </View>
    );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
        padding: spacing[4],
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing[4],
    },
    continentBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.secondary,
        paddingVertical: spacing[1],
        paddingHorizontal: spacing[3],
        borderRadius: borders.radius.full,
    },
    continentEmoji: {
        fontSize: 16,
        marginRight: spacing[1],
    },
    continentName: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.semibold as any,
        color: colors.text.secondary,
        letterSpacing: 1,
    },
    questionCounter: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.sm,
        color: colors.text.tertiary,
    },

    // Progress
    progressContainer: {
        marginBottom: spacing[6],
    },
    progressBar: {
        height: 4,
        backgroundColor: colors.background.tertiary,
        borderRadius: borders.radius.full,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary[500],
        borderRadius: borders.radius.full,
    },

    // Question
    questionCard: {
        backgroundColor: colors.background.secondary,
        borderRadius: borders.radius.xl,
        padding: spacing[6],
        marginBottom: spacing[6],
    },
    questionText: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.medium as any,
        color: colors.text.primary,
        lineHeight: typography.fontSize.xl * typography.lineHeight.relaxed,
        textAlign: 'center',
    },

    // Options
    optionsContainer: {
        gap: spacing[3],
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.secondary,
        borderRadius: borders.radius.lg,
        padding: spacing[4],
        borderWidth: 2,
        borderColor: 'transparent',
    },
    optionDefault: {
        borderColor: colors.border.subtle,
    },
    optionSelected: {
        borderColor: colors.primary[500],
        backgroundColor: colors.primary[500] + '20', // 20% opacity
    },
    optionCorrect: {
        borderColor: colors.success[500],
        backgroundColor: colors.success[500] + '20',
    },
    optionIncorrect: {
        borderColor: colors.error[500],
        backgroundColor: colors.error[500] + '20',
    },
    optionLabelContainer: {
        marginRight: spacing[3],
    },
    optionLabel: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.text.tertiary,
    },
    optionText: {
        flex: 1,
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.base,
        color: colors.text.primary,
        lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    },
    optionIcon: {
        fontSize: 20,
        marginLeft: spacing[2],
    },

    // Confirm Button
    confirmButton: {
        marginTop: spacing[6],
    },
    confirmButtonGradient: {
        borderRadius: borders.radius.lg,
        paddingVertical: spacing[4],
        alignItems: 'center',
    },
    confirmButtonText: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.bold as any,
        color: colors.text.primary,
        letterSpacing: 1,
    },

    // Explanation Overlay
    explanationOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.background.primary,
        borderTopLeftRadius: borders.radius['2xl'],
        borderTopRightRadius: borders.radius['2xl'],
        padding: spacing[4],
        paddingTop: spacing[6],
        maxHeight: '60%',
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    explanationCard: {},
    explanationHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing[3],
    },
    explanationEmoji: {
        fontSize: 24,
    },
    explanationTitle: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold as any,
        color: colors.success[500],
        marginHorizontal: spacing[2],
    },
    explanationTitleLearn: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold as any,
        color: colors.primary[400],
        marginLeft: spacing[2],
    },
    xpContainer: {
        alignSelf: 'center',
        backgroundColor: colors.secondary[500] + '30',
        paddingVertical: spacing[1],
        paddingHorizontal: spacing[4],
        borderRadius: borders.radius.full,
        marginBottom: spacing[3],
    },
    xpText: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold as any,
        color: colors.secondary[400],
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing[3],
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border.default,
    },
    dividerText: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.xs,
        color: colors.text.muted,
        marginHorizontal: spacing[2],
        letterSpacing: 1,
    },
    explanationScroll: {
        maxHeight: 150,
        marginBottom: spacing[4],
    },
    explanationText: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.base,
        color: colors.text.secondary,
        lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    },
    continueButton: {
        marginTop: spacing[2],
    },
    continueButtonGradient: {
        borderRadius: borders.radius.lg,
        paddingVertical: spacing[4],
        alignItems: 'center',
    },
    continueButtonText: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.bold as any,
        color: colors.text.primary,
        letterSpacing: 1,
    },
});

export default QuestionScreen;
