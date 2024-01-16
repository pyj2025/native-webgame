export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
};

export type CellData = {
    row: number;
    cell: number;
    mine: number;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export type ActionType =
  | { type: 'START_GAME'; row: number; cell: number; mine: number }
  | { type: 'OPEN_CELL'; row: number; cell: number }
  | { type: 'CLICK_MINE'; row: number; cell: number }
  | { type: 'FLAG_CELL'; row: number; cell: number }
  | { type: 'QUESTION_CELL'; row: number; cell: number }
  | { type: 'NORMALIZE_CELL'; row: number; cell: number }
  | { type: 'INCREMENT_TIMER' };
