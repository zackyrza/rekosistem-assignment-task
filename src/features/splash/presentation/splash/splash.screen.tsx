import React from 'react';

import {Image, View} from 'react-native';

import styles from './splash.styles';

import splash from '../../../../assets/images/splash.png';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  React.useEffect(() => {
    setTimeout(() => {
      // navigate to home screen
      navigation.navigate('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={splash} />
    </View>
  );
}
