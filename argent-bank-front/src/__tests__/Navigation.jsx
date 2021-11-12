import App from "../App";
import React from "react";
import {render} from "@testing-library/react";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('Testing the router', () => {
    describe('Given I am on the root path', () => {
        test('The home page should render', () => {
            render(<App />)
            expect(screen.getByText('Open a savings account with Argent Bank today!')).toBeInTheDocument()
        })
        test('Clicking on the Sign In link should lead to the form',  () => {
            render(<App />)
            const signin = screen.getByRole('link', {name : "Sign In"})
            expect(signin).toBeInTheDocument()
            userEvent.click(signin)
            expect(screen.getByLabelText('Username')).toBeInTheDocument()
            expect(screen.getByLabelText('Password')).toBeInTheDocument()
        })
    })
})