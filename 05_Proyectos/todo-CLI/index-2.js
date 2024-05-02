import { readFileSync, writeFileSync } from "fs";
import { createInterface } from "readline";
import chalk from "chalk";

const tasks = [];
const DB_FILE = "tasks.txt";

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

function displayMenu() {
	console.log(chalk.yellow.bold("\n***** To Do App *****"));
	console.log(chalk.blueBright("Menu de Opciones:"));
	console.log("1. Agregar tarea");
	console.log("2. Listar tareas");
	console.log("3. Completar tarea");
	console.log("4. Borrar tarea");
	console.log("5. Salir");
	console.log("\n");
}

function loadTasks() {
	try {
		const data = readFileSync(DB_FILE, "utf-8");
		const lines = data.split("\n");
		tasks.length = 0;

		lines.forEach((line) => {
			if (line.trim() !== "") {
				const [task, completed] = line.split("|");
				tasks.push({ task: task, completed: completed === true });
			}
		});
		console.log(
			chalk.green.bold("¡Las tareas se cargaron con éxito desde DB!")
		);
	} catch (error) {
		console.log("No hay tareas...");
	}
}

function saveTask() {
	const data = tasks.map((task) => `${task.task}|${task.completed}`).join("\n");
	writeFileSync(DB_FILE, data, "utf-8");
	console.log(chalk.greenBright("\n¡La tarea se agregó a la DB con éxito!\n"));
}

function addTask() {
	rl.question(chalk.bgBlue("Escribe la nueva tarea: "), (task) => {
		tasks.push({ task, completed: false });
		console.log(chalk.greenBright("\n¡La tarea se agregó con éxito!\n"));
		saveTask();
		displayMenu();
		myOptions();
	});
}

function listTasks() {
	console.log(chalk.gray("\n***Lista de tareas***"));
	if (tasks.length > 0) {
		tasks.forEach((task, i) => {
			let status = task.completed ? "✅" : "❌";
			console.log(`${i + 1} ${status} ${task.task}`);
		});
	} else {
		console.log("No hay tareas...");
	}
	displayMenu();
	myOptions();
}

function completeTask() {
	if (tasks.length > 0) {
		rl.question(
			chalk.blue("Elige número de tarea que deseas completar: "),
			(taskNum) => {
				const i = parseInt(taskNum) - 1;
				if (i >= 0 && i < tasks.length) {
					if (tasks[i].completed === false) {
						tasks[i].completed = true;
						saveTask();
						console.log(`¡La tarea "${tasks[i].task}" marcada con éxito!✅`);
					} else {
						console.log(chalk.red("¡La tarea ingresada ya estaba completada!"));
					}
				} else {
					console.log(chalk.red("Número de tarea inválido..."));
				}
				displayMenu();
				myOptions();
			}
		);
	} else {
		console.log(chalk.red("No hay tareas..."));
	}
	displayMenu();
	myOptions();
}

function deleteTask() {
	if (tasks.length > 0) {
		rl.question(
			chalk.blue("Elige número de tarea que deseas borrar: "),
			(taskNum) => {
				const i = parseInt(taskNum) - 1;
				if (i >= 0 && i < tasks.length) {
					tasks.splice([i], 1);
					saveTask();
					console.log(`¡La tarea ${i + 1} fue eliminada!🗑️`);
				} else {
					console.log(chalk.red("Número de tarea inválido..."));
				}
				displayMenu();
				myOptions();
			}
		);
	} else {
		console.log(chalk.red("No hay tareas..."));
	}
	displayMenu();
	myOptions();
}

function myOptions() {
	rl.question(chalk.bgBlue("Elige una opción: "), (option) => {
		switch (option) {
			case "1":
				addTask();
				break;
			case "2":
				listTasks();
				break;
			case "3":
				completeTask();
				break;
			case "4":
				deleteTask();
				break;
			case "5":
				console.log("¡Adios!");
				rl.close();
				break;
			default:
				console.log(chalk.red("Opción inválida. Intenta de nuevo..."));
				displayMenu();
				myOptions();
		}
	});
}

loadTasks();
displayMenu();
myOptions();
