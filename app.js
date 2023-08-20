const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoute = require("./Routes/blogRoute");

//export app
const app = express();

//create a new uri
const dbURI =
	"mongodb+srv://iamstrange0002:test123@cluster0.oduplhm.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
	.connect(dbURI)
	.then((result) => {
		console.log("Connected to the mongo db");
		//listen for request
		app.listen(3000);
	})
	.catch((error) => console.log(error));

//we need to register the view engine
app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("tiny"));

//a useless middleware
app.use((req, res, next) => {
	console.log("next middleware is used");
	next();
});

//in order to get the home page
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

//in order to get the about page
app.get("/about", (req, res) => {
	res.render("about", { title: "Home" });
});

//in order to create the blog routes
//in order to post request
app.use("/blogs", blogRoute);

//in order to redirect the page to any other page
app.use((req, res) => {
	res.status(404).render("404", { title: "Error page" });
});
