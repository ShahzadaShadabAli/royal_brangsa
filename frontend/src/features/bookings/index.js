import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'
import { Link } from "react-router-dom"
const TopSideButtons = () => {

    const dispatch = useDispatch()


    const openAddNewBookingModal = () => {
        dispatch(openModal({ title: "Add New Booking", bodyType: MODAL_BODY_TYPES.BOOKING_ADD_NEW }))
    }
    const openAddNewRoomModal = () => {
        dispatch(openModal({ title: "Add New Room", bodyType: MODAL_BODY_TYPES.ROOM_ADD_NEW }))
    }


    return (
        <div className="inline-block float-right space-x-2">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewRoomModal()}>Add New Room</button>
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewBookingModal()}>Add New Booking</button>
        </div>
    )
}

function Bookings() {
    const openUpdateNewLeadModal = (id) => {
        dispatch(openModal({ title: "Update Food", bodyType: MODAL_BODY_TYPES.FOOD_UPDATE, extraObject: { id } }))
    }
    const [bookings, setBookings] = useState([])
    const { leads } = useSelector(state => state.lead)
    const dispatch = useDispatch()

    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getLeadsContent())
    }, [])

    useEffect(() => {
        const fetchBookings = async () => {
            setLoader(true)
            try {
                const res = await fetch("/booking")
                const data = await res.json()
                setBookings(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoader(false)
            }
        }
        fetchBookings()
    }, [])

    const paid = async (id) => {
        const isConfirm = window.confirm("Are You Sure?")
        if (isConfirm) {
            try {
                const res = await fetch("/booking/paid/"+id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json()
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }
    }


    const deleteCurrentFood = (index) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Are you sure you want to delete this Booking?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.BOOKING_DELETE, index }
        }))
    }


    return (
        <>

            <TitleCard title="Bookings" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    {!loader && <table className="table w-full">
                        <thead>
                            <tr className="text-center">
                                <th className="text-left">Invoice No</th>
                                <th>Client</th>
                                <th>Rooms</th>
                                <th>Room Cost</th>
                                <th>Food Cost</th>
                                <th>Total Cost</th>
                                <th>Status</th>
                                <th>Paid At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {bookings.map((b) => (

                                <tr className="text-center">
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">RB00{b.invoice_no}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{b.client.fullname}</td>
                                    <td>{b.rooms.map((r, i) => {
                                        if (i != b.rooms.length - 1)
                                            return r.room.name + " | "
                                        else {
                                            return r.room.name
                                        }
                                    })}</td>
                                    <td>{b.bookingPrice}</td>
                                    {console.log(b.orders)}
                                    <td>{b.orders.length > 0 ?
                                        b.orders.reduce((accumulator, currentOrder) => {
                                            return accumulator + currentOrder.totalPrice;
                                        }, 0) : "-"}</td>
                                    <td>{b.orders.length > 0 ? (b.orders.reduce((accumulator, currentOrder) => {
                                        return accumulator + currentOrder.totalPrice;
                                    }, 0) + b.bookingPrice) : b.bookingPrice}</td>
                                    <td>{b.paid ? "paid" : "pending"}</td>
                                    <td>{b.paidAt ? b.paidAt : '-'}</td>
                                    <td className=" flex">
                                        <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentFood(b._id)}><TrashIcon className="w-5" /></button>
                                        {/* <button className="btn btn-square btn-ghost" onClick={() => openUpdateNewLeadModal(b._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                            <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                                            </svg>
                                            </button> */}
                                        <Link to={`/invoice/${b._id}`} className="btn btn-square btn-ghost">
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                                <path d="M15 3C8.372 3 3 8.373 3 15C3 21.628 8.372 27 15 27C21.627 27 27 21.628 27 15C27 8.373 21.627 3 15 3zM15 5C20.522 5 25 9.478 25 15C25 20.522 20.522 25 15 25C9.478 25 5 20.522 5 15C5 9.478 9.478 5 15 5zM15 8C13.343 8 12 9.343 12 11C12 12.657 13.343 14 15 14C16.657 14 18 12.657 18 11C18 9.343 16.657 8 15 8zM15 16C12.354 16 9.785 17.294 8.002 19.506C9.753 21.48 12.258 22.5 15 22.5C17.742 22.5 20.247 21.48 21.998 19.506C20.215 17.294 17.646 16 15 16z"></path>
                                            </svg>
                                        </Link>
                                        <button className="btn btn-square btn-ghost" onClick={() => paid(b._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 1v22"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 1 1 0 7H7"/>
  </g>
</svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>}
                    {loader && (
                        <div className="flex justify-center">
                            <div className="loading loading-spinner"></div>
                        </div>
                    )}
                </div>
            </TitleCard>
        </>
    )
}


export default Bookings