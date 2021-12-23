import * as register from './registerDb.js'
console.log(register.pathIP)

let myChart
async function init() {

    Chart.defaults.font.size = 10;
    Chart.defaults.font.size = 10;

    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15,16,17,18,19],
            datasets: [{
                backgroundColor: 'rgb(148,145,94,0.2)',
                borderColor: 'rgb(148,145,94,0.5)',
                borderWidth: 1,
                data: [10, 20, 30, 40, 50, 0, 5, 8, 4, 4, 0. - 1, -10],
                borderWidth: 3,
                fill:true
            }],
        },
        options: {
            plugins: {
                legend: {
                  display: false,
                },
              },
                

            lineTension: 0.2,
           
            scales: {
                x: {
        
                    title: {
                        color: '#94915e',
                        display: true,
                        text: 'TRANSACTIONS'
                    },
                    grid: {
                        color: '#94915e',
                        borderColor: 'transparent',
                        
                        tickColor: 'transparent',
                        borderDash:[7,1],
                        borderDashOffset:0.01
                    },
                    ticks: {
                        
                        
                        align: 'center',
                        color: '#94915e',
                    }
                },
                y:{
                    ticks: {
                        color: '#94915e',
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

}

async function updateGraph() {
    myChart.data.datasets[0].data = [];
    myChart.data.labels = [];

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
    let send = { start: document.getElementById('Start').value, finish: document.getElementById('Final').value }
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
