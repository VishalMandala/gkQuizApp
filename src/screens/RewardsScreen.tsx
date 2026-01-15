/**
 * Global Quest - Rewards Screen
 * Achievements, artifacts, and collectibles
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const colors = {
    primary: { 400: '#818CF8', 500: '#6366F1', 600: '#4F46E5' },
    secondary: { 400: '#FBBF24', 500: '#F59E0B' },
    success: { 500: '#10B981' },
    background: { primary: '#0F172A', secondary: '#1E293B', tertiary: '#334155' },
    text: { primary: '#F8FAFC', secondary: '#CBD5E1', tertiary: '#94A3B8', muted: '#64748B' },
    rarity: { common: '#9CA3AF', rare: '#60A5FA', epic: '#A78BFA', legendary: '#FBBF24' },
};
const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32 };

const achievements = [
    { id: '1', name: 'First Steps', desc: 'Answer your first question', icon: '👣', progress: 100, unlocked: true, xp: 50 },
    { id: '2', name: 'Week Warrior', desc: '7-day streak', icon: '🔥', progress: 100, unlocked: true, xp: 200 },
    { id: '3', name: 'Africa Explorer', desc: 'Complete 25% of Africa', icon: '🦁', progress: 100, unlocked: true, xp: 300 },
    { id: '4', name: 'Month Master', desc: '30-day streak', icon: '👑', progress: 40, unlocked: false, xp: 500 },
    { id: '5', name: 'Century Club', desc: '100 correct answers', icon: '💯', progress: 72, unlocked: false, xp: 400 },
    { id: '6', name: 'Speed Demon', desc: '10 fast answers', icon: '⚡', progress: 30, unlocked: false, xp: 350 },
];

const artifacts = [
    { id: '1', name: 'Golden Mask', icon: '🎭', rarity: 'legendary', owned: true, equipped: true },
    { id: '2', name: 'Jade Dragon', icon: '🐉', rarity: 'epic', owned: false, progress: 64 },
    { id: '3', name: 'Viking Helm', icon: '⚔️', rarity: 'rare', owned: true, equipped: false },
    { id: '4', name: 'Eagle Feather', icon: '🦅', rarity: 'epic', owned: false, progress: 28 },
    { id: '5', name: 'Jungle Totem', icon: '🗿', rarity: 'rare', owned: false, progress: 15 },
    { id: '6', name: 'Ice Crystal', icon: '❄️', rarity: 'legendary', owned: false, progress: 0 },
];

type TabType = 'achievements' | 'artifacts';

const RewardsScreen: React.FC = () => {
    const [tab, setTab] = useState<TabType>('achievements');
    const unlocked = achievements.filter(a => a.unlocked).length;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Rewards</Text>
                <Text style={styles.stat}>🏆 {unlocked}/{achievements.length}</Text>
            </View>

            <View style={styles.tabs}>
                {(['achievements', 'artifacts'] as TabType[]).map(t => (
                    <TouchableOpacity key={t} style={[styles.tab, tab === t && styles.tabActive]} onPress={() => setTab(t)}>
                        <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                            {t === 'achievements' ? '🏆 Achievements' : '✨ Artifacts'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
                {tab === 'achievements' && achievements.map(a => (
                    <View key={a.id} style={[styles.card, !a.unlocked && styles.cardLocked]}>
                        <View style={styles.iconBox}><Text style={styles.emoji}>{a.icon}</Text></View>
                        <View style={styles.info}>
                            <Text style={styles.name}>{a.name}</Text>
                            <Text style={styles.desc}>{a.desc}</Text>
                            {!a.unlocked && (
                                <View style={styles.progressRow}>
                                    <View style={styles.bar}><View style={[styles.fill, { width: `${a.progress}%` }]} /></View>
                                    <Text style={styles.percent}>{a.progress}%</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.xpBox}><Text style={styles.xp}>+{a.xp}</Text></View>
                    </View>
                ))}

                {tab === 'artifacts' && (
                    <View style={styles.grid}>
                        {artifacts.map(a => {
                            const color = colors.rarity[a.rarity as keyof typeof colors.rarity];
                            return (
                                <View key={a.id} style={[styles.artifact, a.owned && { borderColor: color, borderWidth: 2 }]}>
                                    <View style={[styles.artifactIcon, { backgroundColor: color + '30' }]}>
                                        <Text style={{ fontSize: 32 }}>{a.icon}</Text>
                                    </View>
                                    <Text style={styles.artifactName}>{a.name}</Text>
                                    <Text style={[styles.rarity, { color }]}>{a.rarity.toUpperCase()}</Text>
                                    {!a.owned && a.progress !== undefined && (
                                        <View style={styles.artifactBar}>
                                            <View style={[styles.artifactFill, { width: `${a.progress}%`, backgroundColor: color }]} />
                                        </View>
                                    )}
                                    {a.equipped && <Text style={styles.equippedLabel}>EQUIPPED</Text>}
                                </View>
                            );
                        })}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: spacing[4], paddingBottom: 0 },
    title: { fontSize: 28, fontWeight: '700', color: colors.text.primary },
    stat: { fontSize: 14, color: colors.text.secondary, fontWeight: '600' },
    tabs: { flexDirection: 'row', padding: spacing[4], gap: spacing[2] },
    tab: { flex: 1, padding: spacing[2], borderRadius: 20, backgroundColor: colors.background.secondary, alignItems: 'center' },
    tabActive: { backgroundColor: colors.primary[600] },
    tabText: { fontSize: 13, color: colors.text.muted, fontWeight: '600' },
    tabTextActive: { color: colors.text.primary },
    scroll: { flex: 1 },
    content: { padding: spacing[4], paddingTop: 0 },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background.secondary, borderRadius: 16, padding: spacing[3], marginBottom: spacing[3] },
    cardLocked: { opacity: 0.7 },
    iconBox: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.background.tertiary, justifyContent: 'center', alignItems: 'center', marginRight: spacing[3] },
    emoji: { fontSize: 24 },
    info: { flex: 1 },
    name: { fontSize: 15, fontWeight: '700', color: colors.text.primary },
    desc: { fontSize: 12, color: colors.text.tertiary, marginTop: 2 },
    progressRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing[2], gap: spacing[2] },
    bar: { flex: 1, height: 4, backgroundColor: colors.background.tertiary, borderRadius: 2 },
    fill: { height: '100%', backgroundColor: colors.primary[500], borderRadius: 2 },
    percent: { fontSize: 11, color: colors.text.muted },
    xpBox: { marginLeft: spacing[2] },
    xp: { fontSize: 16, fontWeight: '700', color: colors.secondary[400] },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3] },
    artifact: { width: (SCREEN_WIDTH - spacing[4] * 2 - spacing[3]) / 2 - 1, backgroundColor: colors.background.secondary, borderRadius: 16, padding: spacing[3], alignItems: 'center' },
    artifactIcon: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: spacing[2] },
    artifactName: { fontSize: 14, fontWeight: '700', color: colors.text.primary, textAlign: 'center' },
    rarity: { fontSize: 10, fontWeight: '700', letterSpacing: 1, marginTop: 2 },
    artifactBar: { width: '100%', height: 4, backgroundColor: colors.background.tertiary, borderRadius: 2, marginTop: spacing[2] },
    artifactFill: { height: '100%', borderRadius: 2 },
    equippedLabel: { fontSize: 9, color: colors.success[500], fontWeight: '700', marginTop: spacing[2] },
});

export default RewardsScreen;
