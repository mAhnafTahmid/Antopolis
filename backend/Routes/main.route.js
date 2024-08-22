import express from "express";
import {
  createAnimal,
  createCategory,
  getAnimals,
  getAnimalsOfACategory,
  getCategories,
} from "../Controllers/main.controller.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/animals", getAnimals);
router.get("/animals/:category", getAnimalsOfACategory);
router.post("/create/animal", createAnimal);
router.post("/create/category", createCategory);

export default router;
