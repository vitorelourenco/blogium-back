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

const comments = [
  {      
    id: 1,
    postId: 1,
    author: 'João',
    content: 'Muito bom esse post! Tá de parabéns'
  },{
    id: 2,
    postId: 1,
    author: 'Maria',
    content: 'Como faz pra dar palmas?'
  }
];

let nextPostId = 2;
let nextCommentId = 3;

app.get("/posts", (req,res)=>{
  res.send(posts);
});

app.post("/posts", (req,res)=>{
  const post = req.body;
  post.contentPreview = post.content.substring(0,20);
  post.commentCount = 0;
  post.id = nextPostId;
  nextPostId++;
  posts.push(post);
  res.send("OK");
});

app.get("/posts/:id", (req,res)=>{
  const id = req.params.id;
  const post = posts.find(elem => elem.id.toString() === id);
  if (post) res.send(post);
  else res.send("ERR");
});

app.put("/posts/:id", (req,res)=>{
  const id = req.params.id;
  const post = posts.find(elem => elem.id.toString() === id);
  if (post) {
    post.coverUrl = req.body.coverUrl;
    post.content = req.body.content;
    post.title = req.body.title;
    post.contentPreview = post.title.substring(0,20);
    res.send("OK");
  }
  else res.send("ERR");
});

app.delete("/posts/:id", (req,res)=>{
  const id = req.params.id;
  let found = false;
  for (let i=0; i<posts.length; i++){
    if (posts[i].id.toString()===id){
      posts.splice(i,1);
      found = true;
      break;
    }
  }
  if (found) res.send("OK");
  else res.send("ERR");
});

app.get("/posts/:id/comments", (req,res)=>{
  const id = req.params.id;
  const postComments = comments.filter(elem=>elem.postId.toString() === id);
  res.send(postComments);
});

app.post("/posts/:id/comments", (req,res)=>{
  const id = req.params.id;
  const comment = req.body;
  comment.postId = parseInt(id);
  comment.id = nextCommentId;
  nextCommentId++;
  comments.push(comment);
  res.send("OK");
});



app.listen(4000);