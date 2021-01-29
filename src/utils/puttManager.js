import {stances,types} from '../static/PuttingStancesAndTypes'
import {convertToFt} from './convertTo'
import {getCurrentTimeUTC} from './UTCtime'

function getPuttsDate(ms){
  let d = new Date(ms)
  return d.toDateString().replace(' ',"_")
}

function puttobj(config) {
  this.dist = convertToFt(config.dist,config.measurement)
  this.type = config.type
  this.stance = config.stance
  this.made = config.made
  this.num = config.num
  this.stype = config.stance + "_" + config.type.replace(" ","_")
  let time = getCurrentTimeUTC()
  this.time = time
  this.id = time
}

const defstats = {
  lastPuttTime:"",
  lastPuttDate:"",
  total:0,
  streak:0,
  beststreak:{streak:0,time:0},
  made:0,
  missed:0,
  averageDist:0,
  mostusedStance:"",
  mostusedType:"",
  madebytype:{"Staggered_Spin_Putt":{"made":0,"missed":0},"Staggered_Push_Putt":{"made":0,"missed":0},"Staggered_Spush_Putt":{"made":0,"missed":0},"Staggered_Turbo_Putt":{"made":0,"missed":0},"Staggered_Jump_Putt":{"made":0,"missed":0},"Straddle_Spin_Putt":{"made":0,"missed":0},"Straddle_Push_Putt":{"made":0,"missed":0},"Straddle_Spush_Putt":{"made":0,"missed":0},"Straddle_Turbo_Putt":{"made":0,"missed":0},"Straddle_Jump_Putt":{"made":0,"missed":0}},
  distputted:0,
  bestTypePercentage:{
    type:"",
    percentage:0
  },
  worstTypePercentage:{
    type:"",
    percentage:0
  },
  longestPutt:{
    dist:0,
    time:0
  }
}

function addputt(putt,state){
  state.endtime = putt.time
  state.stats.lastPuttTime = putt.time
  state.stats.lastPuttDate = getPuttsDate(putt.time)
  state.stats.total += putt.num
  state.putts.push(JSON.parse(JSON.stringify(putt)));
  if(putt.made) {
    state.stats.madebytype[putt.stype].made += putt.num;
    state.stats.made+=putt.num
    state.stats.distputted += (putt.num*putt.dist)
    state.stats.streak += putt.num;
    if(state.stats.streak>state.stats.beststreak.streak){
      state.stats.beststreak.streak = state.stats.streak
      state.stats.beststreak.time = putt.time
    }
    if(putt.dist>state.stats.longestPutt.dist){
      state.stats.longestPutt = {dist:putt.dist,time:putt.time}
    }
  } else{
    state.stats.madebytype[putt.stype].missed += putt.num;
    state.stats.missed += putt.num
    state.stats.streak = 0
    state.stats.curstreak = false
  }
  calculateAvgDist(state)
  calculateMostUsedStance(state)
  calculateMostUsedType(state)
  calculateBestTypePercentage(state)
  calculateWorstTypePercentage(state)
  return state
}
function sortPuttsByTime(state){
  state.putts.sort(function(a, b){return a.time-b.time});
}
function totalrecalc(state){
  state.stats = defstats
  calculateAvgDist(state)
  calculateMostUsedStance(state)
  calculateMostUsedType(state)
  calculatePutts(state)
  calculateBestTypePercentage(state)
  calculateWorstTypePercentage(state)
  return state
}
function calculatePutts(state){
  sortPuttsByTime(state)
  state.putts.forEach((putt)=>{
    state.endtime = putt.time
    state.stats.lastPuttTime = putt.time
    state.stats.lastPuttDate = getPuttsDate(putt.time)
    state.stats.total += putt.num
    state.putts.push(putt);
    if(putt.made) {
      state.stats.madebytype[putt.stype].made += putt.num;
      state.stats.made+=putt.num
      state.stats.distputted += (putt.num*putt.dist)
      state.stats.streak += putt.num;
      if(state.stats.streak>state.stats.beststreak.streak){
        state.stats.beststreak.streak = state.stats.streak
        state.stats.beststreak.time = putt.time
      }
      if(putt.dist>state.stats.longestPutt.dist){
        state.stats.longestPutt = {dist:putt.dist,time:putt.time}
      }
    } else{
      state.stats.madebytype[putt.stype].missed += putt.num;
      state.stats.missed += putt.num
      state.stats.streak = 0
      state.stats.curstreak = false
    }
  })
}
function calculateAvgDist(state){
  let total = 0
  state.putts.forEach((p)=>{
    total += p.dist
  })
  state.stats.averageDist = total/state.putts.length
}
function calculateMostUsedStance(state){
  let stands = {[stances[0]]:0,[stances[0]]:0}
  state.putts.forEach((p)=>{
    stands[p.stance] ++
  })
  let max = 0;
  for(var i in stands){
    if(stands[i]>max){
      max = stands[i]
      state.stats.mostusedStance = i
    }
  }
}
function calculateMostUsedType(state){
  let typ = {}
  types.forEach((p)=>{
    typ[p.name.replace(" ","_")] = 0
  })
  state.putts.forEach((p)=>{
    typ[p.type.replace(" ","_")] ++
  })
  let max = 0;
  for(var i in typ){
    if(typ[i]>max){
      max = typ[i]
      state.stats.mostusedType = i.replace("_"," ")
    }
  }
}
function calculateBestTypePercentage(state){
  let best = 0;
  for(var i in state.stats.madebytype){
    if(state.stats.madebytype[i].missed===0){
      if(state.stats.madebytype[i].made/1>best){
        best = state.stats.madebytype[i].made/1
        state.stats.bestTypePercentage.type = i
        state.stats.bestTypePercentage.percentage = best
      }
    } else{
      if(state.stats.madebytype[i].made/state.stats.madebytype[i].missed>best){
        best = state.stats.madebytype[i].made/state.stats.madebytype[i].missed
        state.stats.bestTypePercentage.type = i
        state.stats.bestTypePercentage.percentage = best
      }
    }
  }
}
function calculateWorstTypePercentage(state){
  let worst = 1;
  for(var i in state.stats.madebytype){
    if(state.stats.madebytype[i].made/state.stats.madebytype[i].missed<worst){
      worst = state.stats.madebytype[i].made/state.stats.madebytype[i].missed
      state.stats.worstTypePercentage.type = i
      state.stats.worstTypePercentage.percentage = worst
    }
  }
}
export {addputt,totalrecalc}
export {puttobj,defstats}