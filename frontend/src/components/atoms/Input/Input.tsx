import React from 'react'
type InputVariants = 'primary' | 'secondary' | 'danger' | 'warning' | 'success'
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
        variant?: InputVariants,
}
const Input:React.FC<InputProps> = ({ variant = "primary", ...props }) => {
        return (
                <input className='w-full text-sm focus:outline-none border border-base-100 rounded-md py-2 px-3 placeholder:text-sm' placeholder='Please type here' {...props} />
        )
}

export default Input