/**
 * Global Quest - Premium Home Screen V3
 * With entrance animations and enhanced visual polish
 */

import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity,
  Dimensions, Platform, Animated, Easing
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
  bg: { deep: '#030712', primary: '#0a1628', card: '#111d32', cardLight: '#1a2942' },
  accent: { indigo: '#6366F1', indigoLight: '#818CF8', purple: '#8B5CF6', gold: '#F59E0B', goldLight: '#FBBF24', orange: '#F97316', pink: '#EC4899', green: '#10B981', cyan: '#06B6D4', red: '#EF4444' },
  text: { white: '#FFFFFF', primary: '#F1F5F9', secondary: '#CBD5E1', muted: '#64748B', accent: '#FBBF24' },
  gradients: {
    dailyChallenge: ['#4338CA', '#5B21B6', '#7C3AED'],
    streak: ['#F97316', '#EA580C', '#DC2626'],
    gold: ['#FBBF24', '#F59E0B', '#D97706'],
    button: ['#6366F1', '#4F46E5', '#4338CA'],
  },
};

const spacing = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32 };

// ============================================================================
// MOCK DATA
// ============================================================================

const mockData = {
  userName: 'Alex',
  streak: 47,
  timer: '23:47:12',
  rank: 4823,
  totalPlayers: 127459,
  rankChange: 234,
  fact: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  continents: [
    { id: 'ASIA', name: 'Asia', emoji: '🌏', progress: 32, color: '#EC4899' },
    { id: 'AFRICA', name: 'Africa', emoji: '🦁', progress: 80, color: '#FBBF24' },
    { id: 'EUROPE', name: 'Europe', emoji: '🏰', progress: 65, color: '#60A5FA' },
    { id: 'AMERICAS', name: 'Americas', emoji: '🗽', progress: 28, color: '#34D399' },
  ],
};

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
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return { opacity, translateY, scale };
};

const usePulseAnimation = (delay: number = 0) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.05,
              duration: 1500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 1500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    };
    pulse();
  }, []);

  return scale;
};

const useFireAnimation = () => {
  const fires = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    fires.forEach((fire, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fire, {
            toValue: 1,
            duration: 300 + index * 50,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(fire, {
            toValue: 0,
            duration: 300 + index * 50,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return fires;
};

const useContinentAnimation = (index: number) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(600 + index * 100),
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return { scale, opacity };
};

// ============================================================================
// SVG ICONS
// ============================================================================

const BellIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ProfileIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" stroke="#94A3B8" strokeWidth="2" />
    <Path d="M20 21a8 8 0 00-16 0" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// ============================================================================
// ANIMATED BACKGROUND
// ============================================================================

const AnimatedStar: React.FC<{ delay: number; left: string; top: string; size: number }> = ({ delay, left, top, size }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, { toValue: 0.8, duration: 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.2, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.star,
        { left, top, width: size, height: size, opacity },
      ]}
    />
  );
};

const StarryBackground = () => (
  <View style={styles.bgContainer}>
    <LinearGradient
      colors={['#030712', '#0a1628', '#111d32', '#0a1628']}
      locations={[0, 0.3, 0.7, 1]}
      style={StyleSheet.absoluteFill}
    />
    <View style={[styles.glowOrb, { top: '5%', left: '10%', backgroundColor: colors.accent.indigo }]} />
    <View style={[styles.glowOrb, styles.glowOrbLarge, { top: '40%', right: '-10%', backgroundColor: colors.accent.purple }]} />
    <View style={[styles.glowOrb, { bottom: '20%', left: '-5%', backgroundColor: colors.accent.cyan }]} />
    {/* Animated twinkling stars */}
    {Array.from({ length: 30 }).map((_, i) => (
      <AnimatedStar
        key={i}
        delay={Math.random() * 2000}
        left={`${Math.random() * 100}%`}
        top={`${Math.random() * 100}%`}
        size={Math.random() * 2 + 1}
      />
    ))}
  </View>
);

// ============================================================================
// ANIMATED HEADER
// ============================================================================

const Header = () => {
  const { opacity, translateY } = useEntranceAnimation(100);

  return (
    <Animated.View style={[styles.header, { opacity, transform: [{ translateY }] }]}>
      <View style={styles.headerLeft}>
        <Text style={styles.greeting}>Good Morning, {mockData.userName}!</Text>
        <Text style={styles.subtitle}>"Today's mystery: Why do no rivers flow OUT of the sea?"</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerIcon}><BellIcon /></TouchableOpacity>
        <TouchableOpacity style={styles.headerIconPrimary}><ProfileIcon /></TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// ============================================================================
// DAILY CHALLENGE (Animated)
// ============================================================================

const DailyChallengeCard = () => {
  const { opacity, translateY, scale } = useEntranceAnimation(200);
  const pulseScale = usePulseAnimation(1000);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
      <TouchableOpacity activeOpacity={0.95} style={styles.dailyWrapper}>
        <LinearGradient colors={colors.gradients.dailyChallenge} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.dailyCard}>
          <View style={styles.dailyGlow} />
          <View style={styles.dailyBadge}>
            <Text style={styles.dailyBadgeIcon}>🔥</Text>
            <Text style={styles.dailyBadgeText}>DAILY CHALLENGE</Text>
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timerIcon}>⏱️</Text>
            <Text style={styles.timerValue}>{mockData.timer}</Text>
            <Text style={styles.timerLabel}>Time Remaining</Text>
          </View>
          <View style={styles.dailyStats}>
            <View style={styles.dailyStatPill}><Text style={styles.dailyStatText}>5 Questions</Text></View>
            <View style={[styles.dailyStatPill, styles.xpPill]}><Text style={styles.xpPillText}>+100 XP ⭐</Text></View>
          </View>
          <Animated.View style={{ transform: [{ scale: pulseScale }] }}>
            <TouchableOpacity style={styles.dailyButton}>
              <LinearGradient colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.15)']} style={styles.dailyButtonInner}>
                <Text style={styles.dailyButtonText}>Start Quiz</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ============================================================================
// STREAK CARD (with Fire Animation)
// ============================================================================

const StreakCard = () => {
  const { opacity, translateY, scale } = useEntranceAnimation(300);
  const fires = useFireAnimation();

  return (
    <Animated.View style={[{ flex: 1, opacity, transform: [{ translateY }, { scale }] }]}>
      <View style={styles.streakWrapper}>
        <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.streakCard}>
          <View style={styles.streakHeader}><Text style={styles.sectionLabel}>YOUR STREAK</Text></View>
          <View style={styles.fireRow}>
            {fires.map((fire, i) => (
              <Animated.Text
                key={i}
                style={[
                  styles[`fire${i + 1}` as keyof typeof styles],
                  {
                    transform: [
                      { translateY: fire.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) },
                      { scale: fire.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] }) },
                    ],
                  },
                ]}
              >
                🔥
              </Animated.Text>
            ))}
          </View>
          <LinearGradient colors={colors.gradients.streak} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.streakBadge}>
            <Text style={styles.streakNumber}>{mockData.streak}</Text>
            <Text style={styles.streakDays}>DAYS</Text>
          </LinearGradient>
          <Text style={styles.streakMessage}>Building momentum!</Text>
          <Text style={styles.xpBonusText}>+10% XP Bonus</Text>
          <View style={styles.progressTrack}>
            <LinearGradient colors={colors.gradients.gold} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.progressFill, { width: `${mockData.streak}%` }]} />
          </View>
          <Text style={styles.progressText}>{100 - mockData.streak} to Platinum</Text>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

// ============================================================================
// EXPLORE WORLD (with Staggered Continent Animation)
// ============================================================================

const ContinentItem: React.FC<{ continent: typeof mockData.continents[0]; index: number }> = ({ continent, index }) => {
  const { scale, opacity } = useContinentAnimation(index);

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <TouchableOpacity style={styles.continentItem}>
        <View style={[styles.continentOuter, { borderColor: continent.color }]}>
          <LinearGradient colors={[`${continent.color}40`, `${continent.color}15`]} style={styles.continentInner}>
            <Text style={styles.continentIcon}>{continent.emoji}</Text>
          </LinearGradient>
        </View>
        <Text style={styles.continentName}>{continent.name}</Text>
        <Text style={[styles.continentPercent, { color: continent.color }]}>{continent.progress}%</Text>
        {continent.progress >= 80 && (
          <View style={styles.completeBadge}><Text style={styles.completeText}>Complete</Text></View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const ExploreWorldCard = () => {
  const { opacity, translateY } = useEntranceAnimation(400);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <View style={styles.exploreWrapper}>
        <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.exploreCard}>
          <Text style={styles.sectionLabel}>EXPLORE THE WORLD 🌍</Text>
          <View style={styles.continentGrid}>
            {mockData.continents.map((continent, index) => (
              <ContinentItem key={continent.id} continent={continent} index={index} />
            ))}
          </View>
          <TouchableOpacity style={styles.mapButton}>
            <LinearGradient colors={colors.gradients.button} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.mapButtonGradient}>
              <Text style={styles.mapButtonText}>VIEW WORLD MAP</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

// ============================================================================
// FRIEND DUELS (Animated)
// ============================================================================

const FriendDuelsCard = () => {
  const { opacity, translateY, scale } = useEntranceAnimation(500);
  const iconScale = usePulseAnimation(1500);

  return (
    <Animated.View style={[{ flex: 1, opacity, transform: [{ translateY }, { scale }] }]}>
      <View style={styles.duelsWrapper}>
        <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.duelsCard}>
          <Text style={styles.sectionLabel}>FRIEND DUELS</Text>
          <Animated.View style={[styles.duelsIconContainer, { transform: [{ scale: iconScale }] }]}>
            <Text style={styles.duelsMainIcon}>⚔️</Text>
            <View style={styles.lightningBadge}><Text style={styles.lightningIcon}>⚡</Text></View>
          </Animated.View>
          <View style={styles.challengesPill}><Text style={styles.challengesText}>3 challenges waiting 🎯</Text></View>
          <TouchableOpacity style={styles.acceptButton}>
            <LinearGradient colors={colors.gradients.gold} style={styles.acceptButtonGradient}>
              <Text style={styles.acceptButtonText}>Accept Challenges</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

// ============================================================================
// TODAY'S DISCOVERY (Animated)
// ============================================================================

const TodaysDiscoveryCard = () => {
  const { opacity, translateY, scale } = useEntranceAnimation(550);

  return (
    <Animated.View style={[{ flex: 1, opacity, transform: [{ translateY }, { scale }] }]}>
      <View style={styles.discoveryWrapper}>
        <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.discoveryCard}>
          <Text style={styles.sectionLabel}>TODAY'S DISCOVERY 💡</Text>
          <View style={styles.discoveryContent}>
            <Text style={styles.didYouKnow}>Did you know?</Text>
            <Text style={styles.factText}>{mockData.fact}</Text>
          </View>
          <Text style={styles.honeyEmoji}>🍯</Text>
          <View style={styles.discoveryButtons}>
            <TouchableOpacity style={styles.shareButton}><Text style={styles.shareButtonText}>SHARE</Text></TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}><Text style={styles.saveButtonText}>SAVE</Text></TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

// ============================================================================
// LEADERBOARD (Animated)
// ============================================================================

const LeaderboardCard = () => {
  const { opacity, translateY } = useEntranceAnimation(650);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <TouchableOpacity activeOpacity={0.9} style={styles.leaderboardWrapper}>
        <LinearGradient colors={[colors.bg.card, colors.bg.cardLight]} style={styles.leaderboardCard}>
          <View style={styles.leaderboardLeft}>
            <Text style={styles.leaderboardIcon}>📊</Text>
            <View style={styles.leaderboardInfo}>
              <Text style={styles.sectionLabel}>GLOBAL LEADERBOARD</Text>
              <Text style={styles.leaderboardRank}>#{mockData.rank.toLocaleString()} of {mockData.totalPlayers.toLocaleString()} players</Text>
            </View>
          </View>
          <View style={styles.rankChangeBadge}>
            <Text style={styles.rankArrow}>▲</Text>
            <Text style={styles.rankChangeNumber}>{mockData.rankChange}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ============================================================================
// TAB BAR (Animated)
// ============================================================================

const TabBar = () => {
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

  const tabs = [
    { name: 'Home', icon: '🏠', active: true },
    { name: 'Map', icon: '🌍', active: false },
    { name: 'Progress', icon: '📊', active: false },
    { name: 'Rewards', icon: '🏆', active: false },
    { name: 'Profile', icon: '👤', active: false },
  ];

  return (
    <Animated.View style={[styles.tabBarWrapper, { opacity, transform: [{ translateY }] }]}>
      <LinearGradient colors={['rgba(17, 29, 50, 0.98)', 'rgba(10, 22, 40, 1)']} style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab.name} style={styles.tabItem}>
            {tab.active && (
              <View style={styles.activeIndicator}>
                <LinearGradient colors={colors.gradients.button} style={styles.activeIndicatorGradient} />
              </View>
            )}
            <Text style={[styles.tabIcon, tab.active && styles.tabIconActive]}>{tab.icon}</Text>
            <Text style={[styles.tabName, tab.active && styles.tabNameActive]}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </LinearGradient>
    </Animated.View>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <StarryBackground />
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar style="light" />
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              <Header />
              <View style={styles.row}>
                <View style={styles.col60}><DailyChallengeCard /></View>
                <View style={styles.col40}><StreakCard /></View>
              </View>
              <ExploreWorldCard />
              <View style={styles.row}>
                <View style={styles.col40}><FriendDuelsCard /></View>
                <View style={styles.col60}><TodaysDiscoveryCard /></View>
              </View>
              <LeaderboardCard />
            </ScrollView>
            <TabBar />
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#030712' },
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 120 },
  bgContainer: { ...StyleSheet.absoluteFillObject },
  star: { position: 'absolute', backgroundColor: '#FFF', borderRadius: 10 },
  glowOrb: { position: 'absolute', width: 250, height: 250, borderRadius: 125, opacity: 0.12 },
  glowOrbLarge: { width: 350, height: 350, borderRadius: 175, opacity: 0.08 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  headerLeft: { flex: 1 },
  greeting: { fontSize: 26, fontWeight: '800', color: '#FFF', letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 6, fontStyle: 'italic', lineHeight: 18 },
  headerRight: { flexDirection: 'row', gap: 10, marginLeft: 16 },
  headerIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(30, 41, 59, 0.8)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  headerIconPrimary: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(99, 102, 241, 0.25)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(99,102,241,0.3)' },
  row: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  col60: { flex: 0.58 },
  col40: { flex: 0.42 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#64748B', letterSpacing: 1.5, marginBottom: 12 },
  dailyWrapper: { borderRadius: 20, overflow: 'hidden' },
  dailyCard: { padding: 16, borderRadius: 20, position: 'relative', overflow: 'hidden' },
  dailyGlow: { position: 'absolute', top: -60, right: -60, width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255,255,255,0.15)' },
  dailyBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dailyBadgeIcon: { fontSize: 16 },
  dailyBadgeText: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.85)', letterSpacing: 1.5 },
  timerContainer: { alignItems: 'center', marginVertical: 16 },
  timerIcon: { fontSize: 18, marginBottom: 4 },
  timerValue: { fontSize: 38, fontWeight: '800', color: '#FFF', letterSpacing: 2, fontVariant: ['tabular-nums'] },
  timerLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  dailyStats: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 16 },
  dailyStatPill: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  dailyStatText: { fontSize: 12, color: '#FFF', fontWeight: '600' },
  xpPill: { backgroundColor: 'rgba(251, 191, 36, 0.35)' },
  xpPillText: { fontSize: 12, color: '#FBBF24', fontWeight: '700' },
  dailyButton: { borderRadius: 14, overflow: 'hidden' },
  dailyButtonInner: { paddingVertical: 14, alignItems: 'center', borderRadius: 14 },
  dailyButtonText: { fontSize: 15, fontWeight: '700', color: '#FFF' },
  streakWrapper: { flex: 1, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(251, 191, 36, 0.2)' },
  streakCard: { flex: 1, padding: 16, borderRadius: 20 },
  streakHeader: {},
  fireRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 8, height: 35 },
  fire1: { fontSize: 22 },
  fire2: { fontSize: 26, marginLeft: -4 },
  fire3: { fontSize: 30, marginLeft: -4 },
  fire4: { fontSize: 26, marginLeft: -4 },
  fire5: { fontSize: 22, marginLeft: -4 },
  streakBadge: { alignSelf: 'center', flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 14, gap: 4 },
  streakNumber: { fontSize: 40, fontWeight: '900', color: '#FFF' },
  streakDays: { fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.9)', letterSpacing: 1 },
  streakMessage: { fontSize: 13, color: '#FBBF24', textAlign: 'center', fontWeight: '600', marginTop: 8 },
  xpBonusText: { fontSize: 11, color: '#64748B', textAlign: 'center', marginTop: 2 },
  progressTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, marginTop: 12, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressText: { fontSize: 10, color: '#64748B', textAlign: 'center', marginTop: 6 },
  exploreWrapper: { borderRadius: 20, overflow: 'hidden', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  exploreCard: { padding: 16, borderRadius: 20 },
  continentGrid: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8 },
  continentItem: { alignItems: 'center', width: 75 },
  continentOuter: { width: 60, height: 60, borderRadius: 30, borderWidth: 3, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  continentInner: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  continentIcon: { fontSize: 26 },
  continentName: { fontSize: 12, color: '#F1F5F9', fontWeight: '600' },
  continentPercent: { fontSize: 13, fontWeight: '700', marginTop: 2 },
  completeBadge: { backgroundColor: 'rgba(251, 191, 36, 0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginTop: 4 },
  completeText: { fontSize: 9, color: '#FBBF24', fontWeight: '600' },
  mapButton: { marginTop: 16, borderRadius: 14, overflow: 'hidden' },
  mapButtonGradient: { paddingVertical: 14, alignItems: 'center', borderRadius: 14 },
  mapButtonText: { fontSize: 14, fontWeight: '700', color: '#FFF', letterSpacing: 1 },
  duelsWrapper: { flex: 1, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  duelsCard: { flex: 1, padding: 16, borderRadius: 20, alignItems: 'center', justifyContent: 'center', minHeight: 210 },
  duelsIconContainer: { position: 'relative', marginBottom: 12 },
  duelsMainIcon: { fontSize: 50 },
  lightningBadge: { position: 'absolute', top: -8, right: -16, width: 30, height: 30, borderRadius: 15, backgroundColor: '#F59E0B', justifyContent: 'center', alignItems: 'center' },
  lightningIcon: { fontSize: 16 },
  challengesPill: { backgroundColor: 'rgba(239, 68, 68, 0.2)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 14, marginBottom: 14 },
  challengesText: { fontSize: 11, color: '#F87171', fontWeight: '600' },
  acceptButton: { width: '100%', borderRadius: 12, overflow: 'hidden' },
  acceptButtonGradient: { paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  acceptButtonText: { fontSize: 13, fontWeight: '700', color: '#1A1A1A' },
  discoveryWrapper: { flex: 1, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  discoveryCard: { flex: 1, padding: 16, borderRadius: 20, minHeight: 210, position: 'relative', overflow: 'hidden' },
  discoveryContent: { flex: 1 },
  didYouKnow: { fontSize: 12, color: '#FBBF24', fontWeight: '600', marginBottom: 6 },
  factText: { fontSize: 13, color: '#E2E8F0', lineHeight: 20, fontStyle: 'italic' },
  honeyEmoji: { position: 'absolute', right: 10, bottom: 50, fontSize: 45, opacity: 0.5 },
  discoveryButtons: { flexDirection: 'row', gap: 10, marginTop: 'auto' },
  shareButton: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  shareButtonText: { fontSize: 12, fontWeight: '700', color: '#CBD5E1' },
  saveButton: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  saveButtonText: { fontSize: 12, fontWeight: '700', color: '#CBD5E1' },
  leaderboardWrapper: { borderRadius: 20, overflow: 'hidden', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  leaderboardCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 20 },
  leaderboardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  leaderboardIcon: { fontSize: 28 },
  leaderboardInfo: {},
  leaderboardRank: { fontSize: 13, color: '#CBD5E1', marginTop: 2 },
  rankChangeBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(16, 185, 129, 0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  rankArrow: { fontSize: 12, color: '#34D399' },
  rankChangeNumber: { fontSize: 14, fontWeight: '700', color: '#34D399' },
  tabBarWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  tabBar: { flexDirection: 'row', paddingTop: 12, paddingBottom: Platform.OS === 'ios' ? 30 : 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  tabItem: { flex: 1, alignItems: 'center', position: 'relative' },
  activeIndicator: { position: 'absolute', top: -12, width: 45, height: 3, borderRadius: 2, overflow: 'hidden' },
  activeIndicatorGradient: { flex: 1 },
  tabIcon: { fontSize: 24, opacity: 0.5 },
  tabIconActive: { opacity: 1 },
  tabName: { fontSize: 10, color: '#64748B', marginTop: 4, fontWeight: '500' },
  tabNameActive: { color: '#818CF8', fontWeight: '600' },
});
