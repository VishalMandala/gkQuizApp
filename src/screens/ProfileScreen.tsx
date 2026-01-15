/**
 * Global Quest - Premium Profile Screen
 * Matching Gemini 3 Pro mockup quality
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
    { icon: '📝', value: '847', label: 'Questions' },
    { icon: '🎯', value: '72%', label: 'Accuracy' },
    { icon: '⏱️', value: '28.5', label: 'Hours' },
    { icon: '⚔️', value: '12', label: 'Duels Won' },
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
                Animated.timing(opacity, { toValue: 1, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.timing(scale, { toValue: 1, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
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

    return (
        <Animated.View style={[styles.profileCard, { opacity, transform: [{ translateY }, { scale }] }]}>
            <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.profileCardInner}>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <LinearGradient colors={[colors.accent.indigo, colors.accent.purple]} style={styles.avatar}>
                        <Text style={styles.avatarText}>{user.initial}</Text>
                    </LinearGradient>
                    <View style={styles.artifactBadge}>
                        <Text style={styles.artifactEmoji}>{user.equippedArtifact}</Text>
                    </View>
                </View>

                {/* Name & Title */}
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userTitle}>Level {user.level} · {user.title}</Text>

                {/* Stats Row */}
                <View style={styles.profileStats}>
                    <View style={styles.profileStat}>
                        <Text style={styles.profileStatIcon}>⭐</Text>
                        <Text style={styles.profileStatValue}>{user.totalXP.toLocaleString()}</Text>
                        <Text style={styles.profileStatLabel}>Total XP</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.profileStat}>
                        <Text style={styles.profileStatIcon}>🔥</Text>
                        <Text style={styles.profileStatValue}>{user.streak}</Text>
                        <Text style={styles.profileStatLabel}>Day Streak</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.profileStat}>
                        <Text style={styles.profileStatIcon}>🌍</Text>
                        <Text style={styles.profileStatValue}>#{user.rank.toLocaleString()}</Text>
                        <Text style={styles.profileStatLabel}>World Rank</Text>
                    </View>
                </View>

                {/* Edit Button */}
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonIcon}>✏️</Text>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </LinearGradient>
        </Animated.View>
    );
};

const StatsGrid = () => {
    const { opacity, translateY } = useEntranceAnimation(200);

    return (
        <Animated.View style={[styles.statsGrid, { opacity, transform: [{ translateY }] }]}>
            {stats.map((stat, i) => (
                <View key={i} style={styles.statCard}>
                    <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.statCardInner}>
                        <Text style={styles.statIcon}>{stat.icon}</Text>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                    </LinearGradient>
                </View>
            ))}
        </Animated.View>
    );
};

const SettingsSection = () => {
    const { opacity, translateY } = useEntranceAnimation(300);
    const [settings, setSettings] = useState(initialSettings);

    const toggleSetting = (id: string) => {
        setSettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    };

    return (
        <Animated.View style={[styles.settingsCard, { opacity, transform: [{ translateY }] }]}>
            <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.settingsCardInner}>
                {settings.map((setting, i) => (
                    <View key={setting.id} style={[styles.settingRow, i !== settings.length - 1 && styles.settingBorder]}>
                        <Text style={styles.settingIcon}>{setting.icon}</Text>
                        <Text style={styles.settingLabel}>{setting.label}</Text>
                        <Switch
                            value={setting.enabled}
                            onValueChange={() => toggleSetting(setting.id)}
                            trackColor={{ false: '#475569', true: colors.accent.green }}
                            thumbColor="#FFF"
                            ios_backgroundColor="#475569"
                        />
                    </View>
                ))}
                {links.map((link, i) => (
                    <TouchableOpacity key={link.label} style={[styles.settingRow, i !== links.length - 1 && styles.settingBorder]}>
                        <Text style={styles.settingIcon}>{link.icon}</Text>
                        <Text style={styles.settingLabel}>{link.label}</Text>
                        {link.value ? (
                            <Text style={styles.settingValue}>{link.value}</Text>
                        ) : null}
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                ))}
            </LinearGradient>
        </Animated.View>
    );
};

const Footer = () => {
    const { opacity, translateY } = useEntranceAnimation(400);

    return (
        <Animated.View style={[styles.footer, { opacity, transform: [{ translateY }] }]}>
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log Out</Text>
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
    avatar: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
    avatarText: { fontSize: 42, fontWeight: '800', color: colors.text.white },
    artifactBadge: { position: 'absolute', bottom: -4, right: -4, width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bg.card, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.bg.deep },
    artifactEmoji: { fontSize: 22 },
    userName: { fontSize: 24, fontWeight: '800', color: colors.text.white },
    userTitle: { fontSize: 14, color: colors.text.muted, marginTop: 4 },
    profileStats: { flexDirection: 'row', marginTop: spacing[5], paddingTop: spacing[5], borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', width: '100%' },
    profileStat: { flex: 1, alignItems: 'center' },
    profileStatIcon: { fontSize: 16, marginBottom: 4 },
    profileStatValue: { fontSize: 18, fontWeight: '800', color: colors.text.white },
    profileStatLabel: { fontSize: 11, color: colors.text.muted, marginTop: 2 },
    statDivider: { width: 1, height: 50, backgroundColor: 'rgba(255,255,255,0.1)' },
    editButton: { flexDirection: 'row', alignItems: 'center', marginTop: spacing[5], paddingVertical: spacing[3], paddingHorizontal: spacing[5], backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, gap: spacing[2] },
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
