import React from "react";

export default function TodoComponent({todo: {id, title, isCompleted}, handleDelete},) {
    return (
        <tr>
            <td data-testid="title">{title}</td>
            <td data-testid="status">{isCompleted ? "completed" : ""}</td>
            <td>
                <button data-testid="deleteButton" type="click" onClick={(e) => handleDelete(id)}>delete</button>
            </td>
        </tr>
    )
}