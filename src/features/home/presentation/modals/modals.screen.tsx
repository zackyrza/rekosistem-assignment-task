import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';

import styles from './modals.styles';
import {ModalNativeModule} from '../../../../native_modules';

export default function ModalsScreen() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const handleOpenNativeModal = () => {
    ModalNativeModule.show(title, content);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modals</Text>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Write title to render on native modal"
          onChangeText={txt => setTitle(txt)}
        />
        <TextInput
          numberOfLines={5}
          multiline={true}
          style={styles.input}
          placeholder="Write content to render on native modal"
          onChangeText={txt => setContent(txt)}
        />
        <Button title="Open native modal" onPress={handleOpenNativeModal} />
      </View>
    </View>
  );
}
