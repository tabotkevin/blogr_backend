import mongoose from "mongoose";

const schema = new mongoose.Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	image: { type: String, required: false },
	userId: { type: mongoose.Schema.Types.ObjectId, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Post", schema);
