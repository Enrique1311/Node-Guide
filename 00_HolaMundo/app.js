let nombre = "Enrique";

console.log(
	`Hola Mundo, mi nombre es ${nombre}, este es mi primer mensaje desde Node.js`
);

let edad = 47;

if (edad >= 18) {
	console.log("Eres mayor de edad");
} else {
	console.log("Eres menor de edad");
}

function sumar(a, b) {
	return a + b;
}

console.log(sumar(19, 20));
