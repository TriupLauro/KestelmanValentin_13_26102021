import React,{useState} from "react";
import PropTypes from "prop-types"
import {useMutation} from "react-query";
import {BASE_URL} from "../constants";
import {generateConfig} from "../utils/utils";
import axios from "axios";

// There is no modification to the database
// The modification by text input and select only modify the display
// On reload, the original data will be displayed

function TransactionFrameRow ({notes, category, date, amount, description, balance}) {

    const [collapse, setCollapse] = useState(true)
    const [displayCategorySelect, setDisplayCategorySelect] = useState(false)
    const [transactionCategory, setTransactionCategory] = useState(category)
    const [notesState, setNotesState] = useState(notes)
    const [displayTextInput, setDisplayTextInput] = useState(false)

    const transactionId = 'mockId'
    const config = generateConfig()

    const mutateCategory = useMutation(category => {
        return axios.post(`${BASE_URL}/transactions/${transactionId}/category`,category,config)
    })

    const mutateNotes = useMutation(notes => {
        return axios.post(`${BASE_URL}/transactions/${transactionId}/category`,notes,config)
    })

    const deleteNotes = useMutation(() => {
        return axios.delete(`${BASE_URL}/transactions/${transactionId}/category`,config)
    })

    function toggleCollapse () {
        setCollapse(!collapse)
    }

    function toggleDisplayCategorySelect() {
        setDisplayCategorySelect(!displayCategorySelect)
    }

    async function handleSelect(value) {
        setTransactionCategory(value)
        await mutateCategory.mutate(value)
        toggleDisplayCategorySelect()
    }

    function toggleDisplayTextInput() {
        setDisplayTextInput(!displayTextInput)
    }

    function handleTextInputKeyDown(e) {
        if (e.code === 'Enter') {
            setNotesState(e.target.value)
            handleNotesUpdate(e.target.value)
            toggleDisplayTextInput()
        }
    }

    function handleTextBlur(e) {
        setNotesState(e.target.value)
        handleNotesUpdate(e.target.value)
        toggleDisplayTextInput()
    }

    function handleNotesUpdate(notes) {
        if (notes === '') {
            deleteNotes.mutate()
            return
        }
        mutateNotes.mutate(notes)
    }

    if (mutateCategory.isError || mutateNotes.isError || deleteNotes.isError) {
        console.log('Back end not ready yet')
    }

    return (
        <>
            {collapse ?
                <tr className="transaction-frame-row" onClick={toggleCollapse}>
                    <td className="transaction-frame-chevron-container">
                        <i className="fa fa-chevron-down" aria-hidden="true"> </i>
                    </td>
                    <td>
                        <div className="transaction-frame-date">{date}</div>
                    </td>
                    <td>{description}</td>
                    <td>${amount.toLocaleString('en',{minimumFractionDigits : 2})}</td>
                    <td>${balance.toLocaleString('en',{minimumFractionDigits : 2})}</td>
                </tr>
                :
                <>
                    <tr className="transaction-frame-row dropdown-open" onClick={toggleCollapse}>
                        <td className="transaction-frame-chevron-container">
                            <i className="fa fa-chevron-up" aria-hidden="true"> </i>
                        </td>
                        <td>
                            <div className="transaction-frame-date">{date}</div>
                        </td>
                        <td>{description}</td>
                        <td>${amount.toLocaleString('en', {minimumFractionDigits : 2})}</td>
                        <td>${balance.toLocaleString('en', {minimumFractionDigits : 2})}</td>
                    </tr>
                    <tr>
                        <td className="transaction-frame-space"> </td>
                        <td className="transaction-frame-dropdown-content" colSpan={4}>
                            <div className="transaction-frame-dropdown-line">Transaction Type: Electronic</div>
                            <div className="transaction-frame-dropdown-line">Category: {transactionCategory}&nbsp;
                                {displayCategorySelect ?
                                    <select name="category" id="category-select">
                                        <option value="">--Select a category--</option>
                                        <option onClick={() => handleSelect('Food')}>Food</option>
                                        <option onClick={() => handleSelect('Travel')}>Travel</option>
                                        <option onClick={() => handleSelect('Electronics')}>Electronics</option>
                                        <option onClick={() => handleSelect('Clothes')}>Clothes</option>
                                        <option onClick={() => handleSelect('Bills')}>Bills</option>
                                    </select>
                                    :
                                    <i
                                        className="fa fa-pencil"
                                        onClick={toggleDisplayCategorySelect}
                                        data-testid="category-pencil"
                                    > </i>
                                }
                            </div>
                            <div className="transaction-frame-dropdown-line">Notes: {
                                displayTextInput ?
                                    <input type="text" defaultValue={notesState}
                                           onKeyDown={handleTextInputKeyDown}
                                           onBlur={handleTextBlur}
                                           autoFocus
                                    />
                                    :
                                    <span>{notesState} <i
                                        className="fa fa-pencil"
                                        onClick={toggleDisplayTextInput}
                                        data-testid="note-pencil"
                                    > </i></span>
                            }
                            </div>
                        </td>
                    </tr>
                </>
            }
        </>
    )
}

TransactionFrameRow.propTypes = {
    notes : PropTypes.string.isRequired,
    category : PropTypes.oneOf(['Food', 'Travel', 'Electronics', 'Clothes', 'Bills']).isRequired,
    date : PropTypes.string.isRequired,
    amount : PropTypes.number.isRequired,
    description : PropTypes.string.isRequired,
    balance : PropTypes.number.isRequired
}

export default TransactionFrameRow