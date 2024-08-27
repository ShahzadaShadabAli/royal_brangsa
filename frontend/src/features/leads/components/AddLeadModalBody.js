import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"

const INITIAL_LEAD_OBJ = {
    cnic : "",
    fullname : "",
    phone : "",
    total_members : ""
}

function AddLeadModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)


    const saveNewLead = async () => {
        if(leadObj.cnic.trim() === "")return setErrorMessage("Cnic is required!")
        else if(leadObj.total_members.trim() === "")return setErrorMessage("Total Members is required!")
        else if(leadObj.phone.trim() === "")return setErrorMessage("Phone is required!")
        else if(leadObj.fullname.trim() === "")return setErrorMessage("Fullname is required!")
        else{
            let newLeadObj = {
                total_members: leadObj.total_members,
                cnic: leadObj.cnic,
                fullname: leadObj.fullname,
                phone: leadObj.phone,
            }

            try {
                const res = await fetch("/user/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newLeadObj)
                });
                const data = await res.json()
                console.log(data)
                dispatch(showNotification({message : "New Client Added!", status : 1}))
            } catch (error) {
                console.log(error)
                dispatch(showNotification({message : "Failed To Add Clients!", status : 0}))
            }
            
            closeModal()
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, [updateType] : value})
    }

    return(
        <>

            <InputText type="text" defaultValue={leadObj.fullname} updateType="fullname" containerStyle="mt-4" labelTitle="Full Name" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.phone} updateType="phone" containerStyle="mt-4" labelTitle="Phone" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.cnic} updateType="cnic" containerStyle="mt-4" labelTitle="CNIC" updateFormValue={updateFormValue}/>

            <InputText type="total_members" defaultValue={leadObj.total_members} updateType="total_members" containerStyle="mt-4" labelTitle="Total Members" updateFormValue={updateFormValue}/>


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddLeadModalBody