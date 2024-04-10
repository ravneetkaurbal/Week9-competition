const express = require("express");
const app = express();
const methodOverride = require('method-override');

const connectDB = require("./config/db");
const logger = require("./middlewares/logger");

const bookAPI = require("./controllers/bookAPIController");
const bookSSR = require("./controllers/bookSSRController");
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(logger);

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();
 
// SSR

// Route to render index.html with books using EJS
app.get("/", bookSSR.renderBooks);
// Define a route to render the addbook.ejs view
app.get("/addbook", bookSSR.renderForm);
// Route to add a book
app.post("/addbook", bookSSR.addBook);
// Define a route to render the singlebook.ejs view
app.get("/single-book/:id", bookSSR.renderBook);
// Define a route to delete a single book
app.delete("/single-book/:id", bookSSR.deleteBook);
// Define a route to update a single book
app.put("/single-book/:id", bookSSR.updateBook);
// Define a route to render the updatebook.ejs view
app.get("/single-book/update/:id", bookSSR.renderUpdateBook);

// API
// GET all Books
app.get("/api/books", bookAPI.getBooks);
// POST a new Book
app.post("/api/books", bookAPI.addBook);
// GET a single Book
app.get("/api/books/:id", bookAPI.getBook);
// Update Book using PUT
app.put("/api/books/:id", bookAPI.updateBook);
// DELETE a Book
app.delete("/api/books/:id", bookAPI.deleteBook);
// DELETE all Books
app.delete("/api/books", bookAPI.deleteAllBooks);

const PORT = 5500;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
