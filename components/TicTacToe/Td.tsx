import React, { useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CLICK_CELL } from './TicTacToe';

type TdProps = {
  rowIndex: number;
  cellIndex: number;
  cellData: string;
  dispatch: React.Dispatch<any>;
};

const Td: React.FC<TdProps> = ({ rowIndex, cellIndex, cellData, dispatch }) => {
  const onClickTd = useCallback(() => {
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return (
    <TouchableOpacity
      onPress={onClickTd}
      style={{
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
      }}
    >
      <Text>{cellData}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Td);
