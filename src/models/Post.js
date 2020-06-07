import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
		image: { type: String, required: false },
		userId: { type: mongoose.Schema.Types.ObjectId, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

schema.methods.exportData = function exportData() {
	return {
		_id: this._id,
		title: this.title,
		body: this.body,
		image: `${process.env.HOST}/uploads/${this.image}`,
	};
};

export default mongoose.model("Post", schema);
