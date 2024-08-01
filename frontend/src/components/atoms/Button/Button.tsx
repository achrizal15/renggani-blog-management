import React from 'react'
import BtnStyle from '@/components/atoms/Button/Button.module.scss'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: ButtonVariant,
        children: React.ReactNode
}

const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
        let variantClass = BtnStyle.btn__primary;
        switch (variant) {
                case 'primary':
                        variantClass = BtnStyle.btn__primary;
                        break;
                case 'secondary':
                        variantClass = BtnStyle.btn__secondary;
                        break;
                case 'danger':
                        variantClass = BtnStyle.btn__danger;
                        break;
                case 'success':
                        variantClass = BtnStyle.btn__success;
                        break;
                case 'warning':
                        variantClass = BtnStyle.btn__warning;
                        break;
                default:
                        variantClass = BtnStyle.btn__primary;
        }
        return (
             <button className={`${variantClass} ${props.className}`} {...props}>{children}</button>
        )
}

export default Button