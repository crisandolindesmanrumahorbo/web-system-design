import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginIndexPage from "@/pages/login";
import axios from 'axios';
import {useRouter} from 'next/router';
import {when} from "jest-when";
import constant from "@/pages/constant";
import flushPromises from 'flush-promises';

const {BASE_URL} = constant;
jest.mock('axios');
jest.mock('next/router', () => ({useRouter: jest.fn()}));

describe('Login', () => {
    beforeEach(function () {
        jest.resetAllMocks();
    });

    describe('#render', function () {
        it('should render page', () => {
            render(<LoginIndexPage/>);
            const usernameParagraph = screen.getByTestId('l-username');
            const usernameParagraphTextContent = "username";
            const passwordParagraph = screen.getByTestId('l-password');
            const passwordParagraphTextContent = "password";
            const buttonSubmit = screen.getByTestId('button');
            const buttonText = "Submit";

            expect(usernameParagraph.textContent).toBe(usernameParagraphTextContent);
            expect(passwordParagraph.textContent).toBe(passwordParagraphTextContent);
            expect(buttonSubmit.textContent).toBe(buttonText);
        });
    });

    describe('#handleLogin', function () {
        it('should redirect to dashboard when success login', async function () {
            const pushMock = jest.fn();
            useRouter.mockReturnValue({
                push: pushMock
            });
            render(<LoginIndexPage/>);
            const username = "username";
            const password = "password";
            const token = "jwt";
            const mockResponse = {
                data: {access_token: token}
            };
            const body = {
                username,
                password
            }
            when(axios.post)
                .calledWith(`${BASE_URL}/authentication/login`, body)
                .mockResolvedValue(mockResponse);

            fireEvent.change(screen.queryByTestId("i-username"), {target: {value: username}});
            fireEvent.change(screen.queryByTestId("i-password"), {target: {value: password}});
            fireEvent.click(screen.queryByTestId("button"));
            await flushPromises();

            expect(pushMock).toHaveBeenCalled();
        });

        it('should alert when failed login', async function () {
            global.alert = jest.fn();
            render(<LoginIndexPage/>);
            const username = "username";
            const password = "password";
            const body = {
                username,
                password
            }
            when(axios.post)
                .calledWith(`${BASE_URL}/authentication/login`, body)
                .mockRejectedValue();

            fireEvent.change(screen.queryByTestId("i-username"), {target: {value: username}});
            fireEvent.change(screen.queryByTestId("i-password"), {target: {value: password}});
            fireEvent.click(screen.queryByTestId("button"));
            await flushPromises();

            expect(global.alert).toHaveBeenCalled();
        });
    });

});