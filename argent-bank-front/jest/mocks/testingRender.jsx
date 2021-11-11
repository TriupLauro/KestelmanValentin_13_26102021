import {render as rtlRender} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {loginSlice} from "../../src/store/loginSlice";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import React from "react";

export function testingRender(ui, options) {
    const store = configureStore({
        reducer : loginSlice.reducer
    })

    function Wrapper({children}) {
        return (
            <MemoryRouter {...options}>
                <Provider store={store}>
                    {children}
                </Provider>
            </MemoryRouter>
        )
    }

    rtlRender(ui, {wrapper : Wrapper})
}