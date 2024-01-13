import React from 'react';
import { View } from 'react-native';
import Tr from './Tr';

type TableProps = {
  tableData: string[][];
  dispatch: React.Dispatch<any>;
};

const Table: React.FC<TableProps> = ({ tableData, dispatch }) => {
  return (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
    >
      {Array(tableData.length)
        .fill(0)
        .map((_, i) => (
          <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />
        ))}
    </View>
  );
};

export default Table;
