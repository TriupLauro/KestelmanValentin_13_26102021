import HomePage from "../pages/HomePage";
import React from "react";
import {testingRender} from "../../jest/mocks/testingRender";
import {screen} from "@testing-library/react";

describe('Given I am on the home page', () => {
    test('The home page should render', () => {
        testingRender(<HomePage />)
        expect(screen.getByText('Sign In')).toBeInTheDocument()
    })
})