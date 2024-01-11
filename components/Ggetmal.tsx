import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParam } from './Home';

const Ggetmal: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black', fontSize: 30 }}>Ggetmal</Text>
      <Button title="Go to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Ggetmal;
