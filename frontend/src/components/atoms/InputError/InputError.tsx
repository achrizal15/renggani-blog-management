import React from 'react'

const InputError = ({ children }: { children: React.ReactNode }) => {
        return (
                <span className='text-error text-xs'>{children}</span>
        )
}

export default InputError