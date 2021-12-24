import * as register from './registerDb.js'
import { getGridsAndValuesDbDate } from './pathServer.js'
console.log(register.pathIP)

let myChart
async function init() {

	Chart.defaults.font.size = 10;
	Chart.defaults.font.size = 10;

	const area = document.getElementById('myChart');
	const ctx = document.getElementById('myChart').getContext('2d');
	var gradient = ctx.createLinearGradient(0, 0, 0, 400);
	gradient.addColorStop(0, 'rgba(148,145,94,0)');
	gradient.addColorStop(0.5, 'rgba(148,145,94,0.2)');
	gradient.addColorStop(1, 'rgba(148,145,94,1)');
	myChart = new Chart(ctx, {
		type: 'line',
		data: {

			labels: [],
			datasets: [{
				backgroundColor: gradient,
				borderColor: 'rgb(148,145,94,0.5)',
				borderWidth: 1,
				data: [],
				borderWidth: 3,
				fill: true,

			}],
		},
		options: {
			bezierCurve: false,
			plugins: {
				legend: {
					display: false,
				},
			},


			lineTension: 0.20,

			scales: {
				x: {

					title: {
						color: 'rgb(148,145,94,0.2)',
						display: true,
						text: 'TRANSACTIONS'
					},
					grid: {
						color: 'rgb(148,145,94,0.2)',
						borderColor: 'transparent',

						tickColor: 'transparent',
						borderDash: [2, 1],
						borderDashOffset: 0.01
					},
					ticks: {


						align: 'center',
						color: 'rgb(148,145,94,0.2)',
					}
				},
				y: {
					ticks: {
						color: 'rgb(148,145,94,0.5)',
					},
					grid: {
						color: 'transparent',
						borderColor: 'transparent',
						tickColor: 'transparent',

					},
				}

			}
		}
	});

	//await updateGraph();
	let server = getGridsAndValuesDbDate('day');
	let upVar = await updateGraph('day', dropInGraph("day", server), server);
	console.log(upVar.profitValue)
	updateValuesScreen(upVar);
}
window.init = init
async function heardBtn() {

	let server;
	let afg = document.querySelector("#day")
	afg.addEventListener("click", event => {
		let server = getGridsAndValuesDbDate('day');
		let upVar = updateGraph('day', dropInGraph("day", server), server);
		updateValuesScreen(upVar);
	});

	afg = document.querySelector("#week")
	afg.addEventListener("click", event => {

		let server = getGridsAndValuesDbDate('week');
		let upVar = updateGraph('week', dropInGraph("week", server), server);
		updateValuesScreen(upVar);
	});

	afg = document.querySelector("#month")
	afg.addEventListener("click", event => {

		let server = getGridsAndValuesDbDate('month');
		let upVar = updateGraph('month', dropInGraph("month", server), server);
		updateValuesScreen(upVar);
	});

	afg = document.querySelector("#year")
	afg.addEventListener("click", event => {

		let server = getGridsAndValuesDbDate('year');
		let upVar = updateGraph('year', dropInGraph("year", server), server);
		updateValuesScreen(upVar);
	});
}

async function dropInGraph(typeGraph, promDB) {
	console.log('dropInGraph')
	let extractProm = await promDB;
	console.log(typeGraph, extractProm)

	let half = new Date();
	let future = new Date();
	let past = new Date();

	var daysOfYear = [];
	if (typeGraph == 'day') {

		future.setDate(half.getDate() + 4);
		past.setDate(half.getDate() - 4);

		for (var d = new Date(past); d <= future; d.setDate(d.getDate() + 1)) {

			daysOfYear.push(new Date(d));
		}
	}
	else if (typeGraph == 'week') {
		future.setDate(half.getDate() + 7);
		past.setDate(half.getDate() - 7);

		for (var d = new Date(past); d <= future; d.setDate(d.getDate() + 1)) {

			daysOfYear.push(new Date(d));
		}

	}
	else if (typeGraph == 'month') {
		future.setMonth(half.getMonth() + 4);
		past.setMonth(half.getMonth() - 4);

		for (var d = new Date(past); d <= future; d.setMonth(d.getMonth() + 1)) {

			daysOfYear.push(new Date(d));
		}
	}
	else if (typeGraph == 'year') {
		future.setMonth(half.getMonth() + 12);
		past.setMonth(half.getMonth() - 12);

		for (var d = new Date(past); d <= future; d.setMonth(d.getMonth() + 1)) {

			daysOfYear.push(new Date(d));
		}
	}
	console.log(daysOfYear)
	return (daysOfYear)
}
async function updateGraph(typeFill, dateJobs, arrayValueServer) {
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	console.log('updateGraph')
	let dateJob = await dateJobs
	let arrayValueDb = await arrayValueServer
	console.log(dateJob)
	await arrayValueDb;

	myChart.data.datasets[0].data = [];
	myChart.data.labels = [];

	if (typeFill == 'month' || typeFill == "year") {

		let refil = dateJob
		dateJob = []
		let newMoth = 15

		for (var i = 0; i < refil.length; i++) {

			if (refil[i].getMonth() != newMoth) {
				newMoth = refil[i].getMonth()
				dateJob.push(refil[i])
			}

		}
	}
	for (var i = 0; i < dateJob.length; i++) {

		if (typeFill == 'month' || typeFill == "year") {

			myChart.data.labels.push( months[dateJob[i].getMonth()]+" "+ dateJob[i].getFullYear());

		} else {

			myChart.data.labels.push(dateJob[i].getDate());

		}



		let calcu = 0;

		for (var x = 0; x < arrayValueDb.length; x++) {
			console.log('x')

			if (arrayValueDb[x].manager_values.length != 0) {



				for (var y = 0; y < arrayValueDb[x].manager_values.length; y++) {

					let date = new Date(arrayValueDb[x].manager_values[y].date_inform)
					date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

					if (isSameDay(typeFill, date, new Date(dateJob[i]))) {

						console.log(date, (new Date(dateJob[i])))

						console.log(date, '  ssss ',
							arrayValueDb[x].manager_values[y].date_inform, '  ssss ',
							arrayValueDb[x].manager_values[y].name,
							arrayValueDb[x].manager_values[y].price, '  ssss ',
							dateJob[i].getDate());

						console.log('arrayValueDb[x].manager_values[y].price')
						console.log(arrayValueDb[x].manager_values[y].price)
						calcu += arrayValueDb[x].manager_values[y].price;

					}
				}
			}
		}
		console.log(calcu)
		myChart.data.datasets[0].data.push(calcu);
	}

	console.log(myChart.data.datasets[0].data)

	myChart.update();

	// only return saving , profit and all value
	let expenses = 0
	let profit = 0
	let allTransitions = 0

	for (var x = 0; x < arrayValueDb.length; x++) {
		console.log('x')

		if (arrayValueDb[x].manager_values.length != 0) {

			for (var y = 0; y < arrayValueDb[x].manager_values.length; y++) {

				let date = new Date(arrayValueDb[x].manager_values[y].date_inform)
				date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

				if (arrayValueDb[x].manager_values[y].price>0) {

					profit += arrayValueDb[x].manager_values[y].price;

				}else{
					expenses += arrayValueDb[x].manager_values[y].price;
				}
				allTransitions+= arrayValueDb[x].manager_values[y].price;
			}	
		}
	}
	console.log('veio',profit)
	console.log('veio',expenses)
	console.log('veio',allTransitions)
	return {
        profitValue: profit,
        expensesValue: expenses,
        allTransitionsValue: allTransitions,
    };
	
}
function isSameDay(typeCorrent, d1, d2) {
	if (typeCorrent == 'month' || typeCorrent == "year") {
		return d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth();
	}
	else {
		return d1.getFullYear() === d2.getFullYear() &&
			d1.getDate() === d2.getDate() &&
			d1.getMonth() === d2.getMonth();
	}

}

async function updateValuesScreen(updateGraphValue){
	let { profitValue , expensesValue , allTransitionsValue } = await updateGraphValue
	console.log('asdvvvvvvv',profitValue)
	let bigValueScreem		= document.querySelector('#big-total')
	let profitValueScreem 	= document.querySelector('.price_saving')
	let expensesValueScreem 	= document.querySelector('.price_expenses')

	bigValueScreem.innerHTML	  = Utils.formatCurrency( allTransitionsValue );
	profitValueScreem.innerHTML   = Utils.formatCurrency( profitValue);
	expensesValueScreem.innerHTML = Utils.formatCurrency( expensesValue);
}
window.updateValuesScreen = updateValuesScreen


const Utils = {
    formatAmount(value){
        value = Number(value.replace(/\,\./g, "")) 
        
        return value
    },

    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
    
        value =  value.toFixed(2).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

       return signal + value
    }
}





heardBtn()
init();