/**
 * Global Quest - Premium Question Screen
 * Interactive quiz with animations and feedback
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
    bg: { deep: '#030712', card: '#111d32', cardLight: '#1a2942' },
    accent: { indigo: '#6366F1', indigoLight: '#818CF8', purple: '#8B5CF6', gold: '#FBBF24', green: '#10B981', red: '#EF4444', cyan: '#06B6D4' },
    text: { white: '#FFF', primary: '#F1F5F9', secondary: '#CBD5E1', muted: '#64748B' },
};

const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32 };

// ============================================================================
// MOCK DATA
// ============================================================================

const sampleQuestions = [
    {
        id: '1',
        continent: 'Africa',
        continentEmoji: '🦁',
        category: 'History',
        difficulty: 3,
        hook: "The walls of this palace tell the story of a conquering lion...",
        question: "Which African emperor built the iconic rock-hewn churches of Lalibela?",
        options: [
            { id: 'A', text: 'Menelik II' },
            { id: 'B', text: 'Haile Selassie' },
            { id: 'C', text: 'King Lalibela' },
            { id: 'D', text: 'Tewodros II' },
        ],
        correctAnswer: 'C',
        explanation: "King Lalibela of Ethiopia commissioned 11 monolithic churches carved from solid rock in the 12th century. Legend says angels helped complete the work at night. These churches remain active places of worship today, drawing pilgrims from around the world.",
        xpReward: 50,
        timeLimit: 30,
    },
    {
        id: '2',
        continent: 'Asia',
        continentEmoji: '🌏',
        category: 'Geography',
        difficulty: 2,
        hook: "A sea that keeps getting saltier, shrinking every year...",
        question: "The Dead Sea borders which two countries?",
        options: [
            { id: 'A', text: 'Israel and Egypt' },
            { id: 'B', text: 'Israel and Jordan' },
            { id: 'C', text: 'Jordan and Saudi Arabia' },
            { id: 'D', text: 'Syria and Lebanon' },
        ],
        correctAnswer: 'B',
        explanation: "The Dead Sea, Earth's lowest point on land at 430m below sea level, lies between Israel and Jordan. Its extreme salinity (34.2%) allows swimmers to float effortlessly. Sadly, it's shrinking by about 1 meter per year.",
        xpReward: 35,
        timeLimit: 25,
    },
];

// ============================================================================
// ANIMATION HOOKS
// ============================================================================

const useEntranceAnimation = (delay: number = 0) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { opacity, translateY };
};

const useOptionAnimation = (index: number) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-50)).current;
    const scale = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(300 + index * 100),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.spring(translateX, { toValue: 0, friction: 8, tension: 80, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, friction: 8, tension: 80, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { opacity, translateX, scale };
};

const useTimerAnimation = (duration: number, onComplete: () => void) => {
    const progress = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 0,
            duration: duration * 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(({ finished }) => {
            if (finished) onComplete();
        });
    }, []);

    return progress;
};

// ============================================================================
// COMPONENTS
// ============================================================================

const Header: React.FC<{ question: typeof sampleQuestions[0]; currentIndex: number; total: number; onClose: () => void }> = ({ question, currentIndex, total, onClose }) => {
    const { opacity, translateY } = useEntranceAnimation(0);

    return (
        <Animated.View style={[styles.header, { opacity, transform: [{ translateY }] }]}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
                <View style={styles.continentBadge}>
                    <Text style={styles.continentEmoji}>{question.continentEmoji}</Text>
                    <Text style={styles.continentName}>{question.continent}</Text>
                </View>
                <Text style={styles.progressText}>{currentIndex + 1} of {total}</Text>
            </View>
            <View style={styles.xpBadge}>
                <Text style={styles.xpText}>+{question.xpReward} XP</Text>
            </View>
        </Animated.View>
    );
};

const ProgressBar: React.FC<{ currentIndex: number; total: number }> = ({ currentIndex, total }) => {
    const { opacity } = useEntranceAnimation(100);
    const progress = ((currentIndex + 1) / total) * 100;

    return (
        <Animated.View style={[styles.progressBarContainer, { opacity }]}>
            <View style={styles.progressBarTrack}>
                <LinearGradient
                    colors={['#6366F1', '#4F46E5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressBarFill, { width: `${progress}%` }]}
                />
            </View>
        </Animated.View>
    );
};

const TimerBar: React.FC<{ duration: number; onTimeUp: () => void; isPaused: boolean }> = ({ duration, onTimeUp, isPaused }) => {
    const progress = useTimerAnimation(duration, onTimeUp);

    return (
        <View style={styles.timerContainer}>
            <Animated.View style={[styles.timerBar, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]}>
                <LinearGradient colors={['#10B981', '#059669']} style={styles.timerGradient} />
            </Animated.View>
            <Text style={styles.timerIcon}>⏱️</Text>
        </View>
    );
};

const QuestionCard: React.FC<{ question: typeof sampleQuestions[0] }> = ({ question }) => {
    const { opacity, translateY } = useEntranceAnimation(150);

    return (
        <Animated.View style={[styles.questionCard, { opacity, transform: [{ translateY }] }]}>
            <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.questionCardInner}>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{question.category}</Text>
                    <View style={styles.difficultyDots}>
                        {[1, 2, 3].map(d => (
                            <View key={d} style={[styles.difficultyDot, d <= question.difficulty && styles.difficultyDotActive]} />
                        ))}
                    </View>
                </View>
                <Text style={styles.hookText}>{question.hook}</Text>
                <Text style={styles.questionText}>{question.question}</Text>
            </LinearGradient>
        </Animated.View>
    );
};

const OptionCard: React.FC<{
    option: { id: string; text: string };
    index: number;
    isSelected: boolean;
    isCorrect: boolean | null;
    showResult: boolean;
    onSelect: () => void;
}> = ({ option, index, isSelected, isCorrect, showResult, onSelect }) => {
    const { opacity, translateX, scale } = useOptionAnimation(index);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isSelected && !showResult) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.02, duration: 300, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
                ])
            ).start();
        }
    }, [isSelected]);

    const getBackgroundColor = () => {
        if (!showResult) return isSelected ? 'rgba(99, 102, 241, 0.3)' : 'transparent';
        if (isCorrect === true) return 'rgba(16, 185, 129, 0.3)';
        if (isCorrect === false && isSelected) return 'rgba(239, 68, 68, 0.3)';
        return 'transparent';
    };

    const getBorderColor = () => {
        if (!showResult) return isSelected ? colors.accent.indigo : 'rgba(255,255,255,0.1)';
        if (isCorrect === true) return colors.accent.green;
        if (isCorrect === false && isSelected) return colors.accent.red;
        return 'rgba(255,255,255,0.1)';
    };

    return (
        <Animated.View style={{ opacity, transform: [{ translateX }, { scale: Animated.multiply(scale, pulseAnim) }] }}>
            <TouchableOpacity
                onPress={onSelect}
                disabled={showResult}
                activeOpacity={0.8}
                style={[styles.optionCard, { backgroundColor: getBackgroundColor(), borderColor: getBorderColor() }]}
            >
                <View style={[styles.optionLetter, { backgroundColor: getBorderColor() }]}>
                    <Text style={styles.optionLetterText}>{option.id}</Text>
                </View>
                <Text style={styles.optionText}>{option.text}</Text>
                {showResult && isCorrect === true && <Text style={styles.resultIcon}>✓</Text>}
                {showResult && isCorrect === false && isSelected && <Text style={styles.resultIcon}>✗</Text>}
            </TouchableOpacity>
        </Animated.View>
    );
};

const ExplanationPanel: React.FC<{ explanation: string; isCorrect: boolean; xp: number; onNext: () => void }> = ({ explanation, isCorrect, xp, onNext }) => {
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    useEffect(() => {
        Animated.spring(slideAnim, { toValue: 0, friction: 10, tension: 50, useNativeDriver: true }).start();
    }, []);

    return (
        <Animated.View style={[styles.explanationPanel, { transform: [{ translateY: slideAnim }] }]}>
            <LinearGradient colors={[colors.bg.cardLight, colors.bg.card]} style={styles.explanationContent}>
                <View style={[styles.resultBadge, { backgroundColor: isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)' }]}>
                    <Text style={styles.resultEmoji}>{isCorrect ? '🎉' : '😔'}</Text>
                    <Text style={[styles.resultText, { color: isCorrect ? colors.accent.green : colors.accent.red }]}>
                        {isCorrect ? 'Correct!' : 'Not quite!'}
                    </Text>
                    {isCorrect && <Text style={styles.xpEarned}>+{xp} XP</Text>}
                </View>
                <ScrollView style={styles.explanationScroll} showsVerticalScrollIndicator={false}>
                    <Text style={styles.explanationTitle}>💡 Did you know?</Text>
                    <Text style={styles.explanationText}>{explanation}</Text>
                </ScrollView>
                <TouchableOpacity onPress={onNext} style={styles.nextButton}>
                    <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.nextButtonGradient}>
                        <Text style={styles.nextButtonText}>Continue</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </Animated.View>
    );
};

// ============================================================================
// MAIN SCREEN
// ============================================================================

const QuestionScreen: React.FC = () => {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);

    const currentQuestion = sampleQuestions[currentQuestionIndex];

    const handleSelectAnswer = (optionId: string) => {
        if (showResult) return;
        setSelectedAnswer(optionId);
    };

    const handleConfirm = () => {
        if (!selectedAnswer) return;
        const correct = selectedAnswer === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);
        if (correct) setScore(prev => prev + currentQuestion.xpReward);
    };

    const handleNext = () => {
        if (currentQuestionIndex < sampleQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setIsCorrect(null);
        } else {
            navigation.goBack();
        }
    };

    const handleTimeUp = () => {
        if (!showResult) {
            setIsCorrect(false);
            setShowResult(true);
        }
    };

    const handleClose = () => navigation.goBack();

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#030712', '#0a1628', '#111d32']} style={StyleSheet.absoluteFill} />
            <View style={[styles.glowOrb, { top: '10%', right: '-10%', backgroundColor: colors.accent.purple }]} />
            <View style={[styles.glowOrb, { bottom: '30%', left: '-15%', backgroundColor: colors.accent.indigo }]} />

            <SafeAreaView style={styles.safeArea}>
                <Header question={currentQuestion} currentIndex={currentQuestionIndex} total={sampleQuestions.length} onClose={handleClose} />
                <ProgressBar currentIndex={currentQuestionIndex} total={sampleQuestions.length} />
                {!showResult && <TimerBar duration={currentQuestion.timeLimit} onTimeUp={handleTimeUp} isPaused={showResult} />}

                <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                    <QuestionCard question={currentQuestion} />

                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((option, index) => (
                            <OptionCard
                                key={option.id}
                                option={option}
                                index={index}
                                isSelected={selectedAnswer === option.id}
                                isCorrect={showResult ? option.id === currentQuestion.correctAnswer : null}
                                showResult={showResult}
                                onSelect={() => handleSelectAnswer(option.id)}
                            />
                        ))}
                    </View>

                    {!showResult && selectedAnswer && (
                        <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                            <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.confirmButtonGradient}>
                                <Text style={styles.confirmButtonText}>Confirm Answer</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </ScrollView>

                {showResult && (
                    <ExplanationPanel
                        explanation={currentQuestion.explanation}
                        isCorrect={isCorrect!}
                        xp={currentQuestion.xpReward}
                        onNext={handleNext}
                    />
                )}
            </SafeAreaView>
        </View>
    );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#030712' },
    safeArea: { flex: 1 },
    glowOrb: { position: 'absolute', width: 250, height: 250, borderRadius: 125, opacity: 0.12 },

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing[4], paddingVertical: spacing[3] },
    closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
    closeIcon: { fontSize: 18, color: colors.text.muted },
    headerCenter: { alignItems: 'center' },
    continentBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: spacing[3], paddingVertical: spacing[1], borderRadius: 20 },
    continentEmoji: { fontSize: 18 },
    continentName: { fontSize: 14, color: colors.text.primary, fontWeight: '600' },
    progressText: { fontSize: 12, color: colors.text.muted, marginTop: 4 },
    xpBadge: { backgroundColor: 'rgba(251, 191, 36, 0.2)', paddingHorizontal: spacing[3], paddingVertical: spacing[1], borderRadius: 12 },
    xpText: { fontSize: 14, color: colors.accent.gold, fontWeight: '700' },

    progressBarContainer: { paddingHorizontal: spacing[4], marginBottom: spacing[2] },
    progressBarTrack: { height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' },
    progressBarFill: { height: '100%', borderRadius: 2 },

    timerContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: spacing[4], marginBottom: spacing[3], height: 24, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, overflow: 'hidden' },
    timerBar: { height: '100%', position: 'absolute', left: 0 },
    timerGradient: { flex: 1 },
    timerIcon: { position: 'absolute', right: spacing[2], fontSize: 14 },

    content: { flex: 1 },
    contentContainer: { padding: spacing[4], paddingBottom: 120 },

    questionCard: { marginBottom: spacing[5] },
    questionCardInner: { padding: spacing[5], borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    categoryBadge: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[3] },
    categoryText: { fontSize: 12, color: colors.accent.indigoLight, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
    difficultyDots: { flexDirection: 'row', gap: 4 },
    difficultyDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.2)' },
    difficultyDotActive: { backgroundColor: colors.accent.gold },
    hookText: { fontSize: 14, color: colors.text.muted, fontStyle: 'italic', marginBottom: spacing[3], lineHeight: 20 },
    questionText: { fontSize: 20, color: colors.text.white, fontWeight: '700', lineHeight: 28 },

    optionsContainer: { gap: spacing[3] },
    optionCard: { flexDirection: 'row', alignItems: 'center', padding: spacing[4], borderRadius: 16, borderWidth: 2, gap: spacing[3] },
    optionLetter: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    optionLetterText: { fontSize: 16, fontWeight: '700', color: colors.text.white },
    optionText: { flex: 1, fontSize: 16, color: colors.text.primary, fontWeight: '500' },
    resultIcon: { fontSize: 20, color: colors.text.white },

    confirmButton: { marginTop: spacing[5], borderRadius: 16, overflow: 'hidden' },
    confirmButtonGradient: { paddingVertical: spacing[4], alignItems: 'center', borderRadius: 16 },
    confirmButtonText: { fontSize: 16, fontWeight: '700', color: colors.text.white },

    explanationPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, maxHeight: SCREEN_HEIGHT * 0.55 },
    explanationContent: { padding: spacing[5], paddingBottom: 40, borderTopLeftRadius: 32, borderTopRightRadius: 32 },
    resultBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing[2], paddingVertical: spacing[3], borderRadius: 16, marginBottom: spacing[4] },
    resultEmoji: { fontSize: 24 },
    resultText: { fontSize: 20, fontWeight: '800' },
    xpEarned: { fontSize: 16, color: colors.accent.gold, fontWeight: '700' },
    explanationScroll: { maxHeight: 150, marginBottom: spacing[4] },
    explanationTitle: { fontSize: 14, color: colors.accent.gold, fontWeight: '600', marginBottom: spacing[2] },
    explanationText: { fontSize: 15, color: colors.text.secondary, lineHeight: 24 },
    nextButton: { borderRadius: 16, overflow: 'hidden' },
    nextButtonGradient: { paddingVertical: spacing[4], alignItems: 'center', borderRadius: 16 },
    nextButtonText: { fontSize: 16, fontWeight: '700', color: colors.text.white },
});

export default QuestionScreen;
