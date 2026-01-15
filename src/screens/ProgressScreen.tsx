/**
 * Global Quest - Progress Screen
 * Track learning journey across continents and categories
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
    primary: { 500: '#6366F1', 600: '#4F46E5' },
    secondary: { 400: '#FBBF24', 500: '#F59E0B' },
    success: { 500: '#10B981' },
    background: { primary: '#0F172A', secondary: '#1E293B', tertiary: '#334155' },
    text: { primary: '#F8FAFC', secondary: '#CBD5E1', tertiary: '#94A3B8', muted: '#64748B' },
};

const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32 };

// ============================================================================
// MOCK DATA
// ============================================================================

const mockData = {
    totalXP: 12500,
    currentLevel: 23,
    xpToNextLevel: 2000,
    xpProgress: 1250,
    questionsAnswered: 847,
    accuracy: 72,
    longestStreak: 47,
    currentStreak: 12,
    hoursLearned: 28.5,
    continents: [
        { id: 'ASIA', name: 'Asia', emoji: '🌏', progress: 32, color: '#F472B6', questions: 384 },
        { id: 'AFRICA', name: 'Africa', emoji: '🦁', progress: 80, color: '#FBBF24', questions: 480 },
        { id: 'EUROPE', name: 'Europe', emoji: '🏰', progress: 65, color: '#60A5FA', questions: 520 },
        { id: 'NORTH_AMERICA', name: 'N. America', emoji: '🗽', progress: 28, color: '#34D399', questions: 140 },
        { id: 'SOUTH_AMERICA', name: 'S. America', emoji: '🌎', progress: 15, color: '#A78BFA', questions: 60 },
        { id: 'AUSTRALIA', name: 'Australia', emoji: '🦘', progress: 72, color: '#FB923C', questions: 252 },
        { id: 'ANTARCTICA', name: 'Antarctica', emoji: '🐧', progress: 0, color: '#67E8F9', questions: 0 },
    ],
    weeklyActivity: [
        { day: 'Mon', questions: 45, correct: 32 },
        { day: 'Tue', questions: 38, correct: 28 },
        { day: 'Wed', questions: 52, correct: 41 },
        { day: 'Thu', questions: 28, correct: 22 },
        { day: 'Fri', questions: 67, correct: 51 },
        { day: 'Sat', questions: 42, correct: 30 },
        { day: 'Sun', questions: 55, correct: 43 },
    ],
};

// ============================================================================
// COMPONENTS
// ============================================================================

interface CircularProgressProps {
    progress: number;
    size: number;
    strokeWidth: number;
    color: string;
    children?: React.ReactNode;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    progress,
    size,
    strokeWidth,
    color,
    children,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={colors.background.tertiary}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${size / 2}, ${size / 2}`}
                />
            </Svg>
            {children}
        </View>
    );
};

const LevelCard = () => (
    <View style={styles.levelCard}>
        <CircularProgress
            progress={(mockData.xpProgress / mockData.xpToNextLevel) * 100}
            size={120}
            strokeWidth={8}
            color={colors.primary[500]}
        >
            <View style={styles.levelCenter}>
                <Text style={styles.levelNumber}>{mockData.currentLevel}</Text>
                <Text style={styles.levelLabel}>LEVEL</Text>
            </View>
        </CircularProgress>

        <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>Knowledge Seeker</Text>
            <Text style={styles.xpText}>
                {mockData.xpProgress.toLocaleString()} / {mockData.xpToNextLevel.toLocaleString()} XP
            </Text>
            <Text style={styles.totalXP}>
                Total: {mockData.totalXP.toLocaleString()} XP
            </Text>
        </View>
    </View>
);

const StatsGrid = () => (
    <View style={styles.statsGrid}>
        <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📝</Text>
            <Text style={styles.statValue}>{mockData.questionsAnswered}</Text>
            <Text style={styles.statLabel}>Questions</Text>
        </View>
        <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🎯</Text>
            <Text style={styles.statValue}>{mockData.accuracy}%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
        </View>
        <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>{mockData.longestStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
        </View>
        <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⏱️</Text>
            <Text style={styles.statValue}>{mockData.hoursLearned}h</Text>
            <Text style={styles.statLabel}>Time Learned</Text>
        </View>
    </View>
);

const WeeklyActivity = () => {
    const maxQuestions = Math.max(...mockData.weeklyActivity.map(d => d.questions));

    return (
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>📊 This Week's Activity</Text>
            <View style={styles.activityChart}>
                {mockData.weeklyActivity.map((day, index) => (
                    <View key={day.day} style={styles.activityBar}>
                        <View style={styles.barContainer}>
                            <View
                                style={[
                                    styles.barFill,
                                    {
                                        height: `${(day.questions / maxQuestions) * 100}%`,
                                        backgroundColor: index === 4 ? colors.primary[500] : colors.primary[600],
                                    },
                                ]}
                            />
                        </View>
                        <Text style={styles.barLabel}>{day.day}</Text>
                        <Text style={styles.barValue}>{day.questions}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const ContinentProgress = () => (
    <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>🌍 Continent Mastery</Text>
        {mockData.continents.map((continent) => (
            <TouchableOpacity key={continent.id} style={styles.continentRow}>
                <Text style={styles.continentEmoji}>{continent.emoji}</Text>
                <View style={styles.continentInfo}>
                    <Text style={styles.continentName}>{continent.name}</Text>
                    <View style={styles.progressBarContainer}>
                        <View
                            style={[
                                styles.progressBarFill,
                                { width: `${continent.progress}%`, backgroundColor: continent.color }
                            ]}
                        />
                    </View>
                </View>
                <Text style={[styles.continentPercent, { color: continent.color }]}>
                    {continent.progress}%
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ProgressScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Progress</Text>
                    <TouchableOpacity style={styles.shareButton}>
                        <Text style={styles.shareText}>Share</Text>
                    </TouchableOpacity>
                </View>

                {/* Level Card */}
                <LevelCard />

                {/* Stats Grid */}
                <StatsGrid />

                {/* Weekly Activity */}
                <WeeklyActivity />

                {/* Continent Progress */}
                <ContinentProgress />
            </ScrollView>
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
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing[4],
        paddingBottom: spacing[8],
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing[4],
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.text.primary,
    },
    shareButton: {
        paddingVertical: spacing[2],
        paddingHorizontal: spacing[4],
        backgroundColor: colors.background.secondary,
        borderRadius: 20,
    },
    shareText: {
        fontSize: 14,
        color: colors.primary[500],
        fontWeight: '600',
    },

    // Level Card
    levelCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.secondary,
        borderRadius: 20,
        padding: spacing[4],
        marginBottom: spacing[4],
    },
    levelCenter: {
        alignItems: 'center',
    },
    levelNumber: {
        fontSize: 36,
        fontWeight: '800',
        color: colors.text.primary,
    },
    levelLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.text.tertiary,
        letterSpacing: 1,
    },
    levelInfo: {
        marginLeft: spacing[4],
        flex: 1,
    },
    levelTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.text.primary,
        marginBottom: spacing[1],
    },
    xpText: {
        fontSize: 14,
        color: colors.text.secondary,
    },
    totalXP: {
        fontSize: 12,
        color: colors.text.muted,
        marginTop: spacing[1],
    },

    // Stats Grid
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing[3],
        marginBottom: spacing[4],
    },
    statCard: {
        width: (SCREEN_WIDTH - spacing[4] * 2 - spacing[3]) / 2 - 1,
        backgroundColor: colors.background.secondary,
        borderRadius: 16,
        padding: spacing[4],
        alignItems: 'center',
    },
    statEmoji: {
        fontSize: 24,
        marginBottom: spacing[2],
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text.primary,
    },
    statLabel: {
        fontSize: 12,
        color: colors.text.tertiary,
        marginTop: spacing[1],
    },

    // Section Card
    sectionCard: {
        backgroundColor: colors.background.secondary,
        borderRadius: 20,
        padding: spacing[4],
        marginBottom: spacing[4],
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text.primary,
        marginBottom: spacing[4],
    },

    // Activity Chart
    activityChart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 120,
    },
    activityBar: {
        alignItems: 'center',
        flex: 1,
    },
    barContainer: {
        flex: 1,
        width: 24,
        backgroundColor: colors.background.tertiary,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    barFill: {
        width: '100%',
        borderRadius: 12,
    },
    barLabel: {
        fontSize: 10,
        color: colors.text.muted,
        marginTop: spacing[1],
    },
    barValue: {
        fontSize: 10,
        color: colors.text.tertiary,
        fontWeight: '600',
    },

    // Continent Progress
    continentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing[3],
    },
    continentEmoji: {
        fontSize: 24,
        marginRight: spacing[3],
    },
    continentInfo: {
        flex: 1,
    },
    continentName: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: spacing[1],
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: colors.background.tertiary,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    continentPercent: {
        fontSize: 14,
        fontWeight: '700',
        marginLeft: spacing[3],
        minWidth: 40,
        textAlign: 'right',
    },
});

export default ProgressScreen;
