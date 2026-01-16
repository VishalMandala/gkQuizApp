/**
 * Global Quest - Puzzle Path Screen
 * Premium Visual Journey from Level 1 to Level 1000
 * Features: Animated path, pulsing nodes, floating particles, staggered reveals
 */

import React, { useEffect, useRef, useMemo, useState } from 'react';
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
import Svg, { Path, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import {
    getLevelTitle,
    getLevelTier,
    getTierColor,
    getTierBadge,
    getMilestoneUnlocks,
    calculateTotalXPForLevel,
    calculateXPForLevel,
} from '../data/levels';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
    bg: { deep: '#030712', card: '#111d32', cardLight: '#1a2942' },
    accent: {
        indigo: '#6366F1', purple: '#8B5CF6', gold: '#FBBF24',
        green: '#10B981', cyan: '#06B6D4', pink: '#EC4899',
        orange: '#F59E0B', red: '#EF4444'
    },
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
// FLOATING PARTICLE ANIMATION
// ============================================================================

const FloatingParticle: React.FC<{ delay: number; size: number; color: string; leftPercent: number }> = ({
    delay, size, color, leftPercent
}) => {
    const floatAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startAnimation = () => {
            floatAnim.setValue(0);
            opacityAnim.setValue(0);

            Animated.sequence([
                Animated.delay(delay),
                Animated.parallel([
                    Animated.timing(floatAnim, {
                        toValue: 1,
                        duration: 4000 + Math.random() * 2000,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                    Animated.sequence([
                        Animated.timing(opacityAnim, {
                            toValue: 1,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                        Animated.delay(2000),
                        Animated.timing(opacityAnim, {
                            toValue: 0,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                    ]),
                ]),
            ]).start(() => startAnimation());
        };
        startAnimation();
    }, []);

    const translateY = floatAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, -SCREEN_HEIGHT],
    });

    const translateX = floatAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 20, -10],
    });

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: `${leftPercent}%` as any,
                bottom: 0,
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: color,
                opacity: opacityAnim,
                transform: [{ translateY }, { translateX }],
            }}
        />
    );
};

// ============================================================================
// PULSING GLOW COMPONENT
// ============================================================================

const PulsingGlow: React.FC<{ color: string; size: number }> = ({ color, size }) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.3,
                    duration: 1500,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = pulseAnim.interpolate({
        inputRange: [1, 1.3],
        outputRange: [0.4, 0.15],
    });

    return (
        <Animated.View
            style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: color,
                opacity,
                transform: [{ scale: pulseAnim }],
            }}
        />
    );
};

// ============================================================================
// MILESTONE NODE COMPONENT
// ============================================================================

interface MilestoneNodeProps {
    level: number;
    currentLevel: number;
    index: number;
    totalNodes: number;
}

const MilestoneNode: React.FC<MilestoneNodeProps> = ({ level, currentLevel, index, totalNodes }) => {
    const navigation = useNavigation();
    const isPast = level < currentLevel;
    const isCurrent = level === currentLevel;
    const isFuture = level > currentLevel;
    const unlocks = getMilestoneUnlocks(level);
    const tier = getLevelTier(level);
    const tierColor = getTierColor(tier);
    const tierBadge = getTierBadge(tier);

    const scaleAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const bounceAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Staggered entrance animation
        Animated.sequence([
            Animated.delay(index * 80),
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 5,
                    tension: 60,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 600,
                    easing: Easing.out(Easing.back(1.5)),
                    useNativeDriver: true,
                }),
            ]),
        ]).start();

        // Continuous bounce for current level
        if (isCurrent) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(bounceAnim, {
                        toValue: -8,
                        duration: 800,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                    Animated.timing(bounceAnim, {
                        toValue: 0,
                        duration: 800,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, [isCurrent]);

    const handlePress = () => {
        if (isPast || isCurrent) {
            (navigation as any).navigate('Question', { level });
        }
    };

    // Node sizing based on milestone importance
    const isMajorMilestone = level % 100 === 0;
    const isMinorMilestone = level % 50 === 0 && !isMajorMilestone;
    const isTinyMilestone = level % 25 === 0 && !isMinorMilestone && !isMajorMilestone;

    const nodeSize = isMajorMilestone ? 85 : isMinorMilestone ? 70 : isTinyMilestone ? 55 : 45;
    const glowSize = nodeSize * 2;

    // Alternating position for visual interest (snake path effect)
    const isLeft = index % 4 < 2;
    const offset = isLeft ? -40 : 40;

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View
            style={[
                styles.milestoneContainer,
                {
                    transform: [
                        { scale: scaleAnim },
                        { translateX: offset },
                        { translateY: bounceAnim },
                    ],
                },
            ]}
        >
            <TouchableOpacity
                onPress={handlePress}
                disabled={isFuture}
                activeOpacity={0.8}
                style={styles.nodeTouchable}
            >
                {/* Pulsing glow for current level */}
                {isCurrent && <PulsingGlow color={tierColor} size={glowSize} />}

                {/* Outer ring for unlocked nodes */}
                {!isFuture && (
                    <View
                        style={[
                            styles.outerRing,
                            {
                                width: nodeSize + 12,
                                height: nodeSize + 12,
                                borderRadius: (nodeSize + 12) / 2,
                                borderColor: tierColor,
                                opacity: isPast ? 0.5 : 1,
                            }
                        ]}
                    />
                )}

                {/* Main node circle */}
                <Animated.View
                    style={[
                        styles.nodeWrapper,
                        isCurrent && { transform: [{ rotate: rotateInterpolate }] },
                    ]}
                >
                    <LinearGradient
                        colors={
                            isFuture
                                ? ['#374151', '#1f2937']
                                : isPast
                                    ? [`${tierColor}90`, `${tierColor}50`]
                                    : [tierColor, `${tierColor}DD`]
                        }
                        style={[
                            styles.nodeCircle,
                            {
                                width: nodeSize,
                                height: nodeSize,
                                borderRadius: nodeSize / 2,
                                borderColor: isCurrent ? '#fff' : isFuture ? '#4b5563' : `${tierColor}80`,
                                shadowColor: tierColor,
                                shadowOpacity: isCurrent ? 0.8 : 0.3,
                                shadowRadius: isCurrent ? 15 : 5,
                            },
                        ]}
                    >
                        {/* Star burst for milestones */}
                        {isMajorMilestone && !isFuture && (
                            <View style={styles.starBurst}>
                                <Text style={styles.starBurstText}>★</Text>
                            </View>
                        )}

                        <Text style={[
                            styles.nodeLevel,
                            {
                                fontSize: isMajorMilestone ? 24 : isMinorMilestone ? 18 : 14,
                                color: isFuture ? '#9ca3af' : '#fff',
                            }
                        ]}>
                            {isFuture ? '🔒' : level}
                        </Text>
                    </LinearGradient>
                </Animated.View>

                {/* Level info */}
                <View style={styles.nodeInfo}>
                    <Text style={[
                        styles.nodeTitle,
                        {
                            color: isFuture ? colors.text.muted : colors.text.primary,
                            fontSize: isMajorMilestone ? 13 : 11,
                            fontWeight: isMajorMilestone ? '800' : '600',
                        }
                    ]}>
                        {isMajorMilestone ? getLevelTitle(level) : `Level ${level}`}
                    </Text>

                    {/* Unlock icons */}
                    {unlocks.length > 0 && (
                        <View style={styles.unlocksRow}>
                            {unlocks.slice(0, 4).map((unlock, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.unlockBubble,
                                        { backgroundColor: isFuture ? '#374151' : `${tierColor}40` }
                                    ]}
                                >
                                    <Text style={styles.unlockIcon}>{unlock.icon}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Tier badge for century milestones */}
                {isMajorMilestone && (
                    <LinearGradient
                        colors={[tierColor, `${tierColor}CC`]}
                        style={styles.tierBadge}
                    >
                        <Text style={styles.tierBadgeEmoji}>{tierBadge}</Text>
                        <Text style={styles.tierBadgeText}>{tier}</Text>
                    </LinearGradient>
                )}

                {/* Current level sparkle indicator */}
                {isCurrent && (
                    <View style={[styles.youAreHere, { backgroundColor: colors.accent.gold }]}>
                        <Text style={styles.youAreHereText}>⚡ YOU</Text>
                    </View>
                )}

                {/* Checkmark for completed */}
                {isPast && (
                    <View style={[styles.checkmark, { backgroundColor: colors.accent.green }]}>
                        <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

// ============================================================================
// ANIMATED PATH LINE
// ============================================================================

const AnimatedPathLine: React.FC<{
    fromLevel: number;
    toLevel: number;
    currentLevel: number;
    index: number;
}> = ({ fromLevel, toLevel, currentLevel, index }) => {
    const isPast = toLevel <= currentLevel;
    const isCurrent = fromLevel <= currentLevel && toLevel > currentLevel;
    const tier = getLevelTier(toLevel);
    const tierColor = getTierColor(tier);

    const widthAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(index * 80 + 200),
            Animated.timing(widthAnim, {
                toValue: 1,
                duration: 400,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: false,
            }),
        ]).start();
    }, []);

    const isLeft = index % 4 < 2;

    return (
        <View style={styles.pathLineContainer}>
            <Animated.View
                style={[
                    styles.pathLine,
                    {
                        backgroundColor: isPast ? tierColor : isCurrent ? `${tierColor}80` : '#374151',
                        width: widthAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '60%'],
                        }),
                        alignSelf: isLeft ? 'flex-start' : 'flex-end',
                        marginLeft: isLeft ? 60 : 0,
                        marginRight: isLeft ? 0 : 60,
                    },
                ]}
            />
            {/* Glowing orb on path */}
            {(isPast || isCurrent) && (
                <View style={[
                    styles.pathOrb,
                    {
                        backgroundColor: tierColor,
                        left: isLeft ? '30%' : '50%',
                    }
                ]} />
            )}
        </View>
    );
};

// ============================================================================
// HEADER COMPONENT WITH ANIMATED XP
// ============================================================================

const Header: React.FC<{ level: number; xp: number }> = ({ level, xp }) => {
    const tier = getLevelTier(level);
    const tierColor = getTierColor(tier);
    const tierBadge = getTierBadge(tier);
    const title = getLevelTitle(level);
    const xpForCurrent = calculateTotalXPForLevel(level);
    const xpForNext = calculateTotalXPForLevel(level + 1);
    const xpNeeded = xpForNext - xpForCurrent;
    const xpInLevel = xp - xpForCurrent;
    const xpProgress = Math.min((xpInLevel / xpNeeded) * 100, 100);

    const progressAnim = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(progressAnim, {
                toValue: xpProgress,
                duration: 1500,
                delay: 500,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: false,
            }),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(glowAnim, {
                        toValue: 0,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ])
            ),
        ]).start();
    }, [xpProgress]);

    return (
        <View style={styles.header}>
            <LinearGradient
                colors={[colors.bg.card, colors.bg.cardLight]}
                style={styles.headerCard}
            >
                {/* Ambient glow */}
                <Animated.View
                    style={[
                        styles.headerGlow,
                        {
                            backgroundColor: tierColor,
                            opacity: glowAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.1, 0.25],
                            }),
                        }
                    ]}
                />

                <View style={styles.headerTop}>
                    <View style={styles.levelBadgeContainer}>
                        <LinearGradient
                            colors={[tierColor, `${tierColor}80`]}
                            style={styles.levelBadgeGradient}
                        >
                            <Text style={styles.levelBadgeEmoji}>{tierBadge}</Text>
                        </LinearGradient>
                        <View>
                            <Text style={[styles.levelNumber, { color: tierColor }]}>Level {level}</Text>
                            <Text style={styles.levelTier}>{tier}</Text>
                        </View>
                    </View>
                    <View style={styles.xpContainer}>
                        <Text style={styles.xpLabel}>Total XP</Text>
                        <Text style={styles.xpText}>{xp.toLocaleString()}</Text>
                    </View>
                </View>

                <Text style={styles.headerTitle}>{title}</Text>

                {/* Animated progress bar */}
                <View style={styles.progressBar}>
                    <Animated.View style={[styles.progressGlow, { backgroundColor: tierColor, opacity: 0.3 }]} />
                    <Animated.View
                        style={[
                            styles.progressFill,
                            {
                                backgroundColor: tierColor,
                                width: progressAnim.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ['0%', '100%'],
                                }),
                            },
                        ]}
                    />
                    <View style={styles.progressShine} />
                </View>

                <View style={styles.progressInfo}>
                    <Text style={styles.progressText}>
                        {xpInLevel.toLocaleString()} / {xpNeeded.toLocaleString()} XP
                    </Text>
                    <Text style={[styles.progressPercent, { color: tierColor }]}>
                        {Math.floor(xpProgress)}%
                    </Text>
                </View>

                {/* Next level preview */}
                <View style={styles.nextLevelPreview}>
                    <Text style={styles.nextLevelLabel}>Next:</Text>
                    <Text style={styles.nextLevelTitle}>{getLevelTitle(level + 1)}</Text>
                </View>
            </LinearGradient>
        </View>
    );
};

// ============================================================================
// MAIN SCREEN
// ============================================================================

const PuzzlePathScreen: React.FC = () => {
    const { currentLevel, totalXP } = mockUser;
    const scrollRef = useRef<ScrollView>(null);

    // Generate milestone levels to display
    const milestones = useMemo(() => {
        const levels: number[] = [];
        // Early milestones (1, 5, 10, etc.)
        [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].forEach(l => levels.push(l));
        // Then every 25 from 50 onwards
        for (let i = 75; i <= 1000; i += 25) {
            levels.push(i);
        }
        // Include current level if not already
        if (!levels.includes(currentLevel)) {
            levels.push(currentLevel);
            levels.sort((a, b) => a - b);
        }
        return levels;
    }, [currentLevel]);

    // Auto-scroll to current level on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentIndex = milestones.findIndex(l => l >= currentLevel);
            if (currentIndex > 3 && scrollRef.current) {
                scrollRef.current.scrollTo({ y: currentIndex * 120 - 200, animated: true });
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [currentLevel, milestones]);

    // Floating particles
    const particles = useMemo(() =>
        Array.from({ length: 15 }, (_, i) => ({
            id: i,
            delay: i * 400,
            size: 4 + Math.random() * 6,
            color: [colors.accent.gold, colors.accent.purple, colors.accent.cyan, colors.accent.pink][i % 4],
            leftPercent: 5 + Math.random() * 90,
        }))
        , []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#030712', '#0a1628', '#111d32', '#0a1628', '#030712']}
                style={StyleSheet.absoluteFill}
            />

            {/* Floating particles background */}
            <View style={styles.particlesContainer}>
                {particles.map(p => (
                    <FloatingParticle key={p.id} {...p} />
                ))}
            </View>

            {/* Ambient glow orbs */}
            <View style={[styles.glowOrb, { top: '8%', right: '-15%', backgroundColor: colors.accent.purple, width: 250, height: 250, borderRadius: 125 }]} />
            <View style={[styles.glowOrb, { top: '40%', left: '-20%', backgroundColor: colors.accent.indigo, width: 300, height: 300, borderRadius: 150 }]} />
            <View style={[styles.glowOrb, { bottom: '15%', right: '-12%', backgroundColor: colors.accent.gold, width: 200, height: 200, borderRadius: 100 }]} />

            <SafeAreaView style={styles.safeArea}>
                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.screenTitle}>🧩 Journey to Mastery</Text>
                    <Text style={styles.screenSubtitle}>1000 Levels • Infinite Knowledge</Text>
                </View>

                {/* Current Level Card */}
                <Header level={currentLevel} xp={totalXP} />

                {/* Scrollable Path */}
                <ScrollView
                    ref={scrollRef}
                    style={styles.pathScroll}
                    contentContainerStyle={styles.pathContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Start indicator */}
                    <View style={styles.startIndicator}>
                        <LinearGradient colors={[colors.accent.green, '#059669']} style={styles.startBadge}>
                            <Text style={styles.startText}>🚀 START</Text>
                        </LinearGradient>
                    </View>

                    {milestones.map((level, index) => (
                        <React.Fragment key={level}>
                            <MilestoneNode
                                level={level}
                                currentLevel={currentLevel}
                                index={index}
                                totalNodes={milestones.length}
                            />
                            {index < milestones.length - 1 && (
                                <AnimatedPathLine
                                    fromLevel={level}
                                    toLevel={milestones[index + 1]}
                                    currentLevel={currentLevel}
                                    index={index}
                                />
                            )}
                        </React.Fragment>
                    ))}

                    {/* Final destination */}
                    <View style={styles.finalDestination}>
                        <View style={styles.finalGlow} />
                        <LinearGradient
                            colors={[colors.accent.gold, '#F59E0B', '#D97706']}
                            style={styles.finalCircle}
                        >
                            <Text style={styles.finalEmoji}>👑</Text>
                        </LinearGradient>
                        <Text style={styles.finalTitle}>The Infinite One</Text>
                        <Text style={styles.finalSubtitle}>Level 1000 • Ultimate Mastery</Text>
                        <View style={styles.finalStats}>
                            <Text style={styles.finalStatsText}>🏆 0.01% of players reach this level</Text>
                        </View>
                    </View>

                    {/* Bottom padding */}
                    <View style={{ height: 150 }} />
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
    particlesContainer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
    glowOrb: { position: 'absolute', opacity: 0.12 },

    titleContainer: { alignItems: 'center', paddingVertical: 12 },
    screenTitle: { fontSize: 26, fontWeight: '800', color: colors.text.white, letterSpacing: -0.5 },
    screenSubtitle: { fontSize: 13, color: colors.text.muted, marginTop: 4, letterSpacing: 1 },

    header: { paddingHorizontal: 16, marginBottom: 12 },
    headerCard: {
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        overflow: 'hidden',
    },
    headerGlow: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    levelBadgeContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    levelBadgeGradient: { width: 50, height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    levelBadgeEmoji: { fontSize: 26 },
    levelNumber: { fontSize: 20, fontWeight: '800' },
    levelTier: { fontSize: 11, color: colors.text.muted, fontWeight: '600', letterSpacing: 1 },
    xpContainer: { alignItems: 'flex-end' },
    xpLabel: { fontSize: 10, color: colors.text.muted, fontWeight: '600', letterSpacing: 1 },
    xpText: { fontSize: 20, fontWeight: '800', color: colors.accent.gold },
    headerTitle: { fontSize: 16, color: colors.text.primary, fontWeight: '600', marginBottom: 16 },
    progressBar: {
        height: 10,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 5,
        overflow: 'hidden',
        position: 'relative',
    },
    progressFill: { height: '100%', borderRadius: 5 },
    progressGlow: { position: 'absolute', inset: 0, borderRadius: 5 },
    progressShine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    progressInfo: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    progressText: { fontSize: 12, color: colors.text.muted },
    progressPercent: { fontSize: 14, fontWeight: '800' },
    nextLevelPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    nextLevelLabel: { fontSize: 11, color: colors.text.muted },
    nextLevelTitle: { fontSize: 12, color: colors.text.secondary, fontWeight: '600' },

    pathScroll: { flex: 1 },
    pathContent: { paddingHorizontal: 20, paddingTop: 10 },

    startIndicator: { alignItems: 'center', marginBottom: 20 },
    startBadge: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
    startText: { fontSize: 12, fontWeight: '800', color: '#fff', letterSpacing: 1 },

    milestoneContainer: { alignItems: 'center', marginVertical: 6 },
    nodeTouchable: { alignItems: 'center' },
    outerRing: { position: 'absolute', borderWidth: 2, borderStyle: 'dashed' },
    nodeWrapper: {},
    nodeCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
    },
    starBurst: { position: 'absolute', top: -8, right: -8 },
    starBurstText: { fontSize: 16, color: colors.accent.gold },
    nodeLevel: { fontWeight: '900' },
    nodeInfo: { alignItems: 'center', marginTop: 10, maxWidth: 120 },
    nodeTitle: { textAlign: 'center' },
    unlocksRow: { flexDirection: 'row', gap: 4, marginTop: 6, flexWrap: 'wrap', justifyContent: 'center' },
    unlockBubble: { width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
    unlockIcon: { fontSize: 13 },
    tierBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 14,
    },
    tierBadgeEmoji: { fontSize: 12 },
    tierBadgeText: { fontSize: 9, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
    youAreHere: {
        position: 'absolute',
        top: -22,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    youAreHereText: { fontSize: 10, fontWeight: '900', color: '#000' },
    checkmark: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    checkmarkText: { fontSize: 12, fontWeight: '800', color: '#fff' },

    pathLineContainer: { height: 35, justifyContent: 'center', position: 'relative' },
    pathLine: { height: 4, borderRadius: 2 },
    pathOrb: { position: 'absolute', width: 10, height: 10, borderRadius: 5, top: 12 },

    finalDestination: { alignItems: 'center', marginTop: 40, paddingVertical: 30 },
    finalGlow: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: colors.accent.gold,
        opacity: 0.15,
    },
    finalCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#fff',
    },
    finalEmoji: { fontSize: 50 },
    finalTitle: { fontSize: 26, fontWeight: '900', color: colors.accent.gold, marginTop: 20, letterSpacing: -0.5 },
    finalSubtitle: { fontSize: 14, color: colors.text.muted, marginTop: 6 },
    finalStats: {
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(251, 191, 36, 0.2)',
    },
    finalStatsText: { fontSize: 12, color: colors.accent.gold, fontWeight: '600' },
});

export default PuzzlePathScreen;
