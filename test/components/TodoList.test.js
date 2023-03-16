import React from 'react';
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "@/components/TodoList";

describe('TodoList', function () {
    describe('#render', function () {
        it('should render 2 todo', function () {
            const handleDelete = jest.fn();
            const todoList = [
                {
                    id: 1,
                    title: "learning",
                    isCompleted: true,
                },
                {
                    id: 2,
                    title: "swimming",
                    isCompleted: false,
                }
            ];

            render(<TodoList todos={todoList} handleDelete={handleDelete}/>);
            const title = screen.getAllByTestId("title");
            const status = screen.getAllByTestId("status");

            expect(title).toHaveLength(2);
            expect(status).toHaveLength(2);
        });
    });
});