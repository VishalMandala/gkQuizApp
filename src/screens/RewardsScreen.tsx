/**
 * Global Quest - Premium Rewards Screen
 * Matching Gemini 3 Pro mockup quality
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
    bg: { deep: '#030712', card: '#111d32', cardLight: '#1a2942' },
    accent: { indigo: '#6366F1', purple: '#8B5CF6', gold: '#FBBF24', green: '#10B981', red: '#EF4444' },
    text: { white: '#FFF', primary: '#F1F5F9', secondary: '#CBD5E1', muted: '#64748B' },
    rarity: { common: '#9CA3AF', rare: '#60A5FA', epic: '#A78BFA', legendary: '#FBBF24' },
};

const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32 };

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
    const translateY = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { opacity, translateY };
};

const useStaggeredAnimation = (index: number) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-30)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(300 + index * 80),
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.timing(translateX, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return { opacity, translateX };
};

// ============================================================================
// COMPONENTS
// ============================================================================

type TabType = 'achievements' | 'artifacts';

const Header: React.FC<{ unlockedCount: number; ownedCount: number }> = ({ unlockedCount, ownedCount }) => {
    const { opacity, translateY } = useEntranceAnimation(100);

    return (
        <Animated.View style={[styles.header, { opacity, transform: [{ translateY }] }]}>
            <Text style={styles.headerTitle}>Rewards</Text>
            <View style={styles.headerBadges}>
                <View style={styles.badge}><Text style={styles.badgeText}>🏆 {unlockedCount}/{achievements.length}</Text></View>
                <View style={styles.badge}><Text style={styles.badgeText}>✨ {ownedCount}/{artifacts.length}</Text></View>
            </View>
        </Animated.View>
    );
};

const TabSelector: React.FC<{ activeTab: TabType; onTabChange: (tab: TabType) => void }> = ({ activeTab, onTabChange }) => {
    const { opacity, translateY } = useEntranceAnimation(150);

    return (
        <Animated.View style={[styles.tabContainer, { opacity, transform: [{ translateY }] }]}>
            <TouchableOpacity style={[styles.tab, activeTab === 'achievements' && styles.tabActive]} onPress={() => onTabChange('achievements')}>
                <Text style={[styles.tabText, activeTab === 'achievements' && styles.tabTextActive]}>🏆 Achievements</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, activeTab === 'artifacts' && styles.tabActive]} onPress={() => onTabChange('artifacts')}>
                <Text style={[styles.tabText, activeTab === 'artifacts' && styles.tabTextActive]}>✨ Artifacts</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const AchievementCard: React.FC<{ achievement: typeof achievements[0]; index: number }> = ({ achievement, index }) => {
    const { opacity, translateX } = useStaggeredAnimation(index);

    return (
        <Animated.View style={[styles.achievementCard, { opacity, transform: [{ translateX }] }]}>
            <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.achievementCardInner}>
                {/* Icon */}
                <View style={[styles.achievementIcon, achievement.unlocked && styles.achievementIconUnlocked]}>
                    <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                    {achievement.unlocked && (
                        <View style={styles.checkBadge}><Text style={styles.checkText}>✓</Text></View>
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
                                    colors={['#6366F1', '#4F46E5']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[styles.progressFill, { width: `${achievement.progress}%` }]}
                                />
                            </View>
                            <Text style={styles.progressLabel}>{achievement.progressLabel || `${achievement.progress}%`}</Text>
                        </View>
                    )}
                </View>

                {/* XP Badge */}
                <View style={styles.xpBadge}>
                    <LinearGradient colors={['#FBBF24', '#F59E0B']} style={styles.xpBadgeInner}>
                        <Text style={styles.xpValue}>+{achievement.xp}</Text>
                        <Text style={styles.xpLabel}>XP</Text>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </Animated.View>
    );
};

const ArtifactCard: React.FC<{ artifact: typeof artifacts[0]; index: number }> = ({ artifact, index }) => {
    const { opacity, translateX } = useStaggeredAnimation(index);
    const rarityColor = colors.rarity[artifact.rarity as keyof typeof colors.rarity];

    return (
        <Animated.View style={[styles.artifactCard, { opacity, transform: [{ translateX }] }]}>
            <LinearGradient
                colors={[colors.bg.card, colors.bg.cardLight]}
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
            <View style={[styles.glowOrb, { top: '10%', right: '-5%', backgroundColor: colors.accent.gold }]} />
            <View style={[styles.glowOrb, { bottom: '20%', left: '-10%', backgroundColor: colors.accent.purple }]} />

            <Header unlockedCount={unlockedCount} ownedCount={ownedCount} />
            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

            <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {activeTab === 'achievements' && (
                    <View style={styles.list}>
                        {achievements.map((a, i) => <AchievementCard key={a.id} achievement={a} index={i} />)}
                    </View>
                )}
                {activeTab === 'artifacts' && (
                    <View style={styles.artifactsGrid}>
                        {artifacts.map((a, i) => <ArtifactCard key={a.id} artifact={a} index={i} />)}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#030712' },
    scroll: { flex: 1 },
    content: { padding: spacing[4], paddingBottom: 100 },
    glowOrb: { position: 'absolute', width: 250, height: 250, borderRadius: 125, opacity: 0.12 },

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing[4], paddingBottom: 0 },
    headerTitle: { fontSize: 28, fontWeight: '800', color: colors.text.white },
    headerBadges: { flexDirection: 'row', gap: spacing[2] },
    badge: { backgroundColor: 'rgba(99,102,241,0.2)', paddingHorizontal: spacing[3], paddingVertical: spacing[1], borderRadius: 20 },
    badgeText: { fontSize: 13, color: colors.text.primary, fontWeight: '600' },

    tabContainer: { flexDirection: 'row', padding: spacing[4], gap: spacing[2] },
    tab: { flex: 1, paddingVertical: spacing[3], borderRadius: 16, backgroundColor: 'rgba(30,41,59,0.8)', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
    tabActive: { backgroundColor: colors.accent.indigo, borderColor: colors.accent.indigo },
    tabText: { fontSize: 14, color: colors.text.muted, fontWeight: '600' },
    tabTextActive: { color: colors.text.white },

    list: { gap: spacing[3] },
    achievementCard: { borderRadius: 16, overflow: 'hidden' },
    achievementCardInner: { flexDirection: 'row', alignItems: 'center', padding: spacing[4], borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    achievementIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: spacing[3], position: 'relative' },
    achievementIconUnlocked: { backgroundColor: 'rgba(16, 185, 129, 0.2)' },
    achievementEmoji: { fontSize: 28 },
    checkBadge: { position: 'absolute', bottom: -4, right: -4, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.accent.green, justifyContent: 'center', alignItems: 'center' },
    checkText: { fontSize: 12, color: colors.text.white, fontWeight: '700' },
    achievementInfo: { flex: 1 },
    achievementName: { fontSize: 16, fontWeight: '700', color: colors.text.white },
    achievementDesc: { fontSize: 12, color: colors.text.muted, marginTop: 2, lineHeight: 16 },
    progressContainer: { flexDirection: 'row', alignItems: 'center', marginTop: spacing[2], gap: spacing[2] },
    progressTrack: { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 3 },
    progressLabel: { fontSize: 11, color: colors.text.muted, fontWeight: '500', minWidth: 60 },
    xpBadge: { marginLeft: spacing[3] },
    xpBadgeInner: { paddingHorizontal: spacing[3], paddingVertical: spacing[2], borderRadius: 12, alignItems: 'center' },
    xpValue: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
    xpLabel: { fontSize: 10, fontWeight: '700', color: '#1A1A1A', marginTop: -2 },

    artifactsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3] },
    artifactCard: { width: (SCREEN_WIDTH - spacing[4] * 2 - spacing[3]) / 2 - 1, borderRadius: 16, overflow: 'hidden' },
    artifactCardInner: { padding: spacing[4], alignItems: 'center', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    artifactIconContainer: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginBottom: spacing[3] },
    artifactEmoji: { fontSize: 36 },
    artifactName: { fontSize: 14, fontWeight: '700', color: colors.text.white, textAlign: 'center' },
    artifactRarity: { fontSize: 10, fontWeight: '700', letterSpacing: 1, marginTop: 2 },
    artifactProgressContainer: { width: '100%', marginTop: spacing[3] },
    artifactProgressTrack: { height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' },
    artifactProgressFill: { height: '100%', borderRadius: 2 },
    artifactProgressText: { fontSize: 10, color: colors.text.muted, textAlign: 'center', marginTop: 4 },
    equippedText: { fontSize: 10, fontWeight: '700', color: colors.accent.green, marginTop: spacing[3] },
    equipBtn: { marginTop: spacing[3], paddingVertical: spacing[2], paddingHorizontal: spacing[4], borderRadius: 10 },
    equipBtnText: { fontSize: 11, fontWeight: '700', color: '#1A1A1A' },
});

export default RewardsScreen;
