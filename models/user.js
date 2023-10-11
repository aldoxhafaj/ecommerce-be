const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		default: 1,
	},
});

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	cart: [cartSchema],
});

module.exports = mongoose.model("User", userSchema);
