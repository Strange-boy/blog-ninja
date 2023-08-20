//in order to create server
const http = require("http");
const fs = require("fs");
const _ = require("lodash");

//in order to create the server
const server = http.createServer((request, response) => {
	// console.log("request made");
	// console.log("request url:", request.url);

	//in order to test the functionality of lodash
	const random = _.random(1, 20);
	console.log(random);

	const greet = _.once((guy) => {
		console.log("hello ", guy);
	});

	greet("Joel");
	greet("Stranger");

	// Add error handling
	try {
		//in order to view the request object
		// console.log(request);
		// console.log("URL:", request.url);
		// console.log("Type:", request.method);

		//in order to send a response back to the web browser
		response.setHeader("Content-type", "text/html");

		let path = "./views/";

		switch (request.url) {
			case "/":
				path += "index.html";
				response.statusCode = 200;
				break;
			case "/about":
				path += "about.html";
				response.statusCode = 200;
				break;
			case "/about-blah":
				response.statusCode = 301;
				response.setHeader("Location", "./about");
				response.end();
				break;
			default:
				path += "404.html";
				response.statusCode = 404;
				break;
		}

		//we are going to use the file system to read the file

		fs.readFile(path, (err, data) => {
			if (err) {
				console.log(err);
				response.end();
			} else {
				// console.log(data.toString());
				response.write(data);
				response.end();
			}
		});
	} catch (error) {
		// Handle the error
		console.error(error);
		response.statusCode = 500;
		response.end("Internal server error");
	}
});

//we need the server to listen to a port
server.listen(3013, "localhost", () => {
	console.log("listening to the requests on port 3000");
});
