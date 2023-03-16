import React from "react";
import Todo from "./Todo"

export default function TodoListComponent({todos, handleDelete}) {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Activity</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        handleDelete={handleDelete}
                    />
                ))}
                </tbody>
            </table>
        </div>
    )
}