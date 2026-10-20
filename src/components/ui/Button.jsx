
import React from 'react'
import { twMerge } from 'tailwind-merge'

const variants = {
    primary: 'bg-accentSend text-textMoss font-satoshi',
    secondary: 'bg-secondarySage/40 text-textMoss font-satoshi border-2 border-backgroundIvory',
    accent: 'border-1 border-accentSend text-textMoss font-satoshi'
}

function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}) {
    return (
        <button
            className={twMerge(
                'px-4 py-2 rounded-full transition-all duration-200 font-bold text-base',
                variants[variant] ?? variants.primary,
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
