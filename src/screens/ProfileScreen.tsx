/**
 * Global Quest - Premium Profile Screen V2
 * Enhanced with micro-interactions and engaging UX
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, Easing, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
    bg: { deep: '#030712', card: '#111d32', cardLight: '#1a2942' },
    accent: { indigo: '#6366F1', indigoLight: '#818CF8', purple: '#8B5CF6', gold: '#FBBF24', green: '#10B981', red: '#EF4444' },
    text: { white: '#FFF', primary: '#F1F5F9', secondary: '#CBD5E1', muted: '#64748B' },
};

const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32 };

// ============================================================================
// MOCK DATA
// ============================================================================

const user = {
    name: 'Alex Explorer',
    initial: 'A',
    level: 23,
    title: 'Knowledge Seeker',
    totalXP: 12500,
    streak: 47,
    rank: 4823,
    equippedArtifact: '🎭',
    memberSince: 'Jan 2024',
};

const stats = [
    { icon: '📝', value: 847, label: 'Questions', suffix: '' },
    { icon: '🎯', value: 72, label: 'Accuracy', suffix: '%' },
    { icon: '⏱️', value: 28.5, label: 'Hours', suffix: '', hasDecimal: true },
    { icon: '⚔️', value: 12, label: 'Duels Won', suffix: '' },
];

const initialSettings = [
    { id: 'notifications', icon: '🔔', label: 'Notifications', enabled: true },
    { id: 'sound', icon: '🔊', label: 'Sound Effects', enabled: true },
    { id: 'haptic', icon: '📳', label: 'Haptic Feedback', enabled: false },
    { id: 'darkMode', icon: '🌙', label: 'Dark Mode', enabled: true },
];

const links = [
    { icon: '🌐', label: 'Language', value: 'English' },
    { icon: '❓', label: 'Help & Support', value: '' },
];

// ============================================================================
// ANIMATION HOOKS
// ============================================================================

const useEntranceAnimation = (delay: number = 0) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(30)).current;
    const scale = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { opacity, translateY, scale };
};

// Pulse animation for avatar
const usePulseAnimation = () => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, { toValue: 1.05, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(scale, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, []);

    return scale;
};

// Count-up animation for numbers
const useCountUp = (targetValue: number, duration: number = 1200, delay: number = 0, hasDecimal: boolean = false) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const multiplier = hasDecimal ? 10 : 1;
            const target = targetValue * multiplier;
            const steps = 30;
            const increment = target / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setDisplayValue(target);
                    clearInterval(timer);
                } else {
                    setDisplayValue(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }, delay);
        return () => clearTimeout(timeout);
    }, [targetValue, duration, delay, hasDecimal]);

    return hasDecimal ? (displayValue / 10).toFixed(1) : displayValue;
};

// Press animation for interactive elements
const usePressAnimation = () => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scale, { toValue: 0.97, friction: 8, tension: 200, useNativeDriver: true }).start();
    };

    const onPressOut = () => {
        Animated.spring(scale, { toValue: 1, friction: 6, tension: 150, useNativeDriver: true }).start();
    };

    return { scale, onPressIn, onPressOut };
};

// Staggered animation for grid items
const useStaggeredAnimation = (index: number) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;
    const scale = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(250 + index * 80),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, friction: 6, tension: 100, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { opacity, translateY, scale };
};

// ============================================================================
// COMPONENTS
// ============================================================================

const ProfileCard = () => {
    const { opacity, translateY, scale } = useEntranceAnimation(100);
    const avatarPulse = usePulseAnimation();
    const { scale: editScale, onPressIn, onPressOut } = usePressAnimation();

    // Animated stats
    const totalXP = useCountUp(user.totalXP, 1500, 400);
    const streak = useCountUp(user.streak, 1200, 500);
    const rank = useCountUp(user.rank, 1300, 600);

    return (
        <Animated.View style={[styles.profileCard, { opacity, transform: [{ translateY }, { scale }] }]}>
            <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.profileCardInner}>
                {/* Avatar with pulse */}
                <Animated.View style={[styles.avatarContainer, { transform: [{ scale: avatarPulse }] }]}>
                    <LinearGradient colors={[colors.accent.indigo, colors.accent.purple]} style={styles.avatar}>
                        <Text style={styles.avatarText}>{user.initial}</Text>
                    </LinearGradient>
                    <View style={styles.artifactBadge}>
                        <Text style={styles.artifactEmoji}>{user.equippedArtifact}</Text>
                    </View>
                    {/* Glow behind avatar */}
                    <View style={styles.avatarGlow} />
                </Animated.View>

                {/* Name & Title */}
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userTitle}>Level {user.level} · {user.title}</Text>

                {/* Stats Row with animated count-up */}
                <View style={styles.profileStats}>
                    <TouchableOpacity style={styles.profileStat} activeOpacity={0.7}>
                        <Text style={styles.profileStatIcon}>⭐</Text>
                        <Text style={styles.profileStatValue}>{Number(totalXP).toLocaleString()}</Text>
                        <Text style={styles.profileStatLabel}>Total XP</Text>
                    </TouchableOpacity>
                    <View style={styles.statDivider} />
                    <TouchableOpacity style={styles.profileStat} activeOpacity={0.7}>
                        <Text style={styles.profileStatIcon}>🔥</Text>
                        <Text style={styles.profileStatValue}>{streak}</Text>
                        <Text style={styles.profileStatLabel}>Day Streak</Text>
                    </TouchableOpacity>
                    <View style={styles.statDivider} />
                    <TouchableOpacity style={styles.profileStat} activeOpacity={0.7}>
                        <Text style={styles.profileStatIcon}>🌍</Text>
                        <Text style={styles.profileStatValue}>#{Number(rank).toLocaleString()}</Text>
                        <Text style={styles.profileStatLabel}>World Rank</Text>
                    </TouchableOpacity>
                </View>

                {/* Edit Button with press feedback */}
                <TouchableOpacity
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    activeOpacity={0.9}
                >
                    <Animated.View style={[styles.editButton, { transform: [{ scale: editScale }] }]}>
                        <Text style={styles.editButtonIcon}>✏️</Text>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </Animated.View>
                </TouchableOpacity>
            </LinearGradient>
        </Animated.View>
    );
};

// Individual stat card with animations
const StatCard: React.FC<{ stat: typeof stats[0]; index: number }> = ({ stat, index }) => {
    const { opacity, translateY, scale } = useStaggeredAnimation(index);
    const { scale: pressScale, onPressIn, onPressOut } = usePressAnimation();
    const displayValue = useCountUp(stat.value, 1200, 300 + index * 100, stat.hasDecimal);

    return (
        <Animated.View style={[styles.statCard, { opacity, transform: [{ translateY }, { scale }] }]}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <Animated.View style={{ transform: [{ scale: pressScale }] }}>
                    <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.statCardInner}>
                        <Text style={styles.statIcon}>{stat.icon}</Text>
                        <Text style={styles.statValue}>{displayValue}{stat.suffix}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const StatsGrid = () => (
    <View style={styles.statsGrid}>
        {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
        ))}
    </View>
);

// Setting row with press feedback
const SettingRow: React.FC<{
    setting: typeof initialSettings[0];
    isLast: boolean;
    onToggle: () => void
}> = ({ setting, isLast, onToggle }) => {
    const { scale, onPressIn, onPressOut } = usePressAnimation();

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onToggle}
        >
            <Animated.View style={[
                styles.settingRow,
                !isLast && styles.settingBorder,
                { transform: [{ scale }] }
            ]}>
                <Text style={styles.settingIcon}>{setting.icon}</Text>
                <Text style={styles.settingLabel}>{setting.label}</Text>
                <Switch
                    value={setting.enabled}
                    onValueChange={onToggle}
                    trackColor={{ false: '#475569', true: colors.accent.green }}
                    thumbColor="#FFF"
                    ios_backgroundColor="#475569"
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

// Link row with press feedback  
const LinkRow: React.FC<{ link: typeof links[0]; isLast: boolean }> = ({ link, isLast }) => {
    const { scale, onPressIn, onPressOut } = usePressAnimation();

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <Animated.View style={[
                styles.settingRow,
                !isLast && styles.settingBorder,
                { transform: [{ scale }] }
            ]}>
                <Text style={styles.settingIcon}>{link.icon}</Text>
                <Text style={styles.settingLabel}>{link.label}</Text>
                {link.value ? <Text style={styles.settingValue}>{link.value}</Text> : null}
                <Text style={styles.chevron}>›</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const SettingsSection = () => {
    const { opacity, translateY, scale } = useEntranceAnimation(350);
    const [settings, setSettings] = useState(initialSettings);

    const toggleSetting = (id: string) => {
        setSettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    };

    return (
        <Animated.View style={[styles.settingsCard, { opacity, transform: [{ translateY }, { scale }] }]}>
            <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.settingsCardInner}>
                {settings.map((setting, i) => (
                    <SettingRow
                        key={setting.id}
                        setting={setting}
                        isLast={i === settings.length - 1 && links.length === 0}
                        onToggle={() => toggleSetting(setting.id)}
                    />
                ))}
                {links.map((link, i) => (
                    <LinkRow
                        key={link.label}
                        link={link}
                        isLast={i === links.length - 1}
                    />
                ))}
            </LinearGradient>
        </Animated.View>
    );
};

const Footer = () => {
    const { opacity, translateY, scale } = useEntranceAnimation(450);
    const { scale: logoutScale, onPressIn, onPressOut } = usePressAnimation();

    return (
        <Animated.View style={[styles.footer, { opacity, transform: [{ translateY }, { scale }] }]}>
            <TouchableOpacity
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                activeOpacity={0.9}
                style={{ width: '100%' }}
            >
                <Animated.View style={[styles.logoutButton, { transform: [{ scale: logoutScale }] }]}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </Animated.View>
            </TouchableOpacity>
            <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
            <Text style={styles.version}>Global Quest v1.0.0</Text>
        </Animated.View>
    );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ProfileScreen: React.FC = () => (
    <View style={styles.container}>
        {/* Background */}
        <LinearGradient colors={['#030712', '#0a1628', '#111d32']} style={StyleSheet.absoluteFill} />
        <View style={[styles.glowOrb, { top: '0%', left: '30%', backgroundColor: colors.accent.indigo }]} />
        <View style={[styles.glowOrb, { bottom: '40%', right: '-15%', backgroundColor: colors.accent.purple }]} />

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <ProfileCard />
            <StatsGrid />
            <SettingsSection />
            <Footer />
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
    glowOrb: { position: 'absolute', width: 300, height: 300, borderRadius: 150, opacity: 0.15 },

    profileCard: { marginBottom: spacing[4], borderRadius: 24, overflow: 'hidden' },
    profileCardInner: { alignItems: 'center', padding: spacing[6], borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    avatarContainer: { position: 'relative', marginBottom: spacing[4] },
    avatar: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', zIndex: 2 },
    avatarGlow: {
        position: 'absolute',
        top: -10,
        left: -10,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.accent.indigo,
        opacity: 0.3,
        zIndex: 1,
    },
    avatarText: { fontSize: 42, fontWeight: '800', color: colors.text.white },
    artifactBadge: { position: 'absolute', bottom: -4, right: -4, width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bg.card, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.bg.deep, zIndex: 3 },
    artifactEmoji: { fontSize: 22 },
    userName: { fontSize: 24, fontWeight: '800', color: colors.text.white },
    userTitle: { fontSize: 14, color: colors.text.muted, marginTop: 4 },
    profileStats: { flexDirection: 'row', marginTop: spacing[5], paddingTop: spacing[5], borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', width: '100%' },
    profileStat: { flex: 1, alignItems: 'center' },
    profileStatIcon: { fontSize: 16, marginBottom: 4 },
    profileStatValue: { fontSize: 18, fontWeight: '800', color: colors.text.white },
    profileStatLabel: { fontSize: 11, color: colors.text.muted, marginTop: 2 },
    statDivider: { width: 1, height: 50, backgroundColor: 'rgba(255,255,255,0.1)' },
    editButton: { flexDirection: 'row', alignItems: 'center', marginTop: spacing[5], paddingVertical: spacing[3], paddingHorizontal: spacing[5], backgroundColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 20, gap: spacing[2], borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.3)' },
    editButtonIcon: { fontSize: 14 },
    editButtonText: { fontSize: 14, fontWeight: '600', color: colors.accent.indigoLight },

    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3], marginBottom: spacing[4] },
    statCard: { width: (SCREEN_WIDTH - spacing[4] * 2 - spacing[3]) / 2 - 1, borderRadius: 16, overflow: 'hidden' },
    statCardInner: { padding: spacing[4], alignItems: 'center', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    statIcon: { fontSize: 28, marginBottom: spacing[2] },
    statValue: { fontSize: 28, fontWeight: '800', color: colors.text.white },
    statLabel: { fontSize: 12, color: colors.text.muted, marginTop: 2 },

    settingsCard: { borderRadius: 20, overflow: 'hidden', marginBottom: spacing[4] },
    settingsCardInner: { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    settingRow: { flexDirection: 'row', alignItems: 'center', padding: spacing[4] },
    settingBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
    settingIcon: { fontSize: 20, marginRight: spacing[3] },
    settingLabel: { flex: 1, fontSize: 15, color: colors.text.primary, fontWeight: '500' },
    settingValue: { fontSize: 14, color: colors.text.muted, marginRight: spacing[2] },
    chevron: { fontSize: 22, color: colors.text.muted },

    footer: { alignItems: 'center' },
    logoutButton: { width: '100%', paddingVertical: spacing[4], borderRadius: 16, backgroundColor: 'rgba(239, 68, 68, 0.15)', alignItems: 'center', marginBottom: spacing[4], borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)' },
    logoutText: { fontSize: 16, fontWeight: '600', color: colors.accent.red },
    memberSince: { fontSize: 12, color: colors.text.muted, marginBottom: spacing[2] },
    version: { fontSize: 11, color: colors.text.muted },
});

export default ProfileScreen;
