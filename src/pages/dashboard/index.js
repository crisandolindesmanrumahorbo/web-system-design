import React, {useState} from 'react';
import TodoList from '@/components/TodoList';
import service from '@/service';
import TodoForm from '@/components/TodoForm';

export default function DashboardIndexPage({todoList}) {
  const [todos, setTodos] = useState(todoList);
  const [update, setUpdate] = useState({id: Math.floor(Math.random() * 10000001), title: '', isCompleted: false});

  const handleDelete = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  const editTodo = (todo) => {
    setUpdate(todo);
  }

  const handleAdd = (addedTodo) => {
    const findTodo = todos.find(todo => todo.id === addedTodo.id);
    const filterTodo = todos.filter(todo => todo.id !== addedTodo.id);
    if (findTodo) {
      setTodos([...filterTodo, addedTodo]);
    } else {
      setTodos([...todos, addedTodo]);
    }
  }

  return (
    <div>
      <TodoForm updateTodo={update} handleAdd={handleAdd}/>
      <TodoList todos={todos} handleDelete={handleDelete} editTodo={editTodo}/>
    </div>
  );
}

export async function getServerSideProps() {
  const todos = await service.getTodos();
  return {
    props: {
      todoList: todos
    }
  }
}