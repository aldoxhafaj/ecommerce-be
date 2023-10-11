const Product = require("../models/product");

exports.postAddProduct = async (req, res, next) => {
	try {
		const { title, price, description } = req.body;
		const imageUrl = req.file;

		if (!title || !price || !description) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		if (!req.file) {
			return res.status(400).json({ error: "Image file is required" });
		}
		const product = new Product({
			title,
			price,
			description,
			imageUrl: imageUrl.path.replace(/\\/g, "/"),
			userId: req.user._id,
		});

		await product.save();

		return res.status(200).json({ message: "Success" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Server error" });
	}
};
