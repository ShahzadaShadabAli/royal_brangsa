import e from "express";
import { addFood, deleteFood, getFood, getFoods, updateFood } from "../controllers/food.js";

const router = e.Router()

router.get("/", getFoods)

router.get("/:id", getFood)

router.post("/add", addFood)

router.delete("/delete/:id", deleteFood)

router.patch("/update/:id", updateFood)

export default router;