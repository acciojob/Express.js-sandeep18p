const express = require('express');
const app = express();
app.use(express.json());

// Data Structure to store books
let books = [];
let idCounter = 1;

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET /books/:id - Retrieve a specific book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(book => book.id === req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// POST /books - Create a new book
app.post('/books', (req, res) => {
  const { title, author, publicationYear } = req.body;
  const newBook = { id: idCounter++, title, author, publicationYear };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === req.params.id);
  if (bookIndex !== -1) {
    const { title, author, publicationYear } = req.body;
    books[bookIndex] = { ...books[bookIndex], title, author, publicationYear };
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === req.params.id);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Server setup
const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
