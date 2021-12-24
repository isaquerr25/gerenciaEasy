let myChart
function init(){
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
						text: ''
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

	let myDropdown = document.querySelector('.dropbtn')
	let timeValue = document.querySelector('#time-value')
	let interest = document.querySelector('#interest')
	let investiment = document.querySelector('#investiment')
	let initial_value = document.querySelector('#initial_value')
	
	timeValue.addEventListener("change", event => {
		calc()
	})
	interest.addEventListener("change", event => {
		calc()
	})
	investiment.addEventListener("change", event => {
		calc()
	})
	initial_value.addEventListener("change", event => {
		calc()
	})
	myDropdown.addEventListener("change", event => {
		calc()
	})
	myDropdown.addEventListener("click", event => {
		calc()
	})
}

function calc(){
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	console.log('entro')
	let timeValue	 = 0;
	let interest 	 = 0;
	let investiment  = 0;
	let initialValue = 0;
	let myDropdown 	 = 0;

	if (document.querySelector('#time-value').value > 0){
		timeValue = document.querySelector('#time-value').value
	}
	if (document.querySelector('#interest').value > 0){
		interest = document.querySelector('#interest').value
	}

	if (document.querySelector('#investiment').value > 0){
		investiment = document.querySelector('#investiment').value
	}

	if (document.querySelector('#initial_value').value > 0){
		initialValue = document.querySelector('#initial_value').value
	}
	if (document.querySelector('.dropbtn').value != null){
		myDropdown = document.querySelector('.dropbtn').value
	}
	
	if (timeValue <=0){
		timeValue = 0;
	}
	let valueCorrent = 0;
	valueCorrent = parseFloat(initialValue)

	myChart.data.datasets[0].data = [];
	myChart.data.labels = [];
	let d = new Date()
	for(var i=0 ;i<timeValue;i++){
		let ado = parseFloat(interest)/100;
		console.log(valueCorrent*ado)
		
		valueCorrent = parseFloat(valueCorrent) + parseFloat(valueCorrent*ado);

	

		valueCorrent += parseFloat(investiment);

		myChart.data.datasets[0].data.push(valueCorrent);
	
		if (myDropdown == 'month') {
			d.setMonth(d.getMonth() + 1)
			myChart.data.labels.push((months[d.getMonth()] +'-'+d.getFullYear()));
		}
		else if(myDropdown == "year"){
			d.setFullYear(d.getFullYear() + 1)
			myChart.data.labels.push((d.getFullYear()));
		}
		else{
			d.setDate(d.getDate() + 1)
			myChart.data.labels.push((d.getDate() +'-'+months[d.getMonth()]));
		}	
		

		console.log(valueCorrent)
	}
	document.getElementById('bigValue').innerHTML = Utils.formatCurrency(valueCorrent)
	myChart.update();
}	
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



init()