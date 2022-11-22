import React from 'react'
import classes from './MyButton.module.css'

const MyButton = ({ onClick, children }) => {
    return (
        <div>
            <button onClick={onClick} className={classes.button}>{children}</button>
        </div>
    )
}

export default MyButton