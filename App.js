import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { deleteTable, init } from './util/database';
import { StyleSheet, View, ActivityIndicator, Keyboard, Platform } from 'react-native'
import { ThemeContext } from './contexts/ThemeContext'
import { themes } from './constants/themes.json';

import TasksScreen from './screens/TasksScreen';
import TaskDetails from './screens/TaskDetails';
import SettingsScreen from './screens/SettingsScreen';
import { useState, useEffect, useContext } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device'


/**
 * TODO
 * -code cleanup
 */

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  })
});

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TasksOverview() {
  const themeCtx = useContext(ThemeContext)
  const { theme } = themeCtx;
  const [expoPushToken, setExpoPushToken] = useState('');
  let backgroundColor;
  let primaryColor;
  let textColor;
  if (theme === 'green') {

    backgroundColor = themes.green.backgroundColor
    primaryColor = themes.green.primaryColor
    textColor = themes.green.textColor

  } else if (theme === 'blue') {
    backgroundColor = themes.blue.backgroundColor
    primaryColor = themes.blue.primaryColor
    textColor = themes.blue.textColor
  } else if (theme === 'orange') {
    backgroundColor = themes.orange.backgroundColor
    primaryColor = themes.orange.primaryColor
    textColor = themes.orange.textColor
  } else if (theme === 'pink') {
    backgroundColor = themes.pink.backgroundColor
    primaryColor = themes.pink.primaryColor
    textColor = themes.pink.textColor
  } else if (theme === 'white') {
    backgroundColor = themes.white.backgroundColor
    primaryColor = themes.white.primaryColor
    textColor = themes.white.textColor
  } else if (theme === 'darkGreen') {
    backgroundColor = themes.darkGreen.backgroundColor
    primaryColor = themes.darkGreen.primaryColor
    textColor = themes.darkGreen.textColor
  } else if (theme === 'darkOrange') {
    backgroundColor = themes.darkOrange.backgroundColor
    primaryColor = themes.darkOrange.primaryColor
    textColor = themes.darkOrange.textColor
  } else if (theme === 'darkGray') {
    backgroundColor = themes.darkGray.backgroundColor
    primaryColor = themes.darkGray.primaryColor
    textColor = themes.darkGray.textColor
  } else if (theme === 'darkBlue') {
    backgroundColor = themes.darkBlue.backgroundColor
    primaryColor = themes.darkBlue.primaryColor
    textColor = themes.darkBlue.textColor
  } else if (theme === 'darkPink') {
    backgroundColor = themes.darkPink.backgroundColor
    primaryColor = themes.darkPink.primaryColor
    textColor = themes.darkPink.textColor
  }

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
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

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else { return; }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }
    return token;
  }


  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: textColor,
        tabBarInactiveTintColor: textColor,
        tabBarStyle: {
          height: 65,
          backgroundColor: backgroundColor,
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
            <View style={focused && [styles.activeBackground, { backgroundColor: primaryColor }]}>
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
            <View style={focused && [styles.activeBackground, { backgroundColor: primaryColor }]}>
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
      <ThemeProvider>
        <View style={styles.loaderContainer}>
          <ActivityIndicator style={styles.activityLoader} size='large' color='#487db9' />
        </View>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <StatusBar style='auto' />
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
