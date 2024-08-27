import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from
    '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"
import OrderCard from "./OrderCard"

const INITIAL_LEAD_OBJ = {
    client: "",
    order: "",
}


function AddOrderModalBody({ closeModal }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)
    const [orders, setOrders] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [foods, setFoods] = useState([])
    const [clients, setClients] = useState([])
    const [currentClient, setCurrentClient] = useState('')
    const [currentCourse, setCurrentCourse] = useState('')

    useEffect(() => {
        let total = 0
        orders.forEach(o => {
            total += (o.price * o.qty)
        })
        setTotalPrice(total)
        console.log('orders', orders)
    }, [orders])

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const res = await fetch('/food')
                const data = await res.json()
                setFoods(data)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchClients = async () => {
            try {
                const res = await fetch('/user')
                const data = await res.json()
                setClients(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFoods()
        fetchClients()
    }, [])

    const saveNewLead = async () => {
        if (currentClient.trim() === "" || orders.length == 0) return setErrorMessage("Kindly Fill all inputs!")
        else if (currentCourse.trim() === "" || orders.length == 0) return setErrorMessage("Kindly Fill all inputs!")
        else {
            let newOrders = orders.map(o => {
                return {
                    food: o.id,
                    qty: o.qty
                }
            })
            try {
                const res = await fetch("/order/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ client: currentClient, orders: newOrders, totalPrice, course: currentCourse })
                });
                const data = await res.json()
                console.log(data)
                dispatch(showNotification({ message: "New Order Added!", status: 1 }))
            } catch (error) {
                console.error(error)
                dispatch(showNotification({ message: "Failed To Add Order!", status: 0 }))
            }
            closeModal()
        }
    }

    const handleOrder = (order) => {
        const currentOrders = orders.filter(o => o.id !== order.id)
        if (order.qty !== 0) {
            currentOrders.push(order)
            setOrders(currentOrders)
        } else {
            setOrders(currentOrders)
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLeadObj({ ...leadObj, [updateType]: value })
    }

    return (
        <>

          
            <select id="" onChange={(e) => setCurrentClient(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="" selected disabled>Select A Client</option>
                {clients.map(c => (
                    <option value={c._id}>{c.fullname} - {c.cnic}</option>
                ))}
            </select>
            <select id="" onChange={(e) => setCurrentCourse(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4">
            <option value="" selected disabled>Select A Course</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
            </select>
            <h1 className="my-3">Food Items :</h1>
            <div className="flex flex-col gap-3">
                {foods.map(f => (
                    <OrderCard name={f.name} price={f.price} id={f._id} handleOrder={handleOrder} />
                ))}
            </div>

            <h1 className="mt-5"><span className="font-bold">Total Price:</span> Rs. {totalPrice}</h1>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddOrderModalBody