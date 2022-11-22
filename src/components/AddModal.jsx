import React, { useState } from 'react'
import Modal from '../UI/Modal/Modal';
import MyButton from '../UI/MyButton/MyButton';
import MyInput from '../UI/MyInput/MyInput';
import { addTodo, fetchTodos } from '../redux/slices/fetchTodoSlice';
import { useDispatch } from 'react-redux';

const AddModal = ({ addModal, setAddModal }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [date, setDate] = useState('')
    const [file, setFile] = useState('')

    /**
     * Добавление todo и сохранение в базу данных и хранилище
     * @param {string} title 
     * @param {string} body 
     * @param {string} date 
     * @param {file} file 
     */
    const addTodoHandler = (title, body, date, file) => {
        addTodo(title, body, date, file)
        setTitle('')
        setBody('')
        setDate('')
        setFile(null)
        setAddModal(false)
        dispatch(fetchTodos())
    }

    return (
        <Modal isActive={addModal} setIsActive={setAddModal}>
            <MyInput value={title} onChange={e => setTitle(e.target.value)} placeholder={'Заголовок'} />
            <MyInput value={body} onChange={e => setBody(e.target.value)} placeholder={'Описание'} />
            <input value={date} onChange={e => setDate(e.target.value)} type="date" />
            <input type='file' onChange={e => setFile(e.target.files[0])} />
            <MyButton onClick={() => addTodoHandler(title, body, date, file)}>Добавить</MyButton>
        </Modal>
    )
}

export default AddModal