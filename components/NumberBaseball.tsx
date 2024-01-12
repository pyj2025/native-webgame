import { useNavigation } from '@react-navigation/native';
import { Text, View, Button, TextInput, Alert, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from './Home';
import React from 'react';

type TryType = {
  try: string;
  result: string;
};

type AlertType = 'Win' | 'Lose';

const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseball = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [answer, setAnswer] = React.useState<Array<number>>(getNumbers());
  const [inputValue, setInputValue] = React.useState<string>('');
  const [result, setResult] = React.useState<string>('');
  const [tries, setTries] = React.useState<Array<TryType>>([]);

  const handleInputChange = React.useCallback(
    (text: React.SetStateAction<string>) => {
      setInputValue(text);
    },
    [setInputValue]
  );

  const reset = React.useCallback(() => {
    setInputValue('');
    setAnswer(getNumbers());
    setTries([]);
  }, [setInputValue, setAnswer, setTries]);

  const createAlert = (type: AlertType) =>
    Alert.alert(type, 'Restart game', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);

  const handleSubmit = React.useCallback(() => {
    if (inputValue === answer.join('')) {
      setTries((t) => [
        ...t,
        {
          try: inputValue,
          result: 'Homerun!',
        },
      ]);
      setResult('Homerun!');
      createAlert('Win');
      reset();
    } else {
      const answerArray = inputValue.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`Lose. Ansert = ${answer.join(',')}!`); // state set은 비동기
        createAlert('Lose');
        reset();
      } else {
        console.log('answer = ', answer.join(''));

        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            console.log('strike', answerArray[i], answer[i]);
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
            ball += 1;
          }
        }
        setTries((t) => [
          ...t,
          {
            try: inputValue,
            result: `strike = ${strike}, ball = ${ball}`,
          },
        ]);
        setInputValue('');
      }
    }
  }, [inputValue, answer, setTries]);

  const renderItem = (item: any) => (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
      }}
    >
      <Text
        style={{
          fontSize: 16,
          paddingHorizontal: 10,
        }}
      >
        {item.try}
      </Text>
      <Text
        style={{
          color: '#777',
        }}
      >
        {item.result}
      </Text>
    </View>
  );

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ marginTop: 10, color: 'black', fontSize: 20 }}>
        result = {result}
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
      <Text style={{ marginVertical: 10, color: 'black', fontSize: 20 }}>
        Tries: {tries.length}
      </Text>
      <FlatList
        data={tries}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item, idx) => `${item.try}-${idx}`}
      />
    </View>
  );
};

export default NumberBaseball;
