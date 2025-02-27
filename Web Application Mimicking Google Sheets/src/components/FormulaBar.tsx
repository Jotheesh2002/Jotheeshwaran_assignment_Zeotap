import React, { useState, useEffect } from 'react';
import { useSheetStore } from '../store/useSheetStore';
import { FunctionSquare as Function } from 'lucide-react';

export const FormulaBar: React.FC = () => {
  const { state, dispatch } = useSheetStore();
  const [formula, setFormula] = useState('');
  const selectedCell = state.selectedCell;

  useEffect(() => {
    if (selectedCell) {
      const cell = state.cells[selectedCell];
      setFormula(cell?.formula || cell?.value || '');
    } else {
      setFormula('');
    }
  }, [selectedCell, state.cells]);

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
    if (selectedCell) {
      dispatch({
        type: 'UPDATE_CELL',
        id: selectedCell,
        data: {
          value: e.target.value,
          formula: e.target.value.startsWith('=') ? e.target.value : undefined,
        },
      });
    }
  };

  return (
    <div className="formula-bar">
      <div className="flex items-center gap-2">
        <Function size={16} className="text-gray-500" />
        <input
          type="text"
          value={formula}
          onChange={handleFormulaChange}
          placeholder="Enter formula or value"
          className="formula-input flex-1"
        />
      </div>
    </div>
  );
};