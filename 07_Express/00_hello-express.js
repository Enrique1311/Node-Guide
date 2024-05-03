import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.end("<h1>Welcome to Express</h1>");
	console.log(req);
	console.log(res);
});

app.listen(3000, () => {
	console.log("Initializing Express from http://localhost:3000");
});
