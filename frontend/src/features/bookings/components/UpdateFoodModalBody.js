import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"

const INITIAL_LEAD_OBJ = {
    price : "",
    foodname : "",
}

function UpdateFoodModalBody({extraObject, closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)
    const [food, setFood] = useState('')

    const fetchFood = async () => {
        try {
            const res = await fetch("/food/"+extraObject.id, {method: "GET"})
            const data = await res.json()
            setFood(data)
            setLeadObj({
                price: data.price,
                foodname: data.name
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    if (!food) fetchFood()

    const saveNewLead = async () => {
        console.log(leadObj)
        if(leadObj.foodname.trim() === "")return setErrorMessage("Name is required!")
        else{
            let newLeadObj = {
                price: leadObj.price,
                name: leadObj.foodname,
            }
            try {
                const res = await fetch("/food/update/"+extraObject.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newLeadObj)
                });
                const data = await res.json()
                console.log(data)
                dispatch(showNotification({message : "Food Updated!", status : 1}))
            } catch (error) {
                console.error(error)
                dispatch(showNotification({message : "Failed To Update Food!", status : 0}))
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

           {food && <InputText type="text" defaultValue={food.name} updateType="foodname" containerStyle="mt-4" labelTitle="Food Name" updateFormValue={updateFormValue}/>}

            {food && <InputText type="text" defaultValue={food.price} updateType="price" containerStyle="mt-4" labelTitle="Price" updateFormValue={updateFormValue}/>}



            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default UpdateFoodModalBody