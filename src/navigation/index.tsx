import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {
  LoginScreen,
  TransactionsScreen,
  SplashScreen,
  ModalScreen,
  ShipsScreen,
} from '../features/presentation';

import {useAuthenticationService} from '../services/remote';

const Stack = createNativeStackNavigator();

function Navigator() {
  const {init} = useAuthenticationService();

  React.useEffect(() => {
    init();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        options={{header: () => null}}
        component={SplashScreen}
      />
      <Stack.Screen
        name="Login"
        options={{header: () => null}}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Tabs"
        options={{header: () => null}}
        component={MyTabs}
      />
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Modals" component={ModalScreen} />
      <Tab.Screen name="Ships" component={ShipsScreen} />
    </Tab.Navigator>
  );
}

export default Navigator;
