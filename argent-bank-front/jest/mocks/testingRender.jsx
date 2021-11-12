import {render as rtlRender} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {loginSlice} from "../../src/store/loginSlice";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import React from "react";

const initialState = {
    login : {
        status : 'disconnected',
        error : null,
        userData : null
    }
}

export const store = (customState = initialState) => {
    return configureStore({
        reducer: loginSlice.reducer,
        //We need to specify the initial state here or it will be undefined for the tests
        preloadedState: {
            ...customState
        }
    })
}



export function testingRender(ui, options, storeState) {
    function Wrapper({children}) {
        return (
            <MemoryRouter {...options}>
                <Provider store={store(storeState)}>
                    {children}
                </Provider>
            </MemoryRouter>
        )
    }

    rtlRender(ui, {wrapper : Wrapper})
}