import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { deleteTable, init } from './util/database';
import { StyleSheet, View, ActivityIndicator, Keyboard } from 'react-native'
import { ThemeContext } from './contexts/ThemeContext'
import { themes } from './constants/themes.json';

import TasksScreen from './screens/TasksScreen';
import TaskDetails from './screens/TaskDetails';
import SettingsScreen from './screens/SettingsScreen';
import { useState, useEffect, useContext } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';


/**
 * TODO
 * -zrobić ekran edycji
 * -zrobić ekran ustawień
 * -zrobić listę movable
 * -code cleanup
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

    backgroundColor = themes.green.backgroundColor
    primaryColor = themes.green.primaryColor
    bottomTabsColor = themes.green.bottomTabsColor
    accentColor = themes.green.accentColor
    accentDarkerColor = themes.green.accentDarkerColor
    textColor = themes.green.textColor

  } else if (theme === 'blue') {
    backgroundColor = themes.blue.backgroundColor
    primaryColor = themes.blue.primaryColor
    bottomTabsColor = themes.blue.bottomTabsColor
    accentColor = themes.blue.accentColor
    accentDarkerColor = themes.blue.accentDarkerColor
    textColor = themes.blue.textColor
  } else if (theme === 'orange') {
    backgroundColor = themes.orange.backgroundColor
    primaryColor = themes.orange.primaryColor
    bottomTabsColor = themes.orange.bottomTabsColor
    accentColor = themes.orange.accentColor
    accentDarkerColor = themes.orange.accentDarkerColor
    textColor = themes.orange.textColor
  } else if (theme === 'pink') {
    backgroundColor = themes.pink.backgroundColor
    primaryColor = themes.pink.primaryColor
    bottomTabsColor = themes.pink.bottomTabsColor
    accentColor = themes.pink.accentColor
    accentDarkerColor = themes.pink.accentDarkerColor
    textColor = themes.pink.textColor
  } else if (theme === 'white') {
    backgroundColor = themes.white.backgroundColor
    primaryColor = themes.white.primaryColor
    bottomTabsColor = themes.white.bottomTabsColor
    accentColor = themes.white.accentColor
    accentDarkerColor = themes.white.accentDarkerColor
    textColor = themes.white.textColor
  } else if (theme === 'darkGreen') {
    backgroundColor = themes.darkGreen.backgroundColor
    primaryColor = themes.darkGreen.primaryColor
    bottomTabsColor = themes.darkGreen.bottomTabsColor
    accentColor = themes.darkGreen.accentColor
    accentDarkerColor = themes.darkGreen.accentDarkerColor
    textColor = themes.darkGreen.textColor
  } else if (theme === 'darkRed') {
    backgroundColor = themes.darkRed.backgroundColor
    primaryColor = themes.darkRed.primaryColor
    bottomTabsColor = themes.darkRed.bottomTabsColor
    accentColor = themes.darkRed.accentColor
    accentDarkerColor = themes.darkRed.accentDarkerColor
    textColor = themes.darkRed.textColor
  } else if (theme === 'darkGrey') {
    backgroundColor = themes.darkGrey.backgroundColor
    primaryColor = themes.darkGrey.primaryColor
    bottomTabsColor = themes.darkGrey.bottomTabsColor
    accentColor = themes.darkGrey.accentColor
    accentDarkerColor = themes.darkGrey.accentDarkerColor
    textColor = themes.darkGrey.textColor
  } else if (theme === 'darkBlue') {
    backgroundColor = themes.darkBlue.backgroundColor
    primaryColor = themes.darkBlue.primaryColor
    bottomTabsColor = themes.darkBlue.bottomTabsColor
    accentColor = themes.darkBlue.accentColor
    accentDarkerColor = themes.darkBlue.accentDarkerColor
    textColor = themes.darkBlue.textColor
  } else if (theme === 'darkPink') {
    backgroundColor = themes.darkPink.backgroundColor
    primaryColor = themes.darkPink.primaryColor
    bottomTabsColor = themes.darkPink.bottomTabsColor
    accentColor = themes.darkPink.accentColor
    accentDarkerColor = themes.darkPink.accentDarkerColor
    textColor = themes.darkPink.textColor
  }
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);



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
          display: keyboardStatus ? 'none' : 'flex'
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

          <Stack.Screen
            name='TaskDetails'
            component={TaskDetails}
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
