import express from 'express';
import cors from 'cors';
import { existsSync, writeFileSync, readFileSync } from 'fs';

const app = express();
app.use(express.json());
app.use(cors());

if (!existsSync('./posts.json')){
  writeFileSync('./posts.json', JSON.stringify({posts:[], nextPostId:1}));
}
const postStorage = JSON.parse(readFileSync('./posts.json'));

if (!existsSync('./comments.json')){
  writeFileSync('./comments.json', JSON.stringify({comments:[],nextCommentId:1}));
}
const commentStorage = JSON.parse(readFileSync('./comments.json'));

const posts = postStorage.posts;
let nextPostId = postStorage.nextPostId;

const comments = commentStorage.comments;
let nextCommentId = commentStorage.nextCommentId;

app.get("/posts", (req,res)=>{
  res.send(posts);
});

app.post("/posts", (req,res)=>{
  const post = req.body;
  if (!post.content) res.status(400).send('Content missing');
  else if (!post.coverUrl) res.status(400).send('Image URL missing');
  else if (!post.title) res.status(400).send('title missing');
  else {
    post.contentPreview = post.content.substring(0,50);
    post.commentCount = 0;
    post.id = nextPostId;
    nextPostId++;
    posts.push(post);
    res.send("OK");
  }
});

app.get("/posts/:id", (req,res)=>{
  const id = req.params.id;
  const post = posts.find(elem => elem.id.toString() === id);
  if (post) res.send(post);
  else res.status(400).send('Post not found');
});

app.put("/posts/:id", (req,res)=>{
  const id = req.params.id;
  const post = posts.find(elem => elem.id.toString() === id);

  if (post) {
    const body = req.body;
    if (!body.content) res.status(400).send('Content missing');
    else if (!body.coverUrl) res.status(400).send('Image URL missing');
    else if (!body.title) res.status(400).send('title missing');
    else {
      post.coverUrl = body.coverUrl;
      post.content = body.content;
      post.title = body.title;
      post.contentPreview = post.title.substring(0,50);
      res.send("OK");
    }
  }
  else res.status(400).send('Post not found');
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
  if (found) {
    res.send("OK");
  }
  else res.status(400).send('Post not found');;
});

app.get("/posts/:id/comments", (req,res)=>{
  const id = req.params.id;
  const postComments = comments.filter(elem=>elem.postId.toString() === id);
  res.send(postComments);
});

app.post("/posts/:id/comments", (req,res)=>{
  const id = req.params.id;
  const comment = req.body;
  if (!comment.author) res.status(400).send('Author is missing');
  else if (!comment.content) res.status(400).send('Content is missing');
  else {
    comment.postId = parseInt(id);
    comment.id = nextCommentId;
    nextCommentId++;
    comments.push(comment);
    res.send("OK");
  }
});

app.listen(4000);

process.on('exit', ()=>{
  writeFileSync('./posts.json', JSON.stringify({posts, nextPostId}));
  writeFileSync('./comments.json', JSON.stringify({comments, nextCommentId}));
})