import React from 'react';

import styles from "../../styles/components/forms/select.module.scss";

type SelectProps = React.ComponentProps<"select"> & {
  options: string[] | number[];
  defaultValue?: string | number;
  label: string;
  id: string;
  handleChange: (value: string) => void;
};

export const Select = ({ options, defaultValue, label, id, handleChange, ...props }: SelectProps) => {
  return (
    <div className={styles.select}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        id={id}      
        onChange={(event) => handleChange(event.target.value)} 
        defaultValue={defaultValue?.toString()}
        {...props}
      >
        {options.map(option => (
          <option key={option} value={option.toString()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}