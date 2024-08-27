import e from "express";
import { addOrder, deleteOrder, getOrder, getOrders, updateOrder } from "../controllers/order.js";


const router = e.Router()

router.get("/", getOrders)

router.get("/:id", getOrder)

router.post("/add", addOrder)

router.delete("/delete/:id", deleteOrder)

router.patch("/update/:id", updateOrder)

export default router;