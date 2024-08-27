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

function UpdateLeadModalBody({extraObject, closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)
    const [user, setUser] = useState('')


        const fetchUsers = async () => {
            try {
                const res = await fetch("/user/"+extraObject.id, {method: "GET"})
                const data = await res.json()
                setLeadObj({
                    cnic: data.cnic,
                    fullname: data.fullname,
                    phone: data.phone,
                    total_members: data.total_members
                })
                setUser(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        if (!user) fetchUsers()


    const saveNewLead = async () => {
        console.log(leadObj)
        if(leadObj.cnic.trim() === "")return setErrorMessage("Cnic is required!")
        else if(leadObj.fullname.trim() === "")return setErrorMessage("Fullname is required!")
        else{   
            let newLeadObj = {
                total_members: leadObj.total_members,
                cnic: leadObj.cnic,
                fullname: leadObj.fullname,
                phone: leadObj.phone,
            }

            try {
                const res = await fetch("/user/update/"+extraObject.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newLeadObj)
                });
                const data = await res.json()
                dispatch(showNotification({message : "Client Updated!", status : 1}))
            } catch (error) {
                console.log(error)
                dispatch(showNotification({message : "Failed To Update Clients!", status : 0}))
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

            {user && <InputText type="text" defaultValue={user.fullname} updateType="fullname" containerStyle="mt-4" labelTitle="Full Name" updateFormValue={updateFormValue}/>}

            {user && <InputText type="text" defaultValue={user.cnic} updateType="cnic" containerStyle="mt-4" labelTitle="CNIC" updateFormValue={updateFormValue}/>}
            {user && <InputText type="text" defaultValue={user.phone} updateType="phone" containerStyle="mt-4" labelTitle="Phone" updateFormValue={updateFormValue}/>}

            {user && <InputText type="number" defaultValue={user.total_members} updateType="total_members" containerStyle="mt-4" labelTitle="Total Members" updateFormValue={updateFormValue}/>}


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default UpdateLeadModalBody