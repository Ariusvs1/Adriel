const Commands = require('../../structures/Command');
const Discord = require('discord.js');
const Canvas = require('canvas');
const Profile = require('../../db/Profile')
module.exports = class Rank extends Commands {
    constructor(client) {
        super(client, {
          name: "rank",
         alias: ["level"],
  
         });
    }

    async run(msg) {

        const busca = await Profile.findOne({ userID: msg.author.id, guildID: msg.guild.id})
        
        const canvas = Canvas.createCanvas(700, 250);

        const context = canvas.getContext('2d');

        // Since the image takes time to load, you should await it
        const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/819389825933246504/853188880035479552/fondo-monocromatico-realista-hojas-tropicales-oscuras_23-2148438933.jpg');
        // This uses the canvas dimensions to stretch the image onto the entire canvas
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        // Use the helpful Attachment class structure to process the file for you
	// Set the color of the stroke
	context.strokeStyle = '#343c3c';
	// Draw a rectangle with the dimensions of the entire canvas
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.fill()

    let level = busca.level;
    let xp = busca.xp;
    let xpObjectif = busca.level * busca.level * 100;

    let xpBarre = Math.floor(xp / xpObjectif * 400);
    
   //CUADROS
   roundedRect(context, 18, 24, 450, 210, 40, "#a9f1df", "#2c2c34");    // Data barra
   roundedRect(context, 18, 24, 50 + xpBarre, 210, 40, "#47597E", "#47597E");    // Data barra1 editable
   roundedRect(context, 18, 18, 450, 210, 40, "#2c2c34", "#2c2c34");    // Data
    roundedRect(context, 476, 19, 200, 120, 40, "#2c2c34", "#2c2c34");  // LEVEL
    roundedRect(context, 496, 83, 168, 37, 20, "#151616", "#151616");  // LEVEL NUMBER          
    roundedRect(context, 476, 150, 200, 80, 40, "#2c2c34", "#2c2c34");  // EXP   
    roundedRect(context, 499, 188, 160, 27, 15, "#151616", "#151616");  // XP NUMBER          

    //TEXT
    text(context, 547, 63, "LEVEL", "#777878", "25px Couture")    // TEXT LEVEL
    text(context, 578, 110, `${level}`, "#2f5d62", "25px Couture")    // TEXT LEVEL2
    text(context, 557, 177, "EXP", "#777878", "25px Couture")    // TEXT EXP
    text(context, 546, 208, `${xp}`, "white", "20px ADAM")    // TEXT EXP2
    text(context, 583, 208, `/${xpObjectif}`, "#eeebdd", "13px ADAM")    // TEXT EXP3
    arco(context, 219, 100, canvas.width, canvas.height, "#4b778d", "#9dbeb9", `${msg.author.tag}`)
    context.beginPath();
	context.arc(136, 130, 55, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();

context.restore();

    const avatar = await Canvas.loadImage(msg.author.displayAvatarURL({ format: 'jpg' }));
	context.drawImage(avatar, 76, 75, 116, 110)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rank.png');


	msg.channel.send({files: [attachment]});

 }
}

function roundedRect(context,x,y,width,height,radius, relleno, linea){
    context.beginPath();
    context.moveTo(x,y+radius);
    context.lineTo(x,y+height-radius);
    context.quadraticCurveTo(x,y+height,x+radius,y+height);
    context.lineTo(x+width-radius,y+height);
    context.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
    context.lineTo(x+width,y+radius);
    context.quadraticCurveTo(x+width,y,x+width-radius,y);
    context.lineTo(x+radius,y);
    context.quadraticCurveTo(x,y,x,y+radius);
    context.stroke()
    context.fillStyle = relleno
    context.strokeStyle = linea
    context.fill();

 };

 function text(context, x, y, text, color, font){
    context.font = font
    context.fillStyle = color;
    context.fillText(text, x, y);

 };
function arco(context, start, startEnd, endStar, endEnd, color, color2, text) {
 
let gradient = context.createLinearGradient(start, startEnd, endStar, endEnd);

// Add three color stops
gradient.addColorStop(0, color);
gradient.addColorStop(.5, color2);

// Set the fill style and draw a rectangle
context.font = "25px ADAM"
context.fillStyle = gradient;
context.fillText(text, 219, 100, 300);
}