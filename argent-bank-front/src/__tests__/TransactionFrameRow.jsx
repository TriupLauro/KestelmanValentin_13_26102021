import React from "react";
import TransactionFrameRow from "../components/TransactionFrameRow";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {testingRender} from "../../jest/mocks/testingRender";

describe('Testing TransactionFrameRow', () => {
    test('The row should display information from the props', () => {
        const rootBody = document.getElementsByTagName('body')[0]
        const tabcontainer = document.createElement('tbody')
        rootBody.appendChild(tabcontainer)
        testingRender(<TransactionFrameRow
            notes=""
            category="Bills"
            description="Engie"
            date="September 5th, 2021"
            amount={139.56}
            balance={11548.26}
        />,{container : tabcontainer})
        expect(screen.getByText('September 5th, 2021')).toBeInTheDocument()
        expect(screen.getByText('Engie')).toBeInTheDocument()
    })
    test('Money amount should be formatted', () => {
        const rootBody = document.getElementsByTagName('body')[0]
        const tabcontainer = document.createElement('tbody')
        rootBody.appendChild(tabcontainer)
        testingRender(<TransactionFrameRow
            notes=""
            category="Bills"
            description="Engie"
            date="September 5th, 2021"
            amount={139.56}
            balance={11548.26}
        />,{container : tabcontainer})
        expect(screen.getByText('$139.56')).toBeInTheDocument()
        expect(screen.getByText('$11,548.26')).toBeInTheDocument()
    })
    test('Transaction details should appear after clicking', () => {
        const rootBody = document.getElementsByTagName('body')[0]
        const tabcontainer = document.createElement('tbody')
        rootBody.appendChild(tabcontainer)
        testingRender(<TransactionFrameRow
            notes=""
            category="Bills"
            description="Engie"
            date="September 5th, 2021"
            amount={139.56}
            balance={11548.26}
        />,{container : tabcontainer})
        expect(screen.queryByText('Transaction Type: Electronic')).not.toBeInTheDocument()
        expect(screen.queryByText('Category: Bills')).not.toBeInTheDocument()
        userEvent.click(screen.getByRole('row'))
        expect(screen.getByText('Transaction Type: Electronic')).toBeInTheDocument()
        expect(screen.getByText('Category: Bills')).toBeInTheDocument()
    })
    test('Transaction details should disappear after clicking a second time', () => {
        const rootBody = document.getElementsByTagName('body')[0]
        const tabcontainer = document.createElement('tbody')
        rootBody.appendChild(tabcontainer)
        testingRender(<TransactionFrameRow
            notes=""
            category="Bills"
            description="Engie"
            date="September 5th, 2021"
            amount={139.56}
            balance={11548.26}
        />,{container : tabcontainer})
        const mainRow = screen.getByRole('row')
        userEvent.click(mainRow)
        expect(screen.getByText('Transaction Type: Electronic')).toBeInTheDocument()
        expect(screen.getByText('Category: Bills')).toBeInTheDocument()

        userEvent.click(screen.getAllByRole('row')[0])
        expect(screen.queryByText('Transaction Type: Electronic')).not.toBeInTheDocument()
        expect(screen.queryByText('Category: Bills')).not.toBeInTheDocument()
    })
    test('Clicking the note pencil should open a text input',() => {
        const rootBody = document.getElementsByTagName('body')[0]
        const tabcontainer = document.createElement('tbody')
        rootBody.appendChild(tabcontainer)
        testingRender(<TransactionFrameRow
            notes=""
            category="Bills"
            description="Engie"
            date="September 5th, 2021"
            amount={139.56}
            balance={11548.26}
        />,{container : tabcontainer})
        userEvent.click(screen.getByRole('row'))
        userEvent.click(screen.getByTestId('note-pencil'))
        const textInput = screen.getByRole('textbox')
        expect(textInput).toBeInTheDocument()
        expect(textInput.value).toBe("")
    })
    test("If there's already a note, then it should be displayed",() => {
        const rootBody = document.getElementsByTagName('body')[0]
        const tabcontainer = document.createElement('tbody')
        rootBody.appendChild(tabcontainer)
        testingRender(<TransactionFrameRow
            notes="Pre-existent note"
            category="Bills"
            description="Engie"
            date="September 5th, 2021"
            amount={139.56}
            balance={11548.26}
        />,{container : tabcontainer})
        userEvent.click(screen.getByRole('row'))
        expect(screen.getByText("Pre-existent note")).toBeInTheDocument()
    })
    test("The user should be able to type in a note", () => {
        const rootBody = document.getElementsByTagName('body')[0]
        const tabcontainer = document.createElement('tbody')
        rootBody.appendChild(tabcontainer)
        testingRender(<TransactionFrameRow
            notes=""
            category="Bills"
            description="Engie"
            date="September 5th, 2021"
            amount={139.56}
            balance={11548.26}
        />,{container : tabcontainer})
        userEvent.click(screen.getByRole('row'))
        userEvent.click(screen.getByTestId('note-pencil'))
        userEvent.type(screen.getByRole('textbox'),'Automated typing of a note {enter}')
        expect(screen.getByText('Automated typing of a note')).toBeInTheDocument()
    })
    test('Clicking the category pencil should display a select dropdown', () => {
        const rootBody = document.getElementsByTagName('body')[0]
        const tabcontainer = document.createElement('tbody')
        rootBody.appendChild(tabcontainer)
        testingRender(<TransactionFrameRow
            notes=""
            category="Bills"
            description="Engie"
            date="September 5th, 2021"
            amount={139.56}
            balance={11548.26}
        />,{container : tabcontainer})
        userEvent.click(screen.getByRole('row'))
        userEvent.click(screen.getByTestId('category-pencil'))
        expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
    test('Selecting a dropdown option should modify the category', () => {
        const rootBody = document.getElementsByTagName('body')[0]
        const tabcontainer = document.createElement('tbody')
        rootBody.appendChild(tabcontainer)
        testingRender(<TransactionFrameRow
            notes=""
            category="Bills"
            description="Engie"
            date="September 5th, 2021"
            amount={139.56}
            balance={11548.26}
        />,{container : tabcontainer})
        userEvent.click(screen.getByRole('row'))
        userEvent.click(screen.getByTestId('category-pencil'))
        userEvent.click(screen.getByRole('option', {name : 'Electronics'}))
        expect(screen.getByText('Category: Electronics')).toBeInTheDocument()
    })
})