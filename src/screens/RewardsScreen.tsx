/**
 * Global Quest - Premium Rewards Screen V2
 * Matching Gemini 3 Pro mockup exactly
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
    bg: { deep: '#030712', card: '#111d32', cardLight: '#1a2942', glass: 'rgba(17, 24, 39, 0.9)' },
    accent: {
        indigo: '#6366F1',
        purple: '#8B5CF6',
        gold: '#FBBF24',
        goldDark: '#D97706',
        green: '#10B981',
        red: '#EF4444',
    },
    text: { white: '#FFF', primary: '#F1F5F9', secondary: '#CBD5E1', muted: '#64748B' },
    rarity: { common: '#9CA3AF', rare: '#60A5FA', epic: '#A78BFA', legendary: '#FBBF24' },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const achievements = [
    { id: '1', name: 'First Steps', desc: 'Complete your first quest.', icon: '👣', progress: 100, unlocked: true, xp: 50 },
    { id: '2', name: 'Week Warrior', desc: 'Log in and play for 7 consecutive days.', icon: '🔥', progress: 100, unlocked: true, xp: 200 },
    { id: '3', name: 'Africa Explorer', desc: 'Master all quizzes about the African continent.', icon: '🦁', progress: 100, unlocked: true, xp: 300 },
    { id: '4', name: 'Month Master', desc: 'Achieve a 30-day login streak.', icon: '👑', progress: 40, unlocked: false, xp: 500, progressLabel: '12/30 days' },
    { id: '5', name: 'Century Club', desc: 'Reach level 100.', icon: '💯', progress: 72, unlocked: false, xp: 400, progressLabel: 'Level 72/100' },
    { id: '6', name: 'Speed Demon', desc: 'Complete 10 quizzes in under 60 seconds each.', icon: '⚡', progress: 30, unlocked: false, xp: 350, progressLabel: '3/10 quizzes' },
];

const artifacts = [
    { id: '1', name: 'Golden Mask', icon: '🎭', rarity: 'legendary', owned: true, equipped: true },
    { id: '2', name: 'Jade Dragon', icon: '🐉', rarity: 'epic', owned: true, equipped: false },
    { id: '3', name: 'Viking Helm', icon: '⚔️', rarity: 'rare', owned: false, progress: 64 },
    { id: '4', name: 'Eagle Feather', icon: '🦅', rarity: 'epic', owned: false, progress: 28 },
    { id: '5', name: 'Ice Crystal', icon: '❄️', rarity: 'legendary', owned: false, progress: 0 },
    { id: '6', name: 'Orb of Knowledge', icon: '🔮', rarity: 'legendary', owned: false, progress: 45 },
];

// ============================================================================
// ANIMATION HOOKS
// ============================================================================

const useEntranceAnimation = (delay: number = 0) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { opacity, translateY };
};

const useStaggeredAnimation = (index: number) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;
    const scale = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(200 + index * 60),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 350, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, friction: 6, tension: 100, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { opacity, translateY, scale };
};

// Pulse animation for XP coins - creates excitement
const usePulseAnimation = () => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, { toValue: 1.08, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(scale, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, []);

    return scale;
};

// Press scale animation for tactile feedback
const usePressAnimation = () => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scale, { toValue: 0.96, friction: 8, tension: 200, useNativeDriver: true }).start();
    };

    const onPressOut = () => {
        Animated.spring(scale, { toValue: 1, friction: 6, tension: 150, useNativeDriver: true }).start();
    };

    return { scale, onPressIn, onPressOut };
};

// Icon bounce for unlocked achievements - celebration effect
const useIconBounce = (isUnlocked: boolean) => {
    const scale = useRef(new Animated.Value(1)).current;
    const rotate = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isUnlocked) {
            const bounce = Animated.loop(
                Animated.sequence([
                    Animated.delay(2000), // Wait before bouncing
                    Animated.parallel([
                        Animated.sequence([
                            Animated.spring(scale, { toValue: 1.2, friction: 3, tension: 300, useNativeDriver: true }),
                            Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
                        ]),
                        Animated.sequence([
                            Animated.timing(rotate, { toValue: 1, duration: 100, useNativeDriver: true }),
                            Animated.timing(rotate, { toValue: -1, duration: 100, useNativeDriver: true }),
                            Animated.timing(rotate, { toValue: 0, duration: 100, useNativeDriver: true }),
                        ]),
                    ]),
                ])
            );
            bounce.start();
            return () => bounce.stop();
        }
    }, [isUnlocked]);

    const rotateInterpolate = rotate.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['-5deg', '0deg', '5deg'],
    });

    return { scale, rotate: rotateInterpolate };
};

// Shimmer animation for gold elements
const useShimmer = () => {
    const shimmer = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(shimmer, { toValue: 1, duration: 2000, easing: Easing.linear, useNativeDriver: true }),
                Animated.delay(1000),
                Animated.timing(shimmer, { toValue: 0, duration: 0, useNativeDriver: true }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, []);

    return shimmer;
};

// Animated progress bar fill
const useProgressAnimation = (targetProgress: number, delay: number = 0) => {
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay + 400),
            Animated.timing(progress, {
                toValue: targetProgress,
                duration: 800,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: false, // width animation requires this
            }),
        ]).start();
    }, [targetProgress, delay]);

    return progress;
};

// ============================================================================
// COMPONENTS
// ============================================================================

type TabType = 'achievements' | 'artifacts';

// Header matching mockup
const Header: React.FC<{ unlockedCount: number; ownedCount: number }> = ({ unlockedCount, ownedCount }) => {
    const { opacity, translateY } = useEntranceAnimation(50);

    return (
        <Animated.View style={[styles.header, { opacity, transform: [{ translateY }] }]}>
            <Text style={styles.headerTitle}>Rewards</Text>
            <View style={styles.headerBadges}>
                <View style={styles.badgeGold}>
                    <Text style={styles.badgeText}>🏆 {unlockedCount}/{achievements.length}</Text>
                </View>
                <View style={styles.badgeGold}>
                    <Text style={styles.badgeText}>✨ {ownedCount}/{artifacts.length}</Text>
                </View>
            </View>
        </Animated.View>
    );
};

// Total XP Summary - shows total earned XP with celebration
const TotalXPSummary: React.FC = () => {
    const { opacity, translateY } = useEntranceAnimation(75);
    const pulseScale = usePulseAnimation();
    const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);
    const [displayXP, setDisplayXP] = useState(0);

    // Animate the XP count up
    useEffect(() => {
        const duration = 1500;
        const steps = 30;
        const increment = totalXP / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= totalXP) {
                setDisplayXP(totalXP);
                clearInterval(timer);
            } else {
                setDisplayXP(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [totalXP]);

    return (
        <Animated.View style={[styles.xpSummary, { opacity, transform: [{ translateY }] }]}>
            <LinearGradient
                colors={['rgba(251, 191, 36, 0.15)', 'rgba(217, 119, 6, 0.1)']}
                style={styles.xpSummaryInner}
            >
                <View style={styles.xpSummaryLeft}>
                    <Text style={styles.xpSummaryLabel}>Total XP Earned</Text>
                    <Text style={styles.xpSummaryValue}>{displayXP.toLocaleString()}</Text>
                </View>
                <Animated.View style={{ transform: [{ scale: pulseScale }] }}>
                    <LinearGradient colors={['#FBBF24', '#F59E0B', '#D97706']} style={styles.xpSummaryCoin}>
                        <Text style={styles.xpSummaryCoinText}>⭐</Text>
                    </LinearGradient>
                </Animated.View>
            </LinearGradient>
        </Animated.View>
    );
};

// Tab selector with gold active state
const TabSelector: React.FC<{ activeTab: TabType; onTabChange: (tab: TabType) => void }> = ({ activeTab, onTabChange }) => {
    const { opacity, translateY } = useEntranceAnimation(100);

    return (
        <Animated.View style={[styles.tabContainer, { opacity, transform: [{ translateY }] }]}>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'achievements' && styles.tabActive]}
                onPress={() => onTabChange('achievements')}
            >
                {activeTab === 'achievements' ? (
                    <LinearGradient colors={[colors.accent.gold, colors.accent.goldDark]} style={styles.tabActiveGradient}>
                        <Text style={styles.tabTextActive}>🏆 Achievements</Text>
                    </LinearGradient>
                ) : (
                    <Text style={styles.tabText}>🏆 Achievements</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'artifacts' && styles.tabActive]}
                onPress={() => onTabChange('artifacts')}
            >
                {activeTab === 'artifacts' ? (
                    <LinearGradient colors={[colors.accent.gold, colors.accent.goldDark]} style={styles.tabActiveGradient}>
                        <Text style={styles.tabTextActive}>✨ Artifacts</Text>
                    </LinearGradient>
                ) : (
                    <Text style={styles.tabText}>✨ Artifacts</Text>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

// Achievement Card - with interactive animations
const AchievementCard: React.FC<{ achievement: typeof achievements[0]; index: number }> = ({ achievement, index }) => {
    const { opacity, translateY, scale: entranceScale } = useStaggeredAnimation(index);
    const pulseScale = usePulseAnimation();
    const { scale: pressScale, onPressIn, onPressOut } = usePressAnimation();

    return (
        <Animated.View style={[
            styles.achievementCard,
            { opacity, transform: [{ translateY }, { scale: entranceScale }] }
        ]}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <Animated.View style={{ transform: [{ scale: pressScale }] }}>
                    <LinearGradient
                        colors={['rgba(17, 29, 50, 0.95)', 'rgba(26, 41, 66, 0.9)']}
                        style={styles.achievementCardInner}
                    >
                        {/* Icon with warm/gold tint for unlocked */}
                        <View style={[
                            styles.achievementIcon,
                            achievement.unlocked && styles.achievementIconUnlocked
                        ]}>
                            <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                            {achievement.unlocked && (
                                <View style={styles.checkBadge}>
                                    <Text style={styles.checkText}>✓</Text>
                                </View>
                            )}
                        </View>

                        {/* Info */}
                        <View style={styles.achievementInfo}>
                            <Text style={styles.achievementName}>{achievement.name}</Text>
                            <Text style={styles.achievementDesc} numberOfLines={2}>{achievement.desc}</Text>
                            {!achievement.unlocked && (
                                <View style={styles.progressContainer}>
                                    <View style={styles.progressTrack}>
                                        <LinearGradient
                                            colors={[colors.accent.gold, colors.accent.goldDark]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={[styles.progressFill, { width: `${achievement.progress}%` }]}
                                        />
                                    </View>
                                    <Text style={styles.progressLabel}>{achievement.progressLabel || `${achievement.progress}%`}</Text>
                                </View>
                            )}
                        </View>

                        {/* XP Coin Badge - pulsing for excitement */}
                        <Animated.View style={[styles.xpCoin, { transform: [{ scale: pulseScale }] }]}>
                            <LinearGradient colors={['#FBBF24', '#F59E0B', '#D97706']} style={styles.xpCoinInner}>
                                <Text style={styles.xpValue}>+{achievement.xp}</Text>
                                <Text style={styles.xpLabel}>XP</Text>
                            </LinearGradient>
                        </Animated.View>
                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
};

// Artifact Card - with interactive animations
const ArtifactCard: React.FC<{ artifact: typeof artifacts[0]; index: number }> = ({ artifact, index }) => {
    const { opacity, translateY, scale: entranceScale } = useStaggeredAnimation(index);
    const { scale: pressScale, onPressIn, onPressOut } = usePressAnimation();
    const rarityColor = colors.rarity[artifact.rarity as keyof typeof colors.rarity];

    return (
        <Animated.View style={[styles.artifactCard, { opacity, transform: [{ translateY }, { scale: entranceScale }] }]}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <Animated.View style={{ transform: [{ scale: pressScale }] }}>
                    <LinearGradient
                        colors={['rgba(17, 29, 50, 0.95)', 'rgba(26, 41, 66, 0.9)']}
                        style={[styles.artifactCardInner, artifact.owned && { borderColor: rarityColor, borderWidth: 2 }]}
                    >
                        <View style={[styles.artifactIconContainer, { backgroundColor: `${rarityColor}30` }]}>
                            <Text style={styles.artifactEmoji}>{artifact.icon}</Text>
                        </View>
                        <Text style={styles.artifactName}>{artifact.name}</Text>
                        <Text style={[styles.artifactRarity, { color: rarityColor }]}>{artifact.rarity.toUpperCase()}</Text>

                        {!artifact.owned && artifact.progress !== undefined && (
                            <View style={styles.artifactProgressContainer}>
                                <View style={styles.artifactProgressTrack}>
                                    <View style={[styles.artifactProgressFill, { width: `${artifact.progress}%`, backgroundColor: rarityColor }]} />
                                </View>
                                <Text style={styles.artifactProgressText}>{artifact.progress}%</Text>
                            </View>
                        )}

                        {artifact.equipped && <Text style={styles.equippedText}>EQUIPPED</Text>}
                        {artifact.owned && !artifact.equipped && (
                            <TouchableOpacity style={[styles.equipBtn, { backgroundColor: rarityColor }]}>
                                <Text style={styles.equipBtnText}>EQUIP</Text>
                            </TouchableOpacity>
                        )}
                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const RewardsScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('achievements');
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const ownedCount = artifacts.filter(a => a.owned).length;

    return (
        <View style={styles.container}>
            {/* Background */}
            <LinearGradient colors={['#030712', '#0a1628', '#111d32']} style={StyleSheet.absoluteFill} />
            <View style={[styles.glowOrb, styles.glowOrbTop]} />
            <View style={[styles.glowOrb, styles.glowOrbBottom]} />

            <SafeAreaView style={styles.safeArea} edges={[]}>
                <Header unlockedCount={unlockedCount} ownedCount={ownedCount} />
                <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

                <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {activeTab === 'achievements' && (
                        <>
                            <TotalXPSummary />
                            <View style={styles.list}>
                                {achievements.map((a, i) => <AchievementCard key={a.id} achievement={a} index={i} />)}
                            </View>
                        </>
                    )}
                    {activeTab === 'artifacts' && (
                        <View style={styles.artifactsGrid}>
                            {artifacts.map((a, i) => <ArtifactCard key={a.id} artifact={a} index={i} />)}
                        </View>
                    )}
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
    scroll: { flex: 1 },
    content: { paddingHorizontal: 16, paddingTop: 0, paddingBottom: 120 },
    glowOrb: { position: 'absolute', width: 250, height: 250, borderRadius: 125, opacity: 0.12 },
    glowOrbTop: { top: '10%', right: '-5%', backgroundColor: colors.accent.gold },
    glowOrbBottom: { bottom: '20%', left: '-10%', backgroundColor: colors.accent.purple },

    // Header - matching mockup
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 2 },
    headerTitle: { fontSize: 22, fontWeight: '800', color: colors.text.white },
    headerBadges: { flexDirection: 'row', gap: 8 },
    badgeGold: {
        backgroundColor: 'rgba(251, 191, 36, 0.25)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(251, 191, 36, 0.4)',
    },
    badgeText: { fontSize: 12, color: colors.accent.gold, fontWeight: '700' },

    // Tab selector - gold active state
    tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 2, paddingBottom: 4, gap: 8 },
    tab: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    tabActive: { borderColor: colors.accent.gold },
    tabActiveGradient: {
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 20,
    },
    tabText: { fontSize: 13, color: colors.text.muted, fontWeight: '600', textAlign: 'center', paddingVertical: 10 },
    tabTextActive: { fontSize: 13, color: '#1A1A1A', fontWeight: '700' },

    // Achievement list - tight spacing
    list: { gap: 6 },
    achievementCard: { borderRadius: 14, overflow: 'hidden' },
    achievementCardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    achievementIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        position: 'relative',
    },
    achievementIconUnlocked: { backgroundColor: 'rgba(16, 185, 129, 0.25)' },
    achievementEmoji: { fontSize: 24 },
    checkBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: colors.accent.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#111d32',
    },
    checkText: { fontSize: 10, color: colors.text.white, fontWeight: '800' },
    achievementInfo: { flex: 1 },
    achievementName: { fontSize: 15, fontWeight: '700', color: colors.text.white },
    achievementDesc: { fontSize: 11, color: colors.text.muted, marginTop: 2, lineHeight: 14 },
    progressContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 8 },
    progressTrack: { flex: 1, height: 5, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 3 },
    progressLabel: { fontSize: 10, color: colors.text.muted, fontWeight: '600', minWidth: 55, textAlign: 'right' },

    // XP Coin - circular like mockup
    xpCoin: { marginLeft: 10 },
    xpCoinInner: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    xpValue: { fontSize: 13, fontWeight: '800', color: '#1A1A1A' },
    xpLabel: { fontSize: 9, fontWeight: '700', color: '#1A1A1A', marginTop: -2 },

    // Artifacts grid
    artifactsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    artifactCard: { width: (SCREEN_WIDTH - 32 - 10) / 2, borderRadius: 14, overflow: 'hidden' },
    artifactCardInner: { padding: 14, alignItems: 'center', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    artifactIconContainer: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    artifactEmoji: { fontSize: 30 },
    artifactName: { fontSize: 13, fontWeight: '700', color: colors.text.white, textAlign: 'center' },
    artifactRarity: { fontSize: 9, fontWeight: '700', letterSpacing: 1, marginTop: 2 },
    artifactProgressContainer: { width: '100%', marginTop: 10 },
    artifactProgressTrack: { height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' },
    artifactProgressFill: { height: '100%', borderRadius: 2 },
    artifactProgressText: { fontSize: 9, color: colors.text.muted, textAlign: 'center', marginTop: 4 },
    equippedText: { fontSize: 9, fontWeight: '700', color: colors.accent.green, marginTop: 10 },
    equipBtn: { marginTop: 10, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8 },
    equipBtnText: { fontSize: 10, fontWeight: '700', color: '#1A1A1A' },

    // Total XP Summary
    xpSummary: { marginBottom: 10 },
    xpSummaryInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(251, 191, 36, 0.3)',
    },
    xpSummaryLeft: {},
    xpSummaryLabel: { fontSize: 12, color: colors.accent.gold, fontWeight: '600' },
    xpSummaryValue: { fontSize: 28, color: colors.text.white, fontWeight: '800' },
    xpSummaryCoin: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    xpSummaryCoinText: { fontSize: 22 },
});

export default RewardsScreen;
