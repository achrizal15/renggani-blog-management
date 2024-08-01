'use client'
import Input from '@/components/atoms/Input/Input'
import InputError from '@/components/atoms/InputError/InputError'
import Label from '@/components/atoms/Label/Label'
import React from 'react'
import { RegisterOptions } from 'react-hook-form'
type FormInputProps = {
        required?: boolean,
        label: string,
        id: string,
        error: string,
        type: string,
        placeholder?: string,
        register?: any
}
const FormInput: React.FC<FormInputProps> = ({ required = false, label, id, error, type, placeholder = "Please type here", register = null }) => {
        return (
                <div className='space-y-1 mb-3'>
                        <Label required={true} htmlFor={id}>{label}</Label>
                        <Input id={id} variant='primary' name={id} type={type} placeholder={placeholder} register={register} />
                        {error && <InputError>{error}</InputError>}
                </div>
        )
}

export default FormInput