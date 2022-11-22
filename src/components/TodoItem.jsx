import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentTodo } from '../redux/slices/changeTodoSlice'
import MyButton from '../UI/MyButton/MyButton'
import { getFile, openTodo, removeTodo, removeTodoState, toggleTodo, toggleTodoState } from '../redux/slices/fetchTodoSlice'
import Modal from '../UI/Modal/Modal'

const TodoItem = ({ todo, setChangeModal }) => {
    const { id, title, body, date, complete } = todo
    const [src, setSrc] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const dipsatch = useDispatch()
    /**
     * Удаление todo
     * @param {string} id 
     */
    const removeHandler = (id) => {
        removeTodo(id)
        dipsatch(removeTodoState(id))
    }
    /**
     * Изменение состояния todo
     * @param {string} id 
     * @param {boolean} complete 
     */
    const toggleHandler = (id, complete) => {
        toggleTodo(id, complete)
        dipsatch(toggleTodoState(id))
    }
    /**
     * Открытие подробной информации todo
     * @param {string} id 
     */
    const todoInfoHandler = async (id) => {
        setIsOpen(true)
        setSrc(await openTodo(id))
    }

    const expired = Date.parse(date) < Date.now()

    return (
        <div className={complete ? 'todoItem done' : 'todoItem'}>
            <div className='todoItem__checkbox'>
                <input type="checkbox" checked={complete} onChange={() => toggleHandler(id, complete)} />
            </div>
            <div className='todoItem__body'>
                {expired && <p className='expired-title'>Время вышло</p>}
                <p><span className='todoItem__title'>Название:</span> {title}</p>
                <p><span className='todoItem__title'>Описание:</span> {body}</p>
                <p><span className='todoItem__title'>Дата завершения:</span> {date}</p>
            </div>
            <div className='todoItem__buttons'>
                <MyButton onClick={() => todoInfoHandler(id)}>Подробнее</MyButton>
                <MyButton onClick={async () => getFile(id)}>Скачать файл</MyButton>
                <MyButton onClick={() => {
                    setChangeModal(true)
                    dipsatch(setCurrentTodo(todo))
                }}
                >
                    Изменить
                </MyButton>
                <MyButton onClick={() => removeHandler(id)}>Удалить</MyButton>
            </div>
            <Modal isActive={isOpen} setIsActive={setIsOpen}>
                <div>
                    <p><span className='todoItem__title'>Название:</span> {title}</p>
                    <p><span className='todoItem__title'>Описание:</span> {body}</p>
                    <p><span className='todoItem__title'>Дата завершения:</span> {date}</p>
                    <p><span className='todoItem__title'>Загруженный файл:</span> {src ? src : 'файл не загружен'}</p>
                </div>
            </Modal>
        </div>
    )
}

export default TodoItem