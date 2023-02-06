const { people } = require("./data");
const express = require("express");
const app = express();

app.use(express.static("./methods-public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ sucess: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ sucess: false, msg: "Please write donw a name" });
  }
  res.status(201).json({ sucess: true, person: name });
});
app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ sucess: false, msg: "Please write donw a name" });
  }
  res.status(201).json({ sucess: true, data: [...people, name] });
});

app.post("/login", (req, res) => {
  if (req.body.name) {
    return res.status(200).send(`Hello there, ${req.body.name}`);
  }

  res.status(401).send("Please type down your name");
});

app.delete("/api/postman/people/:id", (req, res) => {
  const {id} = req.params
  const updatedPerson = people.find(person => person.id === Number(id))
  if (!updatedPerson) {
    return res
      .status(404)
      .json({ sucess: false, msg: `${id} not found` });
  }

  const newArray = people.filter((person) => {
    return person.id !== Number(id)
  })

  return res.status(200).json({success: true, data: newArray})

})

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
