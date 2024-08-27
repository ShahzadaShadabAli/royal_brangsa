import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import {showNotification} from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useEffect, useState } from 'react'





function Dashboard(){

    const dispatch = useDispatch()

    const [userCount, setUserCount] = useState(null)
    const [profit, setProfit] = useState(null)

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await fetch("/user/count", {method: "GET"})
                const data = await res.json()
                console.log(res)
                setUserCount(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCount()
    }, [])

    useEffect(() => {
        const fetchProfit = async () => {
            try {
                const res = await fetch("/booking/profit", {method: "GET"})
                const data = await res.json()
                setProfit(data.profit)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfit()
    }, [])

    const statsData = [
        {title : "Total Users", value : userCount ? userCount : "Loading...", icon : <UserGroupIcon className='w-8 h-8'/>, description : "All Time"},
        {title : "Total Revenue", value : profit ? "Rs. "+profit : "Calculating...", icon : <CreditCardIcon className='w-8 h-8'/>, description : "Current month"},
    
    ]

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    }

    return(
        <>
      
        {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="">
            <div className="flex gap-3">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k}/>
                        )
                    })
                }
            </div>
        {/** ---------------------- Different charts ------------------------- */}
            <div className="mt-4">
                <LineChart />
            </div>
            </div>



            
        {/** ---------------------- Different stats content 2 ------------------------- */}
        
        

        {/** ---------------------- User source channels table  ------------------------- */}
        
           
        </>
    )
}

export default Dashboard