import e from "express";
import { addRoom, getRoom, getRooms } from "../controllers/room.js";

const router = e.Router()

router.get("/", getRooms)

router.get("/:id", getRoom)

router.post("/add", addRoom)

export default router;