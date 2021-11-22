import {render as rtlRender} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {loginSlice} from "../../src/store/loginSlice";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";

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

const queryClient = new QueryClient()

const rootBody = document.querySelector('body')
const defaultContainer = document.createElement('div')
rootBody.appendChild(defaultContainer)

export function testingRender(ui, {options , container } = {options : null, container : defaultContainer}, storeState) {
    function Wrapper({children}) {
        return (
            <MemoryRouter {...options}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store(storeState)}>
                        {children}
                    </Provider>
                </QueryClientProvider>
            </MemoryRouter>
        )
    }

    rtlRender(ui, {wrapper : Wrapper, container : container})
}