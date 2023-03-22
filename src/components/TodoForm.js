import React, {useState} from 'react';

export default function TodoForm({handleAdd}) {
  const id = Math.random();
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const _handleAdd = () => {
    handleAdd({id, title, isCompleted: completed});
    setCompleted(false);
    setTitle('');
  }

  return (
    <div>
      <label>title</label>
      <input data-testid="form-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <label>completed</label>
      <input data-testid="form-completed" type="checkbox" checked={completed} onChange={() => setCompleted(!completed)}/>
      <button data-testid="form-button" type="submit" onClick={() => _handleAdd()}>create</button>
    </div>
  );
};