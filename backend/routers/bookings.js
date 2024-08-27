import e from "express";
import { addBooking, deleteBooking, getBooking, getBookings, getMonthlyRevenue, getProfit, paid } from "../controllers/booking.js";


const router = e.Router()

router.get("/", getBookings)

router.get("/revenue", getMonthlyRevenue)

router.get("/profit", getProfit)

router.get("/:id", getBooking)

router.post("/add", addBooking)

router.delete("/delete/:id", deleteBooking)

router.patch("/paid/:id", paid)
// router.patch("/update/:id", updateBooking)

export default router;