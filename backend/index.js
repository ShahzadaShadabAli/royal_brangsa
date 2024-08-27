import e, { json } from "express";
import connectDB from "./config/database.js";
import userRouter from "./routers/users.js"
import foodRouter from "./routers/foods.js"
import orderRouter from "./routers/orders.js"
import roomRouter from "./routers/rooms.js"
import bookingRouter from "./routers/bookings.js"

const app = e()

app.use(e.json())

await connectDB()

app.use('/user', userRouter)
app.use('/food', foodRouter)
app.use('/order', orderRouter)
app.use('/room', roomRouter)
app.use('/booking', bookingRouter)



app.listen(5000, console.log("running on 5000"))