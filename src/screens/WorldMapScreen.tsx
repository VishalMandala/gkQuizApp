/**
 * Global Quest - World Map Screen
 * Interactive continent exploration with progress visualization
 */

import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, G, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colors, spacing, borders, typography, animation } from '../theme';
import type { Continent, UserProgress } from '../types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================================
// TYPES
// ============================================================================

interface ContinentData {
    id: Continent;
    name: string;
    emoji: string;
    color: string;
    position: { x: number; y: number };
    size: number;
    progress: number;
    totalQuestions: number;
    answeredQuestions: number;
}

interface WorldMapScreenProps {
    continentProgress: Record<Continent, UserProgress>;
    onSelectContinent: (continent: Continent) => void;
    onToggleView: () => void;
    is3DMode: boolean;
}

// ============================================================================
// CONTINENT MAP DATA
// ============================================================================

const CONTINENT_POSITIONS: Record<Continent, { x: number; y: number; size: number }> = {
    EUROPE: { x: 0.52, y: 0.25, size: 50 },
    ASIA: { x: 0.72, y: 0.32, size: 80 },
    AFRICA: { x: 0.52, y: 0.52, size: 65 },
    NORTH_AMERICA: { x: 0.22, y: 0.28, size: 70 },
    SOUTH_AMERICA: { x: 0.30, y: 0.65, size: 55 },
    AUSTRALIA_OCEANIA: { x: 0.82, y: 0.68, size: 50 },
    ANTARCTICA: { x: 0.50, y: 0.92, size: 60 },
};

const CONTINENT_INFO: Record<Continent, { name: string; emoji: string; color: string }> = {
    ASIA: { name: 'Asia', emoji: '🌏', color: '#F472B6' },
    AFRICA: { name: 'Africa', emoji: '🦁', color: '#FBBF24' },
    EUROPE: { name: 'Europe', emoji: '🏰', color: '#60A5FA' },
    NORTH_AMERICA: { name: 'North America', emoji: '🗽', color: '#34D399' },
    SOUTH_AMERICA: { name: 'South America', emoji: '🌎', color: '#A78BFA' },
    AUSTRALIA_OCEANIA: { name: 'Australia', emoji: '🦘', color: '#FB923C' },
    ANTARCTICA: { name: 'Antarctica', emoji: '🐧', color: '#67E8F9' },
};

// ============================================================================
// PROGRESS RING COMPONENT
// ============================================================================

interface ProgressRingProps {
    progress: number; // 0-100
    size: number;
    strokeWidth: number;
    color: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ progress, size, strokeWidth, color }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <Svg width={size} height={size} style={styles.progressRing}>
            {/* Background circle */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={colors.background.tertiary}
                strokeWidth={strokeWidth}
                fill="none"
            />
            {/* Progress circle */}
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
    );
};

// ============================================================================
// CONTINENT NODE COMPONENT
// ============================================================================

interface ContinentNodeProps {
    continent: ContinentData;
    onPress: () => void;
    index: number;
}

const ContinentNode: React.FC<ContinentNodeProps> = ({ continent, onPress, index }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Entry animation
        Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            delay: index * 100,
            useNativeDriver: true,
        }).start();

        // Pulse animation for incomplete continents
        if (continent.progress < 100) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.05,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, []);

    const nodeSize = continent.size;
    const left = continent.position.x * (SCREEN_WIDTH - nodeSize) - spacing[4];
    const top = continent.position.y * (SCREEN_HEIGHT * 0.6);

    const isCompleted = continent.progress === 100;
    const isUnexplored = continent.progress === 0;

    return (
        <Animated.View
            style={[
                styles.continentNode,
                {
                    left,
                    top,
                    width: nodeSize,
                    height: nodeSize,
                    transform: [
                        { scale: Animated.multiply(scaleAnim, pulseAnim) },
                    ],
                },
            ]}
        >
            <TouchableOpacity
                style={styles.continentTouchable}
                onPress={onPress}
                activeOpacity={0.8}
            >
                {/* Progress Ring */}
                <ProgressRing
                    progress={continent.progress}
                    size={nodeSize}
                    strokeWidth={3}
                    color={continent.color}
                />

                {/* Inner Circle */}
                <View
                    style={[
                        styles.continentInner,
                        {
                            width: nodeSize - 10,
                            height: nodeSize - 10,
                            backgroundColor: isCompleted
                                ? continent.color + '40'
                                : colors.background.secondary,
                            borderColor: continent.color,
                        },
                    ]}
                >
                    <Text style={styles.continentEmoji}>{continent.emoji}</Text>

                    {/* Unexplored indicator */}
                    {isUnexplored && (
                        <View style={styles.unexploredBadge}>
                            <Text style={styles.unexploredText}>?</Text>
                        </View>
                    )}

                    {/* Completed indicator */}
                    {isCompleted && (
                        <View style={styles.completedBadge}>
                            <Text style={styles.completedText}>✓</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>

            {/* Label */}
            <View style={styles.continentLabel}>
                <Text style={styles.continentName}>{continent.name}</Text>
                <Text style={[styles.continentProgress, { color: continent.color }]}>
                    {continent.progress}%
                </Text>
            </View>
        </Animated.View>
    );
};

// ============================================================================
// STATS PANEL COMPONENT
// ============================================================================

interface StatsPanelProps {
    totalProgress: number;
    continentsCompleted: number;
    totalContinents: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
    totalProgress,
    continentsCompleted,
    totalContinents,
}) => (
    <View style={styles.statsPanel}>
        <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalProgress}%</Text>
            <Text style={styles.statLabel}>World Explored</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
            <Text style={styles.statValue}>{continentsCompleted}/{totalContinents}</Text>
            <Text style={styles.statLabel}>Continents Mastered</Text>
        </View>
    </View>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const WorldMapScreen: React.FC<WorldMapScreenProps> = ({
    continentProgress,
    onSelectContinent,
    onToggleView,
    is3DMode,
}) => {
    // Convert progress data to continent data
    const continents: ContinentData[] = Object.entries(CONTINENT_POSITIONS).map(
        ([id, position]) => {
            const continentId = id as Continent;
            const info = CONTINENT_INFO[continentId];
            const progress = continentProgress[continentId];

            return {
                id: continentId,
                name: info.name,
                emoji: info.emoji,
                color: info.color,
                position: { x: position.x, y: position.y },
                size: position.size,
                progress: progress?.masteryPercentage || 0,
                totalQuestions: 500, // Would come from actual data
                answeredQuestions: progress?.questionsAnswered || 0,
            };
        }
    );

    // Calculate overall stats
    const totalProgress = Math.round(
        continents.reduce((sum, c) => sum + c.progress, 0) / continents.length
    );
    const continentsCompleted = continents.filter(c => c.progress === 100).length;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>CONTINENT QUEST</Text>
                    <Text style={styles.subtitle}>Explore. Learn. Conquer.</Text>
                </View>

                {/* View Toggle */}
                <View style={styles.viewToggle}>
                    <TouchableOpacity
                        style={[styles.toggleButton, !is3DMode && styles.toggleButtonActive]}
                        onPress={!is3DMode ? undefined : onToggleView}
                    >
                        <Text style={[styles.toggleText, !is3DMode && styles.toggleTextActive]}>
                            2D MAP
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, is3DMode && styles.toggleButtonActive]}
                        onPress={is3DMode ? undefined : onToggleView}
                    >
                        <Text style={[styles.toggleText, is3DMode && styles.toggleTextActive]}>
                            3D GLOBE
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Stats Panel */}
            <StatsPanel
                totalProgress={totalProgress}
                continentsCompleted={continentsCompleted}
                totalContinents={continents.length}
            />

            {/* Map Area */}
            <View style={styles.mapContainer}>
                {/* Background gradient (ocean) */}
                <LinearGradient
                    colors={['#0c1929', '#162a43', '#0c1929']}
                    style={styles.oceanBackground}
                />

                {/* Stars background */}
                <View style={styles.starsContainer}>
                    {Array.from({ length: 30 }).map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.star,
                                {
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    opacity: Math.random() * 0.5 + 0.2,
                                    width: Math.random() * 2 + 1,
                                    height: Math.random() * 2 + 1,
                                },
                            ]}
                        />
                    ))}
                </View>

                {/* Continent Nodes */}
                {continents.map((continent, index) => (
                    <ContinentNode
                        key={continent.id}
                        continent={continent}
                        onPress={() => onSelectContinent(continent.id)}
                        index={index}
                    />
                ))}

                {/* Zoom Indicator */}
                <View style={styles.zoomIndicator}>
                    <View style={[styles.zoomDot, styles.zoomDotActive]} />
                    <View style={[styles.zoomDot, styles.zoomDotActive]} />
                    <View style={styles.zoomDot} />
                    <View style={styles.zoomDot} />
                    <View style={styles.zoomDot} />
                </View>
            </View>

            {/* Legend */}
            <View style={styles.legend}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: colors.success[500] }]} />
                    <Text style={styles.legendText}>Mastered</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: colors.primary[500] }]} />
                    <Text style={styles.legendText}>In Progress</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: colors.text.muted }]} />
                    <Text style={styles.legendText}>Unexplored</Text>
                </View>
            </View>
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

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing[4],
        paddingTop: spacing[6],
    },
    title: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold as any,
        color: colors.text.primary,
        letterSpacing: 2,
    },
    subtitle: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.sm,
        color: colors.text.tertiary,
        marginTop: spacing[0.5],
    },

    // View Toggle
    viewToggle: {
        flexDirection: 'row',
        backgroundColor: colors.background.secondary,
        borderRadius: borders.radius.full,
        padding: spacing[0.5],
    },
    toggleButton: {
        paddingVertical: spacing[1.5],
        paddingHorizontal: spacing[3],
        borderRadius: borders.radius.full,
    },
    toggleButtonActive: {
        backgroundColor: colors.primary[600],
    },
    toggleText: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.xs,
        color: colors.text.muted,
        fontWeight: typography.fontWeight.medium as any,
    },
    toggleTextActive: {
        color: colors.text.primary,
    },

    // Stats Panel
    statsPanel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background.secondary,
        marginHorizontal: spacing[4],
        borderRadius: borders.radius.xl,
        padding: spacing[4],
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold as any,
        color: colors.text.primary,
    },
    statLabel: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        marginTop: spacing[0.5],
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: colors.border.default,
        marginHorizontal: spacing[4],
    },

    // Map Container
    mapContainer: {
        flex: 1,
        marginTop: spacing[4],
        position: 'relative',
        overflow: 'hidden',
    },
    oceanBackground: {
        ...StyleSheet.absoluteFillObject,
    },
    starsContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    star: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        borderRadius: borders.radius.full,
    },

    // Continent Node
    continentNode: {
        position: 'absolute',
        alignItems: 'center',
    },
    continentTouchable: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressRing: {
        position: 'absolute',
    },
    continentInner: {
        borderRadius: borders.radius.full,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    continentEmoji: {
        fontSize: 24,
    },
    unexploredBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        width: 20,
        height: 20,
        borderRadius: borders.radius.full,
        backgroundColor: colors.text.muted,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unexploredText: {
        fontFamily: typography.fontFamily.display,
        fontSize: 12,
        color: colors.text.primary,
        fontWeight: typography.fontWeight.bold as any,
    },
    completedBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        width: 20,
        height: 20,
        borderRadius: borders.radius.full,
        backgroundColor: colors.success[500],
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedText: {
        fontSize: 12,
        color: colors.text.primary,
    },
    continentLabel: {
        marginTop: spacing[1],
        alignItems: 'center',
    },
    continentName: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.xs,
        color: colors.text.primary,
        fontWeight: typography.fontWeight.medium as any,
    },
    continentProgress: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.bold as any,
    },

    // Zoom Indicator
    zoomIndicator: {
        position: 'absolute',
        bottom: spacing[4],
        right: spacing[4],
        flexDirection: 'row',
        gap: spacing[1],
    },
    zoomDot: {
        width: 8,
        height: 8,
        borderRadius: borders.radius.full,
        backgroundColor: colors.background.tertiary,
    },
    zoomDotActive: {
        backgroundColor: colors.primary[500],
    },

    // Legend
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing[6],
        padding: spacing[4],
        paddingBottom: spacing[8],
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[2],
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: borders.radius.full,
    },
    legendText: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
    },
});

export default WorldMapScreen;
