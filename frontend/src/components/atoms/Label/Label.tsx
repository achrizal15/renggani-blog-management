import React from 'react'
type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
        required?: boolean,
        children: React.ReactNode
}
const Label = ({ required = false, children, ...props }: LabelProps) => {
        return (
                <label className='text-sm text-neutral font-medium'{...props}>
                        {children}
                        {required && <small className='text-error'> *</small>}
                </label>
        )
}

export default Label