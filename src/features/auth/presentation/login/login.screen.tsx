import React from 'react';

import {View} from 'react-native';

import styles from './login.styles';
import {LoginForm} from './components';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
}
