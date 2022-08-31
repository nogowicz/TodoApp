import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
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
  const { isDarkMode } = themeCtx;
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor,
        tabBarInactiveTintColor: isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor,
        tabBarStyle: {
          height: 65,
          backgroundColor: isDarkMode ? themes.darkGreen.primaryLighterColor : themes.lightGreen.primaryLighterColor,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: isDarkMode ? themes.darkGreen.backgroundColor : themes.lightGreen.backgroundColor,
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
            <View style={focused && [styles.activeBackground, { backgroundColor: isDarkMode ? themes.darkGreen.accentColor : themes.lightGreen.accentColor }]}>
              <MaterialCommunityIcons name="checkbox-marked-outline" size={28} color={isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor} />
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
            <View style={focused && [styles.activeBackground, { backgroundColor: isDarkMode ? themes.darkGreen.accentColor : themes.lightGreen.accentColor }]}>
              <MaterialCommunityIcons name="cog-outline" size={28} color={isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor} />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
      />
    </BottomTabs.Navigator>
  );
}



export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const themeCtx = useContext(ThemeContext)
  const { isDarkMode } = themeCtx;

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
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
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
