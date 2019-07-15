import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './Home/home';
import Map from './Map/map';
import Profile from './Profile/profile'


const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Map: Map,
  Profile: Profile
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        }
        else if (routeName === 'Map') {
          iconName = `ios-map`;
        }
        else if (routeName === 'Profile') {
          iconName = `ios-person`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(TabNavigator);