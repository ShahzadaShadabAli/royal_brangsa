import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"

const INITIAL_LEAD_OBJ = {
    price : "",
    foodname : "",
    total_members : ""
}

function AddFoodModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)
    const [notification, setNotification] = useState({})
    
    dispatch(showNotification({message : "New Food Added!", status : 1}))

    useEffect(() => {
        dispatch(showNotification(notification))
    }, [notification])

    const saveNewLead = async () => {
        if(leadObj.price.trim() === "")return setErrorMessage("Price is required!")
        else if(leadObj.foodname.trim() === "")return setErrorMessage("Name is required!")
        else{
            let newLeadObj = {
                price: leadObj.price,
                name: leadObj.foodname,
            }
            try {
                const res = await fetch("/food/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newLeadObj)
                });
                const data = await res.json()
                setNotification({message : "New Food Added!", status : 1})
                
            } catch (error) {
                console.error(error)
                setNotification({message : "Failed To Add New Food!", status : 0})
                
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

            <InputText type="text" defaultValue={leadObj.foodname} updateType="foodname" containerStyle="mt-4" labelTitle="Food Name" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.price} updateType="price" containerStyle="mt-4" labelTitle="Price" updateFormValue={updateFormValue}/>



            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddFoodModalBody