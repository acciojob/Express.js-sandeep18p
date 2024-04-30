const express = require('express');
const app = express();
app.use(express.json());

let currentId = 1;
const data = [{ id: currentId, title: 'Harry potter', author: 'Tom', publicationYear: 2024 }];

app.get('books',(req,res)=>{
 res.status(200).json(data);
})


app.get('/books/:id',(req,res)=>{
  const book = data.find(b => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
})

app.post('books',(req,res)=>{
   const newData = {
    id : currentId++,
    title : req.body.title,
    author : req.body.author,
    publicationYear :req.body.publicationYear
   }
   data.push(newData);
   res.status(201).json(newData);
})

app.put('/books/:id',(req,res)=>{
  const book = data.find(b => b.id === parseInt(req.params.id));
  if (book) {
    Object.assign(book, req.body);
    res.status(200).json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
})

app.delete('/books/:id', (req, res) => {
  const bookIndex = data.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex !== -1) {
    const [deletedBook] = data.splice(bookIndex, 1);
    res.status(200).json(deletedBook);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});
const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
