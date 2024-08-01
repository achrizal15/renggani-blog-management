import React from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form';
type InputVariants = 'primary' | 'secondary' | 'danger' | 'warning' | 'success'
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
        variant?: InputVariants,
        name: string,
        register?: UseFormRegister<FieldValues>;
}
const Input: React.FC<InputProps> = ({ variant = "primary", name, register = null, ...props }) => {
        return (
                <input {...register} className = 'w-full text-sm focus:outline-none border border-base-100 rounded-md py-2 px-3 placeholder:text-sm' placeholder = 'Please type here' { ...props } />
        )
}

export default Input