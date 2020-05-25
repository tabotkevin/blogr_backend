import mongoose from "mongoose";

const schema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, required: true },
	postId: { type: mongoose.Schema.Types.ObjectId, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Like", schema);
