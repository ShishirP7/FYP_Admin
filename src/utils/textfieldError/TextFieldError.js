import React from 'react'

export default function TextFieldError({ error }) {
    return (
        <p className='text-red-500 text-xs pt-2'>{error}</p>
    )
}
