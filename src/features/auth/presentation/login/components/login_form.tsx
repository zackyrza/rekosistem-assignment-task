// login form with email and password fields and button for google login

import React from 'react';
import {
  Text,
  View,
  TouchableNativeFeedback,
  TextInput,
  Alert,
} from 'react-native';
import {useAuthenticationService} from '../../../../../services/remote';

import styles from './login_form.styles';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default function LoginForm() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const {loginByGoogle, login, error} = useAuthenticationService();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    login(email, password)
      .then(_ => {
        navigation.navigate('Tabs');
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      });
  };

  const handleLoginWithGoogle = () => {
    loginByGoogle().then(_ => {
      navigation.navigate('Tabs');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableNativeFeedback onPress={handleLogin}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableNativeFeedback>
      <Text style={styles.orText}>or</Text>
      <TouchableNativeFeedback onPress={handleLoginWithGoogle}>
        <View style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
