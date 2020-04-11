const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, techs, url } = request.body;

  // const res = await axios.get(url);
  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repositorie);
  // res.data.map(repositorie => {
  //   repositories.push({
  //     id: uuid(),
  //     title: repositorie.name,
  //     url: repositorie.url,
  //     techs: repositorie.language,likes: 0
  //   });
  // });

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    repository => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const repository = { ...repositories[repositoryIndex], title, url, techs };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(
    repository => repository.id === id
  );

  if (repositoryIndex < 0) {
    return res.status(400).json({ error: "Project not found" });
  }

  repositories.splice(repositoryIndex, 1);
  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const respository = repositories.find(respository => respository.id === id);

  if (!respository) {
    return response
      .status(400)
      .json({ error: "Project not found" })
      .send();
  }

  respository.likes += 1;
  return response.json(respository);
});

module.exports = app;
