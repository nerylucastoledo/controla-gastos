import React, { FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
}

const Component: FC<InputProps> = ({ label, name, ...props }) => {
  return (
    <div className='form-control'>
			<input 
				name={name}
				id={name}
				{ ...props }
			/>
			<label htmlFor={name} data-testid={`${name}-label`}>{label}</label>
		</div>
  )
}

export const Input = React.memo(Component);