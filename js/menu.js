import  { pathIP , userID} from './registerDb.js';
function opentabe(linkend){ 
    window.open(`${linkend}.html`,'_self');
}
window.opentabe = opentabe;

console.log(window.location.pathname);
console.log(userID);

if (window.location.pathname == '/dashboard.html'){
    let element = document.querySelector('.dashboard');
    element.classList.add("brown");
}    
else if(window.location.pathname == '/calculator.html'){
    let element = document.querySelector('.calculator');
    element.classList.add("brown");
}    
else if(window.location.pathname == '/graphic.html'){
    let element = document.querySelector('.graphic');
    element.classList.add("brown");
}   
else if(window.location.pathname == '/profile.html'){
    let element = document.querySelector('.profile');
    element.classList.add("brown");
}     
async function createPrice(){
    let getDb = await getOnlyGrids();
    let listOptions = "";
    for (var i = 0; i < getDb.length; i++) {
        
        listOptions += `<option value="${getDb[i].name}">${getDb[i].name}</option>`
        
    }
    const { value: formValues } = await Swal.fire({
        title: 'Enter New Transaction',
        html:
          ` <div class="just">
                <div class="many--c">
                    <span class='work-distrib'">
                        <div class="dro-pwn">
                            <select name="dist-ref" id="dist-ref" class="dist-ref">
                                ${listOptions}
                            </select>
                        </div>
                        <button class='distribu-btn' onclick="opentabe('/distribution')"><ion-icon name="add-circle-sharp" ></ion-icon></button>
                    </span>
                    <div class="input-group">
                        <input 
                            type="text" 
                            id="description" 
                            name="description"
                            placeholder="Description"
                        />
                    </div>

                    <div class="input-group">
                        <input 
                            type="number"
                            step="0.01"
                            id="amount" 
                            name="amount"
                            placeholder="0,00"
                        />
                        
                    </div>
                    <small class="help">Use the - (negative) sign for expenses and (comma) for decimal places</small>
                    <div class="input-group">
                        <input 
                            type="date" 
                            id="date" 
                            name="date"
                        />
                    </div>
                </div>
            </div>
            `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('dist-ref').value,
            document.getElementById('description').value,
            document.getElementById('amount').value,
            document.getElementById('date').value
          ]
        }
      })
    if (formValues) {
        send_transition(formValues)
        // Swal.fire(JSON.stringify(formValues))

    }
    
}
window.createPrice = createPrice;



async function getOnlyGrids() {
    const fetchResponsePromise = await fetch(`${pathIP}/users/${userID}/gridvalues`, {

        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    let val_serv = await fetchResponsePromise.json()
    console.log(val_serv)
    return (val_serv)

}


async function send_transition(front){
    let send = {
                name: front[1],
                gridnames: front[0],
                price: front[2],
                date_inform: front[3]
                }
    console.log(send)
    const fetchResponsePromise = await fetch(`${pathIP}/users/${userID}/gridvalues/${front[0]}/managergridsapp` ,{ 

        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(send)

    })
    let val_serv = await fetchResponsePromise.json()
    console.log(val_serv)
    if(!val_serv.error){
        Swal.fire({

            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,

          })
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            showConfirmButton: false,
          })
    }
}
window.send_transition = send_transition;