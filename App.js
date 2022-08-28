import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'
import { deleteTable, init } from './util/database';
import { Text } from 'react-native'
import { darkBaseColors } from './constants/colors';


import TasksScreen from './screens/TasksScreen';
import SettingsScreen from './screens/SettingsScreen';
import { useState, useEffect } from 'react';


/**
 * TODO
 * -zrobić ekran edycji task'a, np szufladę wyciąganą z dołu
 * -zrobić ekran ustawień
 * -zrobić kolor akcentu 
 * -zrobić hidden Buttons
 * -zrobić listę ukończonych zadań 
 * -zrobić listę movable
 */





const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function TasksOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: darkBaseColors.accentColor,
        tabBarStyle: {
          height: 65,
          backgroundColor: darkBaseColors.primaryLighterColor,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: darkBaseColors.backgroundColor,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          borderBottomWidth: 0,
        },
        tabBarHideOnKeyboard: true,
        title: null,



      }
      }>
      <BottomTabs.Screen
        name='Tasks'
        component={TasksScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='check' size={32} color={color} />
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
          tabBarIcon: ({ color }) => (
            <FontAwesome name='gear' size={32} color={color} />
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
    return <Text>An error has occurred, please try again</Text>;
  }


  return (
    <>
      <StatusBar style='dark' />
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
    </>
  );
}


