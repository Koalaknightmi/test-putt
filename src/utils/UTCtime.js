function getCurrentTimeUTC(){
    var tmLoc = new Date();
    return tmLoc.getTime() + tmLoc.getTimezoneOffset() * 60000;
}
function getLocalTimeFromUTC(time){
    if(typeof time !== "object"){
      time = new Date(time);
    }
    return time.getTime() - time.getTimezoneOffset() * 60000;
}


export {getCurrentTimeUTC,getLocalTimeFromUTC}