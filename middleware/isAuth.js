const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("Authorization").split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Authentication failed" });
	}

	try {
		const decodeToken = jwt.verify(token, "secret");

		req.user = { _id: decodeToken.userId };

		next();
	} catch (error) {
		return res.status(401).json({ message: "Authentication falied" });
	}
};
