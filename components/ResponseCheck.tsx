import React from 'react';
import { Text, View, TouchableOpacity, Button, Dimensions } from 'react-native';

const ResponseCheck = () => {
  const [state, setState] = React.useState<string>('waiting');
  const [message, setMessage] = React.useState<string>('Click to Start');
  const [result, setResult] = React.useState<Array<number>>([]);

  const timeout = React.useRef<any>(null);
  const startTime = React.useRef<Date | number>(0);
  const endTime = React.useRef<Date | number>(0);

  const onClickScreen = React.useCallback(() => {
    if (state === 'waiting') {
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('Click Now');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
      setState('ready');
      setMessage('Press when it is green');
    } else if (state === 'ready') {
      clearTimeout(timeout.current!);
      setState('waiting');
      setMessage('Hurry. Press when it is green');
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('Click to start');
      setResult((prevResult) => [
        ...prevResult,
        (endTime.current as number) - (startTime.current as number),
      ]);
    }
  }, [state]);

  const onReset = React.useCallback(() => {
    setResult([]);
  }, []);

  const buttonHeight = Dimensions.get('window').height / 2;

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ color: 'black', fontSize: 20, marginBottom: 10 }}>
          Average: {result.reduce((a, c) => a + c) / result.length}ms
        </Text>
        <Button title="Reset" onPress={onReset} />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ color: 'black', fontSize: 30, marginBottom: 20 }}>
        ResponseCheck
      </Text>
      <TouchableOpacity
        style={{
          height: buttonHeight,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: state === 'now' ? 'green' : 'lightgray',
          borderRadius: 10,
          padding: 20,
        }}
        onPress={onClickScreen}
      >
        <Text style={{ fontSize: 18 }}>{message}</Text>
      </TouchableOpacity>
      <Text style={{ color: 'black', fontSize: 30, marginTop: 20 }}>
        {renderAverage()}
      </Text>
    </View>
  );
};

export default ResponseCheck;
