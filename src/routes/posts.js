import express from "express";
import path from "path";
import multer from "multer";
import _ from "lodash";
import authenticate from "../middlewares/authenticate";
import Post from "../models/Post";
import parseErrors from "../utils/parseErrors";

const router = express.Router();
router.use(authenticate);

const fileFilter = (req, file, cb) => {
	const allowedTypes = ["image/jpeg", "image/png"];
	if (!allowedTypes.includes(file.mimetype)) {
		const error = new Error("wrong file type");
		error.code = "LIMIT_FILE_TYPES";
		cb(error, false);
	}
	cb(null, true);
};

const upload = multer({
	dest: path.join(__dirname, "../public/uploads"),
	limits: { fileSize: 1024 * 1024 * 5 },
	fileFilter,
});

router.get("/", (req, res) => {
	Post.find({ userId: req.currentUser._id }).then((posts) =>
		res.json({ posts })
	);
});

router.get("/blog", (req, res) => {
	Post.find({}).then((posts) => res.json({ posts }));
});

router.get("/:_id", (req, res) => {
	Post.findById(req.params._id).then((post) => res.json({ post }));
});

router.post("/", upload.single("image"), (req, res) => {
	const { title, body } = req.body;
	Post.create({
		title,
		body,
		image: req.file ? req.file.filename : null,
		userId: req.currentUser._id,
	})
		.then((post) => res.json({ post }))
		.catch((err) => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.put("/:_id", upload.single("image"), (req, res) => {
	const postObj = {
		title: req.body.title,
		body: req.body.body,
		userId: req.currentUser._id,
	};
	if (req.file) {
		postObj.image = req.file.filename;
	}
	Post.findByIdAndUpdate(req.params._id, postObj, { new: true })
		.then((post) => res.json({ post }))
		.catch((err) => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.delete("/:_id", (req, res) => {
	Post.findByIdAndRemove(req.params._id)
		.then(() => res.json({}))
		.catch((err) => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default router;
