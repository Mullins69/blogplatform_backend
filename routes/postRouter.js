const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Post = require("../models/post");
var ObjectId = require('mongodb').ObjectId;


const { getPost } = require("../middleware/finders");

// GET all Posts
router.get("/", async (req, res) => {
  try {
    const pos = await Post.find();
    res.status(201).send(pos);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
//getting all posts from single user
router.get("/singleuser", auth, async (req, res, next) => {
    try {
        const post = await Post.find({ user_id: { $regex: req.user._id } });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// GET one post
router.get("/:id", getPost, (req, res, next) => {
  res.send(res.post);
});
//Adds a new post
router.post("/", [auth], async (req, res, next) => {
    let { details, title, img ,category} = req.body;
    let user_id = req.user._id;
    let username = req.user.fullname
    const posts = new Post({
        title,
        img,
        details,
        username,
        user_id,
    })
    try {
        posts.post.push({
            title,
            username,
            img,
            details,
            category
        });
        const updatedPost = await posts.save();
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(500).json(console.log(error));
    }
});
router.get('/test/:id', getPost, function(req, res, next){
    res.json(res.post)
})
// UPDATE a post
router.put("/:id", [auth, getPost], async (req, res, next) => {
    if (req.user._id !== res.post.user_id)
      res
        .status(400)
        .json({ message: "You do not have the permission to update this post" });
    const { title, category,details, img } = req.body;
    try {
      const updatedPost = await Post.updateOne(
        {
          _id: res.post._id,
          username: res.post.username,
          user_id: req.user._id
        },
        {
          $set: { post: {"title":title, "category":category, "details":details,"img":img}},
        },
      );;
      res.status(201).send(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


//Delete single post
router.delete('/single', auth, async (req, res, next) => {
    try {
        const id = req.body
        const post = await Post.findByIdAndDelete({ _id: ObjectId(id) });
        res.json({ message: "Deleted post" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;
