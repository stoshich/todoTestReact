import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../UI/Modal/Modal';
import MyButton from '../UI/MyButton/MyButton';
import MyInput from '../UI/MyInput/MyInput';
import { setCurrentBody, setCurrentDate, setCurrentTitle } from '../redux/slices/changeTodoSlice';
import { changeTodo, changeTodoState } from '../redux/slices/fetchTodoSlice';

const ChangeModal = ({ changeModal, setChangeModal }) => {
    const dipsatch = useDispatch()
    const currentTodo = useSelector(state => state.currentTodo.currentTodo)
    /**
     * Изменение полей todo и сохранение
     * @param {object} todo 
     */
    const changeTodoHandler = (todo) => {
        changeTodo(todo)
        dipsatch(changeTodoState(todo))
        setChangeModal(false)
    }

    return (
        <Modal isActive={changeModal} setIsActive={setChangeModal}>
            <MyInput value={currentTodo.title} onChange={e => dipsatch(setCurrentTitle(e.target.value))} placeholder={'Заголовок'} />
            <MyInput value={currentTodo.body} onChange={e => dipsatch(setCurrentBody(e.target.value))} placeholder={'Описание'} />
            <input value={currentTodo.date} onChange={e => dipsatch(setCurrentDate(e.target.value))} type="date" />
            <MyButton onClick={() => {
                changeTodoHandler(currentTodo)
            }}>Изменить</MyButton>
        </Modal>
    )
}

export default ChangeModal