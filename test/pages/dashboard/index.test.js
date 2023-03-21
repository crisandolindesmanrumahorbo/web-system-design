import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardIndexPage, {getServerSideProps} from '@/pages/dashboard';
import axios from 'axios';
import {when} from 'jest-when';
import constant from '@/pages/constant';
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
});