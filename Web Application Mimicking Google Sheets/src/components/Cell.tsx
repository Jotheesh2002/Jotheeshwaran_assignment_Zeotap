import React, { useState, useEffect, useRef } from 'react';
import { useSheetStore } from '../store/useSheetStore';
import { cn } from '../utils/cn';

interface CellProps {
  id: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const Cell: React.FC<CellProps> = ({ id, isSelected, onSelect }) => {
  const { state, dispatch } = useSheetStore();
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cell = state.cells[id] || { value: '', style: {} };

  useEffect(() => {
    if (isSelected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelected]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_CELL',
      id,
      data: { value: e.target.value },
    });
  };

  return (
    <div
      className={cn(
        'cell h-full border-r border-b border-gray-200 px-2 flex items-center bg-white',
        isSelected && 'selected',
        cell.style?.bold && 'font-bold',
        cell.style?.italic && 'italic'
      )}
      onClick={onSelect}
      onDoubleClick={handleDoubleClick}
      style={{
        color: cell.style?.color,
        fontSize: cell.style?.fontSize ? `${cell.style.fontSize}px` : undefined,
      }}
    >
      {editing ? (
        <input
          ref={inputRef}
          value={cell.value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="cell-input w-full h-full outline-none bg-transparent"
        />
      ) : (
        <span className="truncate">{cell.value}</span>
      )}
    </div>
  );
};