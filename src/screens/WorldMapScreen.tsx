/**
 * Global Quest - Premium World Map Screen V3
 * Precise matching to Gemini 3 Pro mockup
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Line, Path, G, Defs, RadialGradient, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_HEIGHT = SCREEN_HEIGHT - 250;

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
    bg: { deep: '#030712', card: '#0f172a', cardLight: '#1e293b' },
    accent: { indigo: '#6366F1', purple: '#8B5CF6', gold: '#FBBF24', goldDark: '#D97706', pink: '#EC4899', green: '#34D399', cyan: '#22D3EE', orange: '#FB923C', blue: '#3B82F6' },
    text: { white: '#FFF', primary: '#F1F5F9', secondary: '#CBD5E1', muted: '#64748B' },
    map: { land: '#1e3a5f', landLight: '#2d4a6f', line: '#38bdf8' },
};

// ============================================================================
// CONTINENT DATA - Positioned to match mockup layout
// ============================================================================

const continents = [
    { id: 'N_AMERICA', name: 'N. America', emoji: '🗽', progress: 28, color: '#34D399', x: 75, y: MAP_HEIGHT * 0.22, size: 72 },
    { id: 'S_AMERICA', name: 'S. America', emoji: '🌎', progress: 15, color: '#A78BFA', x: 95, y: MAP_HEIGHT * 0.52, size: 68 },
    { id: 'EUROPE', name: 'Europe', emoji: '🏰', progress: 65, color: '#60A5FA', x: SCREEN_WIDTH * 0.42, y: MAP_HEIGHT * 0.18, size: 68 },
    { id: 'AFRICA', name: 'Africa', emoji: '🦁', progress: 80, color: '#FBBF24', x: SCREEN_WIDTH * 0.45, y: MAP_HEIGHT * 0.45, size: 88, complete: true },
    { id: 'ASIA', name: 'Asia', emoji: '🌏', progress: 32, color: '#EC4899', x: SCREEN_WIDTH * 0.72, y: MAP_HEIGHT * 0.25, size: 72 },
    { id: 'OCEANIA', name: 'Oceania', emoji: '🦘', progress: 72, color: '#FB923C', x: SCREEN_WIDTH * 0.78, y: MAP_HEIGHT * 0.58, size: 68 },
    { id: 'ANTARCTICA', name: 'Antarctica', emoji: '🐧', progress: 0, color: '#64748B', x: SCREEN_WIDTH * 0.45, y: MAP_HEIGHT * 0.82, size: 60, locked: true },
];

// Connection pairs
const connections: [string, string][] = [
    ['N_AMERICA', 'EUROPE'],
    ['N_AMERICA', 'S_AMERICA'],
    ['EUROPE', 'AFRICA'],
    ['EUROPE', 'ASIA'],
    ['AFRICA', 'ASIA'],
    ['AFRICA', 'S_AMERICA'],
    ['ASIA', 'OCEANIA'],
    ['OCEANIA', 'ANTARCTICA'],
    ['S_AMERICA', 'ANTARCTICA'],
];

// ============================================================================
// ANIMATION HOOKS
// ============================================================================

const useNodeAnimation = (delay: number) => {
    const scale = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.spring(scale, { toValue: 1, friction: 5, tension: 50, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { scale, opacity };
};

const usePulse = (delay: number = 0, max: number = 1.06) => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(scale, { toValue: max, duration: 1800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(scale, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            ])
        ).start();
    }, []);

    return scale;
};

// ============================================================================
// WORLD MAP SVG - More detailed silhouette
// ============================================================================

const WorldMapBackground = () => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, { toValue: 1, duration: 1500, useNativeDriver: true }).start();
    }, []);

    return (
        <Animated.View style={[styles.mapBackground, { opacity }]}>
            <Svg width={SCREEN_WIDTH} height={MAP_HEIGHT} viewBox={`0 0 ${SCREEN_WIDTH} ${MAP_HEIGHT}`}>
                <Defs>
                    <RadialGradient id="landGrad" cx="50%" cy="50%" r="60%">
                        <Stop offset="0%" stopColor={colors.map.landLight} />
                        <Stop offset="100%" stopColor={colors.map.land} />
                    </RadialGradient>
                </Defs>

                {/* North America */}
                <Path
                    d={`M30 ${MAP_HEIGHT * 0.12} 
              Q60 ${MAP_HEIGHT * 0.08} 100 ${MAP_HEIGHT * 0.1}
              Q130 ${MAP_HEIGHT * 0.15} 120 ${MAP_HEIGHT * 0.25}
              Q110 ${MAP_HEIGHT * 0.35} 80 ${MAP_HEIGHT * 0.38}
              Q50 ${MAP_HEIGHT * 0.4} 40 ${MAP_HEIGHT * 0.32}
              Q25 ${MAP_HEIGHT * 0.22} 30 ${MAP_HEIGHT * 0.12}
              Z`}
                    fill="url(#landGrad)"
                    opacity={0.6}
                />

                {/* South America */}
                <Path
                    d={`M70 ${MAP_HEIGHT * 0.42}
              Q100 ${MAP_HEIGHT * 0.4} 120 ${MAP_HEIGHT * 0.48}
              Q130 ${MAP_HEIGHT * 0.58} 110 ${MAP_HEIGHT * 0.72}
              Q90 ${MAP_HEIGHT * 0.78} 75 ${MAP_HEIGHT * 0.68}
              Q60 ${MAP_HEIGHT * 0.55} 70 ${MAP_HEIGHT * 0.42}
              Z`}
                    fill="url(#landGrad)"
                    opacity={0.6}
                />

                {/* Europe */}
                <Path
                    d={`M${SCREEN_WIDTH * 0.38} ${MAP_HEIGHT * 0.08}
              Q${SCREEN_WIDTH * 0.48} ${MAP_HEIGHT * 0.06} ${SCREEN_WIDTH * 0.52} ${MAP_HEIGHT * 0.1}
              Q${SCREEN_WIDTH * 0.55} ${MAP_HEIGHT * 0.18} ${SCREEN_WIDTH * 0.48} ${MAP_HEIGHT * 0.25}
              Q${SCREEN_WIDTH * 0.42} ${MAP_HEIGHT * 0.28} ${SCREEN_WIDTH * 0.38} ${MAP_HEIGHT * 0.22}
              Q${SCREEN_WIDTH * 0.35} ${MAP_HEIGHT * 0.15} ${SCREEN_WIDTH * 0.38} ${MAP_HEIGHT * 0.08}
              Z`}
                    fill="url(#landGrad)"
                    opacity={0.6}
                />

                {/* Africa */}
                <Path
                    d={`M${SCREEN_WIDTH * 0.38} ${MAP_HEIGHT * 0.32}
              Q${SCREEN_WIDTH * 0.52} ${MAP_HEIGHT * 0.3} ${SCREEN_WIDTH * 0.55} ${MAP_HEIGHT * 0.38}
              Q${SCREEN_WIDTH * 0.58} ${MAP_HEIGHT * 0.52} ${SCREEN_WIDTH * 0.52} ${MAP_HEIGHT * 0.65}
              Q${SCREEN_WIDTH * 0.45} ${MAP_HEIGHT * 0.7} ${SCREEN_WIDTH * 0.4} ${MAP_HEIGHT * 0.62}
              Q${SCREEN_WIDTH * 0.35} ${MAP_HEIGHT * 0.48} ${SCREEN_WIDTH * 0.38} ${MAP_HEIGHT * 0.32}
              Z`}
                    fill="url(#landGrad)"
                    opacity={0.6}
                />

                {/* Asia */}
                <Path
                    d={`M${SCREEN_WIDTH * 0.55} ${MAP_HEIGHT * 0.08}
              Q${SCREEN_WIDTH * 0.85} ${MAP_HEIGHT * 0.05} ${SCREEN_WIDTH * 0.92} ${MAP_HEIGHT * 0.15}
              Q${SCREEN_WIDTH * 0.95} ${MAP_HEIGHT * 0.3} ${SCREEN_WIDTH * 0.88} ${MAP_HEIGHT * 0.4}
              Q${SCREEN_WIDTH * 0.75} ${MAP_HEIGHT * 0.45} ${SCREEN_WIDTH * 0.6} ${MAP_HEIGHT * 0.38}
              Q${SCREEN_WIDTH * 0.55} ${MAP_HEIGHT * 0.25} ${SCREEN_WIDTH * 0.55} ${MAP_HEIGHT * 0.08}
              Z`}
                    fill="url(#landGrad)"
                    opacity={0.6}
                />

                {/* Australia/Oceania */}
                <Path
                    d={`M${SCREEN_WIDTH * 0.72} ${MAP_HEIGHT * 0.52}
              Q${SCREEN_WIDTH * 0.88} ${MAP_HEIGHT * 0.5} ${SCREEN_WIDTH * 0.92} ${MAP_HEIGHT * 0.58}
              Q${SCREEN_WIDTH * 0.9} ${MAP_HEIGHT * 0.7} ${SCREEN_WIDTH * 0.8} ${MAP_HEIGHT * 0.72}
              Q${SCREEN_WIDTH * 0.7} ${MAP_HEIGHT * 0.68} ${SCREEN_WIDTH * 0.72} ${MAP_HEIGHT * 0.52}
              Z`}
                    fill="url(#landGrad)"
                    opacity={0.6}
                />

                {/* Antarctica */}
                <Path
                    d={`M${SCREEN_WIDTH * 0.2} ${MAP_HEIGHT * 0.88}
              Q${SCREEN_WIDTH * 0.5} ${MAP_HEIGHT * 0.82} ${SCREEN_WIDTH * 0.8} ${MAP_HEIGHT * 0.88}
              Q${SCREEN_WIDTH * 0.7} ${MAP_HEIGHT * 0.95} ${SCREEN_WIDTH * 0.3} ${MAP_HEIGHT * 0.95}
              Q${SCREEN_WIDTH * 0.15} ${MAP_HEIGHT * 0.92} ${SCREEN_WIDTH * 0.2} ${MAP_HEIGHT * 0.88}
              Z`}
                    fill="url(#landGrad)"
                    opacity={0.35}
                />
            </Svg>
        </Animated.View>
    );
};

// ============================================================================
// CONNECTION LINES - Solid glowing lines
// ============================================================================

const ConnectionLines = () => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, { toValue: 0.6, duration: 1200, delay: 300, useNativeDriver: true }).start();
    }, []);

    const getPos = (id: string) => {
        const c = continents.find(c => c.id === id);
        return c ? { x: c.x, y: c.y } : { x: 0, y: 0 };
    };

    return (
        <Animated.View style={[styles.linesContainer, { opacity }]}>
            <Svg width={SCREEN_WIDTH} height={MAP_HEIGHT}>
                {connections.map(([from, to], i) => {
                    const start = getPos(from);
                    const end = getPos(to);
                    return (
                        <G key={i}>
                            {/* Glow line */}
                            <Line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={colors.map.line} strokeWidth={3} strokeOpacity={0.3} />
                            {/* Core line */}
                            <Line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={colors.map.line} strokeWidth={1.5} strokeOpacity={0.7} />
                        </G>
                    );
                })}
            </Svg>
        </Animated.View>
    );
};

// ============================================================================
// CONTINENT NODE
// ============================================================================

const ContinentNode: React.FC<{ continent: typeof continents[0]; index: number }> = ({ continent, index }) => {
    const { scale: entryScale, opacity } = useNodeAnimation(400 + index * 100);
    const pulseScale = usePulse(600 + index * 50, continent.complete ? 1.1 : 1.05);
    const size = continent.size;
    const ringSize = size + 8;

    return (
        <Animated.View
            style={[
                styles.nodeContainer,
                { left: continent.x - size / 2, top: continent.y - size / 2, opacity, transform: [{ scale: Animated.multiply(entryScale, pulseScale) }] },
            ]}
        >
            <TouchableOpacity activeOpacity={0.85} disabled={continent.locked}>
                {/* Outer glow for complete */}
                {continent.complete && <View style={[styles.glowRing, { width: size + 30, height: size + 30, borderRadius: (size + 30) / 2, backgroundColor: continent.color }]} />}

                {/* Progress ring */}
                <View style={[styles.ringContainer, { width: ringSize, height: ringSize }]}>
                    <Svg width={ringSize} height={ringSize}>
                        {/* Background ring */}
                        <Circle cx={ringSize / 2} cy={ringSize / 2} r={(ringSize - 8) / 2} stroke={`${continent.color}30`} strokeWidth={5} fill="none" />
                        {/* Progress arc */}
                        <Circle
                            cx={ringSize / 2}
                            cy={ringSize / 2}
                            r={(ringSize - 8) / 2}
                            stroke={continent.color}
                            strokeWidth={5}
                            fill="none"
                            strokeDasharray={`${((ringSize - 8) * Math.PI * continent.progress) / 100} ${(ringSize - 8) * Math.PI}`}
                            strokeLinecap="round"
                            rotation="-90"
                            origin={`${ringSize / 2}, ${ringSize / 2}`}
                        />
                    </Svg>
                </View>

                {/* Inner circle with emoji */}
                <LinearGradient
                    colors={continent.locked ? ['#374151', '#1f2937'] : [`${continent.color}50`, `${continent.color}25`]}
                    style={[styles.innerCircle, { width: size - 8, height: size - 8, borderRadius: (size - 8) / 2 }]}
                >
                    <Text style={{ fontSize: size * 0.42 }}>{continent.locked ? '🔒' : continent.emoji}</Text>
                </LinearGradient>

                {/* Progress percentage badge */}
                {!continent.locked && !continent.complete && (
                    <View style={[styles.percentBadge, { backgroundColor: `${continent.color}35`, borderColor: continent.color }]}>
                        <Text style={[styles.percentText, { color: continent.color }]}>{continent.progress}%</Text>
                    </View>
                )}

                {/* Continent name */}
                <Text style={styles.continentName}>{continent.name}</Text>

                {/* COMPLETE badge for Africa */}
                {continent.complete && (
                    <View style={styles.completeBadgeContainer}>
                        <LinearGradient colors={[colors.accent.gold, colors.accent.goldDark]} style={styles.completeBadge}>
                            <Text style={styles.starText}>★</Text>
                            <Text style={styles.completeText}>COMPLETE</Text>
                        </LinearGradient>
                        <Text style={styles.completeProgress}>{continent.progress}% progress</Text>
                    </View>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

// ============================================================================
// STATS PANEL
// ============================================================================

const StatsPanel = () => {
    const translateY = useRef(new Animated.Value(100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, { toValue: 0, duration: 600, delay: 900, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 1, duration: 600, delay: 900, useNativeDriver: true }),
        ]).start();
    }, []);

    const items = [
        { icon: '🌍', value: '42%', label: 'Complete' },
        { icon: '🗺️', value: '5/7', label: 'Explored' },
        { icon: '❓', value: '847', label: 'Questions' },
        { icon: '🔥', value: '47', label: 'Streak' },
    ];

    return (
        <Animated.View style={[styles.statsPanel, { transform: [{ translateY }], opacity }]}>
            <LinearGradient colors={['rgba(15, 23, 42, 0.97)', 'rgba(10, 18, 35, 1)']} style={styles.statsPanelGradient}>
                {items.map((item, i) => (
                    <React.Fragment key={i}>
                        <View style={styles.statItem}>
                            <View style={styles.statTop}>
                                <Text style={styles.statIcon}>{item.icon}</Text>
                                <Text style={styles.statValue}>{item.value}</Text>
                            </View>
                            <Text style={styles.statLabel}>{item.label}</Text>
                        </View>
                        {i < items.length - 1 && <View style={styles.statDivider} />}
                    </React.Fragment>
                ))}
            </LinearGradient>
        </Animated.View>
    );
};

// ============================================================================
// HEADER
// ============================================================================

const Header = () => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    }, []);

    return (
        <Animated.View style={[styles.header, { opacity }]}>
            <Text style={styles.headerTitle}>World Map</Text>
            <Text style={styles.headerSubtitle}>Explore knowledge across continents</Text>
        </Animated.View>
    );
};

// ============================================================================
// MAIN SCREEN
// ============================================================================

const WorldMapScreen: React.FC = () => (
    <View style={styles.container}>
        <LinearGradient colors={['#030712', '#0a1628', '#0f172a', '#0a1628']} style={StyleSheet.absoluteFill} />

        {/* Ambient glow orbs */}
        <View style={[styles.glowOrb, { top: '8%', right: '-8%', backgroundColor: colors.accent.purple }]} />
        <View style={[styles.glowOrb, styles.glowOrbLarge, { top: '45%', left: '-20%', backgroundColor: colors.accent.indigo }]} />
        <View style={[styles.glowOrb, { bottom: '25%', right: '-12%', backgroundColor: colors.accent.cyan }]} />

        <SafeAreaView style={styles.safeArea}>
            <Header />

            <View style={styles.mapArea}>
                <WorldMapBackground />
                <ConnectionLines />
                {continents.map((c, i) => (
                    <ContinentNode key={c.id} continent={c} index={i} />
                ))}
            </View>

            <StatsPanel />
        </SafeAreaView>
    </View>
);

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#030712' },
    safeArea: { flex: 1 },

    glowOrb: { position: 'absolute', width: 200, height: 200, borderRadius: 100, opacity: 0.18 },
    glowOrbLarge: { width: 300, height: 300, borderRadius: 150, opacity: 0.12 },

    header: { alignItems: 'center', paddingTop: 16, paddingBottom: 8 },
    headerTitle: { fontSize: 26, fontWeight: '800', color: colors.text.white },
    headerSubtitle: { fontSize: 14, color: colors.text.muted, marginTop: 4 },

    mapArea: { flex: 1, position: 'relative' },
    mapBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: MAP_HEIGHT },
    linesContainer: { position: 'absolute', top: 0, left: 0, right: 0, height: MAP_HEIGHT },

    nodeContainer: { position: 'absolute', alignItems: 'center' },
    glowRing: { position: 'absolute', top: -15, left: -15, opacity: 0.25 },
    ringContainer: { position: 'absolute', top: -4, left: -4 },
    innerCircle: { justifyContent: 'center', alignItems: 'center' },

    percentBadge: { position: 'absolute', top: -8, right: -8, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, borderWidth: 2 },
    percentText: { fontSize: 11, fontWeight: '800' },

    continentName: { marginTop: 8, fontSize: 12, fontWeight: '600', color: colors.text.primary, textAlign: 'center' },

    completeBadgeContainer: { alignItems: 'center', marginTop: 4 },
    completeBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, gap: 4 },
    starText: { fontSize: 11, color: '#1a1a1a' },
    completeText: { fontSize: 10, fontWeight: '800', color: '#1a1a1a', letterSpacing: 0.5 },
    completeProgress: { fontSize: 10, color: colors.accent.gold, marginTop: 2 },

    statsPanel: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    statsPanelGradient: { flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 12, paddingBottom: 36, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
    statItem: { flex: 1, alignItems: 'center' },
    statTop: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    statIcon: { fontSize: 18 },
    statValue: { fontSize: 20, fontWeight: '800', color: colors.text.white },
    statLabel: { fontSize: 11, color: colors.text.muted, marginTop: 3 },
    statDivider: { width: 1, height: 45, backgroundColor: 'rgba(255,255,255,0.1)' },
});

export default WorldMapScreen;
