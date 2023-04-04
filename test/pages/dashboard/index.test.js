import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardIndexPage, {getServerSideProps} from '@/pages/dashboard';
import axios from 'axios';
import {when} from 'jest-when';
import constant from '@/constant';
import flushPromises from 'flush-promises';

const {BASE_URL} = constant;
jest.mock('axios');

describe('Dashboard page', () => {
  const data = [
    {
      id: 1,
      title: 'learning',
      isCompleted: true,
    },
    {
      id: 2,
      title: 'swimming',
      isCompleted: false,
    }
  ];
  when(axios.get)
    .calledWith(`${BASE_URL}/todo`)
    .mockResolvedValue({data});

  describe('#render', function () {
    it('should render snapshot', async function () {
      const {props: {todoList}} = await getServerSideProps();
      const {baseElement} = render(<DashboardIndexPage todoList={todoList}/>);

      expect(baseElement).toMatchSnapshot();
    });
    it('should render', async () => {
      const {props: {todoList}} = await getServerSideProps();
      render(<DashboardIndexPage todoList={todoList}/>);
      const title = screen.getAllByTestId('title');
      await flushPromises();

      expect(title).toHaveLength(2);
    });
  });

  describe('#handleDelete', function () {
    it('should called handleDelete', async function () {
      const {props: {todoList}} = await getServerSideProps();
      render(<DashboardIndexPage todoList={todoList}/>);
      const buttonDelete = screen.queryAllByTestId('deleteButton');
      fireEvent.click(buttonDelete[0]);
      await flushPromises();

      const status = screen.getAllByTestId('status');

      expect(status).toHaveLength(1);
    });
  });

  describe('#editTodo', function () {
    it('should called editTodo', async function () {
      const {props: {todoList}} = await getServerSideProps();
      render(<DashboardIndexPage todoList={todoList}/>);
      const editButton = screen.queryAllByTestId('editButton', {});

      fireEvent.click(editButton[0]);
      await flushPromises();
      const titleForm = screen.queryAllByTestId('form-title', {});

      expect(titleForm[0].value).toEqual(todoList[0].title);
    });
  });

  describe('#handleAdd', function () {
    it('should called handleAdd', async function () {
      const {props: {todoList}} = await getServerSideProps();
      render(<DashboardIndexPage todoList={todoList}/>);
      const titleForm = screen.queryByTestId('form-title', {});
      const statusForm = screen.queryByTestId('form-completed', {});
      const buttonCreate = screen.queryByTestId('form-button', {});
      fireEvent.change(titleForm, {target: {value: 'running'}});
      fireEvent.click(statusForm);
      fireEvent.click(buttonCreate);
      await flushPromises();

      const status = screen.getAllByTestId('status');

      expect(status).toHaveLength(3);
    });

    it('should update existing todo', async function () {
      const {props: {todoList}} = await getServerSideProps();
      render(<DashboardIndexPage todoList={todoList}/>);
      const editButton = screen.queryAllByTestId('editButton', {});
      fireEvent.click(editButton[0]);
      const titleForm = screen.queryByTestId('form-title', {});
      const statusForm = screen.queryByTestId('form-completed', {});
      const buttonCreate = screen.queryByTestId('form-button', {});

      fireEvent.change(titleForm, {target: {value: 'running'}});
      fireEvent.submit(statusForm);
      fireEvent.click(buttonCreate);
      await flushPromises();
      const status = screen.getAllByTestId('status');
      const title = screen.getAllByTestId('title');

      expect(status).toHaveLength(2);
      expect(title[todoList.length - 1].textContent).toEqual('running');
      expect(status[todoList.length - 1].textContent).toEqual('completed');
    });
  });
});