export interface CellData {
  value: string;
  formula?: string;
  style?: {
    bold?: boolean;
    italic?: boolean;
    fontSize?: number;
    color?: string;
  };
}

export interface SheetState {
  cells: Record<string, CellData>;
  selectedCell: string | null;
  columnWidths: Record<string, number>;
  rowHeights: Record<string, number>;
  numRows: number;
  numCols: number;
}

export type SheetAction = 
  | { type: 'UPDATE_CELL'; id: string; data: Partial<CellData> }
  | { type: 'SELECT_CELL'; id: string | null }
  | { type: 'UPDATE_COLUMN_WIDTH'; col: string; width: number }
  | { type: 'UPDATE_ROW_HEIGHT'; row: string; height: number }
  | { type: 'ADD_ROW' }
  | { type: 'ADD_COLUMN' }
  | { type: 'DELETE_ROW'; index: number }
  | { type: 'DELETE_COLUMN'; index: number };