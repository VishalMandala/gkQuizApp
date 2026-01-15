/**
 * Global Quest - Profile Screen
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const colors = {
    primary: { 400: '#818CF8', 500: '#6366F1', 600: '#4F46E5' },
    secondary: { 400: '#FBBF24', 500: '#F59E0B' },
    success: { 500: '#10B981' },
    error: { 500: '#EF4444' },
    background: { primary: '#0F172A', secondary: '#1E293B', tertiary: '#334155' },
    text: { primary: '#F8FAFC', secondary: '#CBD5E1', tertiary: '#94A3B8', muted: '#64748B' },
};
const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32 };

const user = {
    name: 'Alex Explorer',
    email: 'alex@example.com',
    level: 23,
    title: 'Knowledge Seeker',
    totalXP: 12500,
    streak: 47,
    rank: 4823,
    joinDate: 'Jan 2024',
    equippedArtifact: '🎭',
};

const stats = [
    { label: 'Questions', value: '847', icon: '📝' },
    { label: 'Accuracy', value: '72%', icon: '🎯' },
    { label: 'Hours', value: '28.5', icon: '⏱️' },
    { label: 'Duels Won', value: '12', icon: '⚔️' },
];

const settings = [
    { label: 'Notifications', icon: '🔔', hasToggle: true, enabled: true },
    { label: 'Sound Effects', icon: '🔊', hasToggle: true, enabled: true },
    { label: 'Haptic Feedback', icon: '📳', hasToggle: true, enabled: false },
    { label: 'Dark Mode', icon: '🌙', hasToggle: true, enabled: true },
    { label: 'Language', icon: '🌐', value: 'English' },
    { label: 'Help & Support', icon: '❓' },
    { label: 'Privacy Policy', icon: '🔒' },
    { label: 'Terms of Service', icon: '📄' },
];

const ProfileScreen: React.FC = () => (
    <View style={styles.container}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
            {/* Profile Header */}
            <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{user.name[0]}</Text>
                    </View>
                    <View style={styles.artifactBadge}><Text style={{ fontSize: 20 }}>{user.equippedArtifact}</Text></View>
                </View>

                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userTitle}>Level {user.level} · {user.title}</Text>

                <View style={styles.profileStats}>
                    <View style={styles.profileStat}>
                        <Text style={styles.profileStatValue}>{user.totalXP.toLocaleString()}</Text>
                        <Text style={styles.profileStatLabel}>Total XP</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.profileStat}>
                        <Text style={styles.profileStatValue}>🔥 {user.streak}</Text>
                        <Text style={styles.profileStatLabel}>Day Streak</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.profileStat}>
                        <Text style={styles.profileStatValue}>#{user.rank}</Text>
                        <Text style={styles.profileStatLabel}>World Rank</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            {/* Stats Grid */}
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.statsGrid}>
                {stats.map(stat => (
                    <View key={stat.label} style={styles.statCard}>
                        <Text style={styles.statIcon}>{stat.icon}</Text>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                    </View>
                ))}
            </View>

            {/* Settings */}
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.settingsCard}>
                {settings.map((item, index) => (
                    <TouchableOpacity key={item.label} style={[styles.settingRow, index !== settings.length - 1 && styles.settingBorder]}>
                        <Text style={styles.settingIcon}>{item.icon}</Text>
                        <Text style={styles.settingLabel}>{item.label}</Text>
                        {item.hasToggle ? (
                            <View style={[styles.toggle, item.enabled && styles.toggleOn]}>
                                <View style={[styles.toggleDot, item.enabled && styles.toggleDotOn]} />
                            </View>
                        ) : item.value ? (
                            <Text style={styles.settingValue}>{item.value}</Text>
                        ) : (
                            <Text style={styles.chevron}>›</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Member Since */}
            <Text style={styles.memberSince}>Member since {user.joinDate}</Text>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

            <Text style={styles.version}>Global Quest v1.0.0</Text>
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary },
    scroll: { flex: 1 },
    content: { padding: spacing[4], paddingBottom: spacing[8] },

    profileCard: { backgroundColor: colors.background.secondary, borderRadius: 20, padding: spacing[5], alignItems: 'center', marginBottom: spacing[4] },
    avatarContainer: { position: 'relative', marginBottom: spacing[3] },
    avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary[600], justifyContent: 'center', alignItems: 'center' },
    avatarText: { fontSize: 32, fontWeight: '700', color: colors.text.primary },
    artifactBadge: { position: 'absolute', bottom: -4, right: -4, width: 32, height: 32, borderRadius: 16, backgroundColor: colors.background.tertiary, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.background.secondary },
    userName: { fontSize: 22, fontWeight: '700', color: colors.text.primary },
    userTitle: { fontSize: 14, color: colors.text.tertiary, marginTop: 2 },
    profileStats: { flexDirection: 'row', marginTop: spacing[4], paddingTop: spacing[4], borderTopWidth: 1, borderTopColor: colors.background.tertiary },
    profileStat: { flex: 1, alignItems: 'center' },
    profileStatValue: { fontSize: 18, fontWeight: '700', color: colors.text.primary },
    profileStatLabel: { fontSize: 11, color: colors.text.muted, marginTop: 2 },
    divider: { width: 1, height: 40, backgroundColor: colors.background.tertiary },
    editButton: { marginTop: spacing[4], paddingVertical: spacing[2], paddingHorizontal: spacing[5], backgroundColor: colors.background.tertiary, borderRadius: 20 },
    editButtonText: { fontSize: 14, color: colors.primary[400], fontWeight: '600' },

    sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text.primary, marginBottom: spacing[3] },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3], marginBottom: spacing[4] },
    statCard: { width: '47%', backgroundColor: colors.background.secondary, borderRadius: 16, padding: spacing[3], alignItems: 'center' },
    statIcon: { fontSize: 24, marginBottom: spacing[1] },
    statValue: { fontSize: 20, fontWeight: '700', color: colors.text.primary },
    statLabel: { fontSize: 11, color: colors.text.muted, marginTop: 2 },

    settingsCard: { backgroundColor: colors.background.secondary, borderRadius: 16, marginBottom: spacing[4] },
    settingRow: { flexDirection: 'row', alignItems: 'center', padding: spacing[4] },
    settingBorder: { borderBottomWidth: 1, borderBottomColor: colors.background.tertiary },
    settingIcon: { fontSize: 20, marginRight: spacing[3] },
    settingLabel: { flex: 1, fontSize: 15, color: colors.text.primary },
    settingValue: { fontSize: 14, color: colors.text.muted },
    chevron: { fontSize: 20, color: colors.text.muted },
    toggle: { width: 44, height: 24, borderRadius: 12, backgroundColor: colors.background.tertiary, justifyContent: 'center', paddingHorizontal: 2 },
    toggleOn: { backgroundColor: colors.success[500] },
    toggleDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.text.primary },
    toggleDotOn: { alignSelf: 'flex-end' },

    memberSince: { textAlign: 'center', fontSize: 12, color: colors.text.muted, marginBottom: spacing[4] },
    logoutButton: { backgroundColor: colors.error[500] + '20', borderRadius: 12, padding: spacing[4], alignItems: 'center', marginBottom: spacing[4] },
    logoutText: { fontSize: 15, fontWeight: '600', color: colors.error[500] },
    version: { textAlign: 'center', fontSize: 11, color: colors.text.muted },
});

export default ProfileScreen;
