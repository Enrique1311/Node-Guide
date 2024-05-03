import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.end("<h1>Welcome to Express</h1>");
});

// Los parámetros en Express se pasan separados por ":"
// http:localhost:3000/user/19-enrique-47
app.get("/user/:id-:name-:age", (req, res) => {
	res.set({ "content-type": "text/html; charset=utf-8" });
	res.end(
		// params: tiene los parámetros que le pasamos a la url
		`<h3>Hello ${req.params.name}, welcome to Express.Js. Your id is ${req.params.id} y tienes ${req.params.age} años.</h3>`
	);
});

app.get("/search", (req, res) => {
	//http://localhost:3000/search?id=19&name=Enrique%age=47
	res.set({ "content-type": "text/html; charset=utf-8" });
	res.end(
		`<h3>Hello ${req.query.name}, welcome to Express.Js. Your id is ${req.query.id} y tienes ${req.query.age} años.</h3>`
	);
});

app.listen(3000, () => {
	console.log("Initializing Express from http://localhost:3000");
});
