import Button from '@/components/atoms/Button/Button'
import FormInput from '@/components/molecules/FormInput/FormInput'
import FormLogin from '@/components/organisms/Login/FormLogin'
import Image from 'next/image'
import React from 'react'

const LoginPage = () => {
        return (
                <main className='relative'>
                        <header className='md:h-[600px] h-[250px] overflow-hidden relative w-full'>
                                <Image src={`/images/banner_login.jpg`} alt='banner login' className='w-full object-cover object-left' fill={true} priority />
                                <div className='absolute top-0 left-0 w-full h-full bg-neutral bg-opacity-60'></div>
                        </header>

                        <section className='flex flex-col items-center absolute top-20 md:top-52 gap-10 px-5 left-0 right-0'>
                                <Image src={`/images/logo_color.webp`}
                                        width={160}
                                        height={160}
                                        alt='logo'
                                        loading='eager'
                                        priority />
                                <article className='bg-white md:max-w-md w-full p-5 rounded-md'>
                                        <div className='text-center'>
                                                <h1 className='text-primary text-lg font-medium'>Welcome Back !</h1>
                                                <p className='text-sm text-base-200'>Sign in to continue to Renggani Portal.</p>
                                        </div>
                                        <FormLogin />
                                </article>
                        </section>

                </main>
        )
}

export default LoginPage