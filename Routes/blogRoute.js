const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");

router.get("/", (request, response) => {
	Blog.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			response.render("index", { title: "Blogs", blogs: result });
		})
		.catch((error) => console.log(error));
});

router.post("/", (req, res) => {
	const blogFetched = new Blog(req.body);
	blogFetched
		.save()
		.then((result) => {
			res.redirect("./blogs");
		})
		.catch((error) => {
			console.log(error);
		});
});

//in order to render the view method
router.get("/create", (req, res) => {
	res.render("create", { title: "About" });
});

//in order to fetch the id of the blog
router.get("/:id", (req, res) => {
	const id = req.params.id;
	// console.log(id);
	Blog.findById(id).then((result) => {
		res.render("details", { blog: result, title: "Blog details" });
	});
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;

	Blog.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: "/blogs" });
		})
		.catch((err) => console.log(err));
});

module.exports = router;
