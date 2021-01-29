class LS {
  constructor(programname, logging) {
    this.objkey = programname;
    this.koala = null;
    this.program = null;
    this.putts = null;
    this.l = logging;
  }
  store(val){
    return btoa(JSON.stringify(val))
  }
  unstore(val){
    return JSON.parse(atob(val))
  }
  init() {
    if (this.l) {
      console.log("%cls initiating", "background:green;padding:2px");
    }
    if (localStorage.KOALAprogramS === undefined||localStorage.KOALAprogramS === ""||localStorage.KOALAPUTTS === undefined||!localStorage.KOALAPUTTS) {
      let programs = {};
      programs[this.objkey] = {
        plays: 1,
        user:null,
        savechecked: false
      };
      localStorage.KOALAPUTTS = this.store({})
      localStorage.PuttStore = this.store([])
      localStorage.KOALAprogramS = this.store({
        programs: programs,
        plays: 1,
        koalaxp: 0,
        cash: 0
      })
      this.updatevars();
    } else {
      this.updatevars();
    }
    if (this.koala.programs[this.objkey] === undefined) {
      this.program = {
        plays: 1,
        user:null,
        savechecked: false
      };
      this.updatels();
    } else {
      this.program = this.koala.programs[this.objkey];
    }
  }
  updateprogramdata(data,keys=[]) {
    if (this.l) {
      console.log("%cls updating program data", "background:green;color:red;padding:2px");
      console.log(data, keys);
    }
    let data2 = this.koala
    if(keys.length === 0){
      for (let i in data) {
        data2.programs[this.objkey][i] = data[i];
      }
    } else {
      let obj = data2.programs[this.objkey]
      keys.forEach((key) =>{
        if(!obj[key]) obj[key] = {};
        obj = obj[key]
      })
      for (let i in data) {
        obj[i] = data[i];
      }
    }
    
    localStorage.KOALAprogramS = this.store(data2);
    this.updatevars();
  }
  addPuttStore(data){
    localStorage.PuttStore = this.unstore(localStorage.PuttStore).push(data)
  }
  getPuttStore(){
    return this.unstore(localStorage.PuttStore)
  }
  removePuttStore(){
    localStorage.PuttStore = this.store([])
  }
  updatekoala(data) {
    if (this.l) {
      console.log("%cls updating koala data", "background:green;color:red;padding:2px");
    }
    let data2 = this.koala
    for (let i in data) {
      data2[i] = data[i];
    }
    localStorage.KOALAprogramS = this.store(data2);
    this.updatevars();
  }
  get programdata() {
    return this.program;
  }
  setputts(putts){
    this.putts = putts
    this.updatels()
  }
  updatevars() {
    this.koala = this.unstore(localStorage.KOALAprogramS);
    this.putts = this.unstore(localStorage.KOALAPUTTS)
    this.program = this.koala.programs[this.objkey];
    if (this.l) {
      console.log(
        "%cls updating vars",
        "background:green;color:blue;padding:2px",
        JSON.parse(JSON.stringify(this.koala)),
        JSON.parse(JSON.stringify(this.putts)),
        localStorage.KOALAprogramS
      );
    }
  }
  updatels() {
    if (this.l) {
      console.log(
        "%cls updating ls",
        "background:green;color:blue;padding:2px",
        JSON.parse(JSON.stringify(this.koala)),
        JSON.parse(JSON.stringify(this.putts)),
        localStorage.KOALAprogramS
      );
    }
    this.koala.programs[this.objkey] = this.program;
    localStorage.KOALAprogramS = this.store(this.koala);
    localStorage.KOALAPUTTS = this.store(this.putts);
    this.updatevars();
  }
}
let ls = new LS("DGPuttingLog", false);
ls.init();
export default ls;
