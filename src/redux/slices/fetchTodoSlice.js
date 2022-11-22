import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getBlob, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

/**
 * Настройки для Firestore Database
 */
const app = initializeApp({
    apiKey: "AIzaSyAJfMPesKaRiCl6SVZEvYo_DbNB81H4Ric",
    authDomain: "todo-test-b389f.firebaseapp.com",
    projectId: "todo-test-b389f",
    storageBucket: "todo-test-b389f.appspot.com",
    messagingSenderId: "467262463700",
    appId: "1:467262463700:web:278404ac63ba3ee00aa541",
    measurementId: "G-QMQN1CT39D"
})

const db = getFirestore(app)
const storage = getStorage();

/**
 * Добавление файла в хранилище
 * @param {string} id - id todo item 
 * @param {file} file - прикрепленный файл
 */
const addFile = async (id, file) => {
    const storageRef = ref(storage, id)
    await uploadBytes(storageRef, file)
}

/**
 * Добавление todo в базу данных и файла в хранилище
 * @param {string} title - название todo
 * @param {string} body - описание todo
 * @param {string} date - дата окончания
 * @param {file} file 
 */
export const addTodo = async (title, body, date, file) => {
    const id = String(Date.now())
    try {
        await addDoc(collection(db, 'todos'), {
            id,
            title,
            body,
            date,
            complete: false,
            fileRef: id
        })
        if (file) await addFile(id, file)
    } catch (error) {
        console.log(error)
    }
}
/**
 * Подробная информация по todo
 * @param {string} id 
 * @returns {string} - ссылка на загруженный файл
 */
export const openTodo = async (id) => {
    const dataRef = await getDownloadURL(ref(storage, id))
    return dataRef
}
/**
 * Скачивание файла из хранилища
 * @param {string} id 
 */
export const getFile = async (id) => {
    try {
        const blob = await getBlob(ref(storage, id))
        const data = window.URL.createObjectURL(blob)
        const link = document.createElement('a');
        link.href = data;
        link.download = 'file';
        link.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            })
        );
    } catch (error) {
        console.log(error)
    }
}
/**
 * Удаление фала из хранилища
 * @param {string} id 
 */
const deleteFile = async (id) => {
    try {
        await deleteObject(ref(storage, id))
    } catch (error) {
        console.log(error)
    }
}
/**
 * Удаление todo из базы данных и файла из хранилища
 * @param {string} id 
 */
export const removeTodo = async (id) => {
    try {
        const q = query(collection(db, 'todos'), where("id", "==", id));
        let docid
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            docid = doc.id
        });
        await deleteDoc(doc(db, 'todos', docid))
        await deleteFile(id)
    } catch (error) {
        console.log(error)
    }
}
/**
 * Изменение полей todo
 * @param {object} currentTodo 
 */
export const changeTodo = async (currentTodo) => {
    const { id, title, body, date } = currentTodo
    try {
        const q = query(collection(db, 'todos'), where("id", "==", id));
        let docid
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            docid = doc.id
        });
        await updateDoc(doc(db, 'todos', docid), {
            title,
            body,
            date,
        })
    } catch (error) {
        console.log(error)
    }
}
/**
 * Изменение состояния todo (выполнена/не выполнена)
 * @param {string} id 
 * @param {boolean} complete 
 */
export const toggleTodo = async (id, complete) => {
    try {
        const q = query(collection(db, 'todos'), where("id", "==", id));
        let docid
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            docid = doc.id
        });
        await updateDoc(doc(db, 'todos', docid), {
            complete: !complete
        })
    } catch (error) {
        console.log(error)
    }
}
/**
 * Запрос на сервер для получения todos
 */
export const fetchTodos = createAsyncThunk(
    'todo/fetchTodosStatus', async () => {
        const querySnapshot = await getDocs(collection(db, "todos"))
        const data = []
        querySnapshot.forEach(doc => data.push(doc.data()))
        return data
    }
)


const initialState = {
    todos: [],
    status: ''
}

const fetchTodoSlice = createSlice({
    name: 'fetchTodo',
    initialState,
    reducers: {
        removeTodoState(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        changeTodoState(state, action) {
            state.todos = state.todos.map(todo => {
                if (todo.id !== action.payload.id) return todo

                return {
                    ...todo,
                    title: action.payload.title,
                    body: action.payload.body,
                    date: action.payload.date,
                }
            })
        },
        toggleTodoState(state, action) {
            state.todos = state.todos.map(todo => {
                if (todo.id !== action.payload) return todo

                return {
                    ...todo,
                    complete: !todo.complete
                }
            })
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = 'loading'
            state.todos = []
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'success'
            state.todos = action.payload
        },
        [fetchTodos.rejected]: (state) => {
            state.status = 'error'
            state.todos = []
        }
    }
})

export const { removeTodoState, changeTodoState, toggleTodoState } = fetchTodoSlice.actions
export default fetchTodoSlice.reducer