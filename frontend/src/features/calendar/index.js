import { useEffect, useState } from 'react'
import CalendarView from '../../components/CalendarView'
import moment from 'moment'
import { CALENDAR_INITIAL_EVENTS } from '../../utils/DummyData'
import { useDispatch } from 'react-redux'
import { openRightDrawer } from '../common/rightDrawerSlice'
import { RIGHT_DRAWER_TYPES } from '../../utils/globalConstantUtil'
import { showNotification } from '../common/headerSlice'



const INITIAL_EVENTS = CALENDAR_INITIAL_EVENTS

function Calendar() {
    const [bookings, setBookings] = useState([])
    const [calenderEvents, setCalenderEvents] = useState([])
    const [events, setEvents] = useState(INITIAL_EVENTS)
    const themes = ['GREEN', "PINK", "PURPLE", "BLUE", "ORANGE"]

    const [loader, setLoader] = useState(false)

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

    useEffect(() => {
        setCalenderEvents(bookings.map(b => {
            return { title: `${b.client.fullname} ( ${b.rooms.map(r => `${r.room.name}`)} )`, theme: themes[Math.floor(Math.random() * themes.length)], startTime: moment(b.joiningDate), endTime: moment(b.leavingDate) }
        }))
    }, [bookings])

    useEffect(() => {
        setEvents(calenderEvents)
    }, [calenderEvents])


    const dispatch = useDispatch()


    console.log(INITIAL_EVENTS)

    // Add your own Add Event handler, like opening modal or random event addition
    // Format - {title :"", theme: "", startTime : "", endTime : ""}, typescript version comming soon :)
    const addNewEvent = (date) => {
        let randomEvent = INITIAL_EVENTS[Math.floor(Math.random() * 10)]
        let newEventObj = { title: randomEvent.title, theme: randomEvent.theme, startTime: moment(date).startOf('day'), endTime: moment(date).endOf('day') }
        setEvents([...events, newEventObj])
        dispatch(showNotification({ message: "New Event Added!", status: 1 }))
    }

    // Open all events of current day in sidebar 
    const openDayDetail = ({ filteredEvents, title }) => {
        dispatch(openRightDrawer({ header: title, bodyType: RIGHT_DRAWER_TYPES.CALENDAR_EVENTS, extraObject: { filteredEvents } }))
    }

    return (
        <>
            {!loader && <CalendarView
                calendarEvents={events}
                addNewEvent={addNewEvent}
                openDayDetail={openDayDetail}
            />}
            {loader && (
                <div className="flex justify-center h-full items-center">
                    <div className="loading loading-spinner w-16 h-16"></div>
                </div>
            )}
        </>
    )
}

export default Calendar