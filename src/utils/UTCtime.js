function getCurrentTimeUTC(){
    var tmLoc = new Date();
    return tmLoc.getTime() + tmLoc.getTimezoneOffset() * 60000;
}

export {getCurrentTimeUTC}