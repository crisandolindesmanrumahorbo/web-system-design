import React, {useState} from 'react';
import TodoList from '@/components/TodoList';
import service from '@/service';
import TodoForm from '@/components/TodoForm';

export default function DashboardIndexPage({todoList}) {
  const [todos, setTodos] = useState(todoList);

  const handleDelete = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  }

  return (
    <div>
      <TodoForm handleAdd={handleAdd}/>
      <TodoList todos={todos} handleDelete={handleDelete}/>
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