import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { deleteTable, init } from './util/database';
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from './constants/colors';



import TasksScreen from './screens/TasksScreen';
import SettingsScreen from './screens/SettingsScreen';
import { useState, useEffect } from 'react';


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

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          height: 65,
          backgroundColor: Colors.primaryLighterColor,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: Colors.backgroundColor,
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
            <View style={focused && styles.activeBackground}>
              <MaterialCommunityIcons name="checkbox-marked-outline" size={28} color={'black'} />
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
            <View style={focused && styles.activeBackground}>
              <MaterialCommunityIcons name="cog-outline" size={28} color={'black'} />
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
      <StatusBar style='light' />
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


const styles = StyleSheet.create({
  activeBackground: {
    backgroundColor: Colors.accentColor,
    width: 56,
    borderRadius: 30,
    alignItems: 'center'
  },
  inactive: {
    color: 'black'
  }
});
