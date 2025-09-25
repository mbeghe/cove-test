import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/solid';
import type { DropDownSelectProps } from '../../../types/components';

export const DropDownSelect: React.FC<DropDownSelectProps> = ({
  value,
  onChange,
  options,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    if (optionValue === '') {
      if (value.length === options.length - 1) {
        onChange([]);
      } else {
        const allRoomIds = options
          .filter((opt) => opt.value !== '')
          .map((opt) => opt.value);
        onChange(allRoomIds);
      }
    } else {
      const newValue = value.includes(optionValue)
        ? value.filter((id) => id !== optionValue)
        : [...value, optionValue];
      onChange(newValue);
    }
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (value.length === 0) {
      return 'All Rooms';
    } else if (value.length === options.length - 1) {
      return 'All Rooms';
    } else if (value.length === 1) {
      const selectedOption = options.find((opt) => opt.value === value[0]);
      return selectedOption?.name || '1 room selected';
    } else {
      return `${value.length} rooms selected`;
    }
  };

  const isSelected = (optionValue: string) => {
    if (optionValue === '') {
      return value.length === 0 || value.length === options.length - 1;
    }
    return value.includes(optionValue);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 h-10 font-semibold text-[var(--text)] bg-[var(--accent)] transition ring-1 ring-[var(--ring)] cursor-pointer ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/20'
        }`}
        aria-label="Select rooms"
      >
        <span>{getDisplayText()}</span>
        <ChevronDownIcon
          className={`h-5 w-5 opacity-95 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--accent)] border border-[var(--ring)] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className={`w-full px-3 py-2 text-left text-sm font-medium text-[var(--text)] hover:bg-white/10 transition-colors flex items-center justify-between ${
                option.value === '' ? 'border-b border-[var(--ring)]' : ''
              }`}
            >
              <span className="font-semibold">{option.name}</span>
              {isSelected(option.value) && (
                <CheckIcon className="h-4 w-4 text-[var(--text)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
