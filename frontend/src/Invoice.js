import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Invoice = () => {
  const id = useParams().id
  const [booking, setBooking] = useState('')

  const calculateDaysBetweenDates = (firstDate, lastDate) => {
    const date1 = new Date(firstDate);
    const date2 = new Date(lastDate);

    const differenceInTime = date2 - date1;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return Math.ceil(differenceInDays);
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch("/booking/" + id)
        const data = await res.json()
        setBooking(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBooking()
  }, [id])

  const date = new Date().toLocaleDateString()
  return (
    <div className='w-[90%] mx-auto mt-5'>
      <div className="flex justify-end">
        <div className="flex flex-col gap-3">
          <h1><b className='text-gray-700'>Invoice No:</b> {booking && booking.invoice_no > 9 ? "RB00" + booking.invoice_no : "RB000" + booking.invoice_no}</h1>
          <h1><b className='text-gray-700'>Date:</b> {date}</h1>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div className="">
          <div className="flex items-center">
            <img src="/icon-invoice.jpeg" className='w-32 ' alt="" />
            <h1 className="font-bold text-4xl text-center">Royal Brangsa <br /> Guest House</h1>
          </div>
          <p className='font-semibold mt-3 flex gap-2 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className='text-white bg-black p-1 rounded-full' viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M6.62 10.79a15.054 15.054 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.09-.27c1.12.37 2.33.57 3.59.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.26.2 2.47.57 3.59.14.35.06.74-.27 1.09l-2.2 2.2z" />
            </svg>
            0333-8343882
          </p>
          <p className=' font-semibold mt-2 flex gap-2 items-center'>
          <svg
    fill="#000000"
    width="20px"
    height="20px"
    viewBox="-2 -2 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin"
    className="jam jam-whatsapp"
  >
    <path d="M9.516.012C4.206.262.017 4.652.033 9.929a9.798 9.798 0 0 0 1.085 4.465L.06 19.495a.387.387 0 0 0 .47.453l5.034-1.184a9.981 9.981 0 0 0 4.284 1.032c5.427.083 9.951-4.195 10.12-9.58C20.15 4.441 15.351-.265 9.516.011zm6.007 15.367a7.784 7.784 0 0 1-5.52 2.27 7.77 7.77 0 0 1-3.474-.808l-.701-.347-3.087.726.65-3.131-.346-.672A7.62 7.62 0 0 1 2.197 9.9c0-2.07.812-4.017 2.286-5.48a7.85 7.85 0 0 1 5.52-2.271c2.086 0 4.046.806 5.52 2.27a7.672 7.672 0 0 1 2.287 5.48c0 2.052-.825 4.03-2.287 5.481z" />
    <path d="M14.842 12.045l-1.931-.55a.723.723 0 0 0-.713.186l-.472.478a.707.707 0 0 1-.765.16c-.913-.367-2.835-2.063-3.326-2.912a.694.694 0 0 1 .056-.774l.412-.53a.71.71 0 0 0 .089-.726L7.38 5.553a.723.723 0 0 0-1.125-.256c-.539.453-1.179 1.14-1.256 1.903-.137 1.343.443 3.036 2.637 5.07 2.535 2.349 4.566 2.66 5.887 2.341.75-.18 1.35-.903 1.727-1.494a.713.713 0 0 0-.408-1.072z" />
  </svg>
            0344-5219325
          </p>
          <p className='font-semibold mt-2 flex gap-2 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className='text-white bg-black p-1 rounded-full' viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
            </svg>
            12/Haider Khan Chowk Aliabad Skardu
          </p>
        </div>
        <div className="w-60 text-sm">
          <div className=" bg-gray-300 mt-8 p-2">
            <h1 className="font-bold">Bill To</h1>
          </div>
          <div className="flex justify-between mt-4">
            <b>Name:</b>
            <h1>{booking && booking.client.fullname}</h1>
          </div>
          <div className="flex justify-between mt-4">
            <b>CNIC:</b>
            <h1>{booking && booking.client.cnic}</h1>
          </div>
          <div className="flex justify-between mt-4">
            <b>Phone:</b>
            <h1>{booking && booking.client.phone}</h1>
          </div>

        </div>
      </div>
      <div className="border-2 border-black min-h-[55vh] mt-8 relative mb-5">


        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Rooms
                </th>
                <th scope="col" class="px-6 py-3">
                  Stay Period
                </th>
                <th scope="col" class="px-6 py-3">
                  Price (Rs.)
                </th>
              </tr>
            </thead>
            <tbody>
              {booking && booking.rooms.map(r => (
                <tr class="bg-white dark:bg-gray-800">
                  <th scope="row" class="px-6 py-2 font-medium whitespace-nowrap dark:text-white">
                    {r.room.name}
                  </th>
                  <td class="px-6 py-2">
                    {booking && calculateDaysBetweenDates(booking.joiningDate, booking.leavingDate)} day(s)
                  </td>
                  <td class="px-6 py-2">
                    {r.price}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3 ">
                  Course
                </th>
                <th scope="col" class="px-6 py-3">
                  Order
                </th>
                <th scope="col" class="px-6 py-3 ">
                  Price (Rs.)
                </th>
              </tr>
            </thead>
            <tbody>
              {booking && booking.orders.map(o => (
                <tr class="bg-white dark:bg-gray-800">
                  <th scope="row" class="px-6 py-2 font-medium  whitespace-nowrap dark:text-white">
                    {o.course}
                  </th>
                  {console.log(o)}
                  <td class="px-6 py-2">
                    {o.order.map(item => {
                      return `${item.food.name} (${item.qty}) `
                    })}
                  </td>
                  <td class="px-6 py-2">
                    {o.totalPrice}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        <table class="border-3 border-gray-600 absolute bottom-3 right-3">
          <tr class="text-gray-800">
            <td class="border px-4 py-2">Room Price ( Rs. )</td>
            <td class="border px-4 py-2">{booking && booking.bookingPrice}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Food Price ( Rs. )</td>
            <td class="border px-4 py-2">{booking && booking.orders.length > 0 ? booking.orders.reduce((accumulator, currentOrder) => {
              return accumulator + currentOrder.totalPrice;
            }, 0) : "-"}
            </td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Total Price ( Rs. )</td>
            <td class="border px-4 py-2">{booking && booking.orders.length > 0 ? (booking.orders.reduce((accumulator, currentOrder) => {
              return accumulator + currentOrder.totalPrice;
            }, 0) + booking.bookingPrice) : booking.bookingPrice}</td>
          </tr>
        </table>
      </div>
      <div className="flex justify-center gap-24">
        <div className="flex gap-2 items-center">
        <svg
    width="20px"
    height="20px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill="#444"
      d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM13.2 5.3c0.4 0 0.7 0.3 1.1 0.3-0.3 0.4-1.6 0.4-2-0.1 0.3-0.1 0.5-0.2 0.9-0.2zM1 8c0-0.4 0-0.8 0.1-1.3 0.1 0 0.2 0.1 0.3 0.1 0 0 0.1 0.1 0.1 0.2 0 0.3 0.3 0.5 0.5 0.5 0.8 0.1 1.1 0.8 1.8 1 0.2 0.1 0.1 0.3 0 0.5-0.6 0.8-0.1 1.4 0.4 1.9 0.5 0.4 0.5 0.8 0.6 1.4 0 0.7 0.1 1.5 0.4 2.2-2.5-1.2-4.2-3.6-4.2-6.5zM8 15c-0.7 0-1.5-0.1-2.1-0.3-0.1-0.2-0.1-0.4 0-0.6 0.4-0.8 0.8-1.5 1.3-2.2 0.2-0.2 0.4-0.4 0.4-0.7 0-0.2 0.1-0.5 0.2-0.7 0.3-0.5 0.2-0.8-0.2-0.9-0.8-0.2-1.2-0.9-1.8-1.2s-1.2-0.5-1.7-0.2c-0.2 0.1-0.5 0.2-0.5-0.1 0-0.4-0.5-0.7-0.4-1.1-0.1 0-0.2 0-0.3 0.1s-0.2 0.2-0.4 0.1c-0.2-0.2-0.1-0.4-0.1-0.6 0.1-0.2 0.2-0.3 0.4-0.4 0.4-0.1 0.8-0.1 1 0.4 0.3-0.9 0.9-1.4 1.5-1.8 0 0 0.8-0.7 0.9-0.7s0.2 0.2 0.4 0.3c0.2 0 0.3 0 0.3-0.2 0.1-0.5-0.2-1.1-0.6-1.2 0-0.1 0.1-0.1 0.1-0.1 0.3-0.1 0.7-0.3 0.6-0.6 0-0.4-0.4-0.6-0.8-0.6-0.2 0-0.4 0-0.6 0.1-0.4 0.2-0.9 0.4-1.5 0.4 1.1-0.8 2.5-1.2 3.9-1.2 0.3 0 0.5 0 0.8 0-0.6 0.1-1.2 0.3-1.6 0.5 0.6 0.1 0.7 0.4 0.5 0.9-0.1 0.2 0 0.4 0.2 0.5s0.4 0.1 0.5-0.1c0.2-0.3 0.6-0.4 0.9-0.5 0.4-0.1 0.7-0.3 1-0.7 0-0.1 0.1-0.1 0.2-0.2 0.6 0.2 1.2 0.6 1.8 1-0.1 0-0.1 0.1-0.2 0.1-0.2 0.2-0.5 0.3-0.2 0.7 0.1 0.2 0 0.3-0.1 0.4-0.2 0.1-0.3 0-0.4-0.1s-0.1-0.3-0.4-0.3c-0.1 0.2-0.4 0.3-0.4 0.6 0.5 0 0.4 0.4 0.5 0.7-0.6 0.1-0.8 0.4-0.5 0.9 0.1 0.2-0.1 0.3-0.2 0.4-0.4 0.6-0.8 1-0.8 1.7s0.5 1.4 1.3 1.3c0.9-0.1 0.9-0.1 1.2 0.7 0 0.1 0.1 0.2 0.1 0.3 0.1 0.2 0.2 0.4 0.1 0.6-0.3 0.8 0.1 1.4 0.4 2 0.1 0.2 0.2 0.3 0.3 0.4-1.3 1.4-3 2.2-5 2.2z"
    />
  </svg>
  <h1 className="mb-0">www.Royalbrangsa.com</h1>
        </div>
        <div className="flex gap-2 items-center">
        <svg
    fill="#000000"
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
  >
    <path d="M20.9,2H3.1A1.1,1.1,0,0,0,2,3.1V20.9A1.1,1.1,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H17.3c-1.26,0-1.5.6-1.5,1.47v1.93h3l-.39,3H15.8V22h5.1A1.1,1.1,0,0,0,22,20.9V3.1A1.1,1.1,0,0,0,20.9,2Z" />
  </svg>
          <h1 className="mb-0">royalBrangsa</h1>
        </div>
        <div className="flex gap-2 items-center">
        <svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{"Instagram icon"}</title>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
  </svg>
          <h1 className="mb-0">@royalbrangsa</h1>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Link to={"/app/bookings"} className='btn btn-ghost'>
          Return
        </Link>
        <button className='btn btn-ghost' onClick={(e) => { e.target.closest('.flex').classList.add("hidden"); window.print(); setTimeout(() => e.target.closest('.flex').remove('hidden'), 1000) }}>Print</button>
      </div>
    </div>
  )
}

export default Invoice
