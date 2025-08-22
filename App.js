import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MyRequestsScreen from './screens/MyRequestsScreen';
import VisaRequiredScreen from './screens/VisaRequiredScreen';
import MoreScreen from './screens/MoreScreen';
import Icon from 'react-native-vector-icons/MaterialIcons'; 


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          
          tabBarActiveTintColor: '#FF7A00',
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'My Requests') iconName = 'assignment';
            else if (route.name === 'Visa Required') iconName = 'flight';
          
            else if (route.name === 'More') iconName = 'more-horiz';

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
      
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="My Requests" component={MyRequestsScreen} />
        <Tab.Screen name="Visa Required" component={VisaRequiredScreen} />
        <Tab.Screen name="More" component={MoreScreen} />
        

      </Tab.Navigator>
   
    </NavigationContainer>
  );
}



























































// import { createStackNavigator } from '@react-navigation/stack';
// import CalendarPicker from '../screens/CalendarPicker';
// import HomeScreen from '../screens/HomeScreen';
// import MyRequestsScreen from './screens/MyRequestsScreen';
// import VisaRequiredScreen from './screens/VisaRequiredScreen';
//  import MoreScreen from './screens/MoreScreen';

//  import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { View, Text } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const Stack = createStackNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="CalendarPicker" component={CalendarPicker} />
//     </Stack.Navigator>
//   );
// }

// <Tab.Navigator>
//  <Tab.Screen name="Home" component={HomeScreen} />
//          <Tab.Screen name="My Requests" component={MyRequestsScreen} />
//          <Tab.Screen name="Visa Required" component={VisaRequiredScreen} />
//          <Tab.Screen name="More" component={MoreScreen} />
// </Tab.Navigator>

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';


// import HomeScreen from './screens/HomeScreen';
// import CalendarPicker from './screens/CalendarPicker';
// import MyRequestsScreen from './screens/MyRequestsScreen';
// import VisaRequiredScreen from './screens/VisaRequiredScreen';
// import MoreScreen from './screens/MoreScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


// function MainTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
//       <Tab.Screen name="My Requests" component={MyRequestsScreen} />
//       <Tab.Screen name="Visa Requried" component={VisaRequiredScreen} />
//       <Tab.Screen name="More" component={MoreScreen} />
//     </Tab.Navigator>
//   );
// }
// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 2 }}>
//       <NavigationContainer>
//         {/* <Stack.Navigator initialRouteName="MainTabs">
          
//           <Stack.Screen
//             name="MainTabs"
//             component={MainTabs}
//             options={{ headerShown: false }} /> */}
//             <Stack.Screen name="Calendar" component={CalendarPicker} />
         
//         </Stack.Navigator>
//       </NavigationContainer>
//     </GestureHandlerRootView>
//   );
// }
