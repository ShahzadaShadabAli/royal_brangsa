import { useEffect } from 'react'
import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import AddLeadModalBody from '../features/leads/components/AddLeadModalBody'
import ConfirmationModalBody from '../features/common/components/ConfirmationModalBody'
import AddFoodModalBody from '../features/foods/components/AddFoodModalBody'
import AddOrderModalBody from '../features/orders/components/AddOrderModalBody'
import UpdateLeadModalBody from '../features/leads/components/UpdateLeadModalBody'
import UpdateFoodModalBody from '../features/foods/components/UpdateFoodModalBody'
import AddRoomModalBody from '../features/bookings/components/AddRoomModalBody'
import AddBookingModalBody from '../features/bookings/components/AddBookingModalBody'
import UpdateOrderModalBody from '../features/orders/components/UpdateOrderModalBody'

function ModalLayout(){


    const {isOpen, bodyType, size, extraObject, title} = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const close = (e) => {
        dispatch(closeModal(e))
    }



    return(
        <>
        {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>


                {/* Loading modal body according to different modal type */}
                {
                    {
                             [MODAL_BODY_TYPES.LEAD_ADD_NEW] : <AddLeadModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.FOOD_ADD_NEW] : <AddFoodModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.FOOD_UPDATE] : <UpdateFoodModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.UPDATE_LEAD] : <UpdateLeadModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.UPDATE_ORDER] : <UpdateOrderModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.ORDER_ADD_NEW] : <AddOrderModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.ROOM_ADD_NEW] : <AddRoomModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.BOOKING_ADD_NEW] : <AddBookingModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.CONFIRMATION] : <ConfirmationModalBody extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                    }[bodyType]
                }
            </div>
            </div>
            </>
    )
}

export default ModalLayout