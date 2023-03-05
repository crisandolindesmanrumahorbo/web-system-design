import React from 'react';
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginIndexPage from "@/pages/login";

describe('Login page', () => {
    it('should render', () => {
        render(<LoginIndexPage/>);

        const usernameParagraph = screen.getByTestId('p-username');
        const usernameParagraphTextContent = "username:";
        const passwordParagraph = screen.getByTestId('p-password');
        const passwordParagraphTextContent = "password:";
        const buttonSubmit = screen.getByTestId('button');
        const buttonText = "Submit";

        expect(usernameParagraph.textContent).toBe(usernameParagraphTextContent);
        expect(passwordParagraph.textContent).toBe(passwordParagraphTextContent);
        expect(buttonSubmit.textContent).toBe(buttonText);
    });
});