import React, { memo } from 'react';
import { View } from 'react-native';
import Td from './Td';

type TrProps = {
  rowData: string[];
  rowIndex: number;
  dispatch: React.Dispatch<any>;
};

const Tr: React.FC<TrProps> = ({ rowData, rowIndex, dispatch }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array(rowData.length)
        .fill(0)
        .map((_, i) => (
          <Td
            key={i}
            dispatch={dispatch}
            rowIndex={rowIndex}
            cellIndex={i}
            cellData={rowData[i]}
          />
        ))}
    </View>
  );
};

export default React.memo(Tr);
