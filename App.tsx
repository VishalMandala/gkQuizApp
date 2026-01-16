/**
 * Global Quest - Main App with Navigation
 * Premium UI with working tab navigation
 */

import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import WorldMapScreen from './src/screens/WorldMapScreen';
import PuzzlePathScreen from './src/screens/PuzzlePathScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import QuestionScreen from './src/screens/QuestionScreen';

// ============================================================================
// NAVIGATION SETUP
// ============================================================================

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ============================================================================
// CUSTOM TAB BAR
// ============================================================================

const CustomTabBar: React.FC<{ state: any; descriptors: any; navigation: any }> = ({ state, descriptors, navigation }) => {
  const tabConfig = [
    { name: 'Home', icon: '🏠' },
    { name: 'Map', icon: '🌍' },
    { name: 'Puzzle', icon: '🧩' },
    { name: 'Rewards', icon: '🏆' },
    { name: 'Profile', icon: '👤' },
  ];

  return (
    <View style={styles.tabBarContainer}>
      <LinearGradient
        colors={['rgba(17, 29, 50, 0.98)', 'rgba(10, 22, 40, 1)']}
        style={styles.tabBar}
      >
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const tab = tabConfig[index];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tabItem}
            >
              {isFocused && (
                <View style={styles.activeIndicator}>
                  <LinearGradient
                    colors={['#6366F1', '#4F46E5', '#4338CA']}
                    style={styles.activeIndicatorGradient}
                  />
                </View>
              )}
              <Text style={[styles.tabIcon, isFocused && styles.tabIconActive]}>
                {tab.icon}
              </Text>
              <Text style={[styles.tabName, isFocused && styles.tabNameActive]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </View>
  );
};

// ============================================================================
// TAB NAVIGATOR
// ============================================================================

const TabNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Map" component={WorldMapScreen} />
    <Tab.Screen name="Puzzle" component={PuzzlePathScreen} />
    <Tab.Screen name="Rewards" component={RewardsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen
              name="Question"
              component={QuestionScreen}
              options={{
                animation: 'slide_from_bottom',
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030712',
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -12,
    width: 45,
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  activeIndicatorGradient: {
    flex: 1,
  },
  tabIcon: {
    fontSize: 24,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabName: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  tabNameActive: {
    color: '#818CF8',
    fontWeight: '600',
  },
});
