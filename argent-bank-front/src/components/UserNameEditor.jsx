import {useState} from "react";
import "../styles/nameEditor.css"
import {useDispatch} from "react-redux";
import {updateUserName} from "../store/thunks";

function UserNameEditor({firstName, lastName}) {
    const [editing, setEditing] = useState(false)
    const [firstNameEdited, setFirstNameEdited] = useState('')
    const [lastNameEdited, setLastNameEdited] = useState('')
    const [firstNameDisplayed, setFirstNameDisplayed] = useState(firstName)
    const [lastNameDisplayed, setLastNameDisplayed] = useState(lastName)
    const dispatch = useDispatch()

    function typeFirstName(e) {
        setFirstNameEdited(e.target.value)
    }

    function typeLastName(e) {
        setLastNameEdited(e.target.value)
    }

    function handleSave() {
        if (firstNameEdited === '' && lastNameEdited === '') {
            setEditing(false)
            return null
        }

        if (firstNameEdited !== '') setFirstNameDisplayed(firstNameEdited)
        if (lastNameEdited !== '') setLastNameDisplayed(lastNameEdited)


        dispatch(updateUserName({
            firstName : firstNameEdited ? firstNameEdited : firstNameDisplayed,
            lastName : lastNameEdited?  lastNameEdited : lastNameDisplayed
        }))

        setLastNameEdited('')
        setFirstNameEdited('')
        setEditing(false)
    }

    return (
            editing ?
                <div className="header">
                    <h1 className="editing">Welcome back</h1>
                    <div className="name-input-container">
                        <input type="text" id="firstName" placeholder={firstNameDisplayed} value={firstNameEdited} onChange={typeFirstName}/>
                        <input type="text" id="lastName" placeholder={lastNameDisplayed} value={lastNameEdited} onChange={typeLastName}/>
                    </div>
                    <div className="name-button-container">
                        <button className="edit-button" onClick={handleSave}>Save</button>
                        <button className="edit-button" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </div>
                :
                <div className="header">
                    <h1>Welcome back<br/>{firstNameDisplayed} {lastNameDisplayed}!</h1>
                    <button className="edit-button" onClick={() => setEditing(true)}>Edit Name</button>
                </div>
    )
}

export default UserNameEditor