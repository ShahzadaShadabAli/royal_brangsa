import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Add New Food", bodyType: MODAL_BODY_TYPES.FOOD_ADD_NEW }))
    }
    
   

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    )
}

function Foods() {
    const openUpdateNewLeadModal = (id) => {
        dispatch(openModal({ title: "Update Food", bodyType: MODAL_BODY_TYPES.FOOD_UPDATE, extraObject: {id} }))
    }
    const [foods, setFoods] = useState()
    const { leads } = useSelector(state => state.lead)
    const dispatch = useDispatch()
    const [loader, setLoader] = useState()

    useEffect(() => {
        dispatch(getLeadsContent())
    }, [])

    useEffect(() => {
        const fetchFoods = async () => {
            setLoader(true)
            try {
                const res = await fetch("/food")
                const data = await res.json()
                setFoods(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoader(false)
            }
        }
        fetchFoods()
    }, [])


    const deleteCurrentFood = (index) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Are you sure you want to delete this Food?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.FOOD_DELETE, index }
        }))
    }


    return (
        <>

            <TitleCard title="Foods" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    {!loader && <table className="table w-full">
                        <thead>
                            <tr className="text-center">
                                <th className="text-left">Id</th>
                                <th>Name</th>
                                <th>Price (Rs.)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {foods && foods.map((f, i) => (
                                <tr className="text-center">
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{i+1}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{f.name}</td>
                                <td>{f.price}</td>
                                <td className="">
                                    <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentFood(f._id)}><TrashIcon className="w-5" /></button>
                                    <button className="btn btn-square btn-ghost" onClick={() => openUpdateNewLeadModal(f._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                            <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
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


export default Foods