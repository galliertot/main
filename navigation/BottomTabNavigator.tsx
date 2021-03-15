import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform } from 'react-native';

import * as Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import TagScreen from '../screens/TagScreen';
import ProfilScreen from '../screens/ProfilScreen';

const BottomTab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const DiscoverStack = createStackNavigator();
const ProfilStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </HomeStack.Navigator>
  );
}

function DiscoverNavigator() {
  return (
    <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
      <DiscoverStack.Screen
        name="DiscoverScreen"
        component={DiscoverScreen}
      />
      <DiscoverStack.Screen
        name="TagScreen"
        component={TagScreen}
      />
    </DiscoverStack.Navigator>
  );
}

function ProfilNavigator() {
  return (
    <ProfilStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfilStack.Screen
        name="ProfilScreen"
        component={ProfilScreen}
        options={{ headerTitle: 'Tab Three Title' }}
      />
    </ProfilStack.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={24} {...props} />;
}

export default function BottomTabNavigator(): JSX.Element {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.light,
        keyboardHidesTabBar: true,
        inactiveTintColor: Colors.lightGray,
        safeAreaInsets: {
          bottom: Platform.OS === 'android' ? 10 : undefined,
          top: Platform.OS === 'android' ? 10 : undefined,
        },
        style: { backgroundColor: Colors.gray, borderTopColor: Colors.lightGray, borderTopWidth: 0.2 },
      }}
    >
      <BottomTab.Screen
        name="Accueil"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Découvrir"
        component={DiscoverNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-search-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profil"
        component={ProfilNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-person-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
