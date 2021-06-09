import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const posts = [{
  id: 1,
  title: 'Hello World',
  coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
  contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
  content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
  commentCount: 2
}];

const comments = [];
let nextID = 2;

app.get("/posts", (req,res)=>{
  res.send(posts);
});

app.post("/posts", (req,res)=>{
  const post = req.body;
  post.id = nextID;
  nextID++;
  posts.push(post);
  res.send("OK");
});

app.get("/posts/:id", (req,res)=>{
  const id = req.params.id;
  const post = posts.find(elem => elem.id.toString() === id);
  if (post) res.send(post);
  else res.send({});
});

app.get("/posts/:id/comments", (req,res)=>{
  const id = req.params.id;
});

app.post("/posts/:id/comments", (req,res)=>{
  const id = req.params.id;
});

app.listen(4000);