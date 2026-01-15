/**
 * Global Quest - Premium World Map Screen V2
 * Matching Gemini 3 Pro mockup with map silhouette and connection lines
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Line, Defs, RadialGradient, Stop, Path } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
    bg: { deep: '#030712', card: '#111d32', cardLight: '#1a2942' },
    accent: { indigo: '#6366F1', purple: '#8B5CF6', gold: '#FBBF24', goldDark: '#D97706', pink: '#EC4899', green: '#34D399', cyan: '#06B6D4', orange: '#FB923C', blue: '#60A5FA' },
    text: { white: '#FFF', primary: '#F1F5F9', secondary: '#CBD5E1', muted: '#64748B' },
};

const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32 };

// ============================================================================
// CONTINENT DATA
// ============================================================================

const continents = [
    { id: 'N_AMERICA', name: 'N. America', emoji: '🗽', progress: 28, color: '#34D399', position: { x: 18, y: 28 }, size: 75, unlocked: true },
    { id: 'S_AMERICA', name: 'S. America', emoji: '🌎', progress: 15, color: '#A78BFA', position: { x: 25, y: 58 }, size: 70, unlocked: true },
    { id: 'EUROPE', name: 'Europe', emoji: '🏰', progress: 65, color: '#60A5FA', position: { x: 48, y: 22 }, size: 70, unlocked: true },
    { id: 'AFRICA', name: 'Africa', emoji: '🦁', progress: 80, color: '#FBBF24', position: { x: 48, y: 48 }, size: 85, unlocked: true, complete: true },
    { id: 'ASIA', name: 'Asia', emoji: '🌏', progress: 32, color: '#EC4899', position: { x: 75, y: 30 }, size: 75, unlocked: true },
    { id: 'OCEANIA', name: 'Oceania', emoji: '🦘', progress: 72, color: '#FB923C', position: { x: 82, y: 62 }, size: 70, unlocked: true },
    { id: 'ANTARCTICA', name: 'Antarctica', emoji: '🐧', progress: 0, color: '#64748B', position: { x: 50, y: 85 }, size: 60, unlocked: false },
];

// Connection lines between continents
const connections = [
    { from: 'N_AMERICA', to: 'EUROPE' },
    { from: 'N_AMERICA', to: 'S_AMERICA' },
    { from: 'EUROPE', to: 'AFRICA' },
    { from: 'EUROPE', to: 'ASIA' },
    { from: 'AFRICA', to: 'ASIA' },
    { from: 'AFRICA', to: 'S_AMERICA' },
    { from: 'ASIA', to: 'OCEANIA' },
    { from: 'OCEANIA', to: 'ANTARCTICA' },
    { from: 'S_AMERICA', to: 'ANTARCTICA' },
];

const stats = {
    totalProgress: 42,
    continentsExplored: 5,
    totalContinents: 7,
    questionsAnswered: 847,
    currentStreak: 47,
};

// ============================================================================
// ANIMATION HOOKS
// ============================================================================

const useEntranceAnimation = (delay: number = 0) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 600, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { opacity, scale };
};

const usePulseAnimation = (delay: number = 0, intensity: number = 1.08) => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scale, { toValue: intensity, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                    Animated.timing(scale, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                ])
            ),
        ]).start();
    }, []);

    return scale;
};

const useGlowAnimation = () => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 0.7, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.3, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            ])
        ).start();
    }, []);

    return opacity;
};

// ============================================================================
// COMPONENTS
// ============================================================================

const Header = () => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.header, { opacity, transform: [{ translateY }] }]}>
            <View style={styles.headerCenter}>
                <Text style={styles.headerTitle}>World Map</Text>
                <Text style={styles.headerSubtitle}>Explore knowledge across continents</Text>
            </View>
        </Animated.View>
    );
};

// World Map SVG silhouette (simplified)
const WorldMapSilhouette = () => {
    const opacity = useGlowAnimation();

    return (
        <Animated.View style={[styles.mapSilhouette, { opacity }]}>
            {/* Simplified world map representation using shapes */}
            <Svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                <Defs>
                    <RadialGradient id="mapGlow" cx="50%" cy="50%" rx="50%" ry="50%">
                        <Stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.6" />
                        <Stop offset="100%" stopColor="#0a1628" stopOpacity="0" />
                    </RadialGradient>
                </Defs>

                {/* North America */}
                <Path d="M40 60 L80 50 L100 70 L90 100 L70 110 L50 100 L40 80 Z" fill="#1e3a5f" opacity="0.5" />
                {/* South America */}
                <Path d="M80 130 L100 125 L110 160 L95 200 L75 190 L70 150 Z" fill="#1e3a5f" opacity="0.5" />
                {/* Europe */}
                <Path d="M170 50 L200 45 L210 70 L195 85 L175 80 L170 60 Z" fill="#1e3a5f" opacity="0.5" />
                {/* Africa */}
                <Path d="M175 100 L210 95 L220 150 L200 190 L175 180 L165 130 Z" fill="#1e3a5f" opacity="0.5" />
                {/* Asia */}
                <Path d="M230 40 L310 35 L330 80 L320 120 L270 110 L240 80 L230 50 Z" fill="#1e3a5f" opacity="0.5" />
                {/* Oceania */}
                <Path d="M310 160 L350 155 L360 190 L340 210 L310 200 L305 175 Z" fill="#1e3a5f" opacity="0.5" />
                {/* Antarctica */}
                <Path d="M150 260 L250 255 L260 280 L150 285 Z" fill="#1e3a5f" opacity="0.3" />
            </Svg>
        </Animated.View>
    );
};

// Connection lines between continents
const ConnectionLines = () => {
    const lineOpacity = useGlowAnimation();

    const getContinentCenter = (id: string) => {
        const continent = continents.find(c => c.id === id);
        if (!continent) return { x: 0, y: 0 };
        return {
            x: (continent.position.x / 100) * SCREEN_WIDTH,
            y: (continent.position.y / 100) * (SCREEN_HEIGHT - 200),
        };
    };

    return (
        <Animated.View style={[styles.connectionLines, { opacity: lineOpacity }]}>
            <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
                {connections.map((conn, i) => {
                    const from = getContinentCenter(conn.from);
                    const to = getContinentCenter(conn.to);
                    return (
                        <Line
                            key={i}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke="#38bdf8"
                            strokeWidth="1"
                            strokeOpacity="0.4"
                            strokeDasharray="4,4"
                        />
                    );
                })}
            </Svg>
        </Animated.View>
    );
};

// Progress Ring SVG
const ProgressRing: React.FC<{ progress: number; size: number; color: string; strokeWidth?: number }> = ({
    progress, size, color, strokeWidth = 5
}) => {
    const radius = (size - strokeWidth * 2) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <Svg width={size} height={size} style={styles.progressRing}>
            {/* Glow effect */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius + 3}
                fill="none"
                stroke={color}
                strokeWidth={8}
                strokeOpacity={0.2}
            />
            {/* Background ring */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={`${color}40`}
                strokeWidth={strokeWidth}
                fill="none"
            />
            {/* Progress ring */}
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

// Individual continent node
const ContinentNode: React.FC<{ continent: typeof continents[0]; index: number; onPress: () => void }> = ({
    continent, index, onPress
}) => {
    const { opacity, scale } = useEntranceAnimation(300 + index * 120);
    const pulseScale = usePulseAnimation(500 + index * 100, continent.complete ? 1.12 : 1.06);
    const nodeSize = continent.size;

    return (
        <Animated.View
            style={[
                styles.continentNode,
                {
                    left: `${continent.position.x}%`,
                    top: `${continent.position.y}%`,
                    width: nodeSize,
                    height: nodeSize + 50,
                    marginLeft: -nodeSize / 2,
                    marginTop: -nodeSize / 2,
                    opacity,
                    transform: [{ scale: Animated.multiply(scale, pulseScale) }],
                },
            ]}
        >
            <TouchableOpacity onPress={onPress} activeOpacity={0.85} disabled={!continent.unlocked}>
                {/* Outer glow for complete continents */}
                {continent.complete && (
                    <View style={[styles.completeGlow, { backgroundColor: continent.color }]} />
                )}

                {/* Progress ring */}
                <View style={[styles.nodeOuter, { width: nodeSize, height: nodeSize }]}>
                    <ProgressRing progress={continent.unlocked ? continent.progress : 0} size={nodeSize} color={continent.color} />

                    {/* Inner content */}
                    <LinearGradient
                        colors={continent.unlocked ? [`${continent.color}60`, `${continent.color}30`] : ['#374151', '#1f2937']}
                        style={[styles.nodeInner, { width: nodeSize - 16, height: nodeSize - 16, borderRadius: (nodeSize - 16) / 2 }]}
                    >
                        {continent.unlocked ? (
                            <Text style={[styles.nodeEmoji, { fontSize: nodeSize * 0.4 }]}>{continent.emoji}</Text>
                        ) : (
                            <Text style={styles.lockIcon}>🔒</Text>
                        )}
                    </LinearGradient>

                    {/* Progress badge */}
                    {continent.unlocked && (
                        <View style={[styles.progressBadge, { backgroundColor: `${continent.color}40`, borderColor: continent.color }]}>
                            <Text style={[styles.progressBadgeText, { color: continent.color }]}>{continent.progress}%</Text>
                        </View>
                    )}
                </View>

                {/* Continent name */}
                <Text style={styles.nodeName}>{continent.name}</Text>

                {/* Complete badge */}
                {continent.complete && (
                    <View style={styles.completeBadge}>
                        <LinearGradient colors={[colors.accent.gold, colors.accent.goldDark]} style={styles.completeBadgeInner}>
                            <Text style={styles.starIcon}>★</Text>
                            <Text style={styles.completeText}>COMPLETE</Text>
                        </LinearGradient>
                    </View>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

// Bottom stats panel
const StatsPanel = () => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(80)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(800),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    const statItems = [
        { icon: '🌍', value: `${stats.totalProgress}%`, label: 'Complete' },
        { icon: '🗺️', value: `${stats.continentsExplored}/${stats.totalContinents}`, label: 'Explored' },
        { icon: '❓', value: stats.questionsAnswered.toString(), label: 'Questions' },
        { icon: '🔥', value: stats.currentStreak.toString(), label: 'Streak' },
    ];

    return (
        <Animated.View style={[styles.statsPanel, { opacity, transform: [{ translateY }] }]}>
            <LinearGradient
                colors={['rgba(17, 29, 50, 0.95)', 'rgba(10, 22, 40, 0.98)']}
                style={styles.statsPanelInner}
            >
                {statItems.map((stat, i) => (
                    <React.Fragment key={i}>
                        <View style={styles.statItem}>
                            <View style={styles.statRow}>
                                <Text style={styles.statIcon}>{stat.icon}</Text>
                                <Text style={styles.statValue}>{stat.value}</Text>
                            </View>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                        {i < statItems.length - 1 && <View style={styles.statDivider} />}
                    </React.Fragment>
                ))}
            </LinearGradient>
        </Animated.View>
    );
};

// ============================================================================
// MAIN SCREEN
// ============================================================================

const WorldMapScreen: React.FC = () => {
    const handleContinentPress = (continent: typeof continents[0]) => {
        if (!continent.unlocked) return;
        console.log(`Selected: ${continent.name}`);
    };

    return (
        <View style={styles.container}>
            {/* Deep space background */}
            <LinearGradient
                colors={['#030712', '#0a1628', '#111d32', '#0a1628']}
                locations={[0, 0.3, 0.6, 1]}
                style={StyleSheet.absoluteFill}
            />

            {/* Animated glow orbs */}
            <View style={[styles.glowOrb, { top: '5%', right: '5%', backgroundColor: colors.accent.purple }]} />
            <View style={[styles.glowOrb, styles.glowOrbLarge, { top: '50%', left: '-15%', backgroundColor: colors.accent.indigo }]} />
            <View style={[styles.glowOrb, { bottom: '25%', right: '-10%', backgroundColor: colors.accent.cyan }]} />

            {/* World map silhouette */}
            <WorldMapSilhouette />

            {/* Connection lines */}
            <ConnectionLines />

            <SafeAreaView style={styles.safeArea}>
                <Header />

                {/* Map area with continent nodes */}
                <View style={styles.mapContainer}>
                    {continents.map((continent, i) => (
                        <ContinentNode
                            key={continent.id}
                            continent={continent}
                            index={i}
                            onPress={() => handleContinentPress(continent)}
                        />
                    ))}
                </View>

                <StatsPanel />
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
    glowOrbLarge: { width: 300, height: 300, borderRadius: 150, opacity: 0.1 },

    mapSilhouette: { ...StyleSheet.absoluteFillObject, top: 80 },
    connectionLines: { ...StyleSheet.absoluteFillObject, top: 80 },

    header: { paddingHorizontal: spacing[4], paddingTop: spacing[4], paddingBottom: spacing[2], alignItems: 'center' },
    headerCenter: { alignItems: 'center' },
    headerTitle: { fontSize: 28, fontWeight: '800', color: colors.text.white, letterSpacing: -0.5 },
    headerSubtitle: { fontSize: 14, color: colors.text.muted, marginTop: 4 },

    mapContainer: { flex: 1, position: 'relative' },

    continentNode: { position: 'absolute', alignItems: 'center' },
    completeGlow: { position: 'absolute', width: '120%', height: '120%', borderRadius: 100, opacity: 0.3, top: '-10%', left: '-10%' },
    nodeOuter: { justifyContent: 'center', alignItems: 'center', position: 'relative' },
    nodeInner: { justifyContent: 'center', alignItems: 'center', position: 'absolute' },
    nodeEmoji: {},
    lockIcon: { fontSize: 28 },
    progressRing: { position: 'absolute' },

    progressBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
        borderWidth: 2,
    },
    progressBadgeText: { fontSize: 11, fontWeight: '800' },

    nodeName: { fontSize: 13, color: colors.text.primary, fontWeight: '600', marginTop: spacing[2], textAlign: 'center' },

    completeBadge: { marginTop: spacing[1], borderRadius: 10, overflow: 'hidden' },
    completeBadgeInner: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, gap: 3 },
    starIcon: { fontSize: 10, color: '#1A1A1A' },
    completeText: { fontSize: 9, fontWeight: '800', color: '#1A1A1A', letterSpacing: 0.5 },

    statsPanel: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    statsPanelInner: {
        flexDirection: 'row',
        paddingVertical: spacing[4],
        paddingHorizontal: spacing[3],
        paddingBottom: 36,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.08)',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    statItem: { flex: 1, alignItems: 'center' },
    statRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    statIcon: { fontSize: 16 },
    statValue: { fontSize: 20, fontWeight: '800', color: colors.text.white },
    statLabel: { fontSize: 11, color: colors.text.muted, marginTop: 2 },
    statDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.1)' },
});

export default WorldMapScreen;
