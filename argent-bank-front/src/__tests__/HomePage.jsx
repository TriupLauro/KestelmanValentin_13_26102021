import HomePage from "../pages/HomePage";
import React from "react";
import {testingRender} from "../../jest/mocks/testingRender";
import {screen} from "@testing-library/react";

const rootBody = document.querySelector('body')
const defaultContainer = document.createElement('div')

beforeEach(() => {
    rootBody.innerHTML = ""
    defaultContainer.innerHTML = ""
    rootBody.appendChild(defaultContainer)
})

describe('Given I am on the home page', () => {
    test('The catchphrases should be displayed', () => {
        testingRender(<HomePage />, {container : defaultContainer})
        expect(screen.getByText('No fees.')).toBeInTheDocument()
        expect(screen.getByText('No minimum deposit.')).toBeInTheDocument()
        expect(screen.getByText('High interest rates.')).toBeInTheDocument()
        expect(screen.getByText('Open a savings account with Argent Bank today!')).toBeInTheDocument()
    })
    test('The Sign In link should render', () => {
        testingRender(<HomePage /> , {container : defaultContainer})
        expect(screen.getByRole('link',{name : "Sign In"})).toBeInTheDocument()
    })
    test('There should be a level 1 heading', ()=> {
        testingRender(<HomePage /> , {container : defaultContainer})
        const title = screen.getByRole('heading',{level : 1})
        expect(title).toBeInTheDocument()
        expect(title.textContent).toBe('Argent Bank')
    })
    test('There should be at least one level 2 heading', () => {
        testingRender(<HomePage />, {container : defaultContainer})
        const h2 = screen.getAllByRole('heading', {level : 2})
        expect(h2.length).toBeGreaterThanOrEqual(1)
    })
    test('There should be at least one feature with one image', () => {
        testingRender(<HomePage />, {container : defaultContainer})
        const images = screen.getAllByAltText('Chat Icon')
        expect(images.length).toBeGreaterThanOrEqual(1)
    })
    test('The title image should be displayed', () => {
        testingRender(<HomePage />, {container : defaultContainer})
        expect(screen.getByAltText('Argent Bank Logo')).toBeInTheDocument()
    })
    test('If there is user data in the store, the NavBar should reflect it', () => {
        testingRender(<HomePage />, {container: defaultContainer},{
            login : {
                userData : {
                    firstName : 'Tim'
                }
            }
        })
        expect(screen.getByText('Tim')).toBeInTheDocument()
        expect(screen.getByRole('link', {name : 'Sign Out'})).toBeInTheDocument()
    })
})