const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");
const multer = require("multer");
const app = express();

//File Storage:
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images"); // Save the files in the 'images' folder
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + "-" + file.originalname); // Create a unique filename using the current date and original file name
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" || // Accept PNG files
		file.mimetype === "image/jpg" || // Accept JPG files
		file.mimetype === "image/jpeg" // Accept JPEG files
	) {
		cb(null, true); // Accept the file if it matches the mimetype
	} else {
		cb(null, false); // Reject the file if it's not an accepted mimetype
	}
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
//multer middleware
app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	res.status(status).json({ message: message });
});
mongoose
	.connect(
		"mongodb+srv://dxngrg2058:8HYZaFXxxuI2AqqW@cluster0.jjmvw.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0"
	)
	.then((result) => {
		console.log("Connected");
		app.listen(8080);
	})
	.catch((err) => {
		console.log(err);
	});
