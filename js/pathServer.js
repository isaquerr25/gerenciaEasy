import * as regs from './registerDb.js'
import getAuthToken from './getAuthToken.js'



async function getGridsAndValuesDbDate(estimatedDateStr) {
    console.log('s')
    let finishDate,startDate;
    
    if(estimatedDateStr == 'day')
    {
        
        finishDate = new Date();
        startDate  = new Date();
        startDate.setDate(finishDate.getDate() - 4);
        finishDate.setDate(finishDate.getDate() + 4);
    }
    else if(estimatedDateStr == 'week')
    {
        
        finishDate = new Date();
        startDate  = new Date();
        startDate.setDate(finishDate.getDate() - 7);
        finishDate.setDate(finishDate.getDate() + 7);
        
    }
    else if(estimatedDateStr == 'month')
    {
        
        finishDate = new Date();
        startDate  = new Date();
        startDate.setMonth(finishDate.getMonth() - 4);
        finishDate.setMonth(finishDate.getMonth() + 4);
        
    }
    else if(estimatedDateStr == 'year')
    {
        
        finishDate = new Date();
        startDate  = new Date();
        startDate.setMonth(finishDate.getMonth() - 12);
        finishDate.setMonth(finishDate.getMonth() + 12);
        
    }

    console.log('a',startDate)
    console.log('b',finishDate)
    
    let send = {start: startDate, finish:finishDate}
    const fetchResponsePromise = await fetch(`${regs.pathIP}/users/${regs.userID}/managergridfindByUser`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(send)
    })
    let val_serv = await fetchResponsePromise.json()
    // console.log(val_serv)
    conta(val_serv);
    return (val_serv);
}
function conta(ob){
    let hj = 0
    for (var i = 0; i < ob.length; i++) {
        hj += ob[i].manager_values.length
    }

    console.log(hj)
}




export { getGridsAndValuesDbDate } ;