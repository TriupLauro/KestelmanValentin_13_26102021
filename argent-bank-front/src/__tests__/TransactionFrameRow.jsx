import React from "react";
import TransactionFrameRow from "../components/TransactionFrameRow";
import {screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {testingRender} from "../../jest/mocks/testingRender";
import axios from "axios";
import {BASE_URL} from "../constants";

const rootBody = document.getElementsByTagName('body')[0]
const tabcontainer = document.createElement('tbody')

beforeEach(() => {
    rootBody.innerHTML = ""
    tabcontainer.innerHTML = ""
    rootBody.appendChild(tabcontainer)
})

describe('Testing TransactionFrameRow', () => {
    test('The row should display information from the props', () => {
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
        testingRender(<TransactionFrameRow
            notes=""
            category="Bills"
            description="Engie"
            date="September 5th, 2021"
            amount={139.56}
            balance={11548.26}
        />,{container : tabcontainer})
        document.cookie = `abtoken=SECRET_TOKEN; max-age=${60*60*24}; samesite=strict`
        userEvent.click(screen.getByRole('row'))
        userEvent.click(screen.getByTestId('note-pencil'))
        userEvent.type(screen.getByRole('textbox'),'Automated typing of a note {enter}')
        expect(screen.getByText('Automated typing of a note')).toBeInTheDocument()
        document.cookie = `abtoken=; expires=Thu, 01 Jan 1970; samesite=strict`
    })
    test('Clicking the category pencil should display a select dropdown', () => {
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
    test('Selecting a dropdown option should modify the category', async () => {
        testingRender(<TransactionFrameRow
            notes=""
            category="Bills"
            description="Engie"
            date="September 5th, 2021"
            amount={139.56}
            balance={11548.26}
        />,{container : tabcontainer})
        document.cookie = `abtoken=SECRET_TOKEN; max-age=${60*60*24}; samesite=strict`
        userEvent.click(screen.getByRole('row'))
        userEvent.click(screen.getByTestId('category-pencil'))
        userEvent.click(screen.getByRole('option', {name : 'Electronics'}))
        await waitFor(() => expect(screen.getByText('Category: Electronics')).toBeInTheDocument())
        document.cookie = `abtoken=; expires=Thu, 01 Jan 1970; samesite=strict`
    })
    describe('Testing the fake API Calls', () => {
        test('Call to modify the category', async () => {
            testingRender(<TransactionFrameRow
                notes=""
                category="Bills"
                description="Engie"
                date="September 5th, 2021"
                amount={139.56}
                balance={11548.26}
            />, {container : tabcontainer})
            document.cookie = `abtoken=SECRET_TOKEN; max-age=${60*60*24}; samesite=strict`

            const axiosPostMethod = jest.spyOn(axios,'post')
            expect(axiosPostMethod).not.toHaveBeenCalled()

            userEvent.click(screen.getByRole('row'))
            userEvent.click(screen.getByTestId('category-pencil'))
            userEvent.click(screen.getByRole('option', {name : 'Electronics'}))

            await waitFor(() => {
                expect(axiosPostMethod).toHaveBeenCalled()
            })
            expect(axiosPostMethod).toHaveBeenCalledWith(
                `${BASE_URL}/transactions/mockId/category`,
                'Electronics',
                {"headers": {"Authorization": "Bearer SECRET_TOKEN"}}
                )

            document.cookie = `abtoken=; expires=Thu, 01 Jan 1970; samesite=strict`
        })
        /*test('Fail to update category without token', async () => {
        This situation could not happen in a actual usage of the app
        Instead, the user would be redirected to the sign in form
            testingRender(<TransactionFrameRow
                notes=""
                category="Bills"
                description="Engie"
                date="September 5th, 2021"
                amount={139.56}
                balance={11548.26}
            />, {container : tabcontainer})

            document.cookie = `token=; expires=Thu, 01 Jan 1970; samesite=strict`

            const axiosPostMethod = jest.spyOn(axios,'post')
            expect(axiosPostMethod).not.toHaveBeenCalled()

            userEvent.click(screen.getByRole('row'))
            userEvent.click(screen.getByTestId('category-pencil'))
            userEvent.click(screen.getByRole('option', {name : 'Electronics'}))

            await waitFor(() => {
                expect(axiosPostMethod).toHaveBeenCalled()
            })

            expect(axiosPostMethod).toHaveBeenCalledWith(
                `${BASE_URL}/transactions/mockId/category`,
                'Electronics',
                null
            )

        })*/
        test('Call to modify the notes', async () => {
            testingRender(<TransactionFrameRow
                notes=""
                category="Bills"
                description="Engie"
                date="September 5th, 2021"
                amount={139.56}
                balance={11548.26}
            />, {container : tabcontainer})
            document.cookie = `abtoken=SECRET_TOKEN; max-age=${60*60*24}; samesite=strict`

            const axiosPostMethod = jest.spyOn(axios,'post')

            userEvent.click(screen.getByRole('row'))
            userEvent.click(screen.getByTestId('note-pencil'))
            userEvent.type(screen.getByRole('textbox'),'Automated typing of a note {enter}')

            await waitFor(() => expect(axiosPostMethod).toHaveBeenCalled())

            expect(axiosPostMethod).toHaveBeenCalledWith(
                `${BASE_URL}/transactions/mockId/notes`,
                'Automated typing of a note ',
                {"headers": {"Authorization": "Bearer SECRET_TOKEN"}}
            )

            document.cookie = `abtoken=; expires=Thu, 01 Jan 1970; samesite=strict`
        })
        test('Call to delete existing notes', async () => {
            testingRender(<TransactionFrameRow
                notes="Note to be deleted"
                category="Bills"
                description="Engie"
                date="September 5th, 2021"
                amount={139.56}
                balance={11548.26}
            />, {container : tabcontainer})
            document.cookie = `abtoken=SECRET_TOKEN; max-age=${60*60*24}; samesite=strict`

            const axiosDel = jest.spyOn(axios,'delete')
            userEvent.click(screen.getByRole('row'))
            userEvent.click(screen.getByTestId('note-pencil'))

            userEvent.type(screen.getByRole('textbox'),'{selectall}{backspace}{enter}')

            await waitFor(() => expect(axiosDel).toHaveBeenCalled())
            expect(axiosDel).toHaveBeenCalledWith(
                `${BASE_URL}/transactions/mockId/notes`,
                {"headers": {"Authorization": "Bearer SECRET_TOKEN"}}
            )

            document.cookie = `abtoken=; expires=Thu, 01 Jan 1970; samesite=strict`
        })
    })
})