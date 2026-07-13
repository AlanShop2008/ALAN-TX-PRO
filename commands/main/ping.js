let handler = async (m) => {

const inicio = performance.now()

const fin = performance.now()

await m.reply(`
╭━━━〔 ⚡ ALANSHOP 〕━━━╮

🏓 Pong!!

⚡ Velocidad:
${(fin - inicio).toFixed(4)} ms

╰━━━━━━━━━━━━━━━━━━━╯`)

}

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping']

export default handler
