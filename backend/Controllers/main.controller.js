import {
  formatAnimalName,
  formatCategory,
} from "../Middlewares/format.name.js";
import Animal from "../Models/animal.model.js";
import Category from "../Models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category)
      return res.status(400).json({ error: "Category not received!" });

    const correctCategory = formatCategory(category);

    const checkCategory = await Category.findOne({ category: correctCategory });

    if (checkCategory)
      return res.status(400).json({ error: "Category already exists!" });

    const newCategory = new Category({
      category: correctCategory,
    });

    await newCategory.save();

    res
      .status(201)
      .json({ message: "New category added!", category: newCategory });
  } catch (error) {
    console.error("Error creating category:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error in creation of category." });
  }
};

export const createAnimal = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    if (!category || !name || !image) {
      return res
        .status(400)
        .json({ error: "Name, image or category not received!" });
    }

    const categoryData = await Category.findOne({ category: category });
    if (!categoryData) {
      return res.status(404).json({ error: "Category not found!" });
    }

    const correctFormatofName = formatAnimalName(name);

    const checkAnimal = await Animal.findOne({ name: correctFormatofName });

    if (checkAnimal) {
      return res.status(400).json({ error: "Animal already exists!" });
    }

    const newAnimal = new Animal({
      name: correctFormatofName,
      image,
      category: categoryData._id,
    });

    await newAnimal.save();

    categoryData.animals.push(newAnimal._id);
    await categoryData.save();

    res.status(201).json({ message: "New animal added!", animal: newAnimal });
  } catch (error) {
    console.error("Error creating animal:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error in creation of animal." });
  }
};

export const getCategories = async (req, res) => {
  try {
    const category = await Category.find();

    if (!category.length)
      return res.status(404).json({ error: "No categories exist!" });

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error in fetching categories." });
  }
};

export const getAnimals = async (req, res) => {
  try {
    const animal = await Animal.find();

    if (!animal.length)
      return res.status(404).json({ error: "No animals exist!" });

    res.status(200).json(animal);
  } catch (error) {
    console.error("Error fetching animals:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error in fetching animals." });
  }
};

export const getAnimalsOfACategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await Category.findOne({ category: category }).populate(
      "animals"
    );

    res.status(200).json(data.animals);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error in fetching categories." });
  }
};
