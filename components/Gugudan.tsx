import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View, Button, TextInput, Alert } from 'react-native';
import { RootStackParam } from './Home';

const Gugudan: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [first, setFirst] = React.useState<number>(
    Math.ceil(Math.random() * 9)
  );
  const [second, setSecond] = React.useState<number>(
    Math.ceil(Math.random() * 9)
  );
  const [inputValue, setInputValue] = React.useState<string>('');
  const [result, setResult] = React.useState<number>(0);

  const handleInputChange = React.useCallback(
    (text: React.SetStateAction<string>) => {
      setInputValue(text);
    },
    [setInputValue]
  );

  const reset = React.useCallback(() => {
    setFirst(Math.ceil(Math.random() * 9));
    setSecond(Math.ceil(Math.random() * 9));
    setInputValue('');
  }, [setFirst, setSecond, setInputValue]);

  const createTwoButtonAlert = () =>
    Alert.alert('Lose', 'Your answer is wrong. Do you want to restart?', [
      {
        text: 'Cancel',
        onPress: () => navigation.goBack(),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => reset() },
    ]);

  const handleSubmit = React.useCallback(() => {
    if (first * second === Number(inputValue)) {
      setResult((prev) => prev + 1);
      reset();
    } else {
      setResult(0);
      createTwoButtonAlert();
    }
  }, [first, second, inputValue, setResult]);

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ marginTop: 10, color: 'black', fontSize: 20 }}>
        Winning Strike = {result}
      </Text>
      <Text style={{ marginTop: 20, color: 'black', fontSize: 40 }}>
        {first} X {second} = ?
      </Text>
      <TextInput
        style={{ marginTop: 30, color: 'black', fontSize: 40 }}
        placeholder="Answer"
        value={inputValue}
        onChangeText={handleInputChange}
      />
      <View style={{ marginTop: 30 }}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default React.memo(Gugudan);
