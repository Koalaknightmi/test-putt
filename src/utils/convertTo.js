function convertToFt (m,t){
  if(t==="ft") return m;
  return Math.round(m*3.2808399)
}
function convertToM (m,t){
  if(t==="m") return m;
  return Math.round(m/3.2808399)
}

export {convertToFt,convertToM};