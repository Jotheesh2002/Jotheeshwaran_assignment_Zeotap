import React from 'react';
import { 
  Bold, 
  Italic, 
  Plus,
  Trash2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  ChevronDown
} from 'lucide-react';
import { useSheetStore } from '../store/useSheetStore';

export const Toolbar: React.FC = () => {
  const { state, dispatch } = useSheetStore();
  const selectedCell = state.selectedCell;
  const cell = selectedCell ? state.cells[selectedCell] : null;

  const handleBold = () => {
    if (!selectedCell) return;
    dispatch({
      type: 'UPDATE_CELL',
      id: selectedCell,
      data: {
        style: {
          ...cell?.style,
          bold: !(cell?.style?.bold),
        },
      },
    });
  };

  const handleItalic = () => {
    if (!selectedCell) return;
    dispatch({
      type: 'UPDATE_CELL',
      id: selectedCell,
      data: {
        style: {
          ...cell?.style,
          italic: !(cell?.style?.italic),
        },
      },
    });
  };

  return (
    <div className="toolbar">
      <div className="flex items-center gap-1">
        <button
          onClick={handleBold}
          className={`toolbar-button ${cell?.style?.bold ? 'active' : ''}`}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={handleItalic}
          className={`toolbar-button ${cell?.style?.italic ? 'active' : ''}`}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <div className="divider" />
        <button
          onClick={() => dispatch({ type: 'ADD_ROW' })}
          className="toolbar-button"
          title="Add Row"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => dispatch({ type: 'ADD_COLUMN' })}
          className="toolbar-button"
          title="Add Column"
        >
          <Plus size={16} className="rotate-90" />
        </button>
        <div className="divider" />
        <button className="toolbar-button" title="Align Left">
          <AlignLeft size={16} />
        </button>
        <button className="toolbar-button" title="Align Center">
          <AlignCenter size={16} />
        </button>
        <button className="toolbar-button" title="Align Right">
          <AlignRight size={16} />
        </button>
        <div className="divider" />
        <div className="relative">
          <select
            className="font-select appearance-none pr-8"
            title="Font Size"
            value={cell?.style?.fontSize || 11}
            onChange={(e) => {
              if (!selectedCell) return;
              dispatch({
                type: 'UPDATE_CELL',
                id: selectedCell,
                data: {
                  style: {
                    ...cell?.style,
                    fontSize: parseInt(e.target.value),
                  },
                },
              });
            }}
          >
            <option>11</option>
            <option>12</option>
            <option>14</option>
            <option>16</option>
            <option>18</option>
            <option>24</option>
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
      </div>
    </div>
  );
};