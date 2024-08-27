import e from "express";
import { addUser, deleteUser, getCount, getUser, getUsers, updateUser } from "../controllers/user.js";

const router = e.Router()

router.get("/", getUsers)

router.get("/count", getCount)

router.get("/:id", getUser)

router.post("/add", addUser)

router.delete("/delete/:id", deleteUser)

router.patch("/update/:id", updateUser)

export default router;