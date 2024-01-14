import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CODE } from './type';

const getTdStyle = (code: number) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        backgroundColor: '#444',
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        backgroundColor: 'white',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        backgroundColor: 'yellow',
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        backgroundColor: 'red',
      };
    default:
      return {
        backgroundColor: 'white',
      };
  }
};

const getTdText = (code: number) => {
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return 'M';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code ? code.toString() : '';
  }
};

type RealTdProps = {
  onClickTd: () => void;
  onRightClickTd: () => void;
  data: number;
};

const TdCell: React.FC<RealTdProps> = ({ onClickTd, onRightClickTd, data }) => {
  return (
    <TouchableOpacity
      style={getTdStyle(data)}
      onPress={onClickTd}
      onLongPress={onRightClickTd}
    >
      <Text>{getTdText(data)}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(TdCell);
