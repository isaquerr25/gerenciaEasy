import * as register from './registerDb.js'
console.log(register.pathIP)

let myChart
async function init() {

    Chart.defaults.font.size = 15;
    Chart.defaults.font.size = 15;
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            // labels: ['casa', 'viagem', 'conserto'],
            labels: [],
            datasets: [{
                // data: [500, 2000, 20, 1500, 700, 50, 700, 50,1500, 700, 50, 700, 50],
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235,0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',

                    'rgba(89, 105, 113, 0.5)',
                    'rgba(128, 62, 90,  0.5)',
                    'rgba(85, 254, 99,  0.5)',
                    'rgba(34, 167, 10,  0.5)',
                    'rgba(134, 44, 155, 0.5)',
                    'rgba(2,  216, 153, 0.5)',

                    'rgba(103, 3, 0,    0.5)',
                    'rgb(154, 232, 128, 0.5)',
                    'rgb(7, 190, 242,   0.5)',
                    'rgb(178, 67, 72,   0.5)',
                    'rgb(169, 29, 44,   0.5)',
                    'rgb(87, 125, 20,   0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255,1)',

                    'rgba(89, 105, 113, 1)',
                    'rgba(128, 62, 90,  1)',
                    'rgba(85, 254, 99,  1)',
                    'rgba(34, 167, 10,  1)',
                    'rgba(134, 44, 155, 1)',
                    'rgba(2,  216, 153, 1)',

                    'rgba(103, 3, 0,    1)',
                    'rgb(154, 232, 128, 1)',
                    'rgb(7, 190, 242,   1)',
                    'rgb(178, 67, 72,   1)',
                    'rgb(169, 29, 44,   1)',
                    'rgb(87, 125, 20,   1)'
                ],
                borderWidth: 2
            }]
        },
        options: {

            scales: {
                r: {
                    grid: {
                        color: 'rgb(46,46,47,0.5)'
                    },
                    ticks: {
                        drawBorder: false,
                        color: 'white',
                        fontSize: '5',
                        backdropColor: '#040509',
                    }

                }
            },



            responsive: true,
            color: 'white',


        },
    });


    await updateGraph();

}

async function updateGraph(){
    myChart.data.datasets[0].data = [];
    myChart.data.labels= [];

    let gridVl = await getGridsAndValuesDb();
    console.log(gridVl)
    for (var i = 0; i < gridVl.length; i++) {
        myChart.data.labels.push(gridVl[i].name);
        let calcu = 0;
        for (var x = 0; x < gridVl[i].manager_values.length; x++) {
            if (gridVl[i].manager_values[x].price > 0) {

                calcu += gridVl[i].manager_values[x].price

            }
            else {
                calcu += (gridVl[i].manager_values[x].price * (-1))
            }
        }
        myChart.data.datasets[0].data.push(calcu);
    }

    console.log(myChart.data.datasets[0].data)

    myChart.update();

}
window.updateGraph = updateGraph;
async function getGridDB() {

    const fetchResponsePromise = await fetch(`${register.pathIP}/users/${register.userID}/gridvalues/${front[0]}/managergridsapp`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    let val_serv = await fetchResponsePromise.json()
    console.log(val_serv)
    if (!val_serv.error) {
        Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,

        })
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            showConfirmButton: false,
        })
    }
}

async function createGrid() {

    const { value: formValues } = await Swal.fire({
        title: 'Enter New Transaction',
        html:
            ` <div class="just">
                <div class="many--c">
                    
                    <div class="input-group">
                        <input 
                            type="text" 
                            id="group" 
                            name="group"
                            placeholder="Name New Group"
                        />
                    </div>

                    
                    <small class="help">Do not use group names that already exist</small>
                    
                </div>
            </div>
            `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('group').value
            ]
        }
    })
    if (formValues) {

        createGridDB(formValues)
        // Swal.fire(JSON.stringify(formValues))

    }
}
window.createGrid = createGrid;

async function createGridDB(front) {
    console.log('assadd');
    console.log(new Date());
    let send = {
        name: front[0],
        date_inform: new Date(),
        create_at: new Date()
    }
    console.log(send)
    const fetchResponsePromise = await fetch(`${register.pathIP}/users/${register.userID}/gridvalues`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(send)

    })
    let val_serv = await fetchResponsePromise.json()
    console.log(val_serv)
    if (!val_serv.error) {
        Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,

        })
        updateGraph();
        // setTimeout(function () { window.location.reload() }, 2000);
    }
    else {
        Swal.fire({
            icon: 'error',
            title: val_serv.error,
            showConfirmButton: false,
        })
    }
}

async function deleteGrid() {
    let getDb = await getOnlyGrids();
    let listOptions = "";
    for (var i = 0; i < getDb.length; i++) {
        if (getDb[i].name != "All") {
            listOptions += `<option value=${getDb[i].id}>${getDb[i].name}</option>`
        }
    }
    console.log(listOptions);
    const { value: formValues } = await Swal.fire({
        title: 'Enter New Transaction',
        html:
            ` <div class="just">
                <div class="many--c">
                    
                    <div class="dropdown">
                        <select name="link-data" id="ref-grids" class="ref-grids">
                            ${listOptions}
                        </select>
                    </div>                    
                    <small class="help">Choose the group to delete</small>
                    
                </div>
            </div>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'DELETE',
        preConfirm: () => {
            return [
                document.getElementById('ref-grids').value
            ]
        }
    })
    if (formValues) {

        delestroyOnlyGridsDb(formValues)
        //Swal.fire(JSON.stringify(formValues))

    }
}
window.deleteGrid = deleteGrid;

async function getOnlyGrids() {
    const fetchResponsePromise = await fetch(`${register.pathIP}/users/${register.userID}/gridvalues`, {

        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    let val_serv = await fetchResponsePromise.json()
    console.log(val_serv)
    return (val_serv)

}

async function delestroyOnlyGridsDb(front) {

    let send = {
        id_delet: front[0]

    }
    console.log(send)
    const fetchResponsePromise = await fetch(`${register.pathIP}/users/${register.userID}/gridvaluesdell`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(send)

    })
    let val_serv = await fetchResponsePromise.json()
    console.log(val_serv)
    if (!val_serv.error) {
        Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,

        })
        updateGraph();
        // setTimeout(function () { window.location.reload() }, 2000);
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            showConfirmButton: false,
        })
    }

}

async function getGridsAndValuesDb() {
    let send = {start: document.getElementById('Start').value, finish:document.getElementById('Final').value}
    const fetchResponsePromise = await fetch(`${register.pathIP}/users/${register.userID}/managergridfindByUser`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(send)
    })
    let val_serv = await fetchResponsePromise.json()
    // console.log(val_serv)
    return (val_serv);
}

init();
