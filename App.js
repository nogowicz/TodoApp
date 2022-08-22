import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'

import TasksScreen from './screens/TasksScreen';
import SettingsScreen from './screens/SettingsScreen';


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function TasksOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1F58EB',
        tabBarStyle: {
          height: 65
        }
      }}>
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


