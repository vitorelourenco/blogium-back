import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const posts = [];
const comments = [];

app.get("/posts", (req,res)=>{

});

app.post("/posts", (req,res)=>{

});

app.get("/posts/:id", (req,res)=>{
  const id = req.params.id;
});

app.get("/posts/:id/comments", (req,res)=>{
  const id = req.params.id;
});

app.post("/posts/:id/comments", (req,res)=>{
  const id = req.params.id;
});

app.listen(4000);