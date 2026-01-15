/**
 * Global Quest - Home Screen Component
 * The main dashboard with bento grid layout
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borders, typography } from '../theme';
import type { UserStreak, UserXP, DailyChallenge, Duel, DailyDiscovery, Continent } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = spacing[3];
const CARD_PADDING = spacing[4];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface HeaderProps {
    userName: string;
    greeting: string;
    mysteryHook: string;
}

const Header: React.FC<HeaderProps> = ({ userName, greeting, mysteryHook }) => (
    <View style={styles.header}>
        <View style={styles.headerTop}>
            <View>
                <Text style={styles.greeting}>{greeting}, {userName}!</Text>
                <Text style={styles.mysteryHook}>"{mysteryHook}"</Text>
            </View>
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton}>
                    <Text style={styles.iconEmoji}>🔔</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Text style={styles.iconEmoji}>👤</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

interface DailyChallengeCardProps {
    challenge: DailyChallenge;
    onPress: () => void;
}

const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({ challenge, onPress }) => {
    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <LinearGradient
                colors={[colors.primary[600], colors.primary[700]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.card, styles.dailyChallengeCard]}
            >
                <View style={styles.cardHeader}>
                    <Text style={styles.cardEmoji}>🔥</Text>
                    <Text style={styles.cardTitle}>DAILY CHALLENGE</Text>
                </View>

                <View style={styles.challengeContent}>
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerLabel}>⏱️</Text>
                        <Text style={styles.timerValue}>{formatTime(challenge.timeRemaining)}</Text>
                    </View>

                    <View style={styles.challengeInfo}>
                        <Text style={styles.challengeDetail}>5 Questions</Text>
                        <Text style={styles.xpBadge}>+100 XP</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.challengeButton} onPress={onPress}>
                    <Text style={styles.challengeButtonText}>START CHALLENGE</Text>
                </TouchableOpacity>
            </LinearGradient>
        </TouchableOpacity>
    );
};

interface StreakCardProps {
    streak: UserStreak;
}

const StreakCard: React.FC<StreakCardProps> = ({ streak }) => {
    const getStreakMessage = (days: number) => {
        if (days >= 100) return "Legendary! 🏆";
        if (days >= 30) return "On Fire! 🔥";
        if (days >= 7) return "Unstoppable!";
        if (days >= 3) return "Building momentum!";
        return "Let's go!";
    };

    const fireEmojis = Array(Math.min(streak.currentStreak, 7)).fill('🔥').join('');

    return (
        <View style={[styles.card, styles.streakCard]}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardEmoji}>🏆</Text>
                <Text style={styles.cardTitle}>YOUR STREAK</Text>
            </View>

            <Text style={styles.fireEmojis}>{fireEmojis || '🔥'}</Text>

            <Text style={styles.streakCount}>{streak.currentStreak} DAYS</Text>
            <Text style={styles.streakMessage}>{getStreakMessage(streak.currentStreak)}</Text>

            <View style={styles.streakProgress}>
                <View
                    style={[
                        styles.streakProgressFill,
                        { width: `${Math.min((streak.currentStreak / 100) * 100, 100)}%` }
                    ]}
                />
            </View>
            <Text style={styles.streakTarget}>
                {100 - streak.currentStreak} to Platinum
            </Text>
        </View>
    );
};

interface ContinentPreview {
    id: Continent;
    name: string;
    emoji: string;
    progress: number;
}

interface ExploreWorldCardProps {
    continents: ContinentPreview[];
    onViewMap: () => void;
}

const ExploreWorldCard: React.FC<ExploreWorldCardProps> = ({ continents, onViewMap }) => (
    <View style={[styles.card, styles.exploreCard]}>
        <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>🌍</Text>
            <Text style={styles.cardTitle}>EXPLORE THE WORLD</Text>
        </View>

        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.continentList}
        >
            {continents.map((continent) => (
                <TouchableOpacity key={continent.id} style={styles.continentItem}>
                    <View style={styles.continentCircle}>
                        <Text style={styles.continentEmoji}>{continent.emoji}</Text>
                        <View style={styles.continentProgressRing}>
                            {/* Progress ring would be an SVG or animated component */}
                        </View>
                    </View>
                    <Text style={styles.continentName}>{continent.name}</Text>
                    <Text style={styles.continentProgress}>{continent.progress}%</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>

        <TouchableOpacity style={styles.mapButton} onPress={onViewMap}>
            <Text style={styles.mapButtonText}>VIEW WORLD MAP</Text>
        </TouchableOpacity>
    </View>
);

interface FriendDuelsCardProps {
    pendingCount: number;
    onBattle: () => void;
    onChallenge: () => void;
}

const FriendDuelsCard: React.FC<FriendDuelsCardProps> = ({ pendingCount, onBattle, onChallenge }) => (
    <View style={[styles.card, styles.duelsCard]}>
        <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>⚔️</Text>
            <Text style={styles.cardTitle}>FRIEND DUELS</Text>
        </View>

        {pendingCount > 0 && (
            <View style={styles.duelBadge}>
                <Text style={styles.duelBadgeText}>{pendingCount} challenges waiting!</Text>
            </View>
        )}

        <TouchableOpacity style={styles.battleButton} onPress={onBattle}>
            <Text style={styles.battleButtonText}>BATTLE NOW</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onChallenge}>
            <Text style={styles.challengeLink}>+ Challenge a Friend</Text>
        </TouchableOpacity>
    </View>
);

interface DiscoveryCardProps {
    discovery: DailyDiscovery;
    onShare: () => void;
    onSave: () => void;
}

const DiscoveryCard: React.FC<DiscoveryCardProps> = ({ discovery, onShare, onSave }) => (
    <View style={[styles.card, styles.discoveryCard]}>
        <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>💡</Text>
            <Text style={styles.cardTitle}>TODAY'S DISCOVERY</Text>
        </View>

        <Text style={styles.discoveryFact}>"{discovery.factShort}"</Text>

        <View style={styles.discoveryActions}>
            <TouchableOpacity style={styles.discoveryAction} onPress={onShare}>
                <Text style={styles.discoveryActionText}>SHARE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.discoveryAction} onPress={onSave}>
                <Text style={styles.discoveryActionText}>SAVE</Text>
            </TouchableOpacity>
        </View>
    </View>
);

interface LeaderboardPreviewProps {
    rank: number;
    totalPlayers: number;
    changeToday: number;
    onViewFull: () => void;
}

const LeaderboardPreview: React.FC<LeaderboardPreviewProps> = ({
    rank,
    totalPlayers,
    changeToday,
    onViewFull
}) => (
    <TouchableOpacity style={[styles.card, styles.leaderboardCard]} onPress={onViewFull}>
        <View style={styles.leaderboardContent}>
            <Text style={styles.cardEmoji}>📊</Text>
            <View style={styles.leaderboardInfo}>
                <Text style={styles.leaderboardTitle}>GLOBAL LEADERBOARD</Text>
                <Text style={styles.leaderboardRank}>
                    #{rank.toLocaleString()} of {totalPlayers.toLocaleString()} players
                </Text>
            </View>
            {changeToday > 0 && (
                <Text style={styles.leaderboardChange}>▲ {changeToday}</Text>
            )}
        </View>
    </TouchableOpacity>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface HomeScreenProps {
    user: {
        name: string;
    };
    streak: UserStreak;
    xp: UserXP;
    dailyChallenge: DailyChallenge;
    duels: Duel[];
    discovery: DailyDiscovery;
    continentProgress: ContinentPreview[];
    leaderboardRank: number;
    leaderboardTotal: number;
    leaderboardChange: number;
    // Navigation
    onStartChallenge: () => void;
    onViewMap: () => void;
    onBattleDuels: () => void;
    onChallengeFriend: () => void;
    onShareDiscovery: () => void;
    onSaveDiscovery: () => void;
    onViewLeaderboard: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
    user,
    streak,
    dailyChallenge,
    duels,
    discovery,
    continentProgress,
    leaderboardRank,
    leaderboardTotal,
    leaderboardChange,
    onStartChallenge,
    onViewMap,
    onBattleDuels,
    onChallengeFriend,
    onShareDiscovery,
    onSaveDiscovery,
    onViewLeaderboard,
}) => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const pendingDuels = duels.filter(d => d.status === 'PENDING').length;

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Header
                    userName={user.name}
                    greeting={getGreeting()}
                    mysteryHook="Today's mystery: Why do no rivers flow OUT of the sea?"
                />

                {/* Row 1: Daily Challenge + Streak (50/50) */}
                <View style={styles.row}>
                    <View style={styles.halfWidth}>
                        <DailyChallengeCard
                            challenge={dailyChallenge}
                            onPress={onStartChallenge}
                        />
                    </View>
                    <View style={styles.halfWidth}>
                        <StreakCard streak={streak} />
                    </View>
                </View>

                {/* Row 2: Explore the World (Full width) */}
                <ExploreWorldCard
                    continents={continentProgress}
                    onViewMap={onViewMap}
                />

                {/* Row 3: Duels + Discovery (40/60) */}
                <View style={styles.row}>
                    <View style={styles.smallWidth}>
                        <FriendDuelsCard
                            pendingCount={pendingDuels}
                            onBattle={onBattleDuels}
                            onChallenge={onChallengeFriend}
                        />
                    </View>
                    <View style={styles.largeWidth}>
                        <DiscoveryCard
                            discovery={discovery}
                            onShare={onShareDiscovery}
                            onSave={onSaveDiscovery}
                        />
                    </View>
                </View>

                {/* Row 4: Leaderboard (Full width) */}
                <LeaderboardPreview
                    rank={leaderboardRank}
                    totalPlayers={leaderboardTotal}
                    changeToday={leaderboardChange}
                    onViewFull={onViewLeaderboard}
                />
            </ScrollView>
        </View>
    );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing[4],
        paddingBottom: spacing[24], // Space for tab bar
    },

    // Header
    header: {
        marginBottom: spacing[4],
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    greeting: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold as any,
        color: colors.text.primary,
    },
    mysteryHook: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.sm,
        color: colors.text.tertiary,
        marginTop: spacing[1],
        fontStyle: 'italic',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: spacing[2],
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: borders.radius.full,
        backgroundColor: colors.background.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconEmoji: {
        fontSize: 20,
    },

    // Layout
    row: {
        flexDirection: 'row',
        gap: CARD_GAP,
        marginBottom: CARD_GAP,
    },
    halfWidth: {
        flex: 1,
    },
    smallWidth: {
        flex: 0.4,
    },
    largeWidth: {
        flex: 0.6,
    },

    // Cards (Base)
    card: {
        backgroundColor: colors.background.secondary,
        borderRadius: borders.radius.xl,
        padding: CARD_PADDING,
        marginBottom: CARD_GAP,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing[3],
    },
    cardEmoji: {
        fontSize: 20,
        marginRight: spacing[2],
    },
    cardTitle: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.semibold as any,
        color: colors.text.tertiary,
        letterSpacing: 1,
    },

    // Daily Challenge Card
    dailyChallengeCard: {
        marginBottom: 0,
    },
    challengeContent: {
        marginBottom: spacing[3],
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing[2],
    },
    timerLabel: {
        fontSize: 16,
        marginRight: spacing[1],
    },
    timerValue: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold as any,
        color: colors.text.primary,
    },
    challengeInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    challengeDetail: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.sm,
        color: colors.text.secondary,
    },
    xpBadge: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold as any,
        color: colors.secondary[400],
    },
    challengeButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: borders.radius.md,
        paddingVertical: spacing[2],
        alignItems: 'center',
    },
    challengeButtonText: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold as any,
        color: colors.text.primary,
    },

    // Streak Card
    streakCard: {
        marginBottom: 0,
    },
    fireEmojis: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: spacing[2],
    },
    streakCount: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold as any,
        color: colors.text.primary,
        textAlign: 'center',
    },
    streakMessage: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.sm,
        color: colors.secondary[400],
        textAlign: 'center',
        marginBottom: spacing[3],
    },
    streakProgress: {
        height: 6,
        backgroundColor: colors.background.tertiary,
        borderRadius: borders.radius.full,
        overflow: 'hidden',
        marginBottom: spacing[1],
    },
    streakProgressFill: {
        height: '100%',
        backgroundColor: colors.secondary[500],
        borderRadius: borders.radius.full,
    },
    streakTarget: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.xs,
        color: colors.text.muted,
        textAlign: 'center',
    },

    // Explore World Card
    exploreCard: {},
    continentList: {
        gap: spacing[4],
        paddingVertical: spacing[2],
    },
    continentItem: {
        alignItems: 'center',
        width: 70,
    },
    continentCircle: {
        width: 56,
        height: 56,
        borderRadius: borders.radius.full,
        backgroundColor: colors.background.tertiary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing[2],
    },
    continentEmoji: {
        fontSize: 28,
    },
    continentProgressRing: {
        // Would be an absolute positioned SVG
    },
    continentName: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.xs,
        color: colors.text.primary,
        textAlign: 'center',
    },
    continentProgress: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
    },
    mapButton: {
        backgroundColor: colors.primary[600],
        borderRadius: borders.radius.md,
        paddingVertical: spacing[3],
        alignItems: 'center',
        marginTop: spacing[3],
    },
    mapButtonText: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold as any,
        color: colors.text.primary,
    },

    // Duels Card
    duelsCard: {
        marginBottom: 0,
    },
    duelBadge: {
        backgroundColor: colors.error[500],
        borderRadius: borders.radius.md,
        paddingVertical: spacing[1],
        paddingHorizontal: spacing[2],
        alignSelf: 'flex-start',
        marginBottom: spacing[3],
    },
    duelBadgeText: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.xs,
        color: colors.text.primary,
    },
    battleButton: {
        backgroundColor: colors.secondary[500],
        borderRadius: borders.radius.md,
        paddingVertical: spacing[2],
        alignItems: 'center',
        marginBottom: spacing[2],
    },
    battleButtonText: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold as any,
        color: colors.background.primary,
    },
    challengeLink: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.sm,
        color: colors.primary[400],
        textAlign: 'center',
    },

    // Discovery Card
    discoveryCard: {
        marginBottom: 0,
    },
    discoveryFact: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.base,
        color: colors.text.primary,
        lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
        marginBottom: spacing[3],
        fontStyle: 'italic',
    },
    discoveryActions: {
        flexDirection: 'row',
        gap: spacing[2],
    },
    discoveryAction: {
        flex: 1,
        backgroundColor: colors.background.tertiary,
        borderRadius: borders.radius.md,
        paddingVertical: spacing[2],
        alignItems: 'center',
    },
    discoveryActionText: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.semibold as any,
        color: colors.text.secondary,
    },

    // Leaderboard Card
    leaderboardCard: {
        flexDirection: 'row',
    },
    leaderboardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    leaderboardInfo: {
        flex: 1,
        marginLeft: spacing[2],
    },
    leaderboardTitle: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.semibold as any,
        color: colors.text.tertiary,
        letterSpacing: 1,
    },
    leaderboardRank: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.sm,
        color: colors.text.secondary,
        marginTop: spacing[0.5],
    },
    leaderboardChange: {
        fontFamily: typography.fontFamily.display,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold as any,
        color: colors.success[500],
    },
});

export default HomeScreen;
