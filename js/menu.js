function opentabe(linkend){ 
    window.open(`${linkend}.html`,'_self');
}


async function createPrice(){
    console.log("asda");
    const { value: formValues } = await Swal.fire({
        title: 'Enter New Transaction',
        html:
          ` <div class="just">
                <div class="many--c">
                    <span class='work-distrib'">
                        <div class="dro-pwn">
                            <select name="dist-ref" id="dist-ref" class="dist-ref">
                                <option value='All'>All</option>
                                <option value='House'>House</option>
                                <option value='Job'>Jobsssssssssss</option>
                                <option value='Car'>Car</option>
                            </select>
                        </div>
                        <button class='distribu-btn'"><ion-icon name="add-circle-sharp"></ion-icon></button>
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
        send_transition()
        Swal.fire(JSON.stringify(formValues))

    }
}


async function send_transition(){
    let send = {email:front_emai.value,password:front_senha.value}
        const fetchResponsePromise = await fetch('http://localhost:80/auth' ,{ 
            
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(send)
            
        })
        let val_serv = await fetchResponsePromise.json()
        console.log(val_serv.value)
}