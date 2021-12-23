import * as register from './registerDb.js'
console.log(register.pathIP)

async function init(){
    let listTransition = document.querySelector('.manager')
    let listAllDb = await getGridsAndValuesDb()
    console.log(listAllDb)
    let listHTML ='';
    for (var i = 0; i < listAllDb.length; i++) {
        
        for (var x = 0; x < listAllDb[i].manager_values.length; x++){
            listHTML += workTransitionHTML(listAllDb[i].manager_values[x])
        }
    }
    listTransition.innerHTML +=listHTML;
}

async function getGridsAndValuesDb(){
    console.log('asdcas')
    const fetchResponsePromise = await fetch(`${register.pathIP}/users/${register.userID}/managergridfindByUser`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    let val_serv = await fetchResponsePromise.json()
    
    return(val_serv);
}


function workTransitionHTML(transaction) {
    
    const CSSclass = transaction.price > 0 ? "saving" : "income";
    const amount = Utils.formatCurrency(transaction.price);
    const dataform = Utils.formatDate(transaction.date_inform);
    let dateStr =new Date(transaction.date_inform)  ;
    const html = `
    <div class = "info-rows">
        <ion-icon name="globe-outline"></ion-icon>
        <div>
            <span class="value-name">${transaction.name}</span>
            <span class="value-day">${dataform}</span>
        </div>
        <div>
            <span class="value-price ${CSSclass}">${amount}</span>
            <span class="value-type"></span>
        </div>
    </div>
    `;

    return html;

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

function scrollUp(){
    
    let timeout

    let table = document.querySelector('.new-table')
    let allHtml = document.querySelector('html')
    table.addEventListener('touchstart', ()=>{
        clearTimeout(timeout)
        console.log('asdasd')
        allHtml.classList.add('scroll')
    })
    table.addEventListener('touchend', ()=>{
        timeout = setTimeout(()=>{
            console.log('mouseup')
            allHtml.classList.remove('scroll')
        },500)
        
    })
}

scrollUp();
init();