import { useNavigation } from "@react-navigation/native";
import { ActionType, CLICK_MINE, CODE, CellData, FLAG_CELL, INCREMENT_TIMER, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, START_GAME } from "./type";
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParam } from "../Home";

export type State = {
    tableData: number[][];
    data: CellData;
    timer: number;
    result: string;
    halted: boolean;
    openedCount: number;
  };

const plantMine = (row: number, cell: number, mine: number): number[][] => {
    const candidate = Array(row * cell)
      .fill(-1)
      .map((arr, i) => {
        return i;
      });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
      const chosen = candidate.splice(
        Math.floor(Math.random() * candidate.length),
        1
      )[0];
      shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
      const rowData: number[] = [];
      data.push(rowData);
      for (let j = 0; j < cell; j++) {
        rowData.push(CODE.NORMAL);
      }
    }
  
    for (let k = 0; k < shuffle.length; k++) {
      const ver = Math.floor(shuffle[k] / cell);
      const hor = shuffle[k] % cell;
      data[ver][hor] = CODE.MINE;
    }
  
    return data;
  };

export const reducer = (state: State, action: ActionType): State => {
    switch (action.type) {
      case START_GAME:
        return {
          ...state,
          data: {
            row: action.row,
            cell: action.cell,
            mine: action.mine,
          },
          openedCount: 0,
          tableData: plantMine(action.row, action.cell, action.mine),
          halted: false,
          timer: 0,
        };
      case OPEN_CELL: {
        const tableData = [...state.tableData];
        tableData.forEach((row, i) => {
          tableData[i] = [...row];
        });
        const checked: string[] = [];
        let openedCount = 0;
        // console.log(tableData.length, tableData[0].length);
        const checkAround = (row: number, cell: number) => {
          console.log(row, cell);
          if (
            row < 0 ||
            row >= tableData.length ||
            cell < 0 ||
            cell >= tableData[0].length
          ) {
            return;
          }
          if (
            [
              CODE.OPENED,
              CODE.FLAG,
              CODE.FLAG_MINE,
              CODE.QUESTION_MINE,
              CODE.QUESTION,
            ].includes(tableData[row][cell])
          ) {
            return;
          } 
          if (checked.includes(row + '/' + cell)) {
            return;
          } else {
            checked.push(row + '/' + cell);
          } 
          let around = [tableData[row][cell - 1], tableData[row][cell + 1]];
          if (tableData[row - 1]) {
            around = around.concat([
              tableData[row - 1][cell - 1],
              tableData[row - 1][cell],
              tableData[row - 1][cell + 1],
            ]);
          }
          if (tableData[row + 1]) {
            around = around.concat([
              tableData[row + 1][cell - 1],
              tableData[row + 1][cell],
              tableData[row + 1][cell + 1],
            ]);
          }
          const count = around.filter(function (v) {
            return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
          }).length;
          if (count === 0) {
            if (row > -1) {
              const near = [];
              if (row - 1 > -1) {
                near.push([row - 1, cell - 1]);
                near.push([row - 1, cell]);
                near.push([row - 1, cell + 1]);
              }
              near.push([row, cell - 1]);
              near.push([row, cell + 1]);
              if (row + 1 < tableData.length) {
                near.push([row + 1, cell - 1]);
                near.push([row + 1, cell]);
                near.push([row + 1, cell + 1]);
              }
              near.forEach((n) => {
                if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                  checkAround(n[0], n[1]);
                }
              });
            }
          }
          if (tableData[row][cell] === CODE.NORMAL) {
            openedCount += 1;
          }
          tableData[row][cell] = count;
        };
        checkAround(action.row, action.cell);
        let halted = false;
        let result = '';
        console.log(
          state.data.row * state.data.cell - state.data.mine,
          state.openedCount,
          openedCount
        );
        if (
          state.data.row * state.data.cell - state.data.mine ===
          state.openedCount + openedCount
        ) {
          halted = true;
          result = `Congratulation. You win in ${state.timer} seconds`;
          const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

          Alert.alert('Win', result, [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
              style: 'cancel',
            },
          ]);
        }
        return {
          ...state,
          tableData,
          openedCount: state.openedCount + openedCount,
          halted,
          result,
        };
      }
      case CLICK_MINE: {
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        tableData[action.row][action.cell] = CODE.CLICKED_MINE;
        return {
          ...state,
          tableData,
          halted: true,
        };
      }
      case FLAG_CELL: {
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        if (tableData[action.row][action.cell] === CODE.MINE) {
          tableData[action.row][action.cell] = CODE.FLAG_MINE;
        } else {
          tableData[action.row][action.cell] = CODE.FLAG;
        }
        return {
          ...state,
          tableData,
        };
      }
      case QUESTION_CELL: {
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
          tableData[action.row][action.cell] = CODE.QUESTION_MINE;
        } else {
          tableData[action.row][action.cell] = CODE.QUESTION;
        }
        return {
          ...state,
          tableData,
        };
      }
      case NORMALIZE_CELL: {
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
          tableData[action.row][action.cell] = CODE.MINE;
        } else {
          tableData[action.row][action.cell] = CODE.NORMAL;
        }
        return {
          ...state,
          tableData,
        };
      }
      case INCREMENT_TIMER: {
        return {
          ...state,
          timer: state.timer + 1,
        };
      }
      default:
        return state;
    }
  };
  