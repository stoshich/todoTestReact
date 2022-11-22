import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ todos, toggleTodo, removeTodo, setChangeModal }) => {
    return (
        <div className='todoList'>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    removeTodo={removeTodo}
                    setChangeModal={setChangeModal}
                />))}
        </div>
    )
}

export default TodoList