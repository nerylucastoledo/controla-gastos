import React from 'react';

import styles from "../../styles/components/forms/select.module.scss";

type SelectProps = React.ComponentProps<"select"> & {
  options: string[] | number[];
  defaultValue?: string | number;
  handleChange: (value: string) => void;
};

export const Select = ({ options, defaultValue, handleChange, ...props }: SelectProps) => {
  return (
    <select 
      onChange={(event) => handleChange(event.target.value)} 
      defaultValue={defaultValue?.toString()}
      {...props}
      className={styles.select}
    >
      {options.map(option => (
        <option key={option} value={option.toString()}>
          {option}
        </option>
      ))}
    </select>
  );
}