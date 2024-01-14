import React from 'react';
import { View } from 'react-native';
import Tr from './Tr';
import { TableContext, TableContextProps } from './context';

const Table: React.FC = () => {
  const { tableData } = React.useContext<TableContextProps>(TableContext);

  return (
    <View>
      {tableData.map((rowData, rowIndex) => (
        <Tr key={rowIndex} rowIndex={rowIndex} />
      ))}
    </View>
  );
};

export default React.memo(Table);
