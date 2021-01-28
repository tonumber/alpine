const Discord = require("discord.js");
const express = require("express");
var bodyParser = require('body-parser')
const url = require('url');
const client = new Discord.Client();

const querystring = require('querystring');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get("/", function(req,res) {
  res.end("agent control panel lololol")
})
app.get("/send", function(req,res) {
  if (!req.query.key) {
    res.writeHead(404)
    res.end("404 not found.")
  }
  var key = req.query.key;
  var c = req.query.id;
  var m = req.query.m;
    if (key=="🔑jkeuk") {
      if (c) {
        if (!m) {var m = ""}
        client.channels.cache.get(`${c}`).send(m);
        res.writeHead(200)
        res.end("sent message "+m+" to channel.")
      }else{
        res.writeHead(200)
        res.end("id needed xd")
      }
    }
})
app.get("/eval", function(req,res) {
  if (!req.query.key) {
  console.log(req.query.key)
  res.writeHead(404)
  res.end("404 not found.")
  return;
  }
  var key = req.query.key
  if (key=="🔑jkeuk") {
  var code = req.query.code
  try {
         let evaled = eval(code);
 
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
          res.writeHead(200)

          res.end(clean(evaled));
        } catch (err) {
            res.writeHead(200)

        res.end(`ERROR: ${clean(err)}`);
  }

  }else{
    res.writeHead(504)
    res.end("not allowed bro.")
  }
})
app.listen(4000, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on port 4000"); 
}); 

const print = console.log
const author = "731608764452569139"
const prefix = "!"
client.on("ready", () => {
  console.log("bot logged in xddd")
})
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
client.on("message", async m => {
  if (m.author.bot) return;
  const args = m.content.split(" ").slice(1);
  if (m.content.startsWith(prefix)) {
     print("cmd found")
     if (m.content.substr(1,4)=="help") {
       print("help")
       var embed = new Discord.MessageEmbed()
       .setColor("#3D3D3D")
       .setTitle("Alpine - Help Section")
       .setDescription("**General Commands**:\n\n(-)help\n(-)say\n(-)eval (Agent only)\n\n**Moderation Commands**\n\n(-)ban\n(-)kick\n(-)warn\n(-)messageall")
       .setFooter("made by Agent#9895 with love. | v1.0.0 beta")
       m.channel.send(embed)
     }else if (m.content.startsWith(prefix + "eval")) {
       let is = false
       if (m.author.id == author) {let is = true}
       console.log("someone tried to eval and they are "+m.author.tag)
       if (m.author.id == author) {
         console.log("evaling code")
      try {
         const code = args.join(" ");
         let evaled = eval(code);
 
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
 
          m.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
        m.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
       }
     }
   
  }
})

client.login("token")
