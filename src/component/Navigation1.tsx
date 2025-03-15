import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigationFile from './DrawerNavigationFile';
import StackNavigator from './StackNavigator';


// Main Navigation (Only Contains Drawer)
const Navigation1 = () => {
  return (
    <NavigationContainer>
       <DrawerNavigationFile />
    </NavigationContainer>
  );
};

export default Navigation1;