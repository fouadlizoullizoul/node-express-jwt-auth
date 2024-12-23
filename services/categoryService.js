const Category = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
//@desc Get all Categories
//@route GET /api/v1/categories
//@access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
  res.status(400).json({
    message: err.message,
  });
});
//@desc Get Category by ID
//@route GET /api/v1/categories/:id
//@access Public
exports.getCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ data: category });
});

//@desc Create Category
//@route POST /api/v1/categories
//@access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({ data: category });
  res.status(400).json({
    message: err.message,
  });
});

//@desc Update Category by ID
//@route PUT /api/v1/categories/:id
//@access Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ data: category });
});
//@desc Delete Category by ID
//@route DELETE /api/v1/categories/:id
//@access Private

exports.deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ message: "Category deleted successfully" });
});
