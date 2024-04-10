const Book = require("../models/bookModel");

// get all Books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    console.error("Error retrieving books:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Book
const createBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const newBook = new Book({ title, author, genre });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Book by ID
const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error retrieving book:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Book by ID
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Books
const deleteAllBooks = async (req, res) => {
  try {
    const result = await Book.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error deleting all books:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Book by ID
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = req.body;
    const book = await Book.findByIdAndUpdate(id, updatedBook, { new: true });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllBooks,
  createBook,
  getBook,
  deleteBook,
  deleteAllBooks,
  updateBook,
};
