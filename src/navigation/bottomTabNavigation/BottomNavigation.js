import AppIcons from '../../helpers/AppIcons';
import AppRoutes from '../../helpers/AppRoutes';
import AppColors from '../../helpers/AppColors';
import AppFontFamily from '../../helpers/AppFontFamily';
import BottomTabScreens from '../screens/BottomTabScreens';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const TabBar = createBottomTabNavigator();

export default function BottomNavigation({navigation}) {
  return (
    <TabBar.Navigator
      initialRouteName={AppRoutes.Home}
      activeColor={AppColors.customBlue}
      inactiveColor={AppColors.gray}
      screenOptions={({route}) => ({
        barStyle: {
          backgroundColor: AppColors.customBlue,
          opacity: AppColors.black,
        },
        tabBarLabelStyle: {
          fontFamily: AppFontFamily.bold,
        },
        tabBarStyle: {
          backgroundColor: AppColors.offWhite,
        },
        headerShown: false,
        tabBarColor: AppColors.gray,
        tabBarIcon: ({focused, color, size}) => {
          var iconName;
          var iconSize = 25;
          var iconColor = focused ? AppColors.customBlue : AppColors.gray;
          if (route.name === AppRoutes.Home) {
            iconName = focused ? AppIcons.homeSelected : AppIcons.home;
          } else if (route.name === AppRoutes.Settings) {
            iconName = focused ? AppIcons.settingsSelected : AppIcons.settings;
          } else if (route.name === AppRoutes.Chats) {
            iconName = focused ? AppIcons.chatSelected : AppIcons.chat;
          } else if (route.name === AppRoutes.Reminders) {
            iconName = focused ? AppIcons.remidersSelected : AppIcons.remiders;
          }
          return <Icon name={iconName} size={iconSize} color={iconColor} />;
        },
      })}>
      {Object.keys(BottomTabScreens).map((s, i) => (
        <TabBar.Screen
          name={s}
          component={BottomTabScreens[s].screen}
          key={i}
          options={({navigation}) => BottomTabScreens[s].options}
        />
      ))}
    </TabBar.Navigator>
  );
}
