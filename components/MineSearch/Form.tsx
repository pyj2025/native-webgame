import React from 'react';
import { View, TextInput, Button, Dimensions } from 'react-native';
import { START_GAME } from './type';
import { TableContext, TableContextProps } from './context';

const Form: React.FC = () => {
  const screenWidth = Dimensions.get('window').width;

  const [row, setRow] = React.useState<number>(10);
  const [cell, setCell] = React.useState<number>(10);
  const [mine, setMine] = React.useState<number>(20);
  const { dispatch } = React.useContext<TableContextProps>(TableContext);

  const onChangeRow = React.useCallback((value: string) => {
    setRow(parseInt(value, 10));
  }, []);

  const onChangeCell = React.useCallback((value: string) => {
    setCell(parseInt(value, 10));
  }, []);

  const onChangeMine = React.useCallback((value: string) => {
    setMine(parseInt(value, 10));
  }, []);

  const onClickBtn = React.useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine });
  }, [row, cell, mine]);

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={{
            width: screenWidth / 3,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 8,
          }}
          keyboardType="numeric"
          placeholder="Row"
          value={row.toString()}
          onChangeText={onChangeRow}
        />
        <TextInput
          style={{
            width: screenWidth / 3,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 8,
          }}
          keyboardType="numeric"
          placeholder="Column"
          value={cell.toString()}
          onChangeText={onChangeCell}
        />
        <TextInput
          style={{
            width: screenWidth / 3,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 8,
          }}
          keyboardType="numeric"
          placeholder="Mine"
          value={mine.toString()}
          onChangeText={onChangeMine}
        />
      </View>
      <Button title="Start" onPress={onClickBtn} />
    </View>
  );
};

export default React.memo(Form);
