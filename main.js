const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let books = [];

app.get('/books', (req, res) => {
  res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.status(200).json(book);
});

app.post('/books', (req, res) => {
  const { title, author, publicationYear } = req.body;
  const id = books.length + 1;
  const newBook = { id, title, author, publicationYear };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const { title, author, publicationYear } = req.body;
  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  books[bookIndex] = { ...books[bookIndex], title, author, publicationYear };
  res.status(200).json(books[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  const deletedBook = books.splice(bookIndex, 1);
  res.status(200).json(deletedBook[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
