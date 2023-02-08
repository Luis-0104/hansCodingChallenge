export function dateToSQL(date:Date | number | undefined){
    if(!date) date = new Date()
    if(typeof date == "number") date = new Date(date)
    return date.toISOString().slice(0, 19).replace('T', ' ');
}