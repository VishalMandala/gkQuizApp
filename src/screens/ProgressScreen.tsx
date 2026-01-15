/**
 * Global Quest - Premium Progress Screen V5
 * Final refinements matching Gemini 3 Pro mockup
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated, Easing, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
    bg: { deep: '#030712', card: '#111827', cardLight: '#1f2937', glass: 'rgba(17, 24, 39, 0.85)' },
    accent: {
        indigo: '#6366F1',
        indigoLight: '#818CF8',
        purple: '#8B5CF6',
        gold: '#FBBF24',
        pink: '#EC4899',
        green: '#34D399',
        cyan: '#06B6D4',
        orange: '#FB923C',
        blue: '#3B82F6',
        red: '#EF4444',
    },
    text: { white: '#FFF', primary: '#F1F5F9', secondary: '#CBD5E1', muted: '#64748B' },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const userData = {
    level: 23,
    title: 'Knowledge Seeker',
    currentXP: 1250,
    xpToNextLevel: 2000,
    progressPercent: 62.5,
};

// Stats grouped in pairs for unified containers
const statsRow1 = [
    { icon: '📝', value: '847', label: 'Questions Answered', color: colors.accent.blue },
    { icon: '🎯', value: '72%', label: 'Accuracy', color: colors.accent.red },
];

const statsRow2 = [
    { icon: '🔥', value: '47', label: 'Best Streak', color: colors.accent.orange },
    { icon: '⏱️', value: '28.5h', label: 'Time Learned', color: colors.accent.cyan },
];

const weeklyActivity = [
    { day: 'M', height: 35 },
    { day: 'T', height: 52 },
    { day: 'W', height: 65 },
    { day: 'T', height: 55 },
    { day: 'F', height: 90 },
    { day: 'S', height: 75 },
    { day: 'S', height: 40 },
];

const continentMastery = [
    { name: 'Asia', emoji: '🌏', progress: 32, color: colors.accent.pink },
    { name: 'Africa', emoji: '🦁', progress: 80, color: colors.accent.gold },
    { name: 'Europe', emoji: '🏰', progress: 65, color: colors.accent.blue },
    { name: 'Americas', emoji: '🗽', progress: 28, color: colors.accent.green },
    { name: 'Antarctica', emoji: '🐧', progress: 15, color: colors.accent.cyan },
    { name: 'Oceania', emoji: '🦘', progress: 72, color: colors.accent.orange },
];

// ============================================================================
// ANIMATION HOOKS
// ============================================================================

const useEntranceAnimation = (delay: number = 0) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;
    const scale = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { opacity, translateY, scale };
};

// Pulse animation for important elements
const usePulseAnimation = () => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, { toValue: 1.05, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(scale, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, []);

    return scale;
};

// Count-up animation for numbers
const useCountUp = (targetValue: number, duration: number = 1500, delay: number = 0) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const steps = 30;
            const increment = targetValue / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                    setDisplayValue(targetValue);
                    clearInterval(timer);
                } else {
                    setDisplayValue(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }, delay);
        return () => clearTimeout(timeout);
    }, [targetValue, duration, delay]);

    return displayValue;
};

// Bar grow animation for weekly activity
const useBarGrow = (targetHeight: number, delay: number = 0) => {
    const height = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay + 300),
            Animated.spring(height, {
                toValue: targetHeight,
                friction: 6,
                tension: 60,
                useNativeDriver: false,
            }),
        ]).start();
    }, [targetHeight, delay]);

    return height;
};

// Press animation for interactive elements
const usePressAnimation = () => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scale, { toValue: 0.97, friction: 8, tension: 200, useNativeDriver: true }).start();
    };

    const onPressOut = () => {
        Animated.spring(scale, { toValue: 1, friction: 6, tension: 150, useNativeDriver: true }).start();
    };

    return { scale, onPressIn, onPressOut };
};

// Ring progress animation
const useRingProgress = (targetProgress: number) => {
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(200),
            Animated.timing(progress, {
                toValue: targetProgress,
                duration: 1200,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: false,
            }),
        ]).start();
    }, [targetProgress]);

    return progress;
};

// ============================================================================
// COMPONENTS
// ============================================================================

// Header with title
const Header = () => {
    const { opacity, translateY } = useEntranceAnimation(0);

    return (
        <Animated.View style={[styles.header, { opacity, transform: [{ translateY }] }]}>
            <Text style={styles.headerTitle}>Your Progress</Text>
            <View style={styles.headerIcon}>
                <Text style={styles.headerIconText}>↗</Text>
            </View>
        </Animated.View>
    );
};

// Level Progress Ring with prominent glow
const LevelProgressRing = () => {
    const { opacity, translateY } = useEntranceAnimation(50);
    const ringSize = 150;
    const strokeWidth = 8;
    const radius = (ringSize - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progressOffset = circumference - (userData.progressPercent / 100) * circumference;

    return (
        <Animated.View style={[styles.ringContainer, { opacity, transform: [{ translateY }] }]}>
            {/* Multiple glow layers for prominent effect */}
            <View style={[styles.ringGlowOuter]} />
            <View style={[styles.ringGlowMiddle]} />
            <View style={[styles.ringGlowInner]} />

            {/* SVG Ring */}
            <Svg width={ringSize} height={ringSize} style={styles.ringSvg}>
                <Defs>
                    <SvgLinearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor={colors.accent.indigo} />
                        <Stop offset="50%" stopColor={colors.accent.purple} />
                        <Stop offset="100%" stopColor={colors.accent.pink} />
                    </SvgLinearGradient>
                </Defs>
                {/* Background ring */}
                <Circle cx={ringSize / 2} cy={ringSize / 2} r={radius} stroke="rgba(99, 102, 241, 0.2)" strokeWidth={strokeWidth} fill="none" />
                {/* Progress ring */}
                <Circle
                    cx={ringSize / 2} cy={ringSize / 2} r={radius}
                    stroke="url(#ringGradient)" strokeWidth={strokeWidth} fill="none"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={progressOffset}
                    strokeLinecap="round" rotation="-90" origin={`${ringSize / 2}, ${ringSize / 2}`}
                />
            </Svg>

            {/* Center content */}
            <View style={[styles.ringCenter, { width: ringSize, height: ringSize }]}>
                <Text style={styles.xpFraction}>{userData.currentXP.toLocaleString()} / {userData.xpToNextLevel.toLocaleString()} XP</Text>
                <Text style={styles.levelText}>Level {userData.level}</Text>
                <Text style={styles.titleText}>{userData.title}</Text>
            </View>

            {/* XP to next level */}
            <Text style={styles.nextLevelText}>{(userData.xpToNextLevel - userData.currentXP).toLocaleString()} XP to Level {userData.level + 1}</Text>
        </Animated.View>
    );
};

// Single Stat Item Component with animations
const StatItem: React.FC<{ stat: typeof statsRow1[0]; index: number }> = ({ stat, index }) => {
    const { scale: pressScale, onPressIn, onPressOut } = usePressAnimation();

    // Parse numeric value (including decimals)
    const numericMatch = stat.value.match(/[\d.]+/);
    const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
    const hasDecimal = stat.value.includes('.');
    const suffix = stat.value.replace(/[\d.]+/g, '');

    const displayValue = useCountUp(hasDecimal ? Math.floor(numericValue * 10) : numericValue, 1200, 300 + index * 100);
    const formattedValue = hasDecimal ? (displayValue / 10).toFixed(1) : displayValue;

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <Animated.View style={[styles.statItem, { transform: [{ scale: pressScale }] }]}>
                <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}20` }]}>
                    <Text style={styles.statIcon}>{stat.icon}</Text>
                </View>
                <View style={styles.statTextContainer}>
                    <Text style={styles.statValue}>{formattedValue}{suffix}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};

// Stats Grid - Unified glass containers per row
const StatsGrid = () => {
    const { opacity, translateY, scale } = useEntranceAnimation(150);

    return (
        <Animated.View style={[styles.statsSection, { opacity, transform: [{ translateY }, { scale }] }]}>
            {/* Row 1 - Questions & Accuracy */}
            <LinearGradient
                colors={['rgba(17, 24, 39, 0.95)', 'rgba(31, 41, 55, 0.9)']}
                style={styles.statsRowContainer}
            >
                {statsRow1.map((stat, index) => (
                    <React.Fragment key={index}>
                        <StatItem stat={stat} index={index} />
                        {index < statsRow1.length - 1 && <View style={styles.statDivider} />}
                    </React.Fragment>
                ))}
            </LinearGradient>

            {/* Row 2 - Streak & Time */}
            <LinearGradient
                colors={['rgba(17, 24, 39, 0.95)', 'rgba(31, 41, 55, 0.9)']}
                style={styles.statsRowContainer}
            >
                {statsRow2.map((stat, index) => (
                    <React.Fragment key={index}>
                        <StatItem stat={stat} index={index + 2} />
                        {index < statsRow2.length - 1 && <View style={styles.statDivider} />}
                    </React.Fragment>
                ))}
            </LinearGradient>
        </Animated.View>
    );
};

// Individual animated bar component
const AnimatedBar: React.FC<{ day: typeof weeklyActivity[0]; index: number; isToday: boolean }> = ({ day, index, isToday }) => {
    const barHeight = useBarGrow(day.height, index * 80);
    const { scale: pressScale, onPressIn, onPressOut } = usePressAnimation();

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.barContainer}
        >
            <Animated.View style={[styles.barWrapper, { transform: [{ scale: pressScale }] }]}>
                {/* Glow shadow behind bar */}
                <Animated.View style={[
                    styles.barGlow,
                    {
                        height: barHeight.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%'],
                        }),
                        backgroundColor: isToday ? colors.accent.purple : colors.accent.indigo,
                    }
                ]} />
                <Animated.View style={[
                    styles.bar,
                    {
                        height: barHeight.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%'],
                        }),
                    }
                ]}>
                    <LinearGradient
                        colors={isToday
                            ? [colors.accent.purple, colors.accent.indigo, colors.accent.indigoLight]
                            : ['#6366F1', '#4F46E5', '#4338CA']}
                        style={StyleSheet.absoluteFill}
                    />
                </Animated.View>
                {isToday && <Text style={styles.barFire}>🔥</Text>}
            </Animated.View>
            <Text style={[styles.dayLabel, isToday && styles.dayLabelActive]}>{day.day}</Text>
        </TouchableOpacity>
    );
};

// Weekly Activity Bar Chart with gradient glow
const WeeklyActivity = () => {
    const { opacity, translateY, scale } = useEntranceAnimation(250);
    const todayIndex = 4; // Friday

    return (
        <Animated.View style={[styles.weeklySection, { opacity, transform: [{ translateY }, { scale }] }]}>
            <Text style={styles.sectionTitle}>Weekly Activity</Text>
            <LinearGradient
                colors={['rgba(17, 24, 39, 0.95)', 'rgba(31, 41, 55, 0.9)']}
                style={styles.weeklyCard}
            >
                <View style={styles.barChart}>
                    {weeklyActivity.map((day, index) => (
                        <AnimatedBar
                            key={day.day + index}
                            day={day}
                            index={index}
                            isToday={index === todayIndex}
                        />
                    ))}
                </View>
            </LinearGradient>
        </Animated.View>
    );
};

// Continent Mastery - Premium Horizontal Progress Bars with names
const ContinentMastery = () => {
    const { opacity, translateY } = useEntranceAnimation(350);

    return (
        <Animated.View style={[styles.masterySection, { opacity, transform: [{ translateY }] }]}>
            <Text style={styles.sectionTitle}>Continent Mastery</Text>
            <LinearGradient
                colors={['rgba(17, 24, 39, 0.95)', 'rgba(31, 41, 55, 0.9)']}
                style={styles.masteryCard}
            >
                {continentMastery.map((continent, index) => (
                    <View key={continent.name} style={[styles.masteryItem, index === continentMastery.length - 1 && { marginBottom: 0 }]}>
                        <View style={styles.masteryLeft}>
                            <View style={[styles.masteryEmojiContainer, { backgroundColor: `${continent.color}25` }]}>
                                <Text style={styles.masteryEmoji}>{continent.emoji}</Text>
                            </View>
                            <View style={styles.masteryBarSection}>
                                {/* Continent Name Label */}
                                <Text style={styles.masteryName}>{continent.name}</Text>
                                <View style={styles.masteryBarWrapper}>
                                    {/* Glow behind bar - outside container for visibility */}
                                    <View style={[
                                        styles.masteryBarGlow,
                                        {
                                            width: `${continent.progress}%`,
                                            backgroundColor: continent.color,
                                        }
                                    ]} />
                                    <View style={styles.masteryBarContainer}>
                                        <LinearGradient
                                            colors={[continent.color, `${continent.color}DD`, `${continent.color}AA`]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={[styles.masteryBarFill, { width: `${continent.progress}%` }]}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.masteryPercent, { color: continent.color }]}>{continent.progress}%</Text>
                    </View>
                ))}
            </LinearGradient>
        </Animated.View>
    );
};

// ============================================================================
// MAIN SCREEN
// ============================================================================

const ProgressScreen: React.FC = () => (
    <View style={styles.container}>
        {/* Background */}
        <LinearGradient colors={['#030712', '#0a1628', '#111827']} style={StyleSheet.absoluteFill} />
        <View style={[styles.glowOrb, styles.glowOrbTop]} />
        <View style={[styles.glowOrb, styles.glowOrbBottom]} />

        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Header />
                <LevelProgressRing />
                <StatsGrid />
                <WeeklyActivity />
                <ContinentMastery />
            </ScrollView>
        </SafeAreaView>
    </View>
);

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#030712' },
    safeArea: { flex: 1 },
    scroll: { flex: 1 },
    scrollContent: { paddingHorizontal: 16, paddingBottom: 140 }, // Increased bottom padding for tab bar
    glowOrb: { position: 'absolute', width: 300, height: 300, borderRadius: 150, opacity: 0.12 },
    glowOrbTop: { top: -50, right: -100, backgroundColor: colors.accent.purple },
    glowOrbBottom: { bottom: 100, left: -100, backgroundColor: colors.accent.indigo },

    // Header
    header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 4, marginBottom: 0 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text.white },
    headerIcon: { position: 'absolute', right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(99, 102, 241, 0.2)', justifyContent: 'center', alignItems: 'center' },
    headerIconText: { fontSize: 16, color: colors.accent.indigo },

    // Level Progress Ring - Prominent glow
    ringContainer: { alignItems: 'center', marginBottom: 6 },
    ringGlowOuter: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: colors.accent.purple,
        opacity: 0.08,
    },
    ringGlowMiddle: {
        position: 'absolute',
        width: 190,
        height: 190,
        borderRadius: 95,
        backgroundColor: colors.accent.indigo,
        opacity: 0.12,
    },
    ringGlowInner: {
        position: 'absolute',
        width: 165,
        height: 165,
        borderRadius: 82.5,
        backgroundColor: colors.accent.purple,
        opacity: 0.15,
    },
    ringSvg: {},
    ringCenter: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
    xpFraction: { fontSize: 10, color: colors.text.muted, marginBottom: 2 },
    levelText: { fontSize: 26, fontWeight: '900', color: colors.text.white, letterSpacing: 0.5 },
    titleText: { fontSize: 11, color: colors.accent.gold, fontWeight: '600', marginTop: 2 },
    nextLevelText: { fontSize: 11, color: colors.text.muted, marginTop: 6 },

    // Section Title
    sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text.white, marginBottom: 6 },

    // Stats Grid - Unified rows
    statsSection: { marginBottom: 8, gap: 8 },
    statsRowContainer: {
        flexDirection: 'row',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        overflow: 'hidden',
    },
    statItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    statDivider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
        marginVertical: 10,
    },
    statIconContainer: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    statIcon: { fontSize: 20 },
    statTextContainer: { flex: 1 },
    statValue: { fontSize: 22, fontWeight: '800', color: colors.text.white },
    statLabel: { fontSize: 10, color: colors.text.muted, marginTop: 1 },

    // Weekly Activity with bar glow
    weeklySection: { marginBottom: 8 },
    weeklyCard: { padding: 14, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    barChart: { flexDirection: 'row', justifyContent: 'space-between', height: 100 },
    barContainer: { flex: 1, alignItems: 'center' },
    barWrapper: { flex: 1, width: 26, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 6, position: 'relative' },
    barGlow: {
        position: 'absolute',
        bottom: 0,
        width: 32,
        borderRadius: 10,
        opacity: 0.3,
        transform: [{ scaleX: 1.3 }],
    },
    bar: { width: 22, borderRadius: 8, zIndex: 1, overflow: 'hidden' },
    barFire: { position: 'absolute', top: -14, fontSize: 11, zIndex: 2 },
    dayLabel: { fontSize: 11, color: colors.text.muted, fontWeight: '500' },
    dayLabelActive: { color: colors.accent.purple, fontWeight: '700' },

    // Continent Mastery with names
    masterySection: { marginBottom: 8 },
    masteryCard: { padding: 12, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    masteryItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    masteryLeft: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    masteryEmojiContainer: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    masteryEmoji: { fontSize: 16 },
    masteryBarSection: { flex: 1 },
    masteryName: { fontSize: 11, color: colors.text.secondary, fontWeight: '600', marginBottom: 3 },
    masteryBarContainer: {
        height: 16,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 8,
        overflow: 'hidden',
    },
    masteryBarWrapper: {
        position: 'relative',
        paddingVertical: 4,
    },
    masteryBarGlow: {
        position: 'absolute',
        top: -2,
        left: -2,
        height: 28,
        borderRadius: 14,
        opacity: 0.6,
        zIndex: 0,
    },
    masteryBarFill: { height: '100%', borderRadius: 8 },
    masteryPercent: { fontSize: 14, fontWeight: '800', marginLeft: 10, width: 40, textAlign: 'right' },
});

export default ProgressScreen;
