// tean
const teamMember = [
	{
		age: 30,
		city: "Liepāja",
		gender: "Sieviete",
		nationality: "Latviete",
	},
	{
		age: 25,
		city: "Rīga",
		gender: "Sieviete",
		nationality: "Latviete",
	},
];
// show team
function showInfo(memberID, divId) {
	let member = teamMember[memberID];

	let divElements = document.getElementById(divId);

	if (divElements && member) {
		divElements.innerHTML =
			"<p><strong>Vecums: </strong>" +
			member.age +
			"</p>" +
			"<p><strong>Pilsēta: </strong>" +
			member.city +
			"</p>" +
			"<p><strong>Dzimums: </strong>" +
			member.gender +
			"</p>" +
			"<p><strong>Tautība: </strong>" +
			member.nationality +
			"</p>";
	} else {
		console.error("Kļūda");
	}
}

// aptauja, chart
async function getDatiAptauja() {
	try {
		// get data
		let response = await fetch("aptauja.csv");
		let data = await response.text();

		let rows = data.split("\n").filter((row) => row.trim() !== "");
		let answers = rows
			.slice(1)
			.map((answer) => answer.trim().replace(/"/g, ""));

		// counting
		let counts = answers.reduce((acc, answer) => {
			acc[answer] = (acc[answer] || 0) + 1;
			return acc;
		}, {});

		let labels = Object.keys(counts);
		let values = Object.values(counts);

		// chart
		drawChart(labels, values, "intereseChart", "Atbilžu skaits", "bar");
	} catch (error) {
		console.error("Kļūda", error);
	}
}

// load data
document.addEventListener("DOMContentLoaded", getDatiAptauja);

// dati, chart
function drawChart(labels, data, canvasId, chartLabel, chartType) {
	const ctx = document.getElementById(canvasId).getContext("2d");

	new Chart(ctx, {
		type: chartType,
		data: {
			labels: labels,
			datasets: [
				{
					label: chartLabel,
					data: data,
				},
			],
		},
	});
}

// get data
async function getDati() {
	try {
		let response = await fetch("dati.csv");
		let data = await response.text();
		let table = data.split("\n");

		let headerRow = table[0].split(","); // header
		let totalDataRow = table[1].split(","); // row

		let labels = [
			headerRow[2],
			headerRow[3],
			headerRow[4],
			headerRow[5],
			headerRow[6],
			headerRow[7],
		];

		// data
		let values = [
			parseFloat(totalDataRow[2].trim().replace(/ /g, "")),
			parseFloat(totalDataRow[3].trim().replace(/ /g, "")),
			parseFloat(totalDataRow[4].trim().replace(/ /g, "")),
			parseFloat(totalDataRow[5].trim().replace(/ /g, "")),
			parseFloat(totalDataRow[6].trim().replace(/ /g, "")),
			parseFloat(totalDataRow[7].trim().replace(/ /g, "")),
		];
		drawChart(
			labels,
			values,
			"datiVizualizacija",
			"Ģimenes valsts pabalsta saņēmēji",
			"doughnut"
		);
	} catch (error) {
		console.error("Kļūda", error);
	}
}

// load data
document.addEventListener("DOMContentLoaded", getDati);
