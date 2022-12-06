module.exports =
formatDate = (date) => {    
    let dateToFormate = new Date(date);
    let day = dateToFormate.getDate() < 10 ? "0" + dateToFormate.getDate() : dateToFormate.getDate() 
    let month = dateToFormate.getMonth() < 10 ?  "0" + dateToFormate.getMonth() : dateToFormate.getMonth()
    let minutes = dateToFormate.getMinutes() === 0 ? "00" : dateToFormate.getMinutes()
    return day + '-' + month + '-'+dateToFormate.getFullYear()+ ' ' +dateToFormate.getHours()+':'+minutes;
    }