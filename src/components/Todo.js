import React from 'react';

export default function TodoComponent({todo: {id, title, isCompleted}, handleDelete, editTodo},) {
  return (
    <tr>
      <td data-testid="title">{title}</td>
      <td data-testid="status">{isCompleted ? 'completed' : ''}</td>
      <td>
        <button data-testid="deleteButton" type="click" onClick={() => handleDelete(id)}>delete</button>
        <button data-testid="editButton" type="click" onClick={() => editTodo({id, title, isCompleted})}>edit</button>
      </td>
    </tr>
  )
}