import 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * @param {string} value - selected date
 * @param {(string) => {}} onChange - func called whenever the date changes
 */
interface DatePickerProps {
  value: Date
  onChange: (value: Date | null) => void
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => (
  <ReactDatePicker selected={value} onChange={(date: Date | null) => onChange(date)} />
);

