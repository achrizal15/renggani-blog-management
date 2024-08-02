import React from 'react'
import AlertStyle from './Alert.module.scss'
type AlertProps = {
        variant?: "success" | "error" | "warning" | "info";
        show: boolean;
        children: React.ReactNode;
}

const Alert = ({ variant = "success", show = false, children }: AlertProps) => {
        return (
                <div>
                        {show && <div className={`${AlertStyle.alert} ${AlertStyle[variant]}`} role="alert">{children}</div>}
                </div>
        )
}

export default Alert
