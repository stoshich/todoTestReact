import React from 'react'

const Modal = ({ isActive, setIsActive, children }) => {
    return (
        <div
            onClick={() => setIsActive(false)}
            className={isActive ? 'modal active' : 'modal'}
        >
            <div
                className={isActive ? 'modal__content active' : 'modal__content'}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal