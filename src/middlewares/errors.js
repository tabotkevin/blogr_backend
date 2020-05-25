function uploadErrors(err, req, res, next) {
	if (err.code === "LIMIT_FILE_TYPES") {
		res.status(402).json({ errors: { global: "Only images allowed" } });
		next();
	}
}

export default uploadErrors;
