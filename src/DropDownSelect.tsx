import 'react';

interface DropDownSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: {value: string, name: string}[];
}

export const DropDownSelect = ({ value, onChange, options }: DropDownSelectProps) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    {options.map(({ value, name }) => (
      <option key={value} value={value}>
        {name}
      </option>
    ))}
  </select>
);

