import Footer from "../components/Footer";
import { screen} from "@testing-library/react";
//import '@testing-library/jest-dom';
import React from "react";
import {testingRender} from "../../jest/mocks/testingRender";

describe('Footer - testing jest setup', ()=> {
    test('Footer should render', () => {
        testingRender(<Footer />)
        expect(screen.getByText('Copyright 2020 Argent Bank')).toBeInTheDocument()
    })
})