import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"

const INITIAL_LEAD_OBJ = {
    totalPrice: ""
}

function AddBookingModalBody({ closeModal }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)
    const [clients, setClients] = useState([])
    const [rooms, setRooms] = useState([])
    const [currentClient, setCurrentClient] = useState('')
    const [leavingDate, setLeavingDate] = useState('')
    const [joiningDate, setJoiningDate] = useState('')
    const [currentRooms, setCurrentRooms] = useState([])
    const [bookingPrice, setBookingPrice] = useState(0)

    useEffect(() => {
        setBookingPrice(currentRooms.reduce((accumulator, currentOrder) => {
            return accumulator + Number(currentOrder.price);
        }, 0))
    }, [currentRooms])
    

    useEffect(() => {
        console.log(bookingPrice)
    }, [bookingPrice])

    const handleRoomPrice = (id, value) => {
        setCurrentRooms((prev) => {
            const daRoom = prev.find(cr => cr.room === id);
            if (daRoom) {
                daRoom.price = value;  // Update the price for the selected room
                const otherRooms = prev.filter(cr => cr.room !== id);
                return [...otherRooms, daRoom];
            }
            return prev;  // If the room is not found, return the previous state
        });
    };
    
    const createInput = (name, id) => {
        const grid = document.querySelector(".grid-cols-2");
    
        // Create the new input dynamically
        const newInput = document.createElement('div');
        newInput.innerHTML = `
            <label for="${id}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Room ${name} Price
            </label>
            <input type="number" id="${id}" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="" required />
        `;
    
        // Append the newly created input to the DOM
        grid.appendChild(newInput);
    
        // Add the oninput event listener programmatically
        document.getElementById(id).addEventListener('input', (e) => {
            handleRoomPrice(id, e.target.value);
        });
    };

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await fetch('/user')
                const data = await res.json()
                setClients(data)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchRooms = async () => {
            try {
                const res = await fetch('/room')
                const data = await res.json()
                setRooms(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRooms()
        fetchClients()
    }, [])

 


    const saveNewLead = async () => {
       if (currentClient.trim() === "") return setErrorMessage("Client is required!")
        else if (joiningDate.trim() === "") return setErrorMessage("Joining Date is required!")
        else if (leavingDate.trim() === "") return setErrorMessage("Leaving Date is required!")
        else if (currentRooms.length === 0) return setErrorMessage("Room is required!")
        else {
          
            try {
                const res = await fetch("/booking/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({client: currentClient,bookingPrice, joiningDate, leavingDate, rooms: currentRooms})
                });
                const data = await res.json()
                console.log(res)
                console.log(data)
                dispatch(showNotification({ message: "New Booking Added!", status: 1 }))
            } catch (error) {
                console.error(error)
                dispatch(showNotification({ message: "Failed To Add New Booking!", status: 0 }))
            }
            closeModal()
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLeadObj({ ...leadObj, [updateType]: value })
    }

    return (
        <>


            <select id="countries" onChange={(e) => setCurrentClient(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected value="">Select A Client</option>
                {clients.map(c => (
                    <option value={c._id}>{c.fullname} - {c.cnic}</option>
                ))}
            </select>

            <h1 className="my-4">Rooms</h1>
            <div className="flex gap-5">

            {rooms.map(r => (
    <div class="flex items-start mb-5 gap-2" key={r._id}>
        <div class="flex items-center h-6">
            <input
                id="terms"
                type="checkbox"
                data-name={r.name}
                value={r._id}
                onChange={(e) => {
                    setCurrentRooms((prev) => {
                        if (e.target.checked) {
                            if (!prev.some(room => room.room === e.target.value)) {
                                // Create dynamic input after updating currentRooms
                                createInput(e.target.dataset.name, e.target.value);
                                return [...prev, { room: e.target.value, price: null }];
                            }
                        } else {
                            return prev.filter((room) => room.room !== e.target.value);
                        }
                        return prev;
                    });
                }}
            />
        </div>
        <label for="terms">{r.name}</label>
    </div>
))}
  


            </div>
                <div className="grid grid-cols-2 gap-3"></div>

            <div className="flex justify-between gap-3">
            <div className="flex-1">
            <h1 className="my-4">Joining Date</h1>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <input id="default-datepicker" onChange={(e) => setJoiningDate(e.target.value)} type="date" class="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
            </div>
            </div>
            <div className="flex-1">
            <h1 className="my-4">Leaving Date</h1>
            <div class="relative max-w-sm">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <input id="default-datepicker" onChange={(e) => setLeavingDate(e.target.value)} type="date" class="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
            </div>
            </div>
            </div>

            <h1 className="mt-10">
            <b>Total: </b>
            {bookingPrice}
            </h1>


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddBookingModalBody