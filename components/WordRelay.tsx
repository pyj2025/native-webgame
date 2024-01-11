import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View, Button, TextInput, Alert } from 'react-native';
import { RootStackParam } from './Home';

const WordRelay: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [word, setWord] = React.useState<string>('word');
  const [inputValue, setInputValue] = React.useState<string>('');
  const [result, setResult] = React.useState<number>(0);

  const handleInputChange = React.useCallback(
    (text: React.SetStateAction<string>) => {
      setInputValue(text);
    },
    [setInputValue]
  );

  const reset = React.useCallback(() => {
    setWord('word');
    setInputValue('');
  }, [setWord, setInputValue]);

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
    if (word[word.length - 1].toLowerCase() === inputValue[0].toLowerCase()) {
      setResult((prev) => prev + 1);
      setWord(inputValue);
      setInputValue('');
    } else {
      setResult(0);
      createTwoButtonAlert();
    }
  }, [word, inputValue, setResult, setWord, setInputValue]);

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ marginTop: 10, color: 'black', fontSize: 20 }}>
        Strike = {result}
      </Text>
      <Text style={{ marginTop: 20, color: 'black', fontSize: 40 }}>
        {word}
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

export default React.memo(WordRelay);
