import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"

const INITIAL_LEAD_OBJ = {
    price : "",
    roomname : "",
    total_members : ""
}

function AddRoomModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)


    const saveNewLead = async () => {
        if(leadObj.roomname.trim() === "")return setErrorMessage("Name is required!")
        else{
            let newLeadObj = {
                name: leadObj.roomname,
            }
            try {
                const res = await fetch("/room/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newLeadObj)
                });
                const data = await res.json()
                console.log(data)
                dispatch(showNotification({message : "New Room Added!", status : 1}))
            } catch (error) {
                console.error(error)
                dispatch(showNotification({message : "Failed To Add Room Food!", status : 0}))
            }
            dispatch(addNewLead({newLeadObj}))
            closeModal()
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, [updateType] : value})
    }

    return(
        <>

            <InputText type="text" defaultValue={leadObj.roomname} updateType="roomname" containerStyle="mt-4" labelTitle="Room Name" updateFormValue={updateFormValue}/>



            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddRoomModalBody