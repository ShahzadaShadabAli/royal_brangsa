import React, { useEffect, useState } from 'react'

const OrderCard = ({name, price, id, handleOrder}) => {
  const [order, setOrder] = useState({
    id: id,
    name: name,
    price: price,
    qty: 0
  })

  useEffect(() => {
    handleOrder(order)
  }, [order])

  console.log(order)
  const handleIncrement = () => {
    setOrder(prev => {
      return {
        ...prev, qty: prev.qty + 1
      }
    })
  }
  const handleDecrement = () => {
    setOrder(prev => {
      return {
        ...prev, qty: prev.qty - 1
      }
    })
  }
  return (
    <div className="bg-slate-500 p-3 rounded-lg text-white flex justify-between items-center">
    <h1 className="mb-0">{name} (Rs. {price})</h1>
        {order.qty < 1 && <button onClick={handleIncrement} className="bg-white text-black p-2 text-sm outline-none rounded-lg">+ Add</button>}
   {order.qty > 0 && <div className="btns flex items-center gap-2">
        <button onClick={handleDecrement} className="bg-white text-black w-4 flex items-center justify-center h-4 p-2 text-sm outline-none rounded-lg">-</button>
        <h1>{order.qty}</h1>
        <button onClick={handleIncrement} className="bg-white text-black w-4 flex items-center justify-center h-4 p-2 text-sm outline-none rounded-lg">+</button>
    </div>}
</div>
  )
}

export default OrderCard
