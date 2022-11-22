import React from 'react'
import classes from './MyInput.module.css'

const MyInput = ({ placeholder, value, onChange }) => {
    return (
        <div className={classes.wrapper}>
            <input
                className={classes.input}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default MyInput