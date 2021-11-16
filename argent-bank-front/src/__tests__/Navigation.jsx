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

            userEvent.click(signin)
            expect(screen.getByLabelText('Username')).toBeInTheDocument()
            expect(screen.getByLabelText('Password')).toBeInTheDocument()
        })
        test('After going to the Sign in form, credentials can be sent and user data would be displayed', async () => {
            render(<App />)
            userEvent.click(screen.getByRole('link', {name : "Sign In"}))
            userEvent.type(screen.getByLabelText('Username'),'test@name.com')
            userEvent.type(screen.getByLabelText('Password'),'testpassword')
            userEvent.click(screen.getByRole('button'))

            const displayedName = await screen.findByText('testFirstName')
            screen.debug(displayedName)
            expect(screen.getByRole('heading', {name : 'Welcome back testFirstName testLastName!'})).toBeInTheDocument()
            document.cookie = `token=; expires=Thu, 01 Jan 1970; samesite=strict`
        })
        test('If incorrect credentials are sent, an error message appears', async () => {
            render(<App />)
            userEvent.click(screen.getByRole('link', {name : "Sign In"}))
            userEvent.type(screen.getByLabelText('Username'),'bad@name')
            userEvent.type(screen.getByLabelText('Password'),'badpwd')
            userEvent.click(screen.getByRole('button'))

            const errorDisplay = await screen.findByText('Could not login with those credentials')
            screen.debug(errorDisplay)
        })
    })
})