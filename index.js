// const { Discord, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const {MessageEmbed} = require('discord.js');
const axios = require('axios').default;
const m = require("moment")
const TOKEN = process.env['token']
const jadwalKuliah = require("./data.json")
process.env.TZ = 'Asia/Jakarta';

const day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];



function jalanData(){
  let hariIni = m().locale('id').format('dddd');
  let fullTanggal = m().locale('id').format('dddd, Do MMMM YYYY')
  
  const jadwalHariIni = jadwalKuliah.filter((jadwal) => jadwal.hari === hariIni)[0];

    if(!jadwalHariIni) return `Hari ini adalah hari ${fullTanggal}` + `\nTidak ada kelas hari ini, Selamat beristirahat!`;

  let matkulList = "";

  jadwalHariIni.matkul.map((jadwal, i) => {
    const {namaMatkul, jamMatkul} = jadwal;
    matkulList += `Kuliah ${i+1} ${namaMatkul} Jam ${jamMatkul} \n`
  })

  return `Hari ini adalah hari ${fullTanggal} \n${matkulList}`

}

async function getGempa() {
  const {data} = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
  const {Tanggal, Jam, Coordinates, Lintang, Bujur, Magnitude, Kedalaman, Wilayah, Potensi, Dirasakan, Shakemap } = data.Infogempa.gempa;

  const exampleEmbed = new MessageEmbed()
    .setColor('#69c169')
    .setTitle('Data Gempa Terkini')
    .setAuthor({ name: 'BADAN METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA', iconURL: 'https://www.bmkg.go.id/asset/img/logo/logo-bmkg.png', url: 'https://www.bmkg.go.id/gempabumi-dirasakan.html' })
    .setDescription('Gempabumi Dirasakan :')
    .addFields(
		{ name: 'Tanggal', value: Tanggal, inline: true  },
    { name: 'Jam', value: Jam, inline: true},
    { name: 'Kedalaman', value: Kedalaman, inline: true },
    { name: 'Magnitude', value: Magnitude, inline: true },
    { name: 'Koordinat', value: Coordinates, inline: true},
    { name: 'Lintang', value: Lintang, inline: true},
    { name: 'Bujur', value: Bujur, inline: true },
    { name: 'Wilayah', value: Wilayah, inline: true },
    { name: 'Potensi', value: Potensi, inline: true },
    { name: 'Dirasakan', value: Dirasakan, inline: true }
	)
	.setImage(`https://data.bmkg.go.id/DataMKG/TEWS/${Shakemap}`)
	.setTimestamp();

  return exampleEmbed;

  // return `DATA GEMPA UPDATE HARI INI: \n\nTanggal : ${Tanggal} \nJam : ${Jam} \nKedalaman : ${Kedalaman} \nMagnitude : ${Magnitude} \nLintang : ${Lintang} \nBujur : ${Bujur} \nWilayah : ${Wilayah} \nPotensi : ${Potensi} \nDirasakan : ${Dirasakan}`;
}

async function getJoke(){
  const {data} = await axios.get('https://yomomma-api.herokuapp.com/jokes');
  const {joke} = data
  return joke
}

async function getDuck(){
  const {data} = await axios.get('https://random-d.uk/api/random')
  const {url} = data
  
  return `${url}` 
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



client.on("messageCreate", async (message) =>{
  if(message.content == ".test"){
    message.reply("Server is Up!")
  } else if (message.content == ".jadwal"){
    message.reply(`${jalanData()}`)
  } else if (message.content == ".yomama"){
    message.reply(`${getJoke()}`)
  } else if (message.content == ".gempa"){
    message.channel.send({embeds: [await getGempa()] })
  } else if (message.content == ".joke"){
    message.reply(`${await getJoke()}`)
  } else if (message.content == ".duck"){
    message.reply(`${await getDuck()}`)
  }
})

client.login(TOKEN)

