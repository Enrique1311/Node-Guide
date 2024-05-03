import express from "express";
import { resolve } from "path";

const app = express();

app.get("/", (req, res) => {
	res.set({ "content-type": "text/html; charset=utf-8" });
	res.end("<h1>Welcome to Express</h1>");
});

//Podemos mandar la respuesta en formato Json
app.get("/json", (req, res) => {
	res.json({
		name: "Enrique",
		age: "47",
	});
});

//Podemos responder con un archivo
app.get("/my-file", (req, res) => {
	res.sendFile(resolve("index.html"));
});

//Podemos responder con una redirección
app.get("/port-enrique-spinelli", (req, res) => {
	res.redirect(301, "https://new-name.com");
});

app.listen(3000, () => {
	console.log("Initializing Express from http://localhost:3000");
});
