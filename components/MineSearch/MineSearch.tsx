import React from 'react';
import { View, Text } from 'react-native';
import Table from './Table';
import Form from './Form';
import { INCREMENT_TIMER } from './type';
import { reducer } from './reducer';
import { TableContext, initialState } from './context';

const MineSearch: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  const value = React.useMemo(
    () => ({ tableData, halted, dispatch }),
    [tableData, halted]
  );

  React.useEffect(() => {
    let interval: any;
    if (!halted) {
      interval = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [halted]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <View>
        <Text>{timer}</Text>
      </View>
      <Table />
      <View>
        <Text>{result}</Text>
      </View>
    </TableContext.Provider>
  );
};

export default MineSearch;
