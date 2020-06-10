import express from "express";
import Post from "../models/Post";

const router = express.Router();

router.get("/", (req, res) => {
	Post.find({}).then((posts) => res.json({ posts }));
});

export default router;
