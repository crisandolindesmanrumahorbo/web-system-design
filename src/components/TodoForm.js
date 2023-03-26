import React, {useState} from 'react';

export default function TodoForm({updateTodo: {id, title, isCompleted}, handleAdd}) {
  const [idForm, setId] = useState(id);
  const [titleForm, setTitle] = useState(title);
  const [completed, setCompleted] = useState(isCompleted);
  const [prevTodoId, setPrevTodoId] = useState(id);
  if (prevTodoId !== id) {
    setPrevTodoId(id);
    setId(id);
    setTitle(title);
    setCompleted(isCompleted);
  }

  const _handleAdd = () => {
    handleAdd({id: idForm, title: titleForm, isCompleted: completed});
    setId(Math.floor(Math.random() * 10000001));
    setCompleted(false);
    setTitle('');
  }

  return (
    <div>
      <label>title</label>
      <input data-testid="form-title" type="text" value={titleForm} onChange={(e) => setTitle(e.target.value)}/>
      <label htmlFor="form-completed">completed</label>
      <input data-testid="form-completed" id="form-completed" type="checkbox" checked={completed} onChange={() => setCompleted(!completed)}/>
      <button data-testid="form-button" type="submit" onClick={() => _handleAdd()}>save</button>
    </div>
  );
};