/**
 * Global Quest - Premium World Map Screen V4
 * Fully responsive for iPhone AND iPad
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, useWindowDimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Line, Path, G, Defs, RadialGradient, Stop } from 'react-native-svg';

// ============================================================================
// RESPONSIVE HOOK
// ============================================================================

const useResponsive = () => {
    const { width, height } = useWindowDimensions();
    const isTablet = width >= 768;
    const isLargeTablet = width >= 1024;

    // Scale factor - reduced for tablets to prevent overlap
    const scale = isLargeTablet ? 1.15 : isTablet ? 1.1 : 1;

    // Map area height (header + stats panel + tab bar space)
    const mapHeight = height - (isTablet ? 200 : 220);

    return { width, height, isTablet, isLargeTablet, scale, mapHeight };
};

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
// CONTINENT DATA - Percentage-based positioning
// ============================================================================

const continentData = [
    { id: 'N_AMERICA', name: 'N. America', emoji: '🗽', progress: 28, color: '#34D399', xPercent: 15, yPercent: 18, sizeBase: 68 },
    { id: 'S_AMERICA', name: 'S. America', emoji: '🌎', progress: 15, color: '#A78BFA', xPercent: 18, yPercent: 55, sizeBase: 62 },
    { id: 'EUROPE', name: 'Europe', emoji: '🏰', progress: 65, color: '#60A5FA', xPercent: 42, yPercent: 10, sizeBase: 62 },
    { id: 'AFRICA', name: 'Africa', emoji: '🦁', progress: 80, color: '#FBBF24', xPercent: 45, yPercent: 40, sizeBase: 80, complete: true },
    { id: 'ASIA', name: 'Asia', emoji: '🌏', progress: 32, color: '#EC4899', xPercent: 78, yPercent: 15, sizeBase: 68 },
    { id: 'OCEANIA', name: 'Oceania', emoji: '🦘', progress: 72, color: '#FB923C', xPercent: 82, yPercent: 50, sizeBase: 62 },
    { id: 'ANTARCTICA', name: 'Antarctica', emoji: '🐧', progress: 0, color: '#64748B', xPercent: 50, yPercent: 75, sizeBase: 52, locked: true },
];

// Connection pairs (by ID)
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
// WORLD MAP BACKGROUND - Responsive SVG
// ============================================================================

const WorldMapBackground: React.FC<{ width: number; height: number }> = ({ width, height }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, { toValue: 1, duration: 1500, useNativeDriver: true }).start();
    }, []);

    return (
        <Animated.View style={[styles.mapBackground, { opacity }]}>
            <Svg width={width} height={height} viewBox={`0 0 100 100`} preserveAspectRatio="xMidYMid slice">
                <Defs>
                    <RadialGradient id="landGrad" cx="50%" cy="50%" r="60%">
                        <Stop offset="0%" stopColor={colors.map.landLight} />
                        <Stop offset="100%" stopColor={colors.map.land} />
                    </RadialGradient>
                </Defs>

                {/* North America - percentage based */}
                <Path d="M8 8 Q18 5 25 10 Q28 18 24 28 Q18 32 12 28 Q6 22 8 8 Z" fill="url(#landGrad)" opacity={0.55} />

                {/* South America */}
                <Path d="M15 42 Q25 40 28 48 Q30 60 24 72 Q18 75 14 65 Q10 52 15 42 Z" fill="url(#landGrad)" opacity={0.55} />

                {/* Europe */}
                <Path d="M40 6 Q52 4 55 12 Q56 22 50 28 Q44 30 40 24 Q38 15 40 6 Z" fill="url(#landGrad)" opacity={0.55} />

                {/* Africa */}
                <Path d="M40 32 Q55 30 58 42 Q60 58 52 70 Q44 72 40 62 Q36 48 40 32 Z" fill="url(#landGrad)" opacity={0.55} />

                {/* Asia */}
                <Path d="M58 5 Q88 3 94 18 Q96 35 88 45 Q75 50 62 42 Q56 28 58 5 Z" fill="url(#landGrad)" opacity={0.55} />

                {/* Australia/Oceania */}
                <Path d="M72 52 Q90 50 94 60 Q92 72 82 75 Q72 72 72 52 Z" fill="url(#landGrad)" opacity={0.55} />

                {/* Antarctica */}
                <Path d="M20 88 Q50 82 80 88 Q75 96 25 96 Q18 94 20 88 Z" fill="url(#landGrad)" opacity={0.35} />
            </Svg>
        </Animated.View>
    );
};

// ============================================================================
// CONNECTION LINES - Responsive
// ============================================================================

const ConnectionLines: React.FC<{ width: number; height: number; scale: number }> = ({ width, height, scale }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, { toValue: 0.7, duration: 1200, delay: 300, useNativeDriver: true }).start();
    }, []);

    const getPos = (id: string) => {
        const c = continentData.find(c => c.id === id);
        if (!c) return { x: 0, y: 0 };
        return {
            x: (c.xPercent / 100) * width,
            y: (c.yPercent / 100) * height,
        };
    };

    return (
        <Animated.View style={[styles.linesContainer, { opacity }]}>
            <Svg width={width} height={height}>
                {connections.map(([from, to], i) => {
                    const start = getPos(from);
                    const end = getPos(to);
                    return (
                        <G key={i}>
                            {/* Glow */}
                            <Line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={colors.map.line} strokeWidth={3 * scale} strokeOpacity={0.25} />
                            {/* Core */}
                            <Line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={colors.map.line} strokeWidth={1.5 * scale} strokeOpacity={0.65} />
                        </G>
                    );
                })}
            </Svg>
        </Animated.View>
    );
};

// ============================================================================
// CONTINENT NODE - Responsive
// ============================================================================

interface ContinentNodeProps {
    continent: typeof continentData[0];
    index: number;
    mapWidth: number;
    mapHeight: number;
    scale: number;
    onPress: (continentId: string) => void;
}

const ContinentNode: React.FC<ContinentNodeProps> = ({ continent, index, mapWidth, mapHeight, scale, onPress }) => {
    const { scale: entryScale, opacity } = useNodeAnimation(400 + index * 100);
    const pulseScale = usePulse(600 + index * 50, continent.complete ? 1.1 : 1.05);

    // Scale size based on device
    const size = continent.sizeBase * scale;
    const ringSize = size + 8;

    // Calculate position from percentages
    const x = (continent.xPercent / 100) * mapWidth - size / 2;
    const y = (continent.yPercent / 100) * mapHeight - size / 2;

    const handlePress = () => {
        if (!continent.locked) {
            onPress(continent.id);
        }
    };

    return (
        <Animated.View
            style={[
                styles.nodeContainer,
                { left: x, top: y, opacity, transform: [{ scale: Animated.multiply(entryScale, pulseScale) }] },
            ]}
        >
            <TouchableOpacity activeOpacity={0.85} disabled={continent.locked} onPress={handlePress}>
                {/* Outer glow for complete */}
                {continent.complete && (
                    <View style={[styles.glowRing, {
                        width: size + 30 * scale,
                        height: size + 30 * scale,
                        borderRadius: (size + 30 * scale) / 2,
                        backgroundColor: continent.color,
                        top: -15 * scale,
                        left: -15 * scale,
                    }]} />
                )}

                {/* Progress ring */}
                <View style={[styles.ringContainer, { width: ringSize, height: ringSize, top: -4, left: -4 }]}>
                    <Svg width={ringSize} height={ringSize}>
                        <Circle cx={ringSize / 2} cy={ringSize / 2} r={(ringSize - 8) / 2} stroke={`${continent.color}30`} strokeWidth={5 * scale} fill="none" />
                        <Circle
                            cx={ringSize / 2}
                            cy={ringSize / 2}
                            r={(ringSize - 8) / 2}
                            stroke={continent.color}
                            strokeWidth={5 * scale}
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
                    <View style={[styles.percentBadge, {
                        backgroundColor: `${continent.color}35`,
                        borderColor: continent.color,
                        top: -8 * scale,
                        right: -8 * scale,
                        paddingHorizontal: 8 * scale,
                        paddingVertical: 3 * scale,
                    }]}>
                        <Text style={[styles.percentText, { color: continent.color, fontSize: 11 * scale }]}>{continent.progress}%</Text>
                    </View>
                )}

                {/* Continent name */}
                <Text style={[styles.continentName, { fontSize: 12 * scale, marginTop: 8 * scale }]}>{continent.name}</Text>

                {/* COMPLETE badge for Africa */}
                {continent.complete && (
                    <View style={[styles.completeBadgeContainer, { marginTop: 4 * scale }]}>
                        <LinearGradient colors={[colors.accent.gold, colors.accent.goldDark]} style={[styles.completeBadge, { paddingHorizontal: 10 * scale, paddingVertical: 4 * scale, borderRadius: 12 * scale }]}>
                            <Text style={[styles.starText, { fontSize: 11 * scale }]}>★</Text>
                            <Text style={[styles.completeText, { fontSize: 10 * scale }]}>COMPLETE</Text>
                        </LinearGradient>
                        <Text style={[styles.completeProgress, { fontSize: 10 * scale }]}>{continent.progress}% progress</Text>
                    </View>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

// ============================================================================
// STATS PANEL - Responsive
// ============================================================================

const StatsPanel: React.FC<{ scale: number; isTablet: boolean }> = ({ scale, isTablet }) => {
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
            <LinearGradient
                colors={['rgba(15, 23, 42, 0.97)', 'rgba(10, 18, 35, 1)']}
                style={[styles.statsPanelGradient, {
                    paddingVertical: 16 * scale,
                    paddingBottom: isTablet ? 24 : 36,
                    maxWidth: isTablet ? 600 : '100%',
                    alignSelf: 'center',
                    width: '100%',
                }]}
            >
                {items.map((item, i) => (
                    <React.Fragment key={i}>
                        <View style={styles.statItem}>
                            <View style={styles.statTop}>
                                <Text style={[styles.statIcon, { fontSize: 18 * scale }]}>{item.icon}</Text>
                                <Text style={[styles.statValue, { fontSize: 20 * scale }]}>{item.value}</Text>
                            </View>
                            <Text style={[styles.statLabel, { fontSize: 11 * scale }]}>{item.label}</Text>
                        </View>
                        {i < items.length - 1 && <View style={[styles.statDivider, { height: 45 * scale }]} />}
                    </React.Fragment>
                ))}
            </LinearGradient>
        </Animated.View>
    );
};

// ============================================================================
// HEADER - Responsive
// ============================================================================

const Header: React.FC<{ scale: number }> = ({ scale }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    }, []);

    return (
        <Animated.View style={[styles.header, { opacity, paddingTop: 16 * scale }]}>
            <Text style={[styles.headerTitle, { fontSize: 26 * scale }]}>World Map</Text>
            <Text style={[styles.headerSubtitle, { fontSize: 14 * scale }]}>Explore knowledge across continents</Text>
        </Animated.View>
    );
};

// ============================================================================
// MAIN SCREEN
// ============================================================================

const WorldMapScreen: React.FC = () => {
    const { width, height, isTablet, isLargeTablet, scale, mapHeight } = useResponsive();
    const navigation = useNavigation();

    // Map continent IDs to the Question data continent format
    const continentIdMap: Record<string, string> = {
        'N_AMERICA': 'NORTH_AMERICA',
        'S_AMERICA': 'SOUTH_AMERICA',
        'EUROPE': 'EUROPE',
        'AFRICA': 'AFRICA',
        'ASIA': 'ASIA',
        'OCEANIA': 'AUSTRALIA_OCEANIA',
        'ANTARCTICA': 'ANTARCTICA',
    };

    const handleContinentPress = (continentId: string) => {
        const mappedContinent = continentIdMap[continentId] || continentId;
        (navigation as any).navigate('Question', { continent: mappedContinent });
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#030712', '#0a1628', '#0f172a', '#0a1628']} style={StyleSheet.absoluteFill} />

            {/* Ambient glow orbs - scaled */}
            <View style={[styles.glowOrb, { top: '8%', right: '-8%', backgroundColor: colors.accent.purple, width: 200 * scale, height: 200 * scale, borderRadius: 100 * scale }]} />
            <View style={[styles.glowOrb, { top: '45%', left: '-20%', backgroundColor: colors.accent.indigo, width: 300 * scale, height: 300 * scale, borderRadius: 150 * scale, opacity: 0.1 }]} />
            <View style={[styles.glowOrb, { bottom: '25%', right: '-12%', backgroundColor: colors.accent.cyan, width: 200 * scale, height: 200 * scale, borderRadius: 100 * scale }]} />

            <SafeAreaView style={styles.safeArea}>
                <Header scale={scale} />

                <View style={[styles.mapArea, { height: mapHeight }]}>
                    <WorldMapBackground width={width} height={mapHeight} />
                    <ConnectionLines width={width} height={mapHeight} scale={scale} />
                    {continentData.map((c, i) => (
                        <ContinentNode
                            key={c.id}
                            continent={c}
                            index={i}
                            mapWidth={width}
                            mapHeight={mapHeight}
                            scale={scale}
                            onPress={handleContinentPress}
                        />
                    ))}
                </View>

                <StatsPanel scale={scale} isTablet={isTablet} />
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

    glowOrb: { position: 'absolute', opacity: 0.18 },

    header: { alignItems: 'center', paddingBottom: 8 },
    headerTitle: { fontWeight: '800', color: colors.text.white },
    headerSubtitle: { color: colors.text.muted, marginTop: 4 },

    mapArea: { flex: 1, position: 'relative' },
    mapBackground: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    linesContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },

    nodeContainer: { position: 'absolute', alignItems: 'center' },
    glowRing: { position: 'absolute', opacity: 0.25 },
    ringContainer: { position: 'absolute' },
    innerCircle: { justifyContent: 'center', alignItems: 'center' },

    percentBadge: { position: 'absolute', borderRadius: 12, borderWidth: 2 },
    percentText: { fontWeight: '800' },

    continentName: { fontWeight: '600', color: colors.text.primary, textAlign: 'center' },

    completeBadgeContainer: { alignItems: 'center' },
    completeBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    starText: { color: '#1a1a1a' },
    completeText: { fontWeight: '800', color: '#1a1a1a', letterSpacing: 0.5 },
    completeProgress: { color: colors.accent.gold, marginTop: 2 },

    statsPanel: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    statsPanelGradient: { flexDirection: 'row', paddingHorizontal: 12, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
    statItem: { flex: 1, alignItems: 'center' },
    statTop: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    statIcon: {},
    statValue: { fontWeight: '800', color: colors.text.white },
    statLabel: { color: colors.text.muted, marginTop: 3 },
    statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
});

export default WorldMapScreen;
