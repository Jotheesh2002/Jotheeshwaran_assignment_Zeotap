import { create } from 'zustand';
import { SheetState, SheetAction } from '../types/sheet';
import { produce } from 'immer';

const INITIAL_ROWS = 100;
const INITIAL_COLS = 26;

const createInitialState = (): SheetState => ({
  cells: {},
  selectedCell: null,
  columnWidths: {},
  rowHeights: {},
  numRows: INITIAL_ROWS,
  numCols: INITIAL_COLS,
});

export const useSheetStore = create<{
  state: SheetState;
  dispatch: (action: SheetAction) => void;
}>((set) => ({
  state: createInitialState(),
  dispatch: (action) =>
    set(
      produce((draft) => {
        switch (action.type) {
          case 'UPDATE_CELL':
            if (!draft.state.cells[action.id]) {
              draft.state.cells[action.id] = { value: '' };
            }
            Object.assign(draft.state.cells[action.id], action.data);
            break;
          case 'SELECT_CELL':
            draft.state.selectedCell = action.id;
            break;
          case 'UPDATE_COLUMN_WIDTH':
            draft.state.columnWidths[action.col] = action.width;
            break;
          case 'UPDATE_ROW_HEIGHT':
            draft.state.rowHeights[action.row] = action.height;
            break;
          case 'ADD_ROW':
            draft.state.numRows++;
            break;
          case 'ADD_COLUMN':
            draft.state.numCols++;
            break;
          case 'DELETE_ROW':
            if (draft.state.numRows > 1) {
              draft.state.numRows--;
              // Clean up cells in the deleted row
              Object.keys(draft.state.cells).forEach((key) => {
                const [, row] = key.split(':');
                if (parseInt(row) === action.index) {
                  delete draft.state.cells[key];
                }
              });
            }
            break;
          case 'DELETE_COLUMN':
            if (draft.state.numCols > 1) {
              draft.state.numCols--;
              // Clean up cells in the deleted column
              Object.keys(draft.state.cells).forEach((key) => {
                const [col] = key.split(':');
                if (col === String.fromCharCode(65 + action.index)) {
                  delete draft.state.cells[key];
                }
              });
            }
            break;
        }
      })
    ),
}));