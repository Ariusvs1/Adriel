const Commands = require('../../structures/Command');
const https = require('https');
const fs = require('fs'); 
const Discord = require("discord.js")
module.exports = class Imgur extends Commands {
    constructor(client) {
        super(client, {
          name: "imgur",
          description: "Sube una imagen a imgur",
          usage: "imgur <imagen>",
         });
    }

    async run(message, args) {
let a = "";
const i = "1d326f61a0d13bd";
const linkregex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g
if(!message.attachments.first() && !linkregex.test(message.content)) return message.channel.send("No es una imagen!");
            else if (message.attachments.first()) {
              a = message.attachments.first().url;
          } else if (linkregex.test(message.content)) {
            a = message.content;
                      }
 await subirAImgur(a, i)
        .then( data => {
            return Enviar(Discord, message, data.link)
        })
        .catch(console.error)
    }
}
function subirAImgur(image, imgurClientID, msg) {
    let options = { //opciones para el request http (basicamente segun esto la pagina decide que datos devolvernos)
        method: 'POST',
        headers: {
            'Authorization': `Client-ID ${imgurClientID}`
        }
    }
return new Promise((resolve, reject) => {
    let request = https.request( //hacemos la request http
      'https://api.imgur.com/3/image', 
      options,
      response => { //esta callback es la respuesta de la pagina basicamente
        let chunks = [];
        response.on('data', chunk => chunks.push(chunk)) 
        //cada vez que se recibe un chunk de respuesta (buffer) se guarda en el array 'chunks'
        
        /*
        todos los chunks al final, seran los datos que la pagina nos envio, como ej:

        cuando una pagina nos manda un json, los buffers son partes de la string del json
        despues se juntan y se tiene la string completa, y despues se usa JSON.parse() y obtenemos el objeto
        */

        response.on('end', () => {
            let body = JSON.parse(
                Buffer.concat(chunks).toString()
            );
            /*
            Buffer.concat(chunks) junta todos los buffers separados a uno solo
            el metodo toString() lo pasa a texto (en este caso es un json)
            y el JSON.parse() sera para justamente, pasar ese texto a un objeto de javascript
            */

            if(body.data.error){
                //si hubo un error, que se use el metodo reject
                reject(new Error(body.data.error))
            }else{
                //si no hubo error, que se resuelva con los datos
                resolve(body.data);
            }
        })
    })

    if(typeof image === 'string'){ //si el argumento image es una string
        if(fs.existsSync(image)){ //se fija si es la path a alguna imagen (una imagen en el mismo equipo donde se ejecuta el codigo)
            image = fs.readFileSync(image) //obtiene el buffer de la imagen (datos en binario de la imagen)
        }else{
            try{ 
                new URL(image) //se fija si es un url, si esto da error es por que no lo es
            }catch(e){
                //esto se ejecuta si la imagen es una string pero no es ni una path ni una url
                return reject(new Error('The image parameter should be an url to an image, a path to the image or a buffer'))
            }
        }
    }else if(!Buffer.isBuffer(image)){ //si no es un string y encima no es un buffer
        return reject(new Error('The image parameter should be an url to an image or a buffer'))
    }
    
    request.end(image); //aqui le enviamos los datos de la imagen a la pagina, la pagina se fija si es un url o buffer
    //si es un buffer sube el buffer directamente, si es un url obtiene el buffer de la imagen del url

    request.on('error', reject) //a cualquier error que tire reject en la promesa
})
};

function Enviar(dc, msg, conten){

const en = new dc.MessageEmbed()

.setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL())
.setImage(conten)
.setColor("RANDOM")
.setDescription(`**Link:**\n||${conten}||`)
.setTimestamp()
.setFooter(`imgur.com`)
msg.channel.send({ embeds: [en] })


}
