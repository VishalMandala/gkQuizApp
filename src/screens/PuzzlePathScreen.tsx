/**
 * Global Quest - Puzzle Path Screen
 * Visual journey from Level 1 to Level 1000
 * Shows a scrollable path with milestones, unlocks, and current progress
 */

import React, { useEffect, useRef, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
    getLevelTitle,
    getLevelTier,
    getTierColor,
    getTierBadge,
    getMilestoneUnlocks,
    calculateTotalXPForLevel,
} from '../data/levels';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
    bg: { deep: '#030712', card: '#111d32', cardLight: '#1a2942' },
    accent: { indigo: '#6366F1', purple: '#8B5CF6', gold: '#FBBF24', green: '#10B981', cyan: '#06B6D4' },
    text: { white: '#FFF', primary: '#F1F5F9', secondary: '#CBD5E1', muted: '#64748B' },
};

// ============================================================================
// MOCK USER DATA (Replace with actual user context later)
// ============================================================================

const mockUser = {
    currentLevel: 47,
    totalXP: 8500,
};

// ============================================================================
// MILESTONE NODE COMPONENT
// ============================================================================

interface MilestoneNodeProps {
    level: number;
    currentLevel: number;
    isOnPath: boolean;
    index: number;
}

const MilestoneNode: React.FC<MilestoneNodeProps> = ({ level, currentLevel, isOnPath, index }) => {
    const navigation = useNavigation();
    const isPast = level < currentLevel;
    const isCurrent = level === currentLevel;
    const isFuture = level > currentLevel;
    const unlocks = getMilestoneUnlocks(level);
    const tier = getLevelTier(level);
    const tierColor = getTierColor(tier);
    const tierBadge = getTierBadge(tier);

    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            tension: 80,
            delay: index * 50,
            useNativeDriver: true,
        }).start();
    }, []);

    const handlePress = () => {
        if (isPast || isCurrent) {
            // Navigate to quiz for this level range
            (navigation as any).navigate('Question', { level });
        }
    };

    // Determine node size based on milestone importance
    const isMajorMilestone = level % 100 === 0;
    const isMinorMilestone = level % 25 === 0;
    const nodeSize = isMajorMilestone ? 80 : isMinorMilestone ? 65 : 50;

    return (
        <Animated.View
            style={[
                styles.milestoneContainer,
                { transform: [{ scale: scaleAnim }] },
                isOnPath && (index % 2 === 0 ? styles.leftNode : styles.rightNode),
            ]}
        >
            <TouchableOpacity
                onPress={handlePress}
                disabled={isFuture}
                activeOpacity={0.8}
                style={styles.nodeTouchable}
            >
                {/* Glow for current level */}
                {isCurrent && (
                    <View style={[styles.currentGlow, { backgroundColor: tierColor }]} />
                )}

                {/* Main node circle */}
                <LinearGradient
                    colors={
                        isFuture
                            ? ['#374151', '#1f2937']
                            : isPast
                                ? [`${tierColor}80`, `${tierColor}40`]
                                : [tierColor, `${tierColor}CC`]
                    }
                    style={[
                        styles.nodeCircle,
                        {
                            width: nodeSize,
                            height: nodeSize,
                            borderRadius: nodeSize / 2,
                            borderColor: isCurrent ? tierColor : isFuture ? '#4b5563' : `${tierColor}60`,
                        },
                    ]}
                >
                    <Text style={[styles.nodeLevel, { fontSize: isMajorMilestone ? 22 : 16 }]}>
                        {isFuture ? '🔒' : level}
                    </Text>
                </LinearGradient>

                {/* Level info */}
                <View style={styles.nodeInfo}>
                    <Text style={[styles.nodeTitle, { color: isFuture ? colors.text.muted : tierColor }]}>
                        {getLevelTitle(level)}
                    </Text>
                    {unlocks.length > 0 && (
                        <View style={styles.unlocksRow}>
                            {unlocks.slice(0, 3).map((unlock, i) => (
                                <Text key={i} style={styles.unlockIcon}>{unlock.icon}</Text>
                            ))}
                        </View>
                    )}
                </View>

                {/* Tier badge for major milestones */}
                {isMajorMilestone && (
                    <View style={[styles.tierBadge, { backgroundColor: `${tierColor}30`, borderColor: tierColor }]}>
                        <Text style={styles.tierBadgeText}>{tierBadge} {tier}</Text>
                    </View>
                )}

                {/* Current level indicator */}
                {isCurrent && (
                    <View style={[styles.youAreHere, { backgroundColor: tierColor }]}>
                        <Text style={styles.youAreHereText}>YOU</Text>
                    </View>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

// ============================================================================
// PATH CONNECTOR
// ============================================================================

const PathConnector: React.FC<{ from: number; to: number; currentLevel: number }> = ({ from, to, currentLevel }) => {
    const isPast = to <= currentLevel;
    const tier = getLevelTier(to);
    const tierColor = getTierColor(tier);

    return (
        <View style={styles.pathConnector}>
            <LinearGradient
                colors={isPast ? [tierColor, `${tierColor}60`] : ['#374151', '#1f2937']}
                style={styles.pathLine}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            {/* Dots along the path */}
            {[0.25, 0.5, 0.75].map((pos, i) => (
                <View
                    key={i}
                    style={[
                        styles.pathDot,
                        { left: `${pos * 100}%`, backgroundColor: isPast ? tierColor : '#374151' },
                    ]}
                />
            ))}
        </View>
    );
};

// ============================================================================
// HEADER COMPONENT
// ============================================================================

const Header: React.FC<{ level: number; xp: number }> = ({ level, xp }) => {
    const tier = getLevelTier(level);
    const tierColor = getTierColor(tier);
    const tierBadge = getTierBadge(tier);
    const title = getLevelTitle(level);
    const xpForNext = calculateTotalXPForLevel(level + 1);
    const xpProgress = Math.min((xp / xpForNext) * 100, 100);

    return (
        <View style={styles.header}>
            <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.headerCard}>
                <View style={styles.headerTop}>
                    <View style={styles.levelBadge}>
                        <Text style={styles.levelBadgeEmoji}>{tierBadge}</Text>
                        <Text style={[styles.levelNumber, { color: tierColor }]}>Level {level}</Text>
                    </View>
                    <View style={styles.xpContainer}>
                        <Text style={styles.xpText}>{xp.toLocaleString()} XP</Text>
                        <Text style={styles.xpNext}>/ {xpForNext.toLocaleString()}</Text>
                    </View>
                </View>
                <Text style={styles.headerTitle}>{title}</Text>
                <View style={styles.progressBar}>
                    <LinearGradient
                        colors={[tierColor, `${tierColor}80`]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.progressFill, { width: `${xpProgress}%` }]}
                    />
                </View>
                <Text style={styles.progressText}>
                    {Math.floor(xpProgress)}% to Level {level + 1}
                </Text>
            </LinearGradient>
        </View>
    );
};

// ============================================================================
// MAIN SCREEN
// ============================================================================

const PuzzlePathScreen: React.FC = () => {
    const { currentLevel, totalXP } = mockUser;

    // Generate milestone levels to display (every 25 levels + current)
    const milestones = useMemo(() => {
        const levels: number[] = [];
        // Add multiples of 25 up to 1000
        for (let i = 25; i <= 1000; i += 25) {
            levels.push(i);
        }
        // Add special early milestones
        [1, 5, 10, 15, 20].forEach(l => {
            if (!levels.includes(l)) levels.push(l);
        });
        // Add current level if not already
        if (!levels.includes(currentLevel)) levels.push(currentLevel);
        return levels.sort((a, b) => a - b);
    }, [currentLevel]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#030712', '#0a1628', '#111d32', '#0a1628']}
                style={StyleSheet.absoluteFill}
            />

            {/* Ambient glow orbs */}
            <View style={[styles.glowOrb, { top: '5%', right: '-10%', backgroundColor: colors.accent.purple }]} />
            <View style={[styles.glowOrb, { top: '50%', left: '-15%', backgroundColor: colors.accent.indigo }]} />
            <View style={[styles.glowOrb, { bottom: '20%', right: '-10%', backgroundColor: colors.accent.gold }]} />

            <SafeAreaView style={styles.safeArea}>
                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.screenTitle}>🧩 Puzzle Journey</Text>
                    <Text style={styles.screenSubtitle}>1000 Levels of Knowledge</Text>
                </View>

                {/* Current Level Card */}
                <Header level={currentLevel} xp={totalXP} />

                {/* Scrollable Path */}
                <ScrollView
                    style={styles.pathScroll}
                    contentContainerStyle={styles.pathContent}
                    showsVerticalScrollIndicator={false}
                >
                    {milestones.map((level, index) => (
                        <React.Fragment key={level}>
                            <MilestoneNode
                                level={level}
                                currentLevel={currentLevel}
                                isOnPath={true}
                                index={index}
                            />
                            {index < milestones.length - 1 && (
                                <PathConnector
                                    from={level}
                                    to={milestones[index + 1]}
                                    currentLevel={currentLevel}
                                />
                            )}
                        </React.Fragment>
                    ))}

                    {/* Final destination */}
                    <View style={styles.finalDestination}>
                        <Text style={styles.finalEmoji}>🌟</Text>
                        <Text style={styles.finalTitle}>The Infinite One</Text>
                        <Text style={styles.finalSubtitle}>Level 1000 - Ultimate Mastery</Text>
                    </View>
                </ScrollView>
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
    glowOrb: { position: 'absolute', width: 200, height: 200, borderRadius: 100, opacity: 0.15 },

    titleContainer: { alignItems: 'center', paddingVertical: 16 },
    screenTitle: { fontSize: 28, fontWeight: '800', color: colors.text.white },
    screenSubtitle: { fontSize: 14, color: colors.text.muted, marginTop: 4 },

    header: { paddingHorizontal: 16, marginBottom: 16 },
    headerCard: { padding: 20, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    levelBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    levelBadgeEmoji: { fontSize: 28 },
    levelNumber: { fontSize: 20, fontWeight: '800' },
    xpContainer: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
    xpText: { fontSize: 18, fontWeight: '700', color: colors.accent.gold },
    xpNext: { fontSize: 12, color: colors.text.muted },
    headerTitle: { fontSize: 16, color: colors.text.primary, fontWeight: '600', marginBottom: 12 },
    progressBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 4 },
    progressText: { fontSize: 12, color: colors.text.muted, marginTop: 8, textAlign: 'center' },

    pathScroll: { flex: 1 },
    pathContent: { paddingHorizontal: 24, paddingBottom: 120 },

    milestoneContainer: { alignItems: 'center', marginVertical: 8 },
    leftNode: { alignSelf: 'flex-start', marginLeft: 20 },
    rightNode: { alignSelf: 'flex-end', marginRight: 20 },
    nodeTouchable: { alignItems: 'center' },
    currentGlow: { position: 'absolute', width: 100, height: 100, borderRadius: 50, opacity: 0.3 },
    nodeCircle: { justifyContent: 'center', alignItems: 'center', borderWidth: 3 },
    nodeLevel: { fontWeight: '800', color: colors.text.white },
    nodeInfo: { alignItems: 'center', marginTop: 8 },
    nodeTitle: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
    unlocksRow: { flexDirection: 'row', gap: 4, marginTop: 4 },
    unlockIcon: { fontSize: 14 },
    tierBadge: { marginTop: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1 },
    tierBadgeText: { fontSize: 10, fontWeight: '700', color: colors.text.white },
    youAreHere: { position: 'absolute', top: -20, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
    youAreHereText: { fontSize: 10, fontWeight: '800', color: '#fff' },

    pathConnector: { position: 'relative', height: 40, marginVertical: 4 },
    pathLine: { position: 'absolute', left: '35%', right: '35%', height: 4, borderRadius: 2, top: 18 },
    pathDot: { position: 'absolute', width: 8, height: 8, borderRadius: 4, top: 16 },

    finalDestination: { alignItems: 'center', marginTop: 40, paddingVertical: 30 },
    finalEmoji: { fontSize: 60 },
    finalTitle: { fontSize: 24, fontWeight: '800', color: colors.accent.gold, marginTop: 16 },
    finalSubtitle: { fontSize: 14, color: colors.text.muted, marginTop: 4 },
});

export default PuzzlePathScreen;
