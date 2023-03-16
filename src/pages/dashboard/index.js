import React, {useState} from 'react';
import TodoList from "@/components/TodoList";
import service from "@/pages/service";

export default function DashboardIndexPage({todoList}) {
    const [todos, setTodos] = useState(todoList);

    const handleDelete = (id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    }

    return (
        <TodoList todos={todos} handleDelete={handleDelete}/>
    )
}

export async function getServerSideProps() {
    const todos = await service.getTodos();
    return {
        props: {
            todoList: todos
        }
    }
}