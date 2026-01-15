/**
 * Global Quest - Premium Progress Screen
 * Matching Gemini 3 Pro mockup quality
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
    bg: { deep: '#030712', card: '#111d32', cardLight: '#1a2942' },
    accent: { indigo: '#6366F1', indigoLight: '#818CF8', purple: '#8B5CF6', gold: '#FBBF24', pink: '#EC4899', green: '#34D399', cyan: '#06B6D4', orange: '#FB923C' },
    text: { white: '#FFF', primary: '#F1F5F9', secondary: '#CBD5E1', muted: '#64748B' },
    gradients: { indigo: ['#6366F1', '#4F46E5', '#4338CA'], fire: ['#F97316', '#EA580C', '#DC2626'] },
};

const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32 };

// ============================================================================
// MOCK DATA
// ============================================================================

const mockData = {
    level: 23,
    title: 'Knowledge Seeker',
    currentXP: 1250,
    nextLevelXP: 2000,
    totalXP: 12500,
    stats: [
        { icon: '📝', value: '847', label: 'Questions', subLabel: 'Answered' },
        { icon: '🎯', value: '72%', label: 'Accuracy', subLabel: '' },
        { icon: '🔥', value: '47', label: 'Best Streak', subLabel: '' },
        { icon: '⏱️', value: '28.5h', label: 'Time Learned', subLabel: '' },
    ],
    weeklyActivity: [
        { day: 'M', value: 45, max: 67 },
        { day: 'T', value: 38, max: 67 },
        { day: 'W', value: 52, max: 67 },
        { day: 'T', value: 28, max: 67 },
        { day: 'F', value: 67, max: 67, highlight: true },
        { day: 'S', value: 42, max: 67 },
        { day: 'S', value: 55, max: 67 },
    ],
    continents: [
        { emoji: '🌏', name: 'Asia', progress: 32, color: '#EC4899' },
        { emoji: '🦁', name: 'Africa', progress: 80, color: '#FBBF24' },
        { emoji: '🏰', name: 'Europe', progress: 65, color: '#60A5FA' },
        { emoji: '🗽', name: 'N. America', progress: 28, color: '#34D399' },
        { emoji: '🌎', name: 'S. America', progress: 15, color: '#A78BFA' },
        { emoji: '🦘', name: 'Australia', progress: 72, color: '#FB923C' },
        { emoji: '🐧', name: 'Antarctica', progress: 0, color: '#64748B' },
    ],
};

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
                Animated.timing(opacity, { toValue: 1, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { opacity, translateY };
};

const useProgressAnimation = (targetProgress: number, delay: number = 0) => {
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.timing(progress, { toValue: targetProgress, duration: 1000, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
        ]).start();
    }, []);

    return progress;
};

// ============================================================================
// COMPONENTS
// ============================================================================

const AnimatedCircularProgress: React.FC<{ progress: number; size: number; strokeWidth: number }> = ({ progress, size, strokeWidth }) => {
    const animatedProgress = useProgressAnimation(progress, 500);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
                {/* Background ring */}
                <Circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(99, 102, 241, 0.2)" strokeWidth={strokeWidth} fill="none" />
                {/* Progress ring */}
                <Circle
                    cx={size / 2} cy={size / 2} r={radius}
                    stroke="url(#gradient)" strokeWidth={strokeWidth} fill="none"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={circumference - (progress / 100) * circumference}
                    strokeLinecap="round" rotation="-90" origin={`${size / 2}, ${size / 2}`}
                />
            </Svg>
            {/* Center content */}
            <View style={styles.levelCenter}>
                <Text style={styles.xpProgress}>{mockData.currentXP.toLocaleString()} / {mockData.nextLevelXP.toLocaleString()} XP</Text>
                <Text style={styles.levelNumber}>Level {mockData.level}</Text>
                <Text style={styles.levelTitle}>{mockData.title}</Text>
            </View>
        </View>
    );
};

const Header = () => {
    const { opacity, translateY } = useEntranceAnimation(100);
    return (
        <Animated.View style={[styles.header, { opacity, transform: [{ translateY }] }]}>
            <Text style={styles.headerTitle}>Your Progress</Text>
            <TouchableOpacity style={styles.shareBtn}>
                <Text style={styles.shareIcon}>↗️</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const LevelRing = () => {
    const { opacity, translateY } = useEntranceAnimation(200);
    const xpProgress = (mockData.currentXP / mockData.nextLevelXP) * 100;

    return (
        <Animated.View style={[styles.levelCard, { opacity, transform: [{ translateY }] }]}>
            <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.levelCardInner}>
                <AnimatedCircularProgress progress={xpProgress} size={180} strokeWidth={10} />
            </LinearGradient>
        </Animated.View>
    );
};

const StatsGrid = () => {
    const { opacity, translateY } = useEntranceAnimation(300);

    return (
        <Animated.View style={[styles.statsGrid, { opacity, transform: [{ translateY }] }]}>
            {mockData.stats.map((stat, i) => (
                <View key={i} style={styles.statCard}>
                    <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.statCardInner}>
                        <Text style={styles.statIcon}>{stat.icon}</Text>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                        {stat.subLabel ? <Text style={styles.statSubLabel}>{stat.subLabel}</Text> : null}
                    </LinearGradient>
                </View>
            ))}
        </Animated.View>
    );
};

const WeeklyActivity = () => {
    const { opacity, translateY } = useEntranceAnimation(400);

    return (
        <Animated.View style={[styles.sectionCard, { opacity, transform: [{ translateY }] }]}>
            <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.sectionCardInner}>
                <Text style={styles.sectionTitle}>Weekly Activity</Text>
                <View style={styles.chartContainer}>
                    {mockData.weeklyActivity.map((day, i) => (
                        <View key={i} style={styles.barWrapper}>
                            <View style={styles.barTrack}>
                                <LinearGradient
                                    colors={day.highlight ? colors.gradients.fire : colors.gradients.indigo}
                                    style={[styles.barFill, { height: `${(day.value / day.max) * 100}%` }]}
                                />
                                {day.highlight && <Text style={styles.fireEmoji}>🔥</Text>}
                            </View>
                            <Text style={styles.dayLabel}>{day.day}</Text>
                        </View>
                    ))}
                </View>
            </LinearGradient>
        </Animated.View>
    );
};

const ContinentMastery = () => {
    const { opacity, translateY } = useEntranceAnimation(500);

    return (
        <Animated.View style={[styles.sectionCard, { opacity, transform: [{ translateY }] }]}>
            <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.sectionCardInner}>
                <Text style={styles.sectionTitle}>Continent Mastery</Text>
                {mockData.continents.map((continent, i) => (
                    <View key={i} style={styles.continentRow}>
                        <Text style={styles.continentEmoji}>{continent.emoji}</Text>
                        <View style={styles.continentInfo}>
                            <View style={styles.progressTrack}>
                                <Animated.View style={[styles.progressFill, { width: `${continent.progress}%`, backgroundColor: continent.color }]} />
                            </View>
                        </View>
                        <Text style={[styles.continentPercent, { color: continent.color }]}>{continent.progress}%</Text>
                    </View>
                ))}
            </LinearGradient>
        </Animated.View>
    );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ProgressScreen: React.FC = () => (
    <View style={styles.container}>
        {/* Background */}
        <LinearGradient colors={['#030712', '#0a1628', '#111d32']} style={StyleSheet.absoluteFill} />
        <View style={[styles.glowOrb, { top: '5%', right: '10%', backgroundColor: colors.accent.purple }]} />
        <View style={[styles.glowOrb, { bottom: '30%', left: '-10%', backgroundColor: colors.accent.indigo }]} />

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <Header />
            <LevelRing />
            <StatsGrid />
            <WeeklyActivity />
            <ContinentMastery />
        </ScrollView>
    </View>
);

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#030712' },
    scroll: { flex: 1 },
    content: { padding: spacing[4], paddingBottom: 100 },
    glowOrb: { position: 'absolute', width: 250, height: 250, borderRadius: 125, opacity: 0.12 },

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[4] },
    headerTitle: { fontSize: 28, fontWeight: '800', color: colors.text.white },
    shareBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(99,102,241,0.2)', justifyContent: 'center', alignItems: 'center' },
    shareIcon: { fontSize: 18 },

    levelCard: { alignItems: 'center', marginBottom: spacing[4] },
    levelCardInner: { borderRadius: 20, padding: spacing[6], borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    levelCenter: { alignItems: 'center' },
    xpProgress: { fontSize: 12, color: colors.text.muted, marginBottom: 4 },
    levelNumber: { fontSize: 42, fontWeight: '900', color: colors.text.white },
    levelTitle: { fontSize: 14, color: colors.accent.indigoLight, fontWeight: '600' },

    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3], marginBottom: spacing[4] },
    statCard: { width: (SCREEN_WIDTH - spacing[4] * 2 - spacing[3]) / 2 - 1, borderRadius: 16, overflow: 'hidden' },
    statCardInner: { padding: spacing[4], alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 16 },
    statIcon: { fontSize: 28, marginBottom: spacing[2] },
    statValue: { fontSize: 28, fontWeight: '800', color: colors.text.white },
    statLabel: { fontSize: 12, color: colors.text.secondary, marginTop: 2 },
    statSubLabel: { fontSize: 10, color: colors.text.muted },

    sectionCard: { marginBottom: spacing[4], borderRadius: 20, overflow: 'hidden' },
    sectionCardInner: { padding: spacing[4], borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 20 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text.white, marginBottom: spacing[4] },

    chartContainer: { flexDirection: 'row', justifyContent: 'space-between', height: 120, alignItems: 'flex-end' },
    barWrapper: { flex: 1, alignItems: 'center', gap: spacing[1] },
    barTrack: { width: 24, height: 100, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, overflow: 'hidden', justifyContent: 'flex-end', position: 'relative' },
    barFill: { width: '100%', borderRadius: 12 },
    fireEmoji: { position: 'absolute', top: -20, alignSelf: 'center', fontSize: 16 },
    dayLabel: { fontSize: 11, color: colors.text.muted, fontWeight: '500' },

    continentRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing[3] },
    continentEmoji: { fontSize: 24, marginRight: spacing[3], width: 30 },
    continentInfo: { flex: 1 },
    progressTrack: { height: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 5, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 5 },
    continentPercent: { fontSize: 14, fontWeight: '700', marginLeft: spacing[3], width: 45, textAlign: 'right' },
});

export default ProgressScreen;
