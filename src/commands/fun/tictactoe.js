const Commands = require('../../structures/Command');
const { MessageButton } = require('discord.js');
const Board = require('tictactoe-board');
const ai = require('tictactoe-complex-ai');
module.exports = class TicTacToe extends Commands {
    constructor(client) {
        super(client, {
          name: "tictactoe",
          aliases: ["tresenraya", "raya", "game3", "ttt"],
          usage: "tictactoe <mencion a un usuario>",
         });
    }

    async run(message, args) {

   if (!args[0]) {
     /*
            const easy_but = new MessageButton()
                .setStyle("SUCCESS")
                .setCustomID("ttt_c_easymode")
                .setLabel("Easy");
            const medium_but = new MessageButton()
                .setStyle("PRIMARY")
                .setCustomID("ttt_c_mediummode")
                .setLabel("Medium");
            const hard_but = new MessageButton()
                .setStyle("SECONDARY")
                .setCustomID("ttt_c_hardmode")
                .setLabel("Hard");
            const expert_but = new MessageButton()
                .setStyle("DANGER")
                .setCustomID("ttt_c_expertmode")
                .setLabel("Expert");
            */    
            const msg = await message.channel.send({ content: `Como jugar tictactoe?\n\n1. Haz \`^ttt <mencion>\`. Puedo ser yo o alguien mas.\n2. Si mencionaste a alguien mas se le preguntara si quiere jugar. Si me seleccionaste a mi, el juego comenzara imediatamente.\n3. Si alguien ya no quiere jugar, puede presionar el botón de \`terminar\` para terminar el juego.\n4. Si nadie responde en menos de 60 segundos, el juego termina.\n\nFeliz juego!`,/* components: [[easy_but, medium_but, hard_but, expert_but]] */});
            const filter = (button) => {
                if (button.user.id !== message.author.id) button.reply({ content: "Haz tu propio juego usando `^ttt`", ephemeral: true });
                return button.user.id === message.author.id;
            };
            const col = msg.createMessageComponentInteractionCollector(filter, { time: 20000 });
            col.on("collect", (button) => {
                if (button.customID === "ttt_c_easymode") {
                    this.run(this.client, message, ["tictactoe", "easy"]);
                } else if (button.customID === "ttt_c_mediummode") {
                    this.run(this.client, message, ["tictactoe", "medium"]);
                } else if (button.customID === "ttt_c_hardmode") {
                    this.run(this.client, message, ["tictactoe", "hard"]);
                } else if (button.customID === "ttt_c_expertmode") {
                    this.run(this.client, message, ["tictactoe", "expert"]);
                }
                button.deferUpdate();
                col.stop("ok");
            });
            col.on("end", () => {
                msg.edit({ content: msg.content, /*components: [[easy_but.setDisabled(true), medium_but.setDisabled(true), hard_but.setDisabled(true), expert_but.setDisabled(true)]] */});
            })
            return;
        }
        if (message.guild.tttgame) return message.channel.send("Ya estas en una partida!");
        let user = (["hard", "medium", "easy", "expert"].includes(args[0].toLowerCase()) ? this.client.user : (message.mentions.users.first() || message.guild.members.cache.get(args[0]) || await message.guild.members.fetch(args[0] || "123").catch(() => { }) || message.guild.members.cache.find(e => (e.user?.username === args.slice(0).join(" ")) || (e.user?.tag === args.slice(0).join(" ") || (e.displayName === args.slice(0).join(" "))))));
        if (user?.user) user = user.user;
        if (!user || user.id === message.author.id || (user.bot && user.id !== this.client.user.id)) return message.channel.send("Invalid member!");
        await user.fetch();

        //STARTING GAME
        message.guild.tttgame = new Board.default();
        const terminateButton = new MessageButton()
            .setCustomID("ttt_g_terminate")
            .setLabel("Terminar")
            .setStyle("DANGER");
        if (user.id === this.client.user.id) {
            const difficulty = ["expert", "hard", "medium", "easy"].includes(args[0].toLowerCase()) ? args[0].toLowerCase() : "medium";
            const res = message.guild.tttgame.grid.map(buttonMap);
            const randomturn = Boolean(Math.round(Math.random()));
            const aiInstance = ai.createAI({ level: difficulty, ai: randomturn ? 'X' : 'O', player: randomturn ? 'O' : 'X' });
            const finalMsg = await message.channel.send({
                content: `Es el turno de ${randomturn ? this.client.user.toString() : message.author.toString()}`,
                allowedMentions: { parse: ["users"] },
                components: [[res[0], res[1], res[2]], [res[3], res[4], res[5]], [res[6], res[7], res[8]], [terminateButton]]
            });
            const col2 = finalMsg.createMessageComponentInteractionCollector({
                filter: async button => {
                    if (![message.author.id].includes(button.user.id)) await button.reply({ content: "Haz tu propio juego usando `^ttt`", ephemeral: true });
                    const seeTurn = Boolean(button.guild.tttgame.availablePositionCount() % 2);
                    const turn = randomturn ? (seeTurn ? this.client.user.id : message.author.id) : (seeTurn ? message.author.id : this.client.user.id);
                    if (turn !== button.user.id && !button.replied) await button.reply({ content: "It's not your turn yet!", ephemeral: true });
                    return ([message.author.id].includes(button.user.id) && (button.customID === "ttt_g_terminate" || turn === button.user.id));
                }, idle: 120000
            });
            col2.on('collect', async (button) => {
                if (button.customID === "ttt_g_terminate") {
                    await button.reply("Terminaste el juego, hasta luego!");
                    return col2.stop("stoped");
                }
                const userRes = parseInt(button.customID.split("_")[2]);
                if (button.guild.tttgame.isPositionTaken(userRes + 1)) return button.deferUpdate();
                button.guild.tttgame = button.guild.tttgame.makeMove(userRes + 1, randomturn ? "O" : "X");
                await button.deferUpdate();
                if (button.guild.tttgame.isGameOver()) {
                    if (button.guild.tttgame.hasWinner()) {
                        const res = button.guild.tttgame.grid.map(buttonMap);
                            finalMsg.edit({
                            content: `${message.author.toString()} Gano el juego!`,
                            allowedMentions: { parse: ["users"] },
                            components: [[res[0].setDisabled(true), res[1].setDisabled(true), res[2].setDisabled(true)], [res[3].setDisabled(true), res[4].setDisabled(true), res[5].setDisabled(true)], [res[6].setDisabled(true), res[7].setDisabled(true), res[8].setDisabled(true)], [terminateButton.setDisabled(true)]]
                        });
                        return col2.stop("winner");
                    } else if (button.guild.tttgame.isGameDraw()) {
                        const res = button.guild.tttgame.grid.map(buttonMap);
                        finalMsg.edit({
                            content: `Es un empate!`,
                            allowedMentions: { parse: ["users"] },
                            components: [[res[0].setDisabled(true), res[1].setDisabled(true), res[2].setDisabled(true)], [res[3].setDisabled(true), res[4].setDisabled(true), res[5].setDisabled(true)], [res[6].setDisabled(true), res[7].setDisabled(true), res[8].setDisabled(true)], [terminateButton.setDisabled(true)]]
                        });
                        return col2.stop("draw");
                    }
                }
                const res1 = button.guild.tttgame.grid.map(buttonMap);
                await finalMsg.edit({
                    content: `Es el turno de ${this.client.user.toString()}`,
                    allowedMentions: { parse: ["users"] },
                    components: [[res1[0], res1[1], res1[2]], [res1[3], res1[4], res1[5]], [res1[6], res1[7], res1[8]], [terminateButton]]
                });

                const aiRes = await aiInstance.play(button.guild.tttgame.grid);
                button.guild.tttgame = button.guild.tttgame.makeMove(aiRes + 1, randomturn ? "X" : "O");
                    if (button.guild.tttgame.isGameOver()) {
                        if (button.guild.tttgame.hasWinner()) {
                            const res = button.guild.tttgame.grid.map(buttonMap);
                            finalMsg.edit({
                                content: `${this.client.user.toString()} Gano el juego!`,
                                allowedMentions: { parse: ["users"] },
                                components: [[res[0].setDisabled(true), res[1].setDisabled(true), res[2].setDisabled(true)], [res[3].setDisabled(true), res[4].setDisabled(true), res[5].setDisabled(true)], [res[6].setDisabled(true), res[7].setDisabled(true), res[8].setDisabled(true)], [terminateButton.setDisabled(true)]]
                            });
                            return col2.stop("winner");
                        } else if (button.guild.tttgame.isGameDraw()) {
                            const res = button.guild.tttgame.grid.map(buttonMap);
                            finalMsg.edit({
                                content: `Buen juego!`,
                                allowedMentions: { parse: ["users"] },
                                components: [[res[0].setDisabled(true), res[1].setDisabled(true), res[2].setDisabled(true)], [res[3].setDisabled(true), res[4].setDisabled(true), res[5].setDisabled(true)], [res[6].setDisabled(true), res[7].setDisabled(true), res[8].setDisabled(true)], [terminateButton.setDisabled(true)]]
                            });
                            return col2.stop("draw");
                        }
                    }
                    const res = button.guild.tttgame.grid.map(buttonMap);
                finalMsg.edit({
                    content: `Es el turno de ${message.author.toString()}`,
                    allowedMentions: { parse: ["users"] },
                    components: [[res[0], res[1], res[2]], [res[3], res[4], res[5]], [res[6], res[7], res[8]], [terminateButton]]
                });
            });

            col2.on('end', (c, r) => {
                if (r === "idle" || r === "stoped") {
                    const res = message.guild.tttgame.grid.map(buttonMap);
                    finalMsg.edit({
                        content: r === "idle" ? "Se acabo el tiempo (2m)" : `Juego terminado por ${message.author.toString()}`,
                        components: [[res[0].setDisabled(true), res[1].setDisabled(true), res[2].setDisabled(true)], [res[3].setDisabled(true), res[4].setDisabled(true), res[5].setDisabled(true)], [res[6].setDisabled(true), res[7].setDisabled(true), res[8].setDisabled(true)], [terminateButton.setDisabled(true)]]
                    });
                    if (r === "idle") message.channel.send("El tiempo de espera termino (2m)! Bye.");
                }
                message.guild.tttgame = undefined;
            });
            if (randomturn) {
                const aiRes = await aiInstance.play(message.guild.tttgame.grid);
                if (!col2.ended || message.guild.tttgame) {
                    message.guild.tttgame = message.guild.tttgame.makeMove(aiRes + 1, "X");
                    const res = message.guild.tttgame.grid.map(buttonMap);
                    await finalMsg.edit({
                        content: `Es el turno de ${message.author.toString()}`,
                        allowedMentions: { parse: ["users"] },
                        components: [[res[0], res[1], res[2]], [res[3], res[4], res[5]], [res[6], res[7], res[8]], [terminateButton]]
                    });
                }

            }
        } else {
            const but_yes = new MessageButton()
                .setCustomID("ttt_c_vsyes")
                .setStyle("SUCCESS")
                .setLabel("Yes");
            const but_no = new MessageButton()
                .setCustomID("ttt_c_vsno")
                .setStyle("DANGER")
                .setLabel("No");

            const msg_response = await message.channel.send({ content: `Hey ${user.toString()}, quieres jugar con ${message.author.toString()}?`, allowedMentions: { parse: ["users"] }, components: [[but_yes, but_no]] });

            const col = msg_response.createMessageComponentInteractionCollector({
                filter: (b) => {
                    if (b.user.id !== user.id) b.reply({ content: "La invitacion no es para ti!", ephemeral: true });
                    return b.user.id === user.id;
                }, time: 60000
            });

            col.on("collect", async (button) => {
                await button.deferUpdate();
                if (button.customID === "ttt_c_vsyes") {
                    col.stop("ok");
                    const res = button.guild.tttgame.grid.map(buttonMap);
                    const finalMsg = await message.channel.send({
                        content: `Es el turno de ${message.author.toString()}'`,
                        allowedMentions: { parse: ["users"] },
                        components: [[res[0], res[1], res[2]], [res[3], res[4], res[5]], [res[6], res[7], res[8]], [terminateButton]]
                    });
                    const col2 = finalMsg.createMessageComponentInteractionCollector({
                        filter: async button => {
                            if (![message.author.id, user.id].includes(button.user.id)) await button.reply({ content: "Haz tu propio juego usando `^ttt`", ephemeral: true });
                            const turn = button.guild.tttgame.currentMark() === "X" ? message.author.id : user.id;
                            if (turn !== button.user.id && button.customID !== "ttt_g_terminate" && !button.replied) await button.reply({ content: "Aún no es tu turno!", ephemeral: true });
                            return ([message.author.id, user.id].includes(button.user.id) && (button.customID === "ttt_g_terminate" || turn === button.user.id));
                        }, idle: 120000
                    });
                    col2.on('collect', async (button) => {
                        if (button.customID === "ttt_g_terminate") {
                            await button.reply("Terminaste el juego!");
                            return col2.stop("stoped");
                        }
                        const userRes = parseInt(button.customID.split("_")[2]);
                        if (button.guild.tttgame.isPositionTaken(userRes + 1)) return button.deferUpdate();
                        button.guild.tttgame = button.guild.tttgame.makeMove(userRes + 1, button.guild.tttgame.currentMark());
                        await button.deferUpdate();
                        if (button.guild.tttgame.isGameOver()) {
                            if (button.guild.tttgame.hasWinner()) {
                                const res = button.guild.tttgame.grid.map(buttonMap);
                                finalMsg.edit({
                                    content: `${button.user.toString()} Gano el juego!`,
                                    allowedMentions: { parse: ["users"] },
                                    components: [[res[0].setDisabled(true), res[1].setDisabled(true), res[2].setDisabled(true)], [res[3].setDisabled(true), res[4].setDisabled(true), res[5].setDisabled(true)], [res[6].setDisabled(true), res[7].setDisabled(true), res[8].setDisabled(true)], [terminateButton.setDisabled(true)]]
                                });
                                return col2.stop("winner");
                            } else if (button.guild.tttgame.isGameDraw()) {
                                const res = button.guild.tttgame.grid.map(buttonMap);
                                finalMsg.edit({
                                    content: `Buen juego!`,
                                    allowedMentions: { parse: ["users"] },
                                    components: [[res[0].setDisabled(true), res[1].setDisabled(true), res[2].setDisabled(true)], [res[3].setDisabled(true), res[4].setDisabled(true), res[5].setDisabled(true)], [res[6].setDisabled(true), res[7].setDisabled(true), res[8].setDisabled(true)], [terminateButton.setDisabled(true)]]
                                });
                                return col2.stop("draw");
                            }
                        }
                        const res = button.guild.tttgame.grid.map(buttonMap);
                        finalMsg.edit({
                            content: `Es el turno de ${button.guild.tttgame.currentMark() === "X" ? message.author.toString() : user.toString()}`,
                            allowedMentions: { parse: ["users"] },
                            components: [[res[0], res[1], res[2]], [res[3], res[4], res[5]], [res[6], res[7], res[8]], [terminateButton]]
                        });
                    })
                    col2.on('end', (c, r) => {
                        if (r === "idle" || r === "stoped") {
                            const res = message.guild.tttgame.grid.map(buttonMap);
                            finalMsg.edit({
                                content: r === "idle" ? "Se acabo el tiempo (2m)" : `${c.last().user.toString()} Termino el juego`,
                                components: [[res[0].setDisabled(true), res[1].setDisabled(true), res[2].setDisabled(true)], [res[3].setDisabled(true), res[4].setDisabled(true), res[5].setDisabled(true)], [res[6].setDisabled(true), res[7].setDisabled(true), res[8].setDisabled(true)], [terminateButton.setDisabled(true)]]
                            });
                            if (r === "idle") message.channel.send("El tiempo de espera acabo (2m)! Bye.");
                        }
                        message.guild.tttgame = undefined;
                    })
                } else if (button.customID === "ttt_c_vsno") {
                    col.stop("rejected");
                }
            });
            col.on("end", async (c, r) => {
                if (r === "ok") return msg_response.edit({ content: "Juego aceptado.", components: [[but_yes.setDisabled(true), but_no.setDisabled(true)]] });
                else {
                    if (r === "rejected") await msg_response.edit({ content: "El usuario rechazo tu invitación. Intenta con alguien mas.", components: [[but_yes.setDisabled(true), but_no.setDisabled(true)]] });
                    else if (r === "time") await msg_response.edit("El tiempo acabo. Intenta otra vez.", { components: [[but_yes.setDisabled(true), but_no.setDisabled(true)]] });
                    message.guild.tttgame = undefined;
                }
            })
        }

    }
}

function buttonMap(e, i) {
    return new MessageButton()
        .setStyle(e === '' ? "SECONDARY" : undefined || e === "X" ? "DANGER" : undefined || e === "O" ? "PRIMARY" : undefined)
        .setCustomID(`ttt_g_${i}`)
        .setLabel(e || "?")
        .setDisabled(e !== '');
}