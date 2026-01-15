/**
 * Global Quest - Premium World Map Screen
 * Matching Gemini 3 Pro mockup quality
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, Defs, RadialGradient, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
    bg: { deep: '#030712', card: '#111d32', cardLight: '#1a2942' },
    accent: { indigo: '#6366F1', indigoLight: '#818CF8', purple: '#8B5CF6', gold: '#FBBF24', pink: '#EC4899', green: '#34D399', cyan: '#06B6D4', orange: '#FB923C' },
    text: { white: '#FFF', primary: '#F1F5F9', secondary: '#CBD5E1', muted: '#64748B' },
};

const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32 };

// ============================================================================
// MOCK DATA
// ============================================================================

const continents = [
    { id: 'ASIA', name: 'Asia', emoji: '🌏', progress: 32, color: '#EC4899', questions: 500, position: { top: '25%', left: '65%' }, size: 'large' },
    { id: 'EUROPE', name: 'Europe', emoji: '🏰', progress: 65, color: '#60A5FA', questions: 400, position: { top: '20%', left: '45%' }, size: 'medium' },
    { id: 'AFRICA', name: 'Africa', emoji: '🦁', progress: 80, color: '#FBBF24', questions: 350, position: { top: '45%', left: '48%' }, size: 'large' },
    { id: 'N_AMERICA', name: 'N. America', emoji: '🗽', progress: 28, color: '#34D399', questions: 400, position: { top: '25%', left: '15%' }, size: 'large' },
    { id: 'S_AMERICA', name: 'S. America', emoji: '🌎', progress: 15, color: '#A78BFA', questions: 300, position: { top: '55%', left: '25%' }, size: 'medium' },
    { id: 'AUSTRALIA', name: 'Oceania', emoji: '🦘', progress: 72, color: '#FB923C', questions: 250, position: { top: '65%', left: '75%' }, size: 'medium' },
    { id: 'ANTARCTICA', name: 'Antarctica', emoji: '🐧', progress: 0, color: '#64748B', questions: 100, position: { top: '85%', left: '50%' }, size: 'small' },
];

const stats = {
    totalProgress: 42,
    continentsExplored: 5,
    questionsAnswered: 847,
    currentStreak: 47,
};

// ============================================================================
// ANIMATION HOOKS
// ============================================================================

const useEntranceAnimation = (delay: number = 0) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 600, easing: Easing.out(Easing.back(2)), useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { opacity, scale };
};

const usePulseAnimation = (delay: number = 0) => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scale, { toValue: 1.05, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                    Animated.timing(scale, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                ])
            ),
        ]).start();
    }, []);

    return scale;
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
            <View>
                <Text style={styles.headerTitle}>World Map</Text>
                <Text style={styles.headerSubtitle}>Explore knowledge across continents</Text>
            </View>
            <TouchableOpacity style={styles.filterBtn}>
                <Text style={styles.filterIcon}>🎯</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const ProgressRing: React.FC<{ progress: number; size: number; color: string }> = ({ progress, size, color }) => {
    const radius = (size - 6) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <Svg width={size} height={size} style={styles.progressRing}>
            <Circle cx={size / 2} cy={size / 2} r={radius} stroke={`${color}30`} strokeWidth={4} fill="none" />
            <Circle
                cx={size / 2} cy={size / 2} r={radius}
                stroke={color} strokeWidth={4} fill="none"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round" rotation="-90" origin={`${size / 2}, ${size / 2}`}
            />
        </Svg>
    );
};

const ContinentNode: React.FC<{ continent: typeof continents[0]; index: number; onPress: () => void }> = ({ continent, index, onPress }) => {
    const { opacity, scale } = useEntranceAnimation(400 + index * 100);
    const pulseScale = usePulseAnimation(600 + index * 100);
    const nodeSize = continent.size === 'large' ? 70 : continent.size === 'medium' ? 60 : 50;

    return (
        <Animated.View
            style={[
                styles.continentNode,
                { top: continent.position.top, left: continent.position.left, opacity, transform: [{ scale: Animated.multiply(scale, pulseScale) }] },
            ]}
        >
            <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                <View style={[styles.nodeOuter, { width: nodeSize, height: nodeSize, borderRadius: nodeSize / 2, borderColor: continent.color }]}>
                    <ProgressRing progress={continent.progress} size={nodeSize} color={continent.color} />
                    <LinearGradient
                        colors={[`${continent.color}50`, `${continent.color}20`]}
                        style={[styles.nodeInner, { width: nodeSize - 12, height: nodeSize - 12, borderRadius: (nodeSize - 12) / 2 }]}
                    >
                        <Text style={[styles.nodeEmoji, { fontSize: continent.size === 'large' ? 28 : continent.size === 'medium' ? 24 : 20 }]}>
                            {continent.emoji}
                        </Text>
                    </LinearGradient>
                </View>
                <Text style={styles.nodeName}>{continent.name}</Text>
                <View style={[styles.progressBadge, { backgroundColor: `${continent.color}30` }]}>
                    <Text style={[styles.progressText, { color: continent.color }]}>{continent.progress}%</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const StatsPanel = () => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(800),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.statsPanel, { opacity, transform: [{ translateY }] }]}>
            <LinearGradient colors={['rgba(17, 29, 50, 0.95)', 'rgba(10, 22, 40, 0.98)']} style={styles.statsPanelInner}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{stats.totalProgress}%</Text>
                    <Text style={styles.statLabel}>Complete</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{stats.continentsExplored}/7</Text>
                    <Text style={styles.statLabel}>Explored</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{stats.questionsAnswered}</Text>
                    <Text style={styles.statLabel}>Questions</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>🔥 {stats.currentStreak}</Text>
                    <Text style={styles.statLabel}>Streak</Text>
                </View>
            </LinearGradient>
        </Animated.View>
    );
};

const GlobeBackground = () => (
    <View style={styles.globeContainer}>
        {/* Grid lines */}
        {Array.from({ length: 8 }).map((_, i) => (
            <View key={`h${i}`} style={[styles.gridLineH, { top: `${12.5 * (i + 1)}%` }]} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
            <View key={`v${i}`} style={[styles.gridLineV, { left: `${8.33 * (i + 1)}%` }]} />
        ))}
        {/* Glowing orbs */}
        <View style={[styles.glowOrb, { top: '10%', right: '10%', backgroundColor: colors.accent.purple }]} />
        <View style={[styles.glowOrb, { bottom: '30%', left: '5%', backgroundColor: colors.accent.indigo }]} />
        <View style={[styles.glowOrb, styles.glowOrbSmall, { top: '40%', right: '30%', backgroundColor: colors.accent.gold }]} />
    </View>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const WorldMapScreen: React.FC = () => {
    const handleContinentPress = (continent: typeof continents[0]) => {
        // Navigate to continent detail
        console.log(`Selected: ${continent.name}`);
    };

    return (
        <View style={styles.container}>
            {/* Background */}
            <LinearGradient colors={['#030712', '#0a1628', '#111d32', '#0a1628']} style={StyleSheet.absoluteFill} />
            <GlobeBackground />

            <Header />

            {/* Map Area */}
            <View style={styles.mapContainer}>
                {continents.map((continent, i) => (
                    <ContinentNode key={continent.id} continent={continent} index={i} onPress={() => handleContinentPress(continent)} />
                ))}
            </View>

            <StatsPanel />
        </View>
    );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#030712' },

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing[4], paddingTop: 60 },
    headerTitle: { fontSize: 28, fontWeight: '800', color: colors.text.white },
    headerSubtitle: { fontSize: 14, color: colors.text.muted, marginTop: 4 },
    filterBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(99,102,241,0.2)', justifyContent: 'center', alignItems: 'center' },
    filterIcon: { fontSize: 20 },

    mapContainer: { flex: 1, position: 'relative' },

    globeContainer: { ...StyleSheet.absoluteFillObject },
    gridLineH: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: 'rgba(99, 102, 241, 0.08)' },
    gridLineV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(99, 102, 241, 0.08)' },
    glowOrb: { position: 'absolute', width: 200, height: 200, borderRadius: 100, opacity: 0.12 },
    glowOrbSmall: { width: 100, height: 100, borderRadius: 50, opacity: 0.15 },

    continentNode: { position: 'absolute', alignItems: 'center', marginLeft: -35, marginTop: -35 },
    nodeOuter: { justifyContent: 'center', alignItems: 'center', borderWidth: 3, position: 'relative' },
    nodeInner: { justifyContent: 'center', alignItems: 'center', position: 'absolute' },
    nodeEmoji: {},
    progressRing: { position: 'absolute' },
    nodeName: { fontSize: 12, color: colors.text.primary, fontWeight: '600', marginTop: spacing[1], textAlign: 'center' },
    progressBadge: { paddingHorizontal: spacing[2], paddingVertical: 2, borderRadius: 8, marginTop: 2 },
    progressText: { fontSize: 11, fontWeight: '700' },

    statsPanel: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    statsPanelInner: { flexDirection: 'row', padding: spacing[4], paddingBottom: 40, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
    statItem: { flex: 1, alignItems: 'center' },
    statValue: { fontSize: 18, fontWeight: '800', color: colors.text.white },
    statLabel: { fontSize: 11, color: colors.text.muted, marginTop: 2 },
    statDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.1)' },
});

export default WorldMapScreen;
