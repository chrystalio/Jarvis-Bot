const Discord = require("discord.js")
const axios = require('axios').default;
const m = require("moment")
const TOKEN = process.env['token']

m.locale('id')
process.env.TZ = 'Asia/Jakarta';

const day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const hari = new Date().getDay();
// let hariIni = m().format('dddd, Do MMMM YYYY');

const jadwalKuliah = [
  {
    hari: "Senin",
    matkul1: "Struktur Data & Algortima",
    matkul2: "Corporate IS",
    jam1: "17:30 - 20:00",
    jam2: "20:20 - 22:00"
  },
  {
    hari: "Selasa",
    matkul1: "Matematika II",
    jam1: "17:30 - 20:00",
  },
  {
    hari: "Rabu",
    matkul1: "Matematika Diskrit",
    matkul2: "Bahasa Inggris",
    jam1: "17:30 - 20:00",
    jam2: "20:20 - 22:00"
  },
  {
    hari: "Kamis",
    matkul1: "Pengantar Rekayasa dan Desain I",
    jam1: "17:30 - 19:10",
  },
  {
    hari: "Jumat",
    matkul1: "Fisika Dasar II",
    jam1: "17:30 - 20:00",
  },
];

// // Get today day name
// var d = new Date();
// var MunculHari = day[d.getDay()];
// var hariIni = m().format('dddd, Do MMMM YYYY');
// const hari = new Date().getDay();


function jalanData(){
let today = m().format('dddd, Do MMMM YYYY');
for (let i = 0; i < jadwalKuliah.length; i++) {
  if(jadwalKuliah[i].hari === day[hari]){
    if(jadwalKuliah[i].matkul2){
    return `Hari ini adalah hari ${today}` + `\nKuliah 1: ${jadwalKuliah[i].matkul1}, jam ${jadwalKuliah[i].jam1}` + `\nKuliah 2: ${jadwalKuliah[i].matkul2}, jam ${jadwalKuliah[i].jam2} WIB`;
  } else {
  return `Hari ini adalah hari ${today}` + `\nKuliah 1: ${jadwalKuliah[i].matkul1}, jam ${jadwalKuliah[i].jam1} WIB`;
} 
  } else if (i === jadwalKuliah.length - 1) {
            
            return `Hari ini adalah hari ${today}` + `\nTidak ada kelas hari ini, Selamat beristirahat!`;
        }
    }
}



const client = new Discord.Client({
  intents:[
    "GUILDS",
    "GUILD_MESSAGES"
  ]
})

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
})



client.on("messageCreate", (message) =>{
  if(message.content == ".test"){
    message.reply("Server is Up!")
  } else if (message.content == ".jadwal"){
    message.reply(`${jalanData()}`)
  } 
})

client.login(TOKEN)

