import Footer from "../components/Footer";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import React from "react";

describe('Footer - testing jest setup', ()=> {
    test('Footer should render', () => {
        render(<Footer />)
        expect(screen.getByText('Copyright 2020 Argent Bank')).toBeInTheDocument()
    })
})