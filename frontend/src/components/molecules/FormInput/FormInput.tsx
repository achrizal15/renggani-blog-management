'use client'
import Input from '@/components/atoms/Input/Input'
import InputError from '@/components/atoms/InputError/InputError'
import Label from '@/components/atoms/Label/Label'
import React from 'react'
type FormInputProps = {
        required?: boolean,
        label: string,
        id: string,
        error: string,
        type: string,
        placeholder?: string,
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
const FormInput: React.FC<FormInputProps> = ({ required = false, label, id, error, type, placeholder = "Please type here", onChange }) => {
        return (
                <div className='space-y-1 mb-3'>
                        <Label required={true} htmlFor={id}>{label}</Label>
                        <Input id={id} variant='primary' name={id} type={type} placeholder={placeholder} onChange={onChange} />
                        {error && <InputError>{error}</InputError>}
                </div>
        )
}

export default FormInput