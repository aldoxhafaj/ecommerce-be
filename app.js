const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const storage = multer.diskStorage({
	destination: "./images",
	filename: function (req, file, callback) {
		callback(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage: storage });

app.use(cors());

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const shopRoutes = require("./routes/shopRoutes");

app.use(bodyParser.json());

app.use(upload.single("image"));
app.use("/images", express.static("./images"));
app.use(adminRoutes);
app.use(authRoutes);
app.use(shopRoutes);

const startServer = async () => {
	try {
		await mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	} catch (error) {
		console.log("Error connecting to MongoDB", error);
	}
};

startServer();
