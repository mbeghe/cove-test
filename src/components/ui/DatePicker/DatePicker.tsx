// DatePicker.tsx
import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from '@heroicons/react/24/solid';

type DatePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
};
type CustomInputProps = {
  value?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date...',
  disabled = false,
}) => {
  const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick, disabled }, ref) => (
      <button
        ref={ref}
        type="button"
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 h-10 font-semibold text-[var(--text)] bg-[var(--brand)] transition ring-1 ring-[var(--ring)] cursor-pointer ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/20'
        }`}
        aria-label="Open date picker"
      >
        <span>{value || placeholder}</span>
        <CalendarIcon className="h-5 w-5" />
      </button>
    )
  );

  return (
    <ReactDatePicker
      selected={value}
      onChange={(d) => onChange(d)}
      customInput={<CustomInput />}
      dateFormat="MMMM dd, YYYY"
      disabled={disabled}
    />
  );
};
