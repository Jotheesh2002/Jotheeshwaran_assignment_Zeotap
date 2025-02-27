import React from 'react';
import { useSheetStore } from '../store/useSheetStore';
import { Cell } from './Cell';

export const Grid: React.FC = () => {
  const { state, dispatch } = useSheetStore();

  const handleCellSelect = (id: string) => {
    dispatch({ type: 'SELECT_CELL', id });
  };

  const renderHeaderRow = () => {
    return (
      <div className="flex sticky top-0 z-10">
        <div className="w-10 h-8 header-cell border-r border-b border-gray-200 sticky left-0 z-20" />
        {Array.from({ length: state.numCols }).map((_, i) => (
          <div
            key={i}
            className="w-24 h-8 header-cell border-r border-b border-gray-200 flex items-center justify-center"
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}
      </div>
    );
  };

  const renderRows = () => {
    return Array.from({ length: state.numRows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex">
        <div className="w-10 header-cell border-r border-b border-gray-200 flex items-center justify-center sticky left-0">
          {rowIndex + 1}
        </div>
        {Array.from({ length: state.numCols }).map((_, colIndex) => {
          const id = `${String.fromCharCode(65 + colIndex)}:${rowIndex + 1}`;
          return (
            <div key={colIndex} className="w-24 h-8">
              <Cell
                id={id}
                isSelected={state.selectedCell === id}
                onSelect={() => handleCellSelect(id)}
              />
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="grid-container flex-1 overflow-auto">
      {renderHeaderRow()}
      {renderRows()}
    </div>
  );
};