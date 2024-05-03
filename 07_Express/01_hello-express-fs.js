import express from "express";
// resolve: me da la ruta donde me encuentro
import { resolve } from "path";

const app = express();

app.get("/", (req, res) => {
	res.sendFile(resolve("index.html"));
});

app.listen(3000, () => {
	console.log("Initializing Express from http://localhost:3000");
});
