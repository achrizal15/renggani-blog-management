'use client'
import Button from '@/components/atoms/Button/Button'
import Input from '@/components/atoms/Input/Input';
import FormInput from '@/components/molecules/FormInput/FormInput'
import React from 'react'
import { useForm } from "react-hook-form";
type FormDataLogin = {
        username: string
        password: string
}
const FormLogin = () => {
        const {
                register,
                handleSubmit,
                formState: {
                        isSubmitting,
                        errors
                }
        } = useForm()
        const onSubmit = async (data: any) => {
                const { username, password } = data as FormDataLogin
                const res = await fetch(`${process.env.API_BACKEND_URL}/auth/login`,
                        {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ username, password })
                        }
                )
        }
        return (
                <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
                        <FormInput
                                type='text'
                                id='username'
                                label='Username'
                                placeholder='Please type here'
                                required={true}
                                error={errors.username ? `${errors.username.message}` : ''}
                                register={{ ...register('username', { required: 'Username is required' }) }} />
                        <FormInput
                                type='password'
                                id='password'
                                label='Password'
                                placeholder='Please type here'
                                required={true} error={errors.password ? `${errors.password.message}` : ''} register={{ ...register('password', { required: 'Password is required' }) }} />
                        <div className='flex justify-between items-center mt-5'>
                                <Button disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Login'}</Button>
                                <a href="" className='text-sm text-primary'>Forgot Password?</a>
                        </div>
                </form>
        )
}

export default FormLogin