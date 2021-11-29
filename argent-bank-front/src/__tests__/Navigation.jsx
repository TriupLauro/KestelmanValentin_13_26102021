import App from "../App";
import React from "react";
import {render, waitFor} from "@testing-library/react";
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
            //In the intercepted API call, the only valid logins are 'test@name.com' with 'testpassword'
            userEvent.click(screen.getByRole('link', {name : "Sign In"}))
            userEvent.type(screen.getByLabelText('Username'),'test@name.com')
            userEvent.type(screen.getByLabelText('Password'),'testpassword')
            userEvent.click(screen.getByRole('button'))

            const displayedName = await screen.findByText('testFirstName')
            screen.debug(displayedName)
            expect(screen.getByRole('heading', {name : 'Welcome back testFirstName testLastName!'})).toBeInTheDocument()
            userEvent.click(screen.getByRole('link', {name : 'Sign Out'}))
        })
        test('If incorrect credentials are sent, an error message appears', async () => {
            render(<App />)
            userEvent.click(screen.getByRole('link', {name : "Sign In"}))
            userEvent.type(screen.getByLabelText('Username'),'bad@name.com')
            userEvent.type(screen.getByLabelText('Password'),'badpwd')
            userEvent.click(screen.getByRole('button'))

            const errorDisplay = await screen.findByText('Could not login with those credentials')
            screen.debug(errorDisplay)
            expect(screen.getByLabelText('Username')).toBeInTheDocument()
            expect(screen.getByLabelText('Password')).toBeInTheDocument()
        })
        test('The user can rename himself on the user page', async () => {
            render(<App />)
            userEvent.click(screen.getByRole('link', {name : "Sign In"}))
            userEvent.type(screen.getByLabelText('Username'),'test@name.com')
            userEvent.type(screen.getByLabelText('Password'),'testpassword')
            userEvent.click(screen.getByRole('button'))

            await waitFor(() => screen.getByRole('button', {name : 'Edit Name'}))
            const editNameBtn = screen.getByRole('button', {name : 'Edit Name'})
            userEvent.click(editNameBtn)
            const textInputArray = screen.getAllByRole('textbox')
            userEvent.type(textInputArray[0], 'New')
            userEvent.type(textInputArray[1], 'Name')
            userEvent.click(screen.getByRole('button', {name : 'Save'}))

            //We wait the console log from the msw handler
            //to know that the api call has been
            //intercepted and treated
            const spyLog = jest.spyOn(console,'log')
            await waitFor(() => expect(spyLog).toBeCalled())
            expect(screen.getByRole('heading', {name : 'Welcome back New Name!'})).toBeInTheDocument()

            //There is no actual modification in the user's name in the msw handlers
            userEvent.click(screen.getByRole('link', {name : 'Sign Out'}))
        })
    })
})