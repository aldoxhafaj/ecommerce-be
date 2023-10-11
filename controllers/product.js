const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
	try {
		const { page, take } = req.query;
		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = parseInt(take) || 10;

		const skip = (pageNumber - 1) * itemsPerPage;

		const [products, totalItems] = await Promise.all([
			Product.aggregate([{ $skip: skip }, { $limit: itemsPerPage }]),
			Product.countDocuments(),
		]);

		return res.status(200).json({ products, totalItems });
	} catch (error) {
		return res.status(500).json({ error: "Internal server error" });
	}
};
