import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { fetchTodos } from '../redux/slices/fetchTodoSlice';

import MyButton from '../UI/MyButton/MyButton';
import AddModal from './AddModal';
import ChangeModal from './ChangeModal';
import TodoList from './TodoList';

function App() {
  const dispatch = useDispatch()
  const [addModal, setAddModal] = useState(false)
  const [changeModal, setChangeModal] = useState(false)
  const todosFromRedux = useSelector(state => state.fetchTodo.todos)
  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  return (
    <div className="App">
      <MyButton onClick={() => setAddModal(true)}>Создать задачу</MyButton>
      <AddModal
        addModal={addModal}
        setAddModal={setAddModal}
      />
      <TodoList
        todos={todosFromRedux}
        setChangeModal={setChangeModal}
      />
      <ChangeModal
        changeModal={changeModal}
        setChangeModal={setChangeModal}
      />
    </div>
  );
}

export default App;
