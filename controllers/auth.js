const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.postSignUp = async (req, res, next) => {
	try {
		const { name, email, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return res
				.status(400)
				.json({ error: "Password and confirm password do not match" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(409)
				.json({ error: "This email is already used" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			cart: [],
		});

		await newUser.save();

		return res.status(200).json({ message: "Signup Successful" });
	} catch (error) {
		return res.status(500).json({ error: "Server error" });
	}
};

exports.postLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ error: "password is not correct" });
		}

		const token = jwt.sign({ userId: user._id }, "secret", {
			expiresIn: "1h",
		});

		return res
			.status(200)
			.json({ message: "Login successful", user, token });
	} catch (error) {
		return res.status(500).json({ error: "Server error" });
	}
};
