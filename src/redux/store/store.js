import { configureStore } from "@reduxjs/toolkit";
import currentTodo from '../slices/changeTodoSlice'
import fetchTodo from "../slices/fetchTodoSlice";

export const store = configureStore({
    reducer: {
        currentTodo,
        fetchTodo,
    }
})