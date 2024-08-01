'use client'
import Button from '@/components/atoms/Button/Button'
import FormInput from '@/components/molecules/FormInput/FormInput'
import React from 'react'

const FormLogin = () => {
        const [loading, setLoading] = React.useState<boolean>(false)
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                setLoading(true)
                e.preventDefault()
                const formData = new FormData(e.currentTarget);
                const username = formData.get('username') as string;
                const password = formData.get('password') as string;
                await fetch('http://localhost:3001/auth/login', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username, password }),
                }).then((res) => {
                        console.log(res)
                }).catch(err=>console.log(err))
                setLoading(false)
        }
        return (
                <form className='mt-5' onSubmit={handleSubmit}>
                        <FormInput type='text' id='username' label='Username' placeholder='Please type here' required={true} error='' />
                        <FormInput type='password' id='password' label='Password' placeholder='Please type here' required={true} error='' />
                        <div className='flex justify-between items-center mt-5'>
                                <Button disabled={loading}>{loading ? 'Loading...' : 'Login'}</Button>
                                <a href="" className='text-sm text-base-100'>Forgot Password?</a>
                        </div>
                </form>
        )
}

export default FormLogin