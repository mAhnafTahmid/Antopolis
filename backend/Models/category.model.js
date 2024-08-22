import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  animals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      default: [],
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
