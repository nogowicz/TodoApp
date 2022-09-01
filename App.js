import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { deleteTable, init } from './util/database';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { ThemeContext } from './contexts/ThemeContext'
import { themes } from './constants/themes.json';

import TasksScreen from './screens/TasksScreen';
import SettingsScreen from './screens/SettingsScreen';
import { useState, useEffect, useContext } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';


/**
 * TODO
 * -zrobić ekran edycji task'a, np szufladę wyciąganą z dołu
 * -zrobić ekran ustawień
 * -zrobić kolor akcentu 
 * -zrobić listę movable
 */



const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TasksOverview() {
  const themeCtx = useContext(ThemeContext)
  const { theme } = themeCtx;

  let backgroundColor;
  let primaryColor;
  let bottomTabsColor;
  let accentColor;
  let accentDarkerColor;
  let textColor;
  if (theme === 'green') {

    backgroundColor = themes.lightGreen.backgroundColor
    primaryColor = themes.lightGreen.primaryColor
    bottomTabsColor = themes.lightGreen.bottomTabsColor
    accentColor = themes.lightGreen.accentColor
    accentDarkerColor = themes.lightGreen.accentDarkerColor
    textColor = themes.lightGreen.textColor

  } else if (theme === 'blue') {
    backgroundColor = themes.lightBlue.backgroundColor
    primaryColor = themes.lightBlue.primaryColor
    bottomTabsColor = themes.lightBlue.bottomTabsColor
    accentColor = themes.lightBlue.accentColor
    accentDarkerColor = themes.lightBlue.accentDarkerColor
    textColor = themes.lightBlue.textColor
  } else if (theme === 'orange') {
    backgroundColor = themes.lightOrange.backgroundColor
    primaryColor = themes.lightOrange.primaryColor
    bottomTabsColor = themes.lightOrange.bottomTabsColor
    accentColor = themes.lightOrange.accentColor
    accentDarkerColor = themes.lightOrange.accentDarkerColor
    textColor = themes.lightOrange.textColor
  } else if (theme === 'pink') {
    backgroundColor = themes.lightPink.backgroundColor
    primaryColor = themes.lightPink.primaryColor
    bottomTabsColor = themes.lightPink.bottomTabsColor
    accentColor = themes.lightPink.accentColor
    accentDarkerColor = themes.lightPink.accentDarkerColor
    textColor = themes.lightPink.textColor
  } else if (theme === 'white') {
    backgroundColor = themes.white.backgroundColor
    primaryColor = themes.white.primaryColor
    bottomTabsColor = themes.white.bottomTabsColor
    accentColor = themes.white.accentColor
    accentDarkerColor = themes.white.accentDarkerColor
    textColor = themes.white.textColor
  }


  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: textColor,
        tabBarInactiveTintColor: textColor,
        tabBarStyle: {
          height: 65,
          backgroundColor: bottomTabsColor,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: backgroundColor,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          borderBottomWidth: 0,
        },
        title: null,
      }

      }>
      <BottomTabs.Screen
        name='Tasks'
        component={TasksScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ focused }) => (
            <View style={focused && [styles.activeBackground, { backgroundColor: accentColor }]}>
              <MaterialCommunityIcons name="checkbox-marked-outline" size={28} color={textColor} />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 13,
          },

        }}
      />
      <BottomTabs.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused }) => (
            <View style={focused && [styles.activeBackground, { backgroundColor: accentColor }]}>
              <MaterialCommunityIcons name="cog-outline" size={28} color={textColor} />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
      />
    </BottomTabs.Navigator >
  );
}



export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);


  useEffect(() => {
    // deleteTable();
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator style={styles.activityLoader} size='large' color='#487db9' />
      </View>
    );
  }


  return (
    <ThemeProvider>
      <StatusBar style={'dark'} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='TasksOverview'
            component={TasksOverview}
            options={{
              headerShown: false,
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>

  );
}


const styles = StyleSheet.create({
  activeBackground: {
    width: 56,
    borderRadius: 30,
    alignItems: 'center'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  activityLoader: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
