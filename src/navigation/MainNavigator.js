import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {stopLoaderAndError} from '../apiHandlers/authentication/AuthenticationReducer';
import Toast from 'react-native-toast-message';
import NavigationScreens from './screens/NavigationScreens';
import AppRoutes from '../helpers/AppRoutes';

const StackNavigator = createStackNavigator();

const AppContainer = ({props, navigation}) => {
  var initialRoute = AppRoutes.BottomNavigation;

  const dispatch = useDispatch();

  const {user} = useSelector(state => state.AuthenticationReducer);

  useEffect(() => {
    dispatch(stopLoaderAndError());
  }, []);

  if (user != null) {
    initialRoute = AppRoutes.BottomNavigation;
  }

  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerTitle: true,
          headerTransparent: false,
        }}>
        {Object.keys(NavigationScreens).map((s, i) => (
          <StackNavigator.Screen
            name={s}
            component={NavigationScreens[s].screen}
            key={i}
            options={({navigation}) => NavigationScreens[s].options}
          />
        ))}
      </StackNavigator.Navigator>
      <Toast ref={ref => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default AppContainer;
