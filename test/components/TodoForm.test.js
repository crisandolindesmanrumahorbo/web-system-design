import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoForm from '@/components/TodoForm';
import userEvent from '@testing-library/user-event';

describe('TodoForm', function () {
  beforeEach(function () {
    jest.resetAllMocks();
  });

  const handleAdd = jest.fn();
  const titleContent = 'learning';
  const updateTodo = {
    id: null,
    title: '',
    isCompleted: false
  };

  const setup = (jsx) => {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    }
  }

  describe('#render', function () {
    it('should render title, status input and create button', function () {
      render(<TodoForm updateTodo={updateTodo} handleAdd={handleAdd}/>)
      const titleForm = screen.queryByTestId('form-title', {});
      const statusForm = screen.queryByTestId('form-completed', {});
      const buttonForm = screen.queryByTestId('form-button', {});

      expect(titleForm).toBeInTheDocument();
      expect(statusForm).toBeInTheDocument();
      expect(buttonForm).toBeInTheDocument();
    });
  });

  describe('#handleAdd', function () {
    it('should called handleAdd when button clicked', function () {
      render(<TodoForm updateTodo={updateTodo} handleAdd={handleAdd}/>);
      const titleForm = screen.queryByTestId('form-title', {});
      const statusForm = screen.queryByTestId('form-completed', {});
      fireEvent.change(titleForm, {target: {value: titleContent}});
      fireEvent.click(statusForm);
      fireEvent.click(screen.queryByTestId('form-button', {}));

      expect(handleAdd).toBeCalled();
    });
  });
});