import React from "react";
import { State } from "./reducer";

export const initialState: State = {
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0,
};

export type TableContextProps = {
    tableData: number[][];
    halted: boolean;
    dispatch: React.Dispatch<any>;
};
  
export const TableContext = React.createContext<TableContextProps>({
    tableData: [],
    halted: true,
    dispatch: () => {},
});