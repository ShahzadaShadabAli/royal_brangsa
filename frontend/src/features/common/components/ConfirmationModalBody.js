import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil'
import { deleteLead } from '../../leads/leadSlice'
import { showNotification } from '../headerSlice'

function ConfirmationModalBody({ extraObject, closeModal}){

    const dispatch = useDispatch()

    const { message, type, _id, index} = extraObject


    const proceedWithYes = async() => {
        if(type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE){
            alert(index)
            try {
                await fetch('/user/delete/'+index, {method: "DELETE"})
                dispatch(showNotification({message : "User Deleted!", status : 1}))
            } catch (error) {
                console.log(error)
                dispatch(showNotification({message : "Failed To Delete User!", status : 0}))
            }
        } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.FOOD_DELETE) {
            try {
                await fetch('/food/delete/'+index, {method: "DELETE"})
                dispatch(showNotification({message : "Food Deleted!", status : 1}))
            } catch (error) {
                console.log(error)
                dispatch(showNotification({message : "Failed To Delete Food!", status : 0}))
            }
        }else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.ORDER_DELETE) {
            try {
                await fetch('/order/delete/'+index, {method: "DELETE"})
                dispatch(showNotification({message : "Order Deleted!", status : 1}))
            } catch (error) {
                console.log(error)
                dispatch(showNotification({message : "Failed To Delete Order!", status : 0}))
            }
        } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.BOOKING_DELETE) {
            try {
                await fetch('/booking/delete/'+index, {method: "DELETE"})
                dispatch(showNotification({message : "Booking Deleted!", status : 1}))
            } catch (error) {
                console.log(error)
                dispatch(showNotification({message : "Failed To Delete Booking!", status : 0}))
            }
        }
        
        closeModal()
    }

    return(
        <> 
        <p className=' text-xl mt-8 text-center'>
            {message}
        </p>

        <div className="modal-action mt-12">
                
                <button className="btn btn-outline" onClick={() => closeModal()}>Cancel</button>

                <button className="btn btn-primary w-36" onClick={() => proceedWithYes()}>Yes</button> 

        </div>
        </>
    )
}

export default ConfirmationModalBody