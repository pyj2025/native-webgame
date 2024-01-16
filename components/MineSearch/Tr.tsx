import React from 'react';
import { View } from 'react-native';
import Td from './Td';
import { TableContext, TableContextProps } from './context';

type TrProps = {
  rowIndex: number;
};

const Tr: React.FC<TrProps> = ({ rowIndex }) => {
  const { tableData } = React.useContext<TableContextProps>(TableContext);

  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      {tableData[0] &&
        tableData[0].map((_, cellIndex) => (
          <Td key={cellIndex} rowIndex={rowIndex} cellIndex={cellIndex} />
        ))}
    </View>
  );
};

export default React.memo(Tr);
