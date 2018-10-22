var getMonDate = function () {
    var d=new Date(),
        day=d.getDay(),
        date=d.getDate();
    if(day===1)
        return d;
    if(day===0)
        d.setDate(date-6);
    else
        d.setDate(date-day+1);
    return d;
}
/**
 * 获取当前月的第一天
 */
var getCurrentMonthFirst = function(){
    var date=new Date();
    date.setDate(1);
    return date;
}
/**
 * 获取当前月的最后一天
 */
var getCurrentMonthLast = function(){
    var date=new Date();
    var currentMonth=date.getMonth();
    var nextMonth=++currentMonth;
    var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
    var oneDay=1000*60*60*24;
    return new Date(nextMonthFirstDay-oneDay);
}
module.exports = { getMonDate, getCurrentMonthFirst, getCurrentMonthLast }