import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoComponent from '@/components/Todo';

describe('Todo', function () {
  beforeEach(function () {
    jest.resetAllMocks();
  });

  const deleteButton = jest.fn();
  const editTodo = jest.fn();
  const titleContent = 'learning';
  const statusContent = 'completed';
  const todo = {
    id: 1,
    title: 'learning',
    isCompleted: true,
  };

  describe('#render', function () {
    it('should render title, status and delete button', function () {
      render(<TodoComponent todo={todo}/>)
      const title = screen.queryByTestId('title');
      const status = screen.queryByTestId('status');

      expect(title.textContent).toBe(titleContent);
      expect(status.textContent).toBe(statusContent);
    });
  });

  describe('#delete', function () {
    it('should called deleteButton when button clicked', function () {
      render(<TodoComponent todo={todo} handleDelete={deleteButton}/>)
      fireEvent.click(screen.queryByTestId('deleteButton'));

      expect(deleteButton).toHaveBeenCalled();
    });
  });

  describe('#edit', function () {
    it('should called editButton when button clicked', function () {
      render(<TodoComponent todo={todo} editTodo={editTodo}/>)
      fireEvent.click(screen.queryByTestId('editButton'));

      expect(editTodo).toHaveBeenCalled();
    });
  });
});