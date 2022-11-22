import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentTodo: {
        id: '',
        title: '',
        body: '',
        date: ''
    },
}

const changeTodoSlice = createSlice({
    name: 'changeTodo',
    initialState,
    reducers: {
        setCurrentTodo(state, action) {
            state.currentTodo = action.payload
        },
        setCurrentTitle(state, action) {
            state.currentTodo.title = action.payload
        },
        setCurrentBody(state, action) {
            state.currentTodo.body = action.payload
        },
        setCurrentDate(state, action) {
            state.currentTodo.date = action.payload
        },
    }
})

export const { setCurrentTodo, setCurrentTitle, setCurrentBody, setCurrentDate } = changeTodoSlice.actions
export default changeTodoSlice.reducer