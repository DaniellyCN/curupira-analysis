const { log } = require('../automation-project/adapters/logger');

const xlsx = require("xlsx");
const fs = require("fs");
const read = xlsx.readFile("./relatorio.xls", {cellDates:true});
const ws = read.Sheets["Sheet1"];
const data = xlsx.utils.sheet_to_json(ws);

let newData = [];

newData = data.map((d) =>{
    if(d.Principal === "Sim")
        d.Principal = true;
    if(d.Principal === "Não")
        d.Principal = false;
    return d;
});
fs.writeFileSync("dataJson.json", JSON.stringify(newData,null,2));

//console.log(newData);


