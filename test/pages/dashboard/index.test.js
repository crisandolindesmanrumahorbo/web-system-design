import React from 'react';
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardIndexPage from "@/pages/dashboard";

describe('Dashboard page', () => {
    it('should render', () => {
        render(<DashboardIndexPage />);

        const header = screen.getByRole('heading', {level: 1});
        const headerText = "Hello World!";

        expect(header.textContent).toBe(headerText);

    });
});