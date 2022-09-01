import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { deleteTable, init } from './util/database';
import { StyleSheet, Text, View } from 'react-native'
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
 * -zrobić listę ukończonych zadań 
 * -zrobić listę movable
 */





const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TasksOverview() {
  const themeCtx = useContext(ThemeContext)
  const { theme } = themeCtx;

  let backgroundColor = themes.lightGreen.backgroundColor
  let primaryColor = themes.lightGreen.primaryColor
  let primaryLighterColor = themes.lightGreen.primaryLighterColor
  let primaryButtonColor = themes.lightGreen.primaryButtonColor
  let accentColor = themes.lightGreen.accentColor
  let accentDarkerColor = themes.lightGreen.accentDarkerColor
  let textColor = themes.lightGreen.textColor
  if (theme === 'green') {

    backgroundColor = themes.lightGreen.backgroundColor
    primaryColor = themes.lightGreen.primaryColor
    primaryLighterColor = themes.lightGreen.primaryLighterColor
    primaryButtonColor = themes.lightGreen.primaryButtonColor
    accentColor = themes.lightGreen.accentColor
    accentDarkerColor = themes.lightGreen.accentDarkerColor
    textColor = themes.lightGreen.textColor

  } else if (theme === 'blue') {
    backgroundColor = themes.lightBlue.backgroundColor
    primaryColor = themes.lightBlue.primaryColor
    primaryLighterColor = themes.lightBlue.primaryLighterColor
    primaryButtonColor = themes.lightBlue.primaryButtonColor
    accentColor = themes.lightBlue.accentColor
    accentDarkerColor = themes.lightBlue.accentDarkerColor
    textColor = themes.lightBlue.textColor
  } else if (theme === 'orange') {
    backgroundColor = themes.lightOrange.backgroundColor
    primaryColor = themes.lightOrange.primaryColor
    primaryLighterColor = themes.lightOrange.primaryLighterColor
    primaryButtonColor = themes.lightOrange.primaryButtonColor
    accentColor = themes.lightOrange.accentColor
    accentDarkerColor = themes.lightOrange.accentDarkerColor
    textColor = themes.lightOrange.textColor
  }

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: textColor,
        tabBarInactiveTintColor: textColor,
        tabBarStyle: {
          height: 65,
          backgroundColor: primaryLighterColor,
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
    return <Text style={styles.errorText}>An error has occurred, please try again</Text>;
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
  errorText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    marginTop: '50%',
  }
});
