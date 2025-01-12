import express from 'express';
import cors from "cors";


const app = express();
const port = 3000;

const todos = [];
let idNum = 1;

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'https://todo-frontend.surge.sh'] }))


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/v1/todos', (req, res) => {
    res.send(todos);
});

// Corrected POST API
app.post("/api/v1/todo", (req, res) => {
    const todoObj = {
        todo: req.body.todo, 
        id: idNum++,
    };

    todos.push(todoObj); 

    res.send({ message: "Todo added successfully", data: todoObj }); 
});

app.patch('/api/v1/todo/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    let isFound = false;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].todo = req.body.todo;
            isFound = true;
            break;
        }
    }

    if (isFound) {
        res.status(201).send({
            data: { todo: req.body.todo, id: id },
            message: "Todo updated successfully!",
        });
    } else {
        res.status(200).send({ data: null, message: "Todo not found" });
    }
});

app.delete('/api/v1/todo/:id', (req, response) => {

  const id = parseInt(req.params.id); 

  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {

      todos.splice(i, 1);

      isFound = true;
      break;
    }
  }

  if (isFound) {
    response.status(201).send({
      message: "todo deleted successfully!",
    });
  } else {
    response.status(200).send({ data: null, message: "todo not found" });
  }


});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});